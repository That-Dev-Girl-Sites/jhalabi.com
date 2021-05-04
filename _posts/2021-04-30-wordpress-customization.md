---
layout: post
title: "WordPress Customization: Supports and Variations and JSON. Oh my!"
date: "2021-04-30"
categories:
  - development
  - wordpress
---

The new WordPress editor _("Gutenberg")_ has been a part of our lives for [almost 2 1/2 years](https://wordpress.org/support/wordpress-version/version-5-0/). Since that initial launch, WordPress has come out with so many different ways to customize block editor: `theme.json`, block variations, and block supports. These are three distinct features that provide different customization options. Yet, for some reason, I can never remember what controls what (or how much control each feature really has). This blog post aims to clear all that up.

## `theme.json`

The `theme.json` file is a file that lives at the root of the theme. It allows the theme to control a limited _(for now?)_ set of block options, including color, typography, and spacing. You can customize each of these options for _all_ blocks, using a `defaults` object, or for a specific block, using that block's machine name _(e.g. `core/paragraph`)_.

The WordPress developer site has a fantastic [theme.json how-to guide](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/) that explains the specifics better than I can without plagiarizing.

### What's the catch?

As of this writing, this feature is still experimental, which means a few things:

1. The file must actually be named `experimental-theme.json`
2. Experimental features are not merged into core, so the [Gutenberg plugin](https://wordpress.org/plugins/gutenberg/) must be installed.
3. Functionality can change at any time _without needing to be backwards compatible_, hence the "experimental" label.

### But... good news!

This feature will not be experimental for very much longer. `theme.json` is set to be officially, unexperimentally shipped with [WordPress 5.8](https://wptavern.com/themes-set-up-for-a-paradigm-shift-wordpress-5-8-will-unleash-tools-to-make-it-happen), which is set to be released in July 2021.

## Block variations

[Block variations](https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-variations.md) are copies of an existing block with specific values for their existing attributes or a custom set of child blocks _(`innerBlocks`)_. In fact, they were originally named [block patterns](https://github.com/WordPress/gutenberg/issues/16283), which appears to be a better name for what the code actually lets you do, but is probably an overall confusing term.

You get quite a bit of flexibility in terms of customizing variations when you write the base block yourself. For example, the [Embed block](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/embed) appears to give a lot of flexibility to its variations. (The set of Embed blocks was refactored to be variations of the base Embed block as of WordPress 5.6.) Some of this flexibility includes each variation having a distinct icon and title.

However, there does not seem to be a way to get the same flexibility if you want to create new variations of an _existing_ core block.

### But.. what if I want to add a new attribute to my variation?

Strictly speaking, nope. Variations are copies with individualized configurations. Think of variations like a block full of Legos. A block with a red Lego and a green Lego can have 2 variations:

1. Variation #1 has the red Lego on top and the green Lego on the bottom.
2. Variation #2 has the green Lego on top and the red Lego on the bottom.

You cannot create a third variation that adds a blue Lego to the mix. There is no blue Lego.

You _can_, however, separately customize the edit UI and add additional attributes to a block. The edit UI customization can be based on which variation that block falls under (using the `addFilter('editor.BlockEdit')` function), which requires the addition of a custom attribute; for example:

```javascript
const BLOCK = 'core/gallery';

const VARIATIONS = [
  {
    slug:      'grid',
    title:     'Image Grid',
    isDefault: true,
    note:      'The images are in a grid.'
  },
  {
    slug:      'gallery',
    title:     'Image Gallery',
    isDefault: false,
    note:      'The images are in a carousel.'
  }
];

// Register the variations.
VARIATIONS.forEach( ( variation ) => {
  registerBlockVariation( BLOCK, {
    name:       variation.slug,
    title:      variation.title,
    attributes: { variationSlug: variation.slug },
    isDefault:  variation.isDefault
  } )
} );


// Add this new "variation slug" attribute, but just to this block.
function addAttributes( settings, name ) {
  if ( name !== BLOCK ) {
    return settings;
  }

  return lodash.assign( {}, settings, {
    attributes: lodash.assign( {}, settings.attributes, {
      variationSlug: { type: 'string', default: 'grid' },
    } )
  } );
}

// Update the edit UI based on the current variation.
const updateEdit = createHigherOrderComponent( ( BlockEdit ) => {
  return ( props ) => {
    const { variationSlug } = props.attributes;

    // Find the variation of the current block.
    const variation = VARIATIONS.find( ( variation ) => {
      return variation.slug == variationSlug
    } );

    // Return the updated editor UI.
    return (
      <Fragment>

        { /* Only customize the Inspector if we found a variation. */}
        { variation && (
          <InspectorControls>
            <PanelBody title='Notes'>
              <p>{ variation.note }</p>
            </PanelBody>
          </InspectorControls>
        ) }

        { /* The original edit UI. */}
        <BlockEdit { ...props } />

      </Fragment>
    );
  };
}, 'withInspectorControl' );


// Finally, the filters that call these functions.
addFilter( 'blocks.registerBlockType', 'custom/gallery-attributes', addAttributes );
addFilter( 'editor.BlockEdit', 'custom/gallery-edit', updateEdit );
```

So, to answer the original question, is this possible? Yes. Is this technically still all part of a variation? Not really.

## Block Supports

Block supports are the powerhouse of block customizations. This feature includes an [extensive list of editor options](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/) that can be overwritten for one or more _(or all!)_ blocks.

For new, custom blocks, these options can be declared in the block registration function. For existing (core) blocks, these options can be overwritten for any number of blocks using the `addFilter('blocks.registerBlockType')` function.

For example, let's say that you want to remove the ability to add custom class names to a bunch of blocks. You can use the following Javascript to accomplish this:

```javascript
const noClassNames = [
  'core/paragraph',
  'core/image',
  'my-custom/block'
];

const remove = (settings, name) => {
  // If the current block is in my list, remove class name support.
  if ( noClassNames.includes(name) ) {
    return lodash.assign( {}, settings, {
      supports: lodash.assign( {}, settings.supports, {
        className: false
      } )
    } );
  }

  // Otherwise, leave it alone.
  return settings;
};

// Filter to add this customization to the block registration process.
addFilter( 'blocks/registerBlockType', 'custom/classSupport', remove );
```

## Conclusion

`theme.json`, block variations, and block supports are very different, but powerful, features that, I think, are going to make theme and editor customization a whole lot of fun. I hope this clears up the differences among them for you _(and also for future-me)_.

_(Author's note: Your interpretation of "fun" may vary.)_
