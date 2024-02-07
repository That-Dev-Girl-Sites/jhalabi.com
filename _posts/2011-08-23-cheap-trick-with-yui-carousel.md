---
layout: post
title: "Cheap trick with YUI carousel"
date: "2011-08-23"
redirect_from: "/blog/cheap-trick-with-yui-carousel"
categories:
  - development
excerpt: This is just another example of why Internet Explorer 7 (and earlier) needs to die.
---

This is just another example of why Internet Explorer 7 (and earlier) needs to die. I have been working on a project where a group of images needs to be displayed on a page, four at a time in a carousel. The site uses YUI 2.7, so naturally, I am using YUI Carousel to implement this.

In addition to displaying the images, the end user has the option to select one of these images to be selected as a primary image by clicking on that image. When the user selects a new primary image, a banner is displayed across the bottom of the image indicating its “primary” status. So, I added an event listener to add a div to the image’s container whenever said image is clicked. Simple enough, right?

Nope. Firefox was fine, but I came across an issue in IE where the carousel “jumped” so that my newly selected primary image displayed as the first image in the carousel and all other images ahead of it disappeared.

Long story short, clicking on an element in a YUI carousel causes that element to be selected. Selecting an element in a YUI Carousel in IE (apparently) forces that element to be displayed first.

The fix? A hack!  Basically, the YUI Carousel comes with a “beforeSelectedItemChange” event, on which if you return false, the default behavior is negated.  This works for both Firefox and IE.

```javascript
changePrimary = true;

imageCarousel.on("beforeSelectedItemChange", function() {
  if (changePrimary) {
    changePrimary = false;
    return false;
  }
});
```
