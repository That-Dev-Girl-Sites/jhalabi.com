---
layout: post
title: "WordPress block migrations: A tutorial"
date: "2024-03-04"
categories:
  - development
  - wordpress
---

Webalina was in deperate need of a new look. She was strong and giving, but she looked like she stepped straight out of a music video from the late 1990s. Not that there is anything wrong with plaid, but it was time for a change. She hired a series of style consultants and -- _abra-ca-makeover_ -- she was a brand new Webalina! What she didn't know is that _everything_ she was wearing was dry-clean only[^1].


## The real story

Ok, Webalina is not real, but I did run into a real, similar situation with a WordPress website at work. The site was redesigned and developed by external contractors. The new design was beautiful. The code behind that design was... less than beautiful. Between maintainability and accessibility issues, we knew that this code had to go. That included the code for all of the site's custom post editor blocks.


## The game plan

We made a decision to not keep any of the contractor's custom blocks and, instead map those blocks to other custom blocks written by our team. I was tasked with writing scripts to automatically migrate content in the contractor's blocks to use our blocks instead.

We wanted this migration to happen with no human intervention, which meansn that [block transforms](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-transforms/) were not a viable solution. I opted to create a script that would run once across the site, automatically migrating all blocks at once. This was a job for PHP[^2].


## Infrastructure

The first thing I wrote for this auto-migration script was a central controller to manage the migration process. The controller loops through a site's posts and migrates each post in turn. Each post runs a second loop to migrate each block individually. This allows each block to have a separate migration script, mostly for development ease.

Before we loop, we need to get our lists of posts and migrator functions. _(More about the migrator functions is coming below.)_ I created a function for each of these.


### Get all posts

The following function retrieves a list of all posts or pages on the site, using the WordPress [`get_posts()`](https://developer.wordpress.org/reference/functions/get_posts/) function.

```php
function get_posts(): array {
  $args = [
    'numberposts' => -1,(
    'post_status' => 'any',
    'post_type'   => [ 'post', 'page' ]
  ];

  return get_posts( $args );
}
```


### Get a list of all migration scripts

Every block has different attributes and how attributes match from one (old) block to another (new) block is unique. Therefore, every block requires its own migration scripts that will map these attributes to automatically transform one block into another.

Each block's migration script it housed in its own PHP class. In order for a post to migrate all blocks at once, we first need a list of all of these scripts.

This list is simply an array of the instantiated classes for all of the migration scripts. For example:

```php
function get_migrators(): array {
  $migrators = [];

  $migrators[] = new Blocks\OldBlock();
  $migrators[] = new Blocks\AnotherOldBlock();
  // etc. etc.

  return $migrators;
}
```


### Putting it all together.

Now that we have a list of all of our posts and a list of all migration scripts, it is time to put everything together. This is the fun part.

To reiterate, the basic idea is to migrate all of our old blocks into new blocks across all pages on our site. We do this with two loops. The first loops through all of our posts. The second executes each migration script for the current post in the loop. If the block that is adressed by that migration script exists on the page, we migrate that block!

```php
$posts = $this->get_posts();
$migrators = $this->get_migrators();

// Loop through the posts.
foreach ( $posts as $post ) {
  // Loop through the migration scripts.
  foreach ( $migrators as $migrator ) {

    // Only run this migrator if the block exists in the post.
    if ( $migrator->has_block( $post->post_content ) ) {
      $post = $migrator->go( $post );
    }
  } // end migration foreach

  // Update the post.

} // end post foreach
```



[^1]: I routinely fall in love with an outfit, only to find that it is dry-clean only. It breaks my heart to put it back on the rack, but realistically, I do not have the patience for all of that. It's not you, you adorable blouse. It's me.
[^2] An image of the PHP logo wearing a cape comes to mind every time I read that sentence, so, naturally, I asked AI to generate such an image. The results were disappointing.