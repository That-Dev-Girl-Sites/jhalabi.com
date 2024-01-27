---
layout: post
title: "Featured images, Gutenberg, and you"
date: "2019-03-25"
redirect_from: "/blog/wordpress-featured-image-and-gutenberg"
categories:
  - development
  - wordpress
excerpt: A very common editor update that us WordPress developers make is to add options to the featured image meta box in the post editor.
---

A very common editor update that us WordPress developers make is to add options to the featured image meta box in the post editor. This is usually something like a checkbox to determine whether the featured image should be displayed at the top of a post.

## The good old (pre-5.0) days

Before WordPress 5.0, this was usually accomplished in PHP, using the [`admin_post_thumbnail_html`](https://developer.wordpress.org/reference/hooks/admin_post_thumbnail_html/) hook. For a great example of this hook's usage, check out this article on how to [add a checkbox to the featured image meta box](https://www.billerickson.net/code/add-checkbox-to-featured-image-metabox/). However, now that the new core editor (a.k.a. _Gutenberg_) is in play, the featured image is now controlled by that new editor. In other words, our reliable old PHP hook no longer works. We now have to modify the featured image box in Javascipt.

## Wait a sec. Did you say JavaScript?!
Yup! Specifically, we need to update the React component that writes out the featured image box. This code is a bit different than what you would write to create a new Gutenberg block. You are still going through the Gutenberg API, but this more closely resembles React than the block registration code.

This one function, which rewrites the markup inside of the featured image box in the post editor, does all of the heavy lifting:

```javascript
function setFeaturedImageDisplay( OriginalComponent ) {
  return ( props ) => {

    // Get meta field information from the DB.
    let meta = select( 'core/editor' ).getCurrentPostAttribute( 'meta' );

    // Create featured image display option field.
    const displayOption = withState( {
       isChecked: meta.featured_image_display,
     } )( ( { isChecked, setState } ) => (
       <CheckboxControl
        label = 'Display this image at the top of the page.'
        checked={ isChecked }
        onChange={ ( isChecked ) => {
          // Update the field in the editor.
          setState( { isChecked } );

          // Save the new value to the DB.
          meta.featured_image_display = isChecked;
          dispatch( 'core/editor' ).editPost( { meta } );
        } }
      />
    ) );

    // Return the entire featured image box.
    return (
      createElement( 'div', { }, [
        // Display the original featured image box.
        createElement( OriginalComponent, props ),

        // Add a checkbox below the featured image to control display option.
        createElement( displayOption )
      ] )
    );

  }
}
```

After that, all you need is to add a hook in your JavaScript to update the featured image block in the post editor:

```javascript
wp.hooks.addFilter( 'editor.PostFeaturedImage', 'MY-NAMESPACE/featured-image-display', setFeaturedImageDisplay	);
```

## You still get to write (a little) PHP

Good news everyone! You still need to write some PHP to register the meta field with WordPress. This uses the `register_meta` function. You can put this anywhere in a custom plugin or your theme, but I recommend adding this to the same plugin where your JavaScript lives, to keep your code all in one place.

```php
function set_featured_image_display() {
  register_meta(
    'post',
    'MY_FIELD_NAME',
    array(
      'show_in_rest' => true,
      'single' => true,
      'type' => 'boolean'
    )
  );
}

add_action( 'init', 'set_featured_image_display' );
```

---

**Check out these great references!**

* [The Gutenberg Migration Guide on the post thumbnail HTML filter](https://github.com/danielbachhuber/gutenberg-migration-guide/blob/master/filter-admin-post-thumbnail-html.md)
* [Gutenberg Apps: Extending Featured Image Component](https://digitalapps.com/gutenberg-extending-featured-image-component/)
* [WordPress code reference for register_meta](https://developer.wordpress.org/reference/functions/register_meta/)
