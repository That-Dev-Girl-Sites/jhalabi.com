---
layout: post
title: "Converting static blocks to dynamic blocks"
date: "2023-03-17"
categories:
  - wordpress
  - development
---

I started working with custom Gutenberg blocks sometime in late 2017. Or, perhaps, it was early 2018. To be honest, the timing is a bit fuzzy because I was pregnant at the time and pregnancy brain is real. For those of you keeping track, these timeframes are well before the [WordPress 5 release date of December 6, 2018](https://wordpress.org/documentation/wordpress-version/version-5-0/).

Regardless, it has been a while. Gutenberg was still in development and significantly changing with every new _(alpha)_ release. Meanwhile, our team at work was planning to migrate our 300+ sites from Drupal to WordPress. We knew that Gutenberg had to be part of that plan.

I wrote a lot of blocks in those early days <sup>1</sup>. _All_ of them were static blocks. I did not know dynamic blocks were a possibility until we needed to write our own custom "Latest News" block. 

As an agile team, we tweaked those original blocks multiple times. This is what fueled my [dislike of static blocks](https://talks.jhalabi.com/dynamic-blocks/#/).

## The ask: Convert our static blocks to dynamic blocks

I was not the only person on my team with a dislike of static blocks. We were all tired of the hassles of the deprecation errors that inevitably occurred. Then one day we asked, how can we convert these static blocks to dynamic blocks?

The answer was two-fold:

1. Create a new, dynamic version of the original static block.
2. Write a content migration script to replace instances of the static block with its new dynamic version.

Easy peasy. Right? Right. Let's do this!

## Step 1: Rewrite the block

We can't convert a static block to a dynamic block, so the first step is to create that new dynamic block. This step is relatively straight-forward. 

There are only two required changes: create an additional registration function in PHP and replace the JavaScript `save()` function with a PHP `render()` function. The JavaScript side of the block registration, as well as the `edit()` function can remain the same.

If you are undertaking a larger block refactor and need some help, I recommend reading through the WordPress how-to guide on [creating dynamic blocks](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/) or my own article about how I [write a custom WordPress block](https://jhalabi.com/blog/writing-custom-wp-block).

## Step 2: Migrate your content

This migration step is more complex, but very important, part of the process. There is no reason for both the static and dynamic versions of a block to exist. The end goal is for the dynamic block to completely replace the original static block. Therefore, all instances of the static block need to be transformed into the new dynamic version.

### An example

My solution was to write a one-off script in PHP to handle the migration. For illustrative purposes, let's pretend that we want to replace the existing core Paragraph (static) block with a new dynamic Paragraph block<sup>2</sup>.

The static version of the block is saved with the HTML for the paragraph enclosed in Gutenberg block indicator comments. For example:

```
<!-- wp:paragraph -->
<p>And the seasons they go round and round</p>
<!-- /wp:paragraph -->
```

The goal of the migration is to re-save this block in the post content, so that the markup is removed and all content is saved as meta data inside the block indicators. For example:

```
<!-- wp:my/new-paragraph 
{"content": "And the seasons they go round and round"} 
/-->
```

### The script

My goal was to auto-migrate all Paragraph content at once. I am going to present the entire script first, then explain it further below.

```
class MigrateParagraph {

  private const OLD_P_REGEX = 
    '/<!-- wp:paragraph --><p>(.*)</p><!-- \/wp:paragraph -->/sU';

  /**
   * __construct()
   */
  public function __construct() {
    add_action( 'init', [ $this, 'migrate_all' ] );
  }


  /**
   * migrate()
   * 
   * Migrate all posts on the site.
   * 
   * @return void
   */
  public function migrate(): void {
    // First, get all posts.
    $posts = $this->get_all_posts();

    // Loop through the posts.
    foreach ( $posts as $post ) {
      // Get all instances of the old Paragraph block 
      // in this post.
      preg_match_all( 
        self::OLD_P_REGEX, 
        $post->post_content, 
        $matches
      );

      // The matches are stored in an array with 2 items. 
      //   * [0]: All matched text (the entire block)
      //   * [1]: The saved content in the matched text. 
      //     This is the paragraph content
      // Check to see if one of the array items has a 
      // length. If not, there is nothing to migrate. 
      // Move on.
      if ( !$matches[1] ) { continue; }

      // Loop through all of the paragraphs by looping 
      // through the saved content (index 1).
      for ( $i=0; $i<count($matches[1]); $i++ ) {
        $new_paragraph = '<!-- wp:my/new-paragraph 
          {"content":' . $matches[1][$i] . '"} /-->';

        // Replace the old block (index [0] in the matches 
        // array) with the new block content.
        $post->post_content = str_replace(
          $matches[0][$i], 
          $new_paragraph,
          $post->post_content
        );
      }

      // Update the post with the migrated content.
      wp_update_post( $post );
    }
  }


  /**
   * get_all_posts()
   *
   * Get every post, so that we can look through them 
   * for migratable blocks.
   *
   * @return array
   */
  private function get_all_posts(): array {
    // Arguments to get all posts and pages, and 
    // reusable blocks.
    $args = [
      'numberposts' => -1,
      'post_status' => 'any',
      'post_type'   => ['post', 'page', 'wp_block']
    ];

    // Return an array of post objects.
    return get_posts( $args );
  }

}

new MigrateParagraph;
```

Alright, that was a lot. Details time.

### The regular expression

The beginning of the script defines the regular expression used to find all existing static Paragraph blocks in the post content:

```
private const OLD_P_REGEX = 
  '/<!-- wp:paragraph --><p>(.*)</p><!-- \/wp:paragraph -->/sU';
```

This regular expression locates the block by its block indicator comments and isolates the paragraph content _(using the `(.*)` capture)_. That paragraph content is saved in the dynamic block's meta data.

### The loop

The next part of the script gets all posts across all relevant post types, so that we can loop through each post to look for the Paragraph block. In this example, we want to collect a list of all posts, pages, and `wp_blocks`, which is the post type used for reusable blocks<sup>3</sup>.

The script then loops through all posts and checks to see if the static Paragraph block exists in that post. If at least one Paragraph block is found, the migration continues. Otherwise, the script moves on to the next post in the loop.

### The migration

This is the tricky part. Once the loop finds at least one static Paragraph block n the post, that match is saved to an array. This array contains two items:

1. An array of all matched text items in the post. This is the the entire Paragraph block code, including block indicator comments.
2. An array of all captured paragraph content in the matched text items.

In the context of the example above, the array will look like this:

```
[
  [0] => [
    [0] => "<!-- wp:paragraph -->
            <p>And the seasons they go round and round</p>
            <!-- /wp:paragraph -->",
    [1] => ...
  ],
  [1] => [
    [0] => "And the seasons they go round and round",
    [1] => ...
  ]
]
```

The two array items in the array mirror each other. So, the matched text in the first item in array index `[0]` contains the captured paragraph content in the first item in array index `[1]`.

Now that we have a list of all blocks to be migrated, we can convert them into the format used by the dynamic version of our new Paragraph block. We loop through each of these matches and perform the conversion in two steps.

First, we create the code for the new block, using the content in array index `[1]`:

```
$new_paragraph = '<!-- wp:my/new-paragraph 
  {"content":' . $matches[1][$i] . '"} /-->';
```

Next, we use the string replacement PHP function to replace the corresponding match text from array index `[0]` with the code for the new block:

```
$post->post_content = str_replace(
  $matches[0][$i], 
  $new_paragraph,
  $post->post_content
);
```

### The save

Once we have finished the migration for a particular post, we use the `wp_update_post($post)` function to save our changes to the database. This has the added benefit of creating a new revision for the post. This is great as a backup, just in case somethng goes wrong or we need to refer back to the post's pre-migration state.

### Conclusion

The Paragraph example above is a _very_ basic overview of how I have been writing static-to-dynamic block migrations. A migration for a more complex example will naturally be more complex. I have written two of these migrations so far for two very different blocks. Each migration has been different, involving custom development for each. 

There is no concrete formula for a migration like this because we are 100% in edge-case territory. Ideally, you will need to do very, very few of these types of migrations, if any at all. My hope for this article is to give you an idea of what you are in for if you happen to need to perform a similar migration. YMMV. Good luck!

---

1. I'm going to tell you a dirty secret. I did not know React when I was writing those early blocks. As a matter of fact, I _still_ don't know React. My "React" skillset is extremely limited to the Gutenberg API. So, now you know. React experience is not actually a requirement to work with custom blocks. You're welcome?
2. This is a terrible idea to do in reality. Please do not replace the core Paragraph block on your own site. Not only is it an extremely useful and solid block, it is also the default block used by the WordPress. If a content editor just starts typing in the post editor, that content automatically goes into a Paragraph block. Removing and replacing this block will really mess up the editor. 
3. Do not forget about reusable blocks! Reusable blocks are saved as references in the post content of a page or post. Their content is not directly saved to a page or post. (If a reusable block is updated, that update is applied to all pages and posts on which it appears. This is _exactly_ why a reusable block is saved by reference.) Therefore, we _also_ need to include reusable blocks as a post type for these types of content migrations.