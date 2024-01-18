---
layout: post
title: "WordPress dynamic block registration, with special guest JSON!"
date: "2021-10-27"
redirect_from: "/blog/wordpress-block-json"
categories:
  - development
  - wordpress
---

My last blog post was about [WordPress theme customization with JSON](/blog/wordpress-customization). It seems only fitting that I follow that up _(nearly 6 months later... yikes!)_ with a new post about custom block registration and, you guessed it, JSON!

[WordPress 5.8](https://wordpress.org/support/wordpress-version/version-5-8/) introduced the ability to use a `block.json` file to register and configure custom blocks. This is a huge step towards minimizing (and possibly eliminating) the amount of Javascript needed to create a new block. 

There is documentation about [block creation](https://developer.wordpress.org/block-editor/getting-started/create-block/block-anatomy/), which now includes information on how JSON fits into this process. There is also documentation about [dynamic block creation](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/). Personally, I prefer [creating dynamic blocks over static blocks](https://2021.wpcampus.org/schedule/dynamic-blocks-ftw-customize-gutenberg-without-living-in-fear-of-validation-errors/demand). There is some [pushback and discusson](https://github.com/WordPress/gutenberg/discussions/35918) about this. However, I'm going to leave that for another blog post.

This post is about the journey I just undertook to refactor a custom dynamic block to use `block.json`.

## My original thought process

There appears to be a one-to-one relationship between attributes in `block.json` and attributes in the JS and PHP block registration functions. Therefore, I thought it was logical to assume that I could simply move those
items into `block.json`, remove them from my JS and PHP, and move on with my day.

I started by moving my block meta information, attributes, supports, and example into `block.json`:

```json
{
  "name": "my/book",
  "title": "Book Block",
  "category": "text",
  "description": "An example block for a book.",

  "attributes": {
    "title": {
      "type": "string",
      "default": ""
    },
    "author": {
      "type": "string",
      "default": ""
    }
  },

  "supports": {
    "customClassName": false
  },

  "example": {
    "attributes": {
      "title": "Charlotte's Web",
      "author": "E. B. White"
    }
  }
}
```

Then, I updated my Javascript registration function, so that now it only includes edit and save functions:

```javascript
const { registerBlockType } = wp.blocks;

registerBlockType( "my/book", {
    edit: ( props ) => {
        // Edit UI goes here.
    },

    save: () => {
        // Return null to render in the PHP.
        return null;
    }
} );
```

And finally, I updated my PHP registration function, so that it only includes a call to my render function:

```php
class Book {

  /**
   * __construct()
   */
  public function __construct() {
    add_action( 'init', [ $this, 'register' ] );
  }


  /**
   * register()
   *
   * @return void
   */
  public function register(): void {
    register_block_type( 'my/book', [
      'render_callback' => [ $this, 'render' ]
    ] );
  }


  /**
   * render()
   *
   * @param array $attributes Block attributes
   * @return string
   */
  public function render( $attributes ): string {
    $title = $attributes['title'] ?? '';
    $author = $attributes['author'] ?? '';

    return <<<HTML
      <div class="my-book-block">
        <p>$title</p>
        <p>$author</p>
      </div>
HTML;
  }
  
new Book;
```

## Looks great! I'm all done, right? 

Nope.

To be fair, I was not _that_ far off, but this copy-paste-delete approach omits some crucial details. The biggest issue is that neither the Javascript nor the PHP have any way of knowing that `block.json` exists. Oops.

So, first, let's tell the Javascript about the JSON. This part is pretty easy, involving 2 steps:

1. Import `block.json` into the JS.
2. Replace the block name with the imported JSON in the registration function.

The following illustrates the change, assuming that both the JSON and JS files live in the same directory:

```javascript
import BookJson from './block.json';

registerBlockType( BookJson, {
    ...
} );
```

We need to do the same with the PHP. This part is pretty easy as well, again involving only 2 steps:

1. Replace the registration function with a new `register_block_type_from_metadata()` function.
2. Replace the block name with the directory location of the JSON file.

The following illustrates this change, again, assuming that both the JSON and PHP files live in the same directory:

```php
register_block_type_from_metadata( __DIR__, [
    'render_callback' => [ $this, 'render' ]
] );
```

## So close!

This is looking really good, but the block is still throwing registration errors in the editor. Why?!?! [_*shakes fist*_]

This is a (personally) irritating, but easy-to-fix issue. We need to tell both the JSON and the JS what version of the API to use. I suspect this is because the original Gutenberg API did not involve any JSON and adding this new `block.json` functionality is a **major** change. A big deal change like this requires a new major version of the API. Since the API seems to default to using the original version, we have to tell it to use the new version (version 2) instead.

In the JS, all you need to do is add `apiVersion: 2` to the object passed as the second parameter of the `registerBlockType()` function.

In the JSON, all you need to do is add `"apiVersion": 2` anywhere in the file. (I tend to add it to the top.)

## Final file versions

And... that's it! For those of you who just want to copy and paste the final versions of the files, here you go:

### `block.json`

```json
{
  "apiVersion": 2,
  "name": "my/book",
  "title": "Book Block",
  "category": "text",
  "description": "An example block for a book.",

  "attributes": {
    "title": {
      "type": "string",
      "default": ""
    },
    "author": {
      "type": "string",
      "default": ""
    }
  },

  "supports": {
    "customClassName": false
  },

  "example": {
    "attributes": {
      "title": "Charlotte's Web",
      "author": "E. B. White"
    }
  }
}
```

### Javascript

```javascript
import BookJson from './block.json';

const { registerBlockType } = wp.blocks;

registerBlockType( BookJson, {
    edit: ( props ) => {
        // Edit UI goes here.
    },

    save: () => {
        // Return null to render in the PHP.
        return null;
    }
} );
```

### PHP

```php
class Book {

  /**
   * __construct()
   */
  public function __construct() {
    add_action( 'init', [ $this, 'register' ] );
  }


  /**
   * register()
   *
   * @return void
   */
  public function register(): void {
    register_block_type_from_metadata( __DIR__, [
      'render_callback' => [ $this, 'render' ]
    ] );
  }


  /**
   * render()
   *
   * @param array $attributes Block attributes
   * @return string
   */
  public function render( $attributes ): string {
    $title = $attributes['title'] ?? '';
    $author = $attributes['author'] ?? '';

    return <<<HTML
      <div class="my-book-block">
        <p>$title</p>
        <p>$author</p>
      </div>
HTML;
  }
  
new Book;
```