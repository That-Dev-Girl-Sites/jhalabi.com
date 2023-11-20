---
layout: post
title: "Writing a Custom WordPress Block"
date: "2022-09-27"
categories:
  - development
  - wordpress
---

This post has been a long time coming. I have talked about custom WordPress block creation for several years now, from blogging about [registering dynamic blocks with `block.json`](https://jhalabi.com/blog/wordpress-block-json) to speaking at various conferences about why [dynamic blocks are awesome](https://talks.jhalabi.com/dynamic-blocks/).

It recently occurred to me that I have yet to write up a complete post about how I write my custom blocks. Every so often, someone asks me about the code I write, so here is a comprehensive overview of how I write a custom block.


## General philosophy

Hot take: I am a big advocate of dynamic blocks. As an overview, a __dynamic block__ is a block whose front-end markup is generated via the WordPress PHP backend, as the page is called. In contrast, a __static block__ is a block whose markup is saved directly to the database. 

There are definite advantages and disadvantages to both. TL;DR - I am a big fan of the dynamic approach because I often receive requests to edit blocks after they are used on live sites. Editing a static block requires writing a deprecation for the block's previous version. My personal goal is to include as few deprecations as possible in my blocks.


## Objective

The purpose of this post is to illustrate how I write a custom Gutenberg block. I want to keep this tutorial as simple as possible. Therefore, the example block here will be one that displays a word and its definition. 


## The anatomy of a custom block

A custom dynamic block is written using a combination of JavaScript (JS) and PHP. The JavaScript side handles the post editor experience, while the PHP side handles the front-end experience.

To that end, the block needs 4 pieces (files). I place all of these files in the same directory in order to simplify the code _(since these files need to find and talk to each other)_. It also really helps with code organization when I am registering multiple blocks.

* `BLOCK_DIRECTORY`
  * `block.json`: defines the block structure
  * `edit.js`: a JS module that defines the block's edit functionality
  * `register.php`: registers the block on the PHP side and defines how the front-end is rendered
  * `index.js`: registers the block on the JS side

Let's dive deeper into each of these files.


## `block.json`: Defining the block

The `block.json` file defines how the block is structured, what attribute it uses, and what metadata is applicable to the block. This metadata includes information like the block's name, description, keywords, and icon. It is used by both the PHP and JavaScript registration functions.

In this example, I want to define the following pieces of information:

* __`name`__: The unique machine name of my block, which the post editor will use to identify the block any time it is used. 
* __`title`__: The human-readable name of my block.
* __`category`__: The category that my block will be listed under in the [Block Inserter(https://wordpress.org/support/article/blocks/). For this example, I will use the "Text" out-of-the-box category. You can also [create your own custom category](https://gutenberghub.com/how-to-create-custom-block-category/).
* __`description`__: The human-readable description of my block. It is best to keep this short, maybe tweet length.
* __`attributes`__: The pieces of content that my block needs to save. In this case, I need to save 2 strings, the dictionary word and the definition. The `attributes` item is an object and each piece of content inside is its own object that defines the content's variable type _(e.g. string, integer, boolean)_ and an optional default value.

`block.json` includes more metadata options than are applicable to this example. You can refer to [WordPress's block API metadata reference guide](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/) for a complete list of all available options.

Here is what my example block's JSON file look like:

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 2,

  "name": "my/word",
  "title": "Dictionary Word",
  "category": "text",
  "description": "Present a word and its definition",

  "attributes": {
    "word": {
      "type": "string",
      "default": ""
    },
    "definition": {
      "type": "string",
      "default": ""
    }
  }
}
```


## `edit.js`: Defining the editor UI

The Gutenberg editor is written in ReactJS. Therefore, any customizations to that editor need to also be written in JavaScript. This `edit.js` file defines a JS module that will create the editor UI for this custom block.

This module defines a function that will be called in the JS registration for this block. _(We will get to the JS registration later on in this article.)_ 

This function accepts a single `props` parameter, which is an object that is automatically passed to the block edit function by Gutenberg. This object contains all of the information about the block, including, but not limited to, its attributes.

The `edit()` function then uses Gutenberg components to construct an editor interface that can be used to add and edit the block's content. In this case, we will use the Gutenberg [`TextControl`](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/text-control) component to construct the input field for both the word and the definition.

The module code, commented with further explanations, is below:

```javascript
// The JS module is a function, saved to a constant variable.
const WordEdit = ( props ) => {

  // The `useBlockProps()` function from the block editor library
  // allows the block to include default classes and components, 
  // like the block selection toolbar, in the editor UI. The 
  // block will be unselectable without this.
  const { useBlockProps } = wp.blockEditor;

  // We run the `useBlockProps()` function to save these classes
  // and properties as a string, which will will add to the 
  // editor UI markup below.
  const blockProps = useBlockProps();

  // The `TextControl` component provides us with an input box
  // that a user can use to add and edit the word and definition
  // in our block.
  const { TextControl } = wp.components;

  // `setAttributes` is a function passed by the block properties
  // which will allow us to save any changes to the block 
  // attributes.
  const { setAttributes } = props;

  // Extract our block's attributes (`word` and `definition`) 
  // from the `attributes` object inside the block properties.
  const { word, definition } = props.attributes;
  
  // Here, we create change event handlers that will run whenever
  // one of the attributes is edited. The handlers are functions
  // that call the `setAttributes` function (from our block
  // properties, above). It sets the given attribute to the
  // passed-in value.
  const onChangeWord = ( value ) => { 
    setAttributes( { word: value } )
  };
  
  const onChangeDefinition = ( value ) => { 
    setAttributes( { definition: value } )
  };

  // This edit function is required to return the edit UI 
  // markup. The markup here is written in JSX.
  return (
    { /* JSX requires that a single element be returned, so */ }
    { /* we enclose everything in a `div`. The `blockProps` */ }
    { /* provides the classes and attributes necessary to */ }
    { /* render the block properly in the post editor. */ }
    <div { ...blockProps }>

      { /* The `TextControl` component that provides the */ }
      { /* input element for the word attribute. */ }
      <TextControl
        label='Word'
        value={ word }
        onChange={ onChangeWord }
      />

      { /* The `TextControl` component that provides the */ }
      { /* input element for the definition attribute. */ }
      <TextControl
        label='Definition'
        value={ definition }
        onChange={ onChangeDefinition }
      />

    </div>
  );

};

export default WordEdit;
```


## `register.php`: Defining the front-end UI

The `register.php` file is only required because we are creating this block as a dynamic block. This file has 2 jobs:

1. Register the block on the PHP side so that we can dynamically construct the block's front-end markup.
1. Define a `render()` function to construct the block's front-end markup. This is done as a callback from the registration function.

I prefer to create a class for each block. This is not strictly necessary, but I find it makes the code much more readable, especially in cases where I am registering a lot of blocks. _(For example, at work, we have a plugin that registers over 40 blocks.)_

The PHP code, commented with further explanations, is below:

```php
<?php

// Namespace for my block class.
namespace My\Blocks;

class Word {

  /**
   * __construct()
   * 
   * This function calls the block's PHP registration function
   * (below) using the WordPress `init` action.
   */
  public function __construct() {
    add_action( 'init', [ $this, 'register' ] );
  }


  /**
   * register()
   * 
   * This is the function that is called by the above `init`
   * action. It contains a single call to the WordPress
   * `register_block_type()` function, which will register the
   * block. 
   * 
   * The first parameter, `__DIR__` specifies the
   * location of the `block.json` file, which is in the same 
   * directory as the PHP file for this example.
   * 
   * The second parameter is an arguments array. In this case,
   * we are only including a single argument that defines the
   * render callback. The render callback is a function that 
   * defines the block's front-end markup. 
   *
   * @return void
   */
  public function register(): void {
    register_block_type( __DIR__, [
      'render_callback' => [ $this, 'render' ]
    ] );
  }


  /**
   * render()
   *
   * This is the function that is called by the `render`
   * callback in the `register()` function above. It
   * takes the block attributes and uses that content to
   * create the block's front-end display.
   * 
   * @param array $attributes Block attributes
   * 
   * @return string
   */
  public function render( $attributes ): string {
    // Extract whatever block attribute data we need.
    $word = $attributes['word'] ?? '';
    $definition = $attributes['definition'] ?? '';

    // Create and return the front-end markup. I find it easier
    // to use a heredoc for readability purposes.
    return <<<HTML
      <dl>
        <dt>$word</dt>
        <dd>$definition</dd>
      </dl>
HTML;
  }

}

// Instantiate the class.
new Word;

```


## `index.js`: Registering the block's JS

The `index.js` file simply registers the block in the JavaScript. Its registration function requires 3 pieces of information:

1. The location of the `block.json` file, which defines the block's name, attributes, etc.
1. An `edit()` function, which defines the block's editor UI. We already wrote this function above in the `edit.js` file, so all we need to do here is point this edit function to our block edit module.
1. A `save()` function, which defines the block's front-end UI. For a static block, this function would return a string with the block's markup. However, since we are defining a dynamic block, this function is not needed. We tell it to return null, to indicate to the post editor that the markup will be generated by the PHP.

As with the `edit.js` file above, I prefer to write this JavaScript registration file as a module, which can be imported elsewhere inside of a larger plugin.

This JavaScript code, commented with further explanations, is below:

```javascript
// Import the `WordEdit` module, defined above in `edit.js`
// as simply `Edit` to make reading the code easier.
import { default as Edit } from './edit.js';

// We also import `block.json` as a module, for use in the
// registration function below. 
import { default as Metadata } from './block.json';

const WordEdit = ( () => {

  // Block registration uses the `registerBlockType` function
  // from the `wp-blocks` package. I like to extract that here
  // for reading ease.
  const { registerBlockType } = wp.blocks;

  // Call the registration function.
  // The first parameter is the `Metadata` import from above,
  // which is the `block.json` file.
  // The second parameter is an arguments object, which contains
  // the `edit()` and `save()` functions.
  registerBlockType( Metadata, {
    // The `edit()` function passes the block properties
    // (`props`) and returns the `Edit` import from above.
    edit: ( props ) => {
      return ( Edit( props ) );
    },

    // As stated above, the `save()` function simply returns
    // `null`, because this is a dynamic block.
    save: () => {
      return null;
    }
  });

} )();

export default WordEdit;

```


## References

This post is a super-basic overview of how I, a single developer, create custom WordPress blocks. As with most things in programming, there are 86 different _(and valid)_ approaches to a code solution.

You can learn a ton from the WordPress block API documentation. Many of the modules and components are documented and all core WordPress code is publicly available. _(Hooray for open source!)_ 

Below is a list of my favorite resources and links to more information about some of the functions I reference above.

* [WordPress Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
* [WordPress Block API registration documentation](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/)
* [Gutenberg Github Repo](https://github.com/WordPress/gutenberg)
* [JSX](https://reactjs.org/docs/introducing-jsx.html)
* [WordPress `init` action](https://developer.wordpress.org/reference/hooks/init/)
* [WordPress `register_block_type` PHP function](https://developer.wordpress.org/reference/functions/register_block_type/)
