---
layout: post
title: "The Accessibility of ::before and ::after"
date: "2017-12-19"
redirect_from: "/blog/before-after-accessibility"
categories:
  - accessibility
  - development
excerpt: I was recently reading a tutorial on how to use CSS counters.
---

I was recently reading a tutorial on [how to use CSS counters](https://pineco.de/using-css-counters/). They look great! CSS counters are a new feature of CSS that allow us as developers to enumerate elements in the DOM and then do something with that information. There are plenty of practical uses for this - from numbering highlighted blocks in the text to creating complex nested ordered list bullets. _(I mean, we've all read government documents that include bullet point 13.2.4.1.  Right?)_

All of these implementations involve using the `::before` or `::after` CSS pseudo-selectors in order to display the counter information on the page, before a particular block. With all of my work with accessibility this year, it begged the question: *Is CSS-generated content accessible?*

## Is this even supported?

We should probably start with asking, are CSS counters universally supported by browsers. The answer is yes. Really, with 98.16% support according to [CanIUse.com](https://caniuse.com/css-counters), this is barely a question.

## Alrighty then. What about screen readers?

Screen readers are another story and one that, frankly, I was skeptical about. I did a bit of Google research and came across [an article that showed mixed results](https://tink.uk/accessibility-support-for-css-generated-content/) in terms of whether the readers read this generated content. The biggest offender was in IE, where neither JAWS nor NVDA read the content.  This is presumably because the content does not reside in the DOM and these readers are reading the DOM, as opposed to the visible content on the screen.

However, because this article is almost 3 years old, I decided to conduct my own experiment.

## The test

I created a simple example to use in testing that included content using both the `::before` and `::after` selectors.

I tested in as many screen readers and browsers that I have access to. I have access to two operating systems (Mac OS X and Windows 10) and three screen readers (VoiceOver, JAWS, and NVDA). I used the latest versions of all browsers tested.

## Testing hurdles

I came across a couple of issues that made testing... adventurous.

### Why I did not test in Firefox

I tried! Firefox does not play well with screen readers. At all. When the browser sees that you are using a screen reader, it disables the the display of tab content because of "incompatibility". This incompatibility appears to be universally true since I had this issue with every screen reader on both my Mac and PC.

<figure>
  <img src="/assets/images/posts/firefox-tab-content-dialog.jpg" alt="Firefox dialog stating 'Display of tab content is disabled due to incompatibility between Firefox and your accessibility software. Please update your screen reader or switch to Firefox Extended Support Release.'">
  <figcaption>A very "helpful" Firefox dialog that pops up when you are running accessibility software.</figcaption>
</figure>

The "solution" is to download the [Firefox Extended Support browser](https://www.mozilla.org/en-US/firefox/enterprise/). Because, you know, making your base browser compatible with accessibility software is too hard.

Except, that did not work. Even with the Extended Support version of the browser, both NVDA and JAWS refused to read anything on any web page. (I did not try to install this on my Mac because now I'm really angry at Mozilla.)

### JAWS and Edge

JAWS does not support Microsoft Edge by default. Actually, any sort of Edge support in JAWS is relatively new, as it was introduced in the [JAWS 18.0.4321 release](https://www.blindbargains.com/bargains.php?m=17801) in September 2017. In order to get JAWS to read content in Edge, you must both have a recent version of JAWS (always a good idea anyway) and turn the Edge browser support feature on in the Settings Center.

## Results!

Specific results of my testing are in the table below:

|  | Chrome  | Safari | Edge | Internet Explorer 11
| ----- | ----- | ----- | ----- | ----- | ----- |
| VoiceOver | Yes! | Yes! | -- | -- |
| JAWS | Yes! | -- | Yes! | No |
| NVDA | Yes! | -- | Yes! | No |

The good news is that all screen readers read the CSS generated content in Chrome, Safari, and Microsoft Edge. That is actually great news, since these 3 browsers combined account for over 73% of the global browser market share in November 2017 according to [W3Counter Stats](https://www.w3counter.com/globalstats.php?year=2017&month=11).

However, the bad news is that no screen reader was able to read the CSS generated content in Internet Explorer 11. (The study linked above from 2 years ago found the same results.) While IE 11 only accounts for 3.33% of the global market share (again, for November 2017), 3.33% of the _entire world_ accounts to a fair amount of people.

### Conclusions

You can very likely use CSS generated content without worrying too much about accessibility concerns. I don't want to give you a full pass since, in addition to your IE 11 users _(just upgrade to Edge already!)_, I did not even try to test on real mobile devices. However it did seem to work when I emulated mobile devices in Chrome using dev tools and tested with VoiceOver as a "quickie" test.
