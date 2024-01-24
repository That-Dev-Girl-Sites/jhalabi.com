---
layout: post
title: "Solving my internal CSS framework debate"
date: "2016-05-11"
redirect_from: "/blog/my-css-framework-debate"
categories:
  - development
excerpt: I just finished teaching my students about CSS frameworks.
---

Just when I finished teaching my students about CSS frameworks, I come across an article telling me that “[You Might Not Need a CSS Framework.](https://hacks.mozilla.org/2016/04/you-might-not-need-a-css-framework/)”

I am not telling my students yet.  Let’s just say that is too much too soon.  (I teach beginners.)

That being said, I have been debating this myself for quite a while now.  It generally goes something like this:

<blockquote>
  <p>I’m starting a new site.  I need a framework!</p>
  <p>No you don’t.</p>
  <p>But it makes development so much easier…</p>
  <p>… which then your HTML looks terrible</p>
  <p>And I get a whole host of responsive features for free...</p>
  <p>... with CSS that is a pain to override because the selectors are hyper-specific</p>
  <p>But all of these features have been tested and are cross-browser compatible...</p>
  <p>... but my site’s performance all goes to pot because the framework is so bloated</p>
</blockquote>

And so on and so on.  I can keep this debate going forever.

The bottom line is that is a debate – one which I hope to keep debating.  I will never tell myself that CSS frameworks are useless and a dying breed.  However, I do strongly believe that they have a time and a place.

## Why CSS frameworks are great

* Quick prototyping
* Establishing consistent styles throughout a site
* Setting code standards on a site.

This last point is especially important if you find yourself maintaining a large site with a larger team.  A CSS framework is fixed and _(ideally)_ has documentation that everyone on the team can reference.  There is a high likeliness that new people to the team will already know the framework _(or, at least, a framework)_, which makes on-boarding so much easier.

## Why CSS frameworks are terrible

* Bloated HTML with numerous nested tags (for containers) and a comical number of classes.
* So much overall code, potentially causing a performance hit.
* Overly specific CSS selectors, making it super difficult to override in a custom stylesheet.

This last point brought in a lot of stress in my class and forced me to teach my students about the ___!important___ CSS modifier.  Teaching that brought me some physical pain, but it did also allow me to teach my students about making decisions about their code.  As the saying goes, _“with great power, comes great responsibility”_.

## The winner of my debate is...

Pfft.  I have no idea.  There really is no winner.  I could side with the frameworks and accept the bloat.  I could side against the frameworks and roll my own grid, features, etc.

The real “winner” _(if you can call it that)_ is my own ability to weigh my options and figure out what is best for whatever project I am working on.

Are the cons against using a framework acceptable on a project that is complex and needs to be done quickly?  Great!  Let’s use the framework.  Are the pros of using a framework not enough to justify using it on a project that is hyper-sensitive about performance?  Fine – I will roll my own features and do everything I can towards efficiency.  (Perhaps some day I can even use [CSS Grid](https://www.w3.org/TR/css-grid-1/) on a production project.)

Granted, my decision making process will rarely be this straightforward, but this is a good start. Regardless, I am happy to entertain the debate with every project.  The debate is important.  Having choices is important.  Websites are not one-size-fits-all productions and the process of developing for them should not be either.
