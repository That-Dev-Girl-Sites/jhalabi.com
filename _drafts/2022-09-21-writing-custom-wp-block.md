---
layout: post
title: "Writing a Custom WordPress Block"
date: "2022-09-21"
categories:
  - wordpress
  - development
---

This post has been a long time coming. I have talked about custom WordPress block creation for several years now, from blogging about converting a [custom static block to a dynamic one](https://jhalabi.com/blog/wordpress-block-json) to speaking at various conferences about why [dynamic blocks are awesome](https://talks.jhalabi.com/dynamic-blocks/). 

It recently occurred to me that I have yet to fully write up a post about how I write my custom blocks. Every so often, someone asks me about the code I write, so here is a comprehensive overview of how I write a custom block.

## Overall philosophy

I am a very big advocate for dynamic blocks. As an overview, a __dynamic block__ is a block whose front-end markup is generated via the WordPress PHP backend, as the page is called. In contrast, a __static block__ is a block whose markup is saved directly to the database. There are definite advantages and disadvantages to both. TL;DR - I am a big fan of the dynamic approach because I frequently receive requests to edit blocks after they have been used on live sites and my personal goal is to include as few deprecations as possible in my blocks.

## Example premise

In the spirit of keeping things as simple as possible, I will create a very simple example block that will display a word and its definition. 

## The anatomy of a custom block

A custom dynamic block is written in both JavaScript and PHP. The block is registered in both languages. The JavaScript side then handles the edit functionality that a user will see in the WordPress post editor. The PHP side handles the front-end rendering of the block. Additionally, the block includes a JSON file, which houses the definition of the block's structure.

This custom block will include the following files:

* `block.json`: Defines the block structure
* `index.js`: Registers the block on the JS side
* `edit.js`: A JS module that defines the block's edit functionality
* `register.php`: Registers the block on the PHP side and defines how the front-end is rendered

### `block.json`: Defining the block

The `block.json` file defines how the block is structured, what attribute it uses, and what metadata is applicable to the block. This metadata includes information like the block's name, description, keywords, and icon. 

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
    "term": {
      "type": "string",
      "default": ""
    },
    "definition": {
      "type": "string",
      "default": ""
    }
  },

  "example": {
    "attributes": {
      
    }
  }
}

```

#### Block title

I want to call my example block __"Dictionary Word"__. 

#### Block category

All blocks in the block library are organized by category. Let's put this block into the existing __"text"__ category.

#### Block icon

A block also includes an icon, which is displayed in the block library. The easiest way to add an icon to the block is to use a [Dashicon](https://developer.wordpress.org/resource/dashicons). You can reference the icon by its name. In this case, I am using the __[book icon](https://developer.wordpress.org/resource/dashicons/#book)__.

If you would like to get more creative with your icons, you can use a [custom SVG instead](https://wp.zacgordon.com/2017/12/07/how-to-add-custom-icons-to-gutenberg-editor-blocks-in-wordpress/). 

#### Attributes

This block requires two pieces of information: the word itself and its definition. Each piece of information will be stored as a variable inside the block, called a __block attribute__. In this case, both of these attributes are strings.

#### Example

The JSON file can also, optionally, include an example object, that demonstrates how the block can be used, with some example content. This example is what is displayed when a user hovers over a block in the block library.



