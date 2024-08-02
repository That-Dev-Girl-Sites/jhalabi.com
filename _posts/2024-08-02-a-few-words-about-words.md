---
layout: post
title: "A few words about words"
date: "2024-08-02"
categories:
  - development
  - wordpress
excerpt: Naming things is hard. As a developer, finding the right name for a function is sometimes harder than writing the function itself. 
---

Naming things is hard. As a developer, finding the right name for a function is sometimes harder than writing the function itself. 

The name has to be descriptive, so the purpose of the function is obvious. However the name cannot be _too_ descriptive, because that will make the name too long. Nor can the name be too similar to other functions inside its system, because that will cause confusion. The name needs to be memorable, but not too clever, because clever names border on silliness. The name needs to have longevity, because odds are this function will be used for a long time.

No pressure.

## More names, more problems

At work, we have built a complex system of themes, plugins, and blocks on top of WordPress. We have complex needs, building a variety of content-creation options for our nearly 400 websites.

This complexity has extended from our code into our every day language. WordPress has **blocks**, or distinct content elements. We can use blocks to make a [**block pattern**](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-patterns/), or a collection of blocks in a specific layout. 

We can also create a **reusable block**, which is a block or set of blocks that are pre-filled with specific content, which can be added to any page. This was renamed in WordPress 6.3 and is now called a [**synced pattern**](https://wordpress.org/documentation/article/reusable-blocks/). _(Despite the fact that it uses blocks, this is still different from the block pattern.)_ 

In addition to patterns, we can also create a [**block template**](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-templates/). This is a pre-set collection of blocks in a specific order and may or may not include placeholder content. Generally, block templates are used as a set of child blocks in a parent block. _(Again, this is different from either of the patterns noted above.)_

The block template is not to be confused with a [**theme templates**](https://developer.wordpress.org/themes/basics/template-files/). These are the files that are used by a theme to define the look for a particular type of page. Here, there is a difference between the basic template files used by a theme and page templates, which provides layout options for static pages.

**Fun fact:** The words “pattern” and “template” are [synonyms](https://www.thesaurus.com/browse/pattern). 

## Words cannot be siloed

I used the term “pattern” in two different contexts above, but those contexts only apply to the development side of WordPress. In working with designers, the word “pattern” is also heavily used in design systems. 

You can have a **pattern library**, or a repository of all design elements and how they work together to create a complete website. The elements of the library can be broken up into smaller bits, that can be called elements… or blocks, or templates, or patterns.

The bits can also be called **components**, which is a term also used in the [Block API](https://developer.wordpress.org/block-editor/reference-guides/components/) to define the elements that a block developer can use to construct the block interface in the editor.

## Don’t get me started on the editor

The term “editor” is similarly problematic. We have the [**block editor**](https://wordpress.org/documentation/article/wordpress-block-editor/), which is where a human can create pages or posts. This is also called the **WordPress editor**, the **Gutenberg editor**, and the **post editor**, depending on who you are talking to.

Block developers also frequently use the word “editor” to talk about the [edit UI](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/) of a single specific block.

And what about that human? In many circles, they are called the **content editor**. There is even an [**editor**](https://wordpress.org/documentation/article/roles-and-capabilities/#editor) user role in WordPress permissions hierarchy.

## If I were a terrible person…

In theory, I could say the following:

> I want the editor to go to the editor and create a page with this template. The page content needs this template with that pattern and that other synced pattern.

That sentence has meaning, where each mention of “editor”, "template”, and “pattern” means something different. Fun, right?

## Lessons learned

I am picking on WordPress a bit here, but this situation could exist for any large-scale complex system. I have a few takeaways from this experience:

1. Words matter. More importantly, _definitions_ matter. 
1. Unique concepts require unique words. The alternative creates confusion.
1. It is important for everyone in your circle to use the same words for the same concept. The alternative here also creates confusion.

Good luck, and may this block of text be a template for any future patterns you create.