---
layout: post
title: "Accessibility and phone number formatting"
date: "2016-11-02"
redirect_from: "/blog/accessibility-phone-number-formatting"
categories:
  - accessibility
  - development
excerpt: Accessible phone numbers on the web is a more complicated topic than you would think.
---

Accessible phone numbers on the web is a more complicated topic than you would think.  Screen readers are remarkably inconsistent in the way they handle phone numbers.  This is a huge issue from an accessibility point of view.

## Highlighting the problem

A US phone number is normally written as “(703) 555-1212”. A screen reader will read this number as “seven hundred three _(pause)_ five hundred fifty-five minus one thousand two hundred twelve.” The digits are read as large numbers.  The reader treats the exchange and number as a math equation.

In another example, a screen reader will read “703.555.1212” as “seven hundred three _(pause)_ five hundred fifty-five _(pause)_ one thousand two hundred twelve.” At least it is no longer a math equation, but the numbers are still read as large singular numbers, not as digits.

## Using a tel: link

The most obvious solution should be to add your phone number as a “tel” link and hope that screen readers are smart enough to know how to read the numbers inside the link:

```html
<a href="tel:7035551212">(703) 555-1212</a>
```

Readers are not that smart.  However, in their defense, links can include any content, from a phone number to regular text, such as “Click here to call our department.”

From a usability perspective, I advocate for using the “tel” link as a partial solution. This does not help with our screen reader issue at all.  However, it does make phone numbers more accessible for mobile phone users, since these user can easily place a call by tapping the phone number. _(You can always use CSS to make the number look clickable on mobile devices and not clickable on desktop devices.)_

## Super clunky HTML solution

In my Google searching travels, I did come across an idea to separate the phone number into pronounceable chunks with span tags. Given how screen readers read larger numbers, I would imagine that would look something like this:

```html
<span>7</span> <span>0</span> <span>3</span> <span>5</span> <span>5</span> <span>5</span> - <span>1</span> <span>2</span> <span>1</span> <span>2</span>
```

Perhaps it’s just me, but that looks terrible.

## CSS solution?

You could also consider creating a CSS speech media query for your content. I find that clunky because it separates the content between my HTML and CSS. (Whether you consider pronunciation as content or style can be up for debate. I personally think of it as content.)

Once upon a time, there was also a specification proposal for a reader media type, but that proposal appears to have been scrapped.

## ARIA labels – a more reasonable solution

The best solution I came across is to use an ARIA label to specify how the screen reader should read a particular piece of text. ARIA labels are designed to tell screen readers how to read things, which is exactly our issue here. Combining the ARIA label with our “tel” link recommendation for above, we arrive at the following code:

```html
<a href="tel:7035551212" aria-label="7 0 3. 5 5 5. 1 2 1 2.">(703) 555-1212</a>
```

Note the spaces and periods in the label. The spaces in the label tell the screen reader to read each digit individually. The period after the area code and the exchange tell the screen reader to pause (like at the end of a sentence).

This solution is a bit more complex than our simple “tel” link. However, it is preferable because it keeps our content together (the displayed number and the pronunciation guide).
