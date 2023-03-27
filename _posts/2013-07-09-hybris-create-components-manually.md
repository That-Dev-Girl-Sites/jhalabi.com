---
layout: post
title: "Hybris: Create components manually"
date: "2013-07-09"
categories:
  - development
---

I have spent a large part of this year working in a system called Hybris, which is a Java-based e-commerce platform.  The Hybris back-end seems to be very robust and includes a decent amount of documentation.  The Hybris front-end also seems to be very robust - but it is not the most user-friendly thing on the planet and includes very little documentation.

This made me sad.  To be fair, the folks at Hybris are seriously stepping up and working more on the front-end UI and documentation, but, for right now, we are not quite there yet.

One of the big features of Hybris is its use of IMPEX files to add content slots and components _(or, content that is added to content slots)_ to all of the different pages of your website.  IMPEX files are basically files that contain pared down and somewhat weirdly-formatted SQL statements that insert information about components and content slots into the content catalog database.  Users _(i.e. site administrators)_ can always add content using the UI in the CMS cockpit.  The IMPEX files are really just used to define a base set of content for the site that is rolled out on site launch.

Clearly, this is a very powerful part of a UX developer's experience in Hybris.  Sadly, it is not very well documented _(at least, as of right now)_.  So, I wrote documentation.  It is linked below in PDF form _(because it is 10+ pages long)_.  Having these notes have helped me learn more about how to deal with IMPEX files and Hybris.  My hope is that it will help other UX developers too.  Enjoy _(and good luck)_!

__Documentation:__ [Hybris - Create components via IMPEX files](/blog/docs/Hybris-Create-components-via-IMPEX-files.pdf)
