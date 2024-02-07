---
layout: post
title: "Accessibility testing: Screen reader edition"
date: "2016-09-16"
redirect_from: "/blog/accessibility-screen-reader"
categories:
  - accessibility
  - development
excerpt: Accessibility testing on our websites is a large, large topic.
---

Accessibility testing on our websites is a large, large topic.  I am writing about testing with screen readers here, but please keep in mind that accessibility testing != screen reader testing alone.  There is a already great article from Viget about web accessibility testing in general – “[How to do Web Accessibility QA](https://www.viget.com/articles/how-to-do-web-accessibility-qa-part-1/)“.  (Be sure to read both parts.)

## What is a screen reader?

A screen reader is a piece of software installed on your computer that will read everything on your screen, including websites, applications, and the operating system UI in general.  Screen readers are not just for websites.

There are lots of different screen readers out there – JAWS _(Windows, paid)_, NVDA _(Windows, free)_, VoiceOver _(Mac)_, and plenty more.  To help you find the reader that is right for you, check out this [overview of the major screen readers](http://www.itcs.umich.edu/atcs/screenreaders.php) and this [screen reader comparison](http://accessibilitychatter.com/?p=18).

## Getting started

Screen readers will read your website as long as your browser is the active window.

1. __Open the screen reader.__
2. __Open your web browser of choice.__
3. __Go to the site you are testing.__ The first thing the screen reader will generally read is the website title – i.e. anything inside the &lt;title&gt; HTML tags.

From here, you can start navigating the site using your keyboard.  All navigation commands generally involve a software key. This is simply a key on your keyboard that indicates to the screen reader that you are issuing it a command. This can vary by software and is often customizable. _(For example, the default JAWS key is the INSERT key.)_

1. __The UP/DOWN arrow keys let you navigate through the page.__ You will be navigating the page based on the order of the HTML elements in the DOM.  Navigation has nothing to do with their visual order on the screen.  The down arrow will lead you to the next element on the page.  The up arrow will lead you to the previous element on the page.
2. __Press ENTER to visit a link.__

## How do I know where I am on the page?

__Listen!__

The screen reader will read the text on the page _(or, ideally, the alt text of images on the page)_.  For the most part, you will hear the actual content on the page.  In some cases, the reader will give you context clues about what an element is – particularly if that element is interactive.

Each reader is slightly different in the way it reads the content and presents these context clues.   The following examples are from the JAWS screen reader.

* __Links:__ JAWS will read the text of the link, followed by literally the word “link”.
  * If you have already visited that link, it will say “visited link” instead.
  * If the link goes to another section of the same page you are on, it will say something like “same page link”.
* __Navigation blocks:__ JAWS will preface navigation menus with the word “menu”.
* __Lists:__ JAWS will say “List of # items” before reading any list items, where “#” is the number of items in the list.  This is true of both &lt;li&gt; and &lt;ol&gt; lists.
* __Images:__ JAWS will preface any image alt text with the word “graphic”.

## Actually Testing

It does take a bit of practice to get the hang of navigating a site with a screen reader.  Once you are comfortable with the tool, you can start concentrating on the important parts of your testing.  While you are testing your site, keep these questions in mind:

* Is the content being read to me understandable?
* If I close my eyes, would I have any idea how to accomplish my goal?
* If I close my eyes and interact with a page element, is it easy?

If the answer to any of these questions is no, then you have found an item that needs to be fixed!  Make a note of the difficulties you had.  The fix could be something simple, like adding alt text to an image where it is missing, or something more complicated, like having to retool a form to make it easier to use with a keyboard.
