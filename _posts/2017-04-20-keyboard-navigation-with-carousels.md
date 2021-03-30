---
layout: post
title: "Keyboard navigation when carousels block your way"
date: "2017-04-20"
categories:
  - development
  - accessibility
  - javascript
---

Oh... carousels.

Carousels have become a major web design trend over the last several years. They are everywhere, from home pages to slideshows to product galleries.

## Carousels are terrible.

From a content perspective, the majority of users only see the first slide. In a [2013 carousel study on Notre Dame’s website](https://erikrunyon.com/2013/01/carousel-interaction-stats/), only 1% of users clicked on any call to action on their carousel.

<blockquote>
  <p>Carousels are this decade’s &lt;blink&gt; tag</p>
  <cite><a href="https://shouldiuseacarousel.com/">shouldiuseacarousel.com</a></cite>
</blockquote>

From an accessibility perspective, carousels are even worse. Screen readers will ignore much of the content in a carousel. Keyboard navigation is difficult at best. Some carousels will simply make it difficult to navigate between slides. Others will make it virtually impossible to navigate past the carousel.

<blockquote>
  <p>...carousels are generally not compliant with accessibility standards.</p>
  <cite><a href="https://v4-alpha.getbootstrap.com/components/carousel/">Bootstrap 4 alpha documentation</a></cite>
</blockquote>

TL;DR: Do not use carousels.

## But... I need to put this carousel on my page!

I feel your pain. I am willing to bet that most developers need to deal with carousels, even if they are a terrible, terrible idea. (See above.)

I work on a website that uses a Bootstrap 4 carousel on the home page. It works fine for sighted users. It is less fine for sight-impaired users. It is a nightmare for keyboard users. Our carousel allowed a keyboard user to tab into the first focusable element of the carousel. This element was the previous slide navigation button. However, they could not tab to any other element in the carousel. Or tab to the next feature on the page. Or tab backwards to the previous feature on the page. Our keyboard users were stuck.

## Solution, take 1.

I thought the issue was with the ordering of the elements inside the carousel. I checked and rechecked the HTML for the carousel. I reordered the slides and navigation elements a couple of times. My HTML looked valid and semantic, but none of these attempts fixed my keyboard issue.

## Solution, take 2.

I then disabled Javascript on the page. The carousel HTML looked and acted completely fine. This was because we styled the slides to display as individual cards for non-Javascript users. I was able to tab from card to card with my keyboard. Aha! The issue is obviously in the Javascript.

## Solution, take 3.

I decided to tackle the tabbing issue by going through how a user would want to navigate through a carousel. My initial pseudocode looked something like this:

```
if (user pressed the tab key)
  if (user is on the first carousel element and going back)
    put the focus on the element immediately before the carousel
  else if (user is on the last carousel element and going forward)
    put the focus on the element immediately after the carousel
  else if (user is going back)
    put the focus on the previous element in the carousel
  else // user is going forward
    put the focus on the next element in the carousel
```

Coding this in practice was actually terrible. The amount of code I was writing was quickly growing and becoming unmanageable. There were too many edge cases to worry about. Even my pseudocode had way too many if statements than I was comfortable with. There had to be a better solution.

## The final version.

After _a lot_ of help from many Google and Stack Overflow pages, I discovered a much better approach. The final pseudocode is now:

```
if (user pressed the tab key)
  if (focus did not change from where it was before)
    if (user is going back)
      put the focus on the previous focusable element
    else
      put the focus on the next focusable element
```

Done. I don’t care if there is a carousel or some other horrible keyboard trap on the page. This code will allow keyboard users to tab through anything!

## Check out and play with the code.

You can check out the actual code in my [Handle tab focus Gist](https://gist.github.com/thatdevgirl/61ad6a7ece83d4a2515f5ce6d2110e00).
