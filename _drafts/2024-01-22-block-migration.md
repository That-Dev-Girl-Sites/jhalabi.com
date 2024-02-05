---
layout: post
title: "WordPress block migrations: A tutorial"
date: "2024-01-22"
categories:
  - development
  - wordpress
---

Webalina was in deperate need of a new look. She was strong and giving, but she looked like she stepped straight out of a music video from the late 1990s. Not that there is anything wrong with plaid, but it was time for a change. She hired a series of style consultants and -- _abra-ca-makeover_ -- she was a brand new Webalina! What she didn't know is that _everything_ she was wearing was dry-clean only[^1].

## The real story

Ok, not really, but I did run into a similar situation with a WordPress website. This site was revamped by a series of external consultants and the new design looked great! However, the code behind the scenes... not so much. It had maintainablilty issues for a number of reasons, one being the way in which they coded the site's custom blocks. 

To make a very long story short, I was tasked with writing migration scripts to convert the custom blocks written by the consultants to blocks that my team can maintain.

## The game plan

We made the decision to not keep the contractor's blocks at all, which made a [block transform](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-transforms/) was not a viable solution. I opted to create a script that would run once across the site, automatically migrating all blocks at once. This was clearly a job for PHP.

## Infrastructure

Multiple types of blocks. One script. 

The first step to this auto-migration was to create a controller to manage the migration process. The controller loops through the site's posts and migrates each in turn. Each post runs a second loop to migrate each block individually. This allows each block to have a separate migration script, mostly for development ease.

Before we loop, we need to get our lists of posts and migrator functions. _(More about the migrator functions is coming below.)_ I created a function for each of these.

### Get all posts

The following function retrieves a list of all posts or pages on the site, using the WordPress [`get_posts()`](https://developer.wordpress.org/reference/functions/get_posts/) function.

```php
function get_posts(): array {
  $args = [
    'numberposts' => -1,
    'post_status' => 'any',
    'post_type'   => [ 'post', 'page' ]
  ];

  return get_posts( $args );
}
```

### Get all migration functions

This is (part of) the fun part. The following function gets a list of all of the migration scripts. Each migration script is housed in 



```php
$posts = $this->get_posts();
$migrators = $this->get_migrators();

foreach ( $posts as $post ) {
  foreach ( $migrators as $migrator ) {

    // Only run this migrator if the block exists in the post.
    if ( $migrator->has_block( $post->post_content ) ) {
      $post = $migrator->go( $post );
    }
  } // end migration foreach

  // Update the post.

} // end post foreach
```

```php
use WP_Post;

class Go {

  /**
   * init()
   * 
   * @return void
   * @throws Exception
   */
  public function init(): void {
    $posts = $this->get_posts();
    $migrators = $this->get_migrators();

    foreach ( $posts as $post ) {
      foreach ( $migrators as $migrator ) {

        // Only run this migrator if the block exists in the post.
        if ( $migrator->has_block( $post->post_content ) ) {
          $post = $migrator->go( $post );
        }
      } // end migration foreach

      // Update the post.

    } // end post foreach
  }


  /**
   * get_posts()
   * 
   * Get a list of all posts and pages on the site, since they will all need
   * some level of migration (probably).
   * 
   * @return array
   */
  private function get_posts(): array {
    $args = [
      'numberposts' => -1,                // Get all posts
      'post_status' => 'any',             // Get any post that is not in the trash
      'post_type'   => [ 'post', 'page' ] // Get page and post posts
    ];
  
    return get_posts( $args );
  }


  /**
   * get_migrators()
   * 
   * Get a list of all of the migrators handled by this plugin.
   * 
   * @return array
   */
  private function get_migrators(): array {
    $migrators = [];

    // Theme migrators.
    $migrators[] = new Theme\PageTemplates();

    // Block migrators - priority list. (These migrators need to be run first.)
    $migrators[] = new Blocks\Columns();
    $migrators[] = new Blocks\Group();

    // Block migrators - everyone else.
    $migrators[] = new Blocks\ArticleBody();
    $migrators[] = new Blocks\ArticleIntro();
    $migrators[] = new Blocks\BasicText();
    $migrators[] = new Blocks\ChapterBody();
    $migrators[] = new Blocks\Cover();
    $migrators[] = new Blocks\ExploreMore();
    $migrators[] = new Blocks\ImageTextCTA();
    $migrators[] = new Blocks\LandingHero();
    $migrators[] = new Blocks\News();
    $migrators[] = new Blocks\PeopleStories();
    $migrators[] = new Blocks\ProgramHomepageHero();
    $migrators[] = new Blocks\Promo();
    $migrators[] = new Blocks\PullQuote();
    $migrators[] = new Blocks\QuickLinks();
    $migrators[] = new Blocks\SpacerACF();
    $migrators[] = new Blocks\SpacerCore();
    $migrators[] = new Blocks\Stats();
    $migrators[] = new Blocks\Testimonial();
    $migrators[] = new Blocks\TextOnlyPromo();
    $migrators[] = new Blocks\ThreeStories();
    $migrators[] = new Blocks\Video();
    $migrators[] = new Blocks\VideoFullWidth();

    return $migrators;
  }


  /**
   * updatePost()
   *
   * Given a post, update its content in the database.
   *
   * @param WP_Post $post
   *
   * @return bool
   */
  private function updatePost( WP_Post $post ): bool {
    global $wpdb;

    $success = $wpdb->update(
      $wpdb->posts,
      [ 'post_content' => $post->post_content ],
      [ 'ID' => $post->ID ]
    );

    // the WPDB update function returns either false or the number of rows
    // that were modified.  so, we're good to go here as long as the $success
    // variable is not exactly Boolean false.  we need a type check because
    // we might update zero rows if the only change performed to a post
    // involved its page template.
    return $success !== false;
  }


  /**
   * createPostRevision()
   * 
   * Create a new revision of the post to capture changes made during the
   * migration.
   * 
   * @param WP_Post $post
   * 
   * @return bool
   */
  private function createPostRevision( WP_Post $post ): bool {
    // Create a new revision. Yes, this uses a private WP function. It was
    // the only thing that worked.
    $revision_id = _wp_put_post_revision( $post );
    
    // Return whether or not this was successful, based on the existence of a
    // valid revision ID.
    return ( is_numeric( $revision_id ) && $revision_id !== 0 );
  }

}
```




[^1]: I don't know about you, but I have fallen in love with dry-clean only clothes. It breaks my heart to put them back on the rack, but realistically, I don't have the patience for that.