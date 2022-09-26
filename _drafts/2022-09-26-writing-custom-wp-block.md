---
layout: post
title: "Writing a Custom WordPress Block"
date: "2022-09-26"
categories:
  - wordpress
  - development
---

This post has been a long time coming. I have talked about custom WordPress block creation for several years now, from blogging about converting a [custom static block to a dynamic one](https://jhalabi.com/blog/wordpress-block-json) to speaking at various conferences about why [dynamic blocks are awesome](https://talks.jhalabi.com/dynamic-blocks/). 

It recently occurred to me that I have yet to fully write up a post about how I write my custom blocks. Every so often, someone asks me about the code I write, so here is a comprehensive overview of how I write a custom block.

## Overall philosophy

Hot take: I am a big advocate of dynamic blocks. As an overview, a __dynamic block__ is a block whose front-end markup is generated via the WordPress PHP backend, as the page is called. In contrast, a __static block__ is a block whose markup is saved directly to the database. There are definite advantages and disadvantages to both. TL;DR - I am a big fan of the dynamic approach because I frequently receive requests to edit blocks after they have been used on live sites and my personal goal is to include as few deprecations as possible in my blocks.

## Objective

The purpose of this post is to demonstrate how I write a custom Gutenberg block. In the spirit of keeping this tutorial as simple as possible, I will create a very basic example block that will display a word and its definition. 

## The anatomy of a custom block

A custom dynamic block is written using a combination of JavaScript (JS) and PHP. The JavaScript side handles the post editor experience, while the PHP side handles the front-end experience.

To that end, the block needs 4 pieces:

1. `block.json`, which defines the block structure
1. `edit.js`, a JS module that defines the block's edit functionality
1. `register.php`, which registers the block on the PHP side and defines how the front-end is rendered
1. `index.js`, which registers the block on the JS side

Let's dive deeper into each of these files

## `block.json`: Defining the block

The `block.json` file defines how the block is structured, what attribute it uses, and what metadata is applicable to the block. This metadata includes information like the block's name, description, keywords, and icon. 

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
const Word = ( props ) => {

  // The `useBlockProps()` function from the block editor library
  // allows the block to include default classes and components, 
  // like the block selection toolbar, in the editor UI. The 
  // block will be unselectable without this.
  const { useBlockProps } = wp.blockEditor;

  // We run the `useBlockProps()` function to save these classes
  // and properties as a string, which will will add to the editor
  // UI markup below.
  const blockProps = useBlockProps();

  // The `TextControl` component provides us with an input box
  // that a user can use to add and edit the word and definition
  // in our block.
  const { TextControl } = wp.components;

  // `setAttributes` is a function passed by the block properties
  // which will allow us to save any changes to the block attributes.
  const { setAttributes } = props;

  // Extract our block's attributes (`word` and `definition`) from
  // the `attributes` object inside the block properties.
  const { word, definition } = props.attributes;
  
  // Here, we create change event handlers that will run whenever
  // one of the attributes is edited. The handlers are functions
  // that call the `setAttributes` function (from our block
  // properties, above). It sets the given attribute to the
  // passed-in value.
  const onChangeWord = ( value ) => { setAttributes( { word: value } ) };
  const onChangeDefinition = ( value ) => { setAttributes( { definition: value } ) };

  // This edit function is required to return the edit UI 
  // markup. The markup here is written in JSX.
  return(
    <div { ...blockProps }>

      { /* Custom options in the inspector block. */ }
      <InspectorControls>

        { /* Block Recommendations panel. */}
        <PanelBody title='Block Recommendations' initialOpen={ true }>
          <p>
            This component should be used at the top of a page or section.
          </p>

          <CharacterCount
            content={ content }
            contentDescription='Introduction'
            recommendedSize={ 350 }
          />
        </PanelBody>

      </InspectorControls>

      { /* Editing options displayed in the main editor panel. */ }
      <RichText
        value={ content }
        onChange={ onChangeContent }
        placeholder="Introductory text"
        allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
        tagName={ 'p' }
        multiline={ false }
      />

    </div>
  );

};

export default GuIntroEdit;
```

## Additional references

This post is a super-basic overview of how I, a single developer, create custom WordPress blocks. As with most things in programming, there are 86 different _(and valid)_ approaches to a code solution.

You can learn a ton from the WordPress block API documentation. Many of the modules and components are documented and all of the code is public. _(Hooray for open source!)_ Below are a few of my favorite resources:

* [WordPress Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
* [Gutenberg Github Repo](https://github.com/WordPress/gutenberg)
* [JSX](https://reactjs.org/docs/introducing-jsx.html)