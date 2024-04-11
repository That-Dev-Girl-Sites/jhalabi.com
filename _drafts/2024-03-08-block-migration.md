---
layout: post
title: "WordPress block migrations: A tutorial"
date: "2024-03-08"
categories:
  - development
  - wordpress
---

Webalina was in deperate need of a new look. She was strong and giving, but she looked like she stepped straight out of a music video from the late 1990s. Not that there is anything wrong with plaid, but it was time for a change. She hired a series of style consultants and -- _abra-ca-makeover_ -- she was a brand new Webalina! What she didn't know is that _everything_ she was wearing was dry-clean only[^1].


## The real story

Ok, Webalina is not real, but I did run into a real, similar situation with a small collection WordPress websites at work. These sites were redesigned and developed years ago, using custom blocks written in [Advanced Custom Fields](https://www.advancedcustomfields.com/) (ACF).

Using ACF to write WordPress blocks is great for cases where you do not or can not write custom code. However, our team had already written a number of custom-coded custom blocks in our separate, larger codebase that we were pretty happy with.

Because of this and a variety of other reasons, we decided to move this smaller collection of sites into our larger code base. 


## The game plan

We decided to not keep the ACF-created custom blocks and, instead, transform those blocks to either our own custom blocks or core blocks, as appropriate. I was tasked with writing scripts to automatically migrate this content.

We wanted this migration to happen with little-to-no human intervention. This meant [block transforms](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-transforms/) were not a viable solution. I opted to create a script that would run once across the site, automatically migrating all blocks at once. This was a job for PHP[^2].


## Infrastructure

The first thing I wrote was a central controller to manage the entire migration process. The controller loops through a site's posts and migrates each post in turn. Each post runs a second loop to migrate each block individually. This allows each block to have a separate migration script, mostly for development ease.

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


### Compile the set of all individual migration scripts

Every block has different attributes. How these attributes match from one (old) block to another (new) block is unique. Therefore, every block requires its own migration script to map these attributes  from one block to another.

Each block's migration script it housed in its own PHP class. In order for a post to migrate all blocks at once, we first need a list of these scripts.

This list is simply an array of the instantiated classes for all migration scripts. For example:

```php
function get_migrators(): array {
  $migrators = [];

  $migrators[] = new Blocks\OldBlock();
  $migrators[] = new Blocks\AnotherOldBlock();
  // etc. etc.

  return $migrators;
}
```


### Putting it all together

Now that we have a list of all posts and a list of all migration scripts, it is time to put everything together. This is the fun part.

To reiterate, the basic idea is to migrate all of our old blocks into new blocks across all pages on our site. We do this with two loops. The first loops through all the posts. The second executes each migration script for the current post in the loop. If the block that is addressed by that migration script exists on the page, we migrate that block!

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
  updatePost($post)

} // end post foreach
```


## Individual migrator classes

The inner loop above calls two functions from the individual migrator classes -- `has_block()` and `go()`. These functions live inside the individual migrator classes. We will dive deeper into these functions later in this article.






### Finally, update the post

After all of the migration scripts run for a given post _(i.e. the inner loop is complete)_, we use the `$wpdb->update()` core function to save the newly migrated post. I separated this out into its own function _(i.e. `updatePost()` on line 16 in the above code block)_:

```php
function updatePost( WP_Post $post ): bool {
  global $wpdb;

  // Update the post.
  $success = $wpdb->update(
    $wpdb->posts,
    [ 'post_content' => $post->post_content ],
    [ 'ID' => $post->ID ]
  );

  // The core update function either returns false if the updated 
  // failed or the number of database rows modified if the update 
  // succeeded. This function returns a boolean value whether the 
  // update succeeded or failed.
  return $success !== false;
}
```


## Individual block migration scripts

As mentioned above, each block requires its own script to migrate the attributes from the ACF-based block into either a custom or core block. As you may imagine, this process is extremely individualized, but I will run through a simple example here.

Pull quote example goes here!!!!



[^1]: I routinely fall in love with an outfit, only to find that it is dry-clean only. It breaks my heart to put it back on the rack, but realistically, I do not have the patience for all of that. It's not you, you adorable blouse. It's me.
[^2]: An image of the PHP logo wearing a cape comes to mind every time I read that sentence, so, naturally, I asked AI to generate such an image. The results were disappointing.