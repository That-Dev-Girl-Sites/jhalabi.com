---
layout: post
title: "Overriding WP core: Dynamic blocks edition"
date: "2022-02-07"
categories:
  - development
  - wordpress
---

I was recently given the task of making the WordPress core RSS block look exactly like one of our custom blocks posts block. That custom block displays a series of news stories. RSS feeds are series of news stories, so this request totally makes sense.

Originally, I assumed the task would be a long process of copying and pasting CSS rules from our posts block to classes that match up to the RSS block. That sounded _awful_. Sorry, CSS folks, but CSS is not exactly my happy place.

I couldn't help but think, could there be a better way? So, I decided to look for one.

## An obvious question

My first thought was to see if I can just rewrite the core block's render function to my own HTML (and, more importantly, the CSS classes) to more closely mimic the markup of our custom posts block.

After checking out the [block's PHP code](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/rss/index.php), I wondered if I could simply redeclare the `render_block_core_rss()` function. Spoiler alert: PHP did not like that one bit. Unsurprising, but I thought it would be nice.

## The better way was oddly easy

I needed to find a way to point the core block to a different render function. The only way to assign a render function to a block is upon registration. The block is already registered.

But... _[Joni puts on her black hat for a moment]_ I can unregister and then re-register the block!

So, that's exactly what I did:

```php
function reregister_block_core_rss() {
  unregister_block_type( 'core/rss' );

  register_block_type_from_metadata(
    ABSPATH . '/wp-includes/blocks/rss',
    array(
      'render_callback' => 'rerender_block_core_rss',
    )
  );
}

add_action( 'init', 'reregister_block_core_rss' );

function rerender_block_core_rss( $attributes ) {
  return '<div>Whatever I want goes here!</div>';
}
```

## Further explanation

In the above code, `rerender_block_core_rss()` takes the block `$attributes` as a parameter (just as the core render function does) and returns markup. The markup in my above example is obviously not real. This exercise was solely a proof of concept to see whether or not I _can_ adjust the markup.

I also added a new `reregister_block_core_rss()` registration function. This function makes the assumption that the core registration block fires first. It unregisters the block, then reregisters it, using my custom render function.

The core block is conveniently [registered via JSON](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/) (a new feature I _love_, btw), so my new registration function needs to call that core `block.json` file. You can access the WordPress installation directory via the `ABSPATH` constant. The core block code lives in `/wp-includes/blocks`. Put those two together and we have a path to our core RSS block's JSON file.

One more note: this method _(obviously?)_ only works for dynamic blocks _(e.g. blocks whose markup are rendered on the server-side)_.