---
layout: post
title: "Manual accessibility testing is your new BFF"
date: "2017-08-08"
redirect_from: "/blog/manual-accessibility-testing"
categories:
  - accessibility
  - development
excerpt: Testing your websites to ensure they are fully accessible is a lot of work.
---

Testing your websites to ensure they are fully accessible is a lot of work.  There are a bunch of tools out there to help you thoroughly test your sites -- [Siteimprove](https://siteimprove.com/) or [Tenon](https://tenon.io/), for example.

These automated tools do an excellent job at catching issues that are straightforward and programmatic.  However, they are not an end-all-be-all solution to accessibility testing.  Your users, regardless of their abilities or needs, are ultimately human beings. Therefore, part of your testing routine needs to involve humans.

Yes... I am suggesting you do more work.  However, trust me.  It's worth it.  At the end of the day, you will catch issues that an algorithm cannot, and your websites will be that much better for it.

Here are a bunch of tips that my team and I use at work to test our sites.

## Keyboard navigability
As soon as you load a page, start tabbing through the elements on the page and test for the following things:

1. __Tab order__ <br> You can tab through items from left to right, top to bottom.
2. __Tab ability__ <br> You should be able to tab through the entire page, without getting stuck.
3. __Focus outline__ <br> All focused items are outlined and the outline is obviously visible (i.e. the outline should contrast well with the background).
4. __Focused element__ <br> The focused item should be visible.
5. __Skip links__ <br> Skip links exist and are visible when they have focus.  Usually, skip links will be the first tabbable element on the page.
6. __Off-canvas navigation__ <br> If there is an off-canvas navigation panel, you should be able to open the navigation, tab through the links inside of it, and close the navigation all with the keyboard.
7. __Hover navigation (i.e. mega menus)__ <br> If there are navigation menus that a mouse user would see on hover, then you should be able to see the navigation by pressing the down arrow, tab through the links inside of that panel, and exit the navigation by pressing the up arrow.

## Screen reader readability

Turn on your screen reader of choice.  Have the reader read through the page sequentially and test for the following things:

1. __All content is read__ <br> The screen reader should not get stuck at any point.
2. __Hidden content is not read__ <br> For example, the off-canvas navigation or a hidden search form should only be read by the screen reader when that element is actually visible on the page.
3. __The content that is read makes sense__ <br> The biggest issues here are things like phone numbers, dates, abbreviations in general.

## Landmarks... the screen reader test

Pull up the list of landmarks in your screen reader and test for the following things:

1. __Landmarks exist__ <br> All content on the page must be inside of a landmark container.  Therefore, unless there is nothing on the page, at least one landmark must exist.
2. __Existing landmarks have roles that make sense for their content__ <br> For example, a sidebar should have a complementary role, the main content of the page should have a main role, any navigation list should have a navigation role, etc.  If this is not the case, a more appropriate landmark role should be used.
3. __Redundant landmarks have labels__ <br> It is OK for a unique landmark to not have a label.  However, if there is more than one of any given landmark role on the page, all of those landmarks must have labels.
4. __Landmark labels are unique and make sense__ <br> It doesn't help anyone to have two landmarks with the same label, especially if they are of the same role.  Also, landmark labels should effectively describe the content inside of their landmark

## Landmarks... the source code test

Yes, I am asking you to look at code too.  You can do this by viewing source (Ctrl-U) in your browser or by using your browser's developer tools.  Test for the following things in the page's source code:

1. __All content on the page is inside a landmark role__ <br> All means all: header logo, skip links, off-canvas navigation… everything.
2. __Is there any content that should be put into a new landmark?__ <br> There could be some complementary content inside the main content or a header inside a section.
3. __Landmarks are using the HTML5 semantic tags, not the role attribute__ <br> While the role attribute works, it is better form to use the HTML5 semantic tags for landmarks because it involves less code.

## Links

Pull up the list of links in your screen reader and test for the following things:

1. __Links that go to different locations have unique names__ <br> A bunch of links that go to different URLs but all have the same link text confuse users because they cannot tell the difference between these links.  These links must have unique link text or be given unique ARIA labels.

Ok, I know. This is a long list.  But your users with thank you for all of this work.  I promise.
