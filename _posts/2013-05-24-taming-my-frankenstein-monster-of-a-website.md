---
layout: post
title: "Taming my Frankenstein monster of a website"
date: "2013-05-24"
redirect_from: "/blog/taming-my-frankenstein-monster-of-a-website"
categories:
  - development
  - wordpress
---

It was a disaster. My website, that is. I started my site with good intentions. All I wanted was a simple site with some basic information about me. Maybe my resume, too. After all, any serious web developer needs a website. So, I created my simple, static website and published it using Fastmail's file services. I was already using [Fastmail](https://www.fastmail.com/) for my e-mail and using a single service for my online needs was completely logical at the time.

## Then things got complicated...

Later on, I decided that I wanted to publish my photos to my website.  I love taking pictures and have a ton of digital photos dating back to the days when I used film and a scanner.  I started out using a home-grown photo gallery, but that was quickly becoming a pain to maintain.  Fastmail does not offer any advanced server support, so adding a more dynamic photo gallery on their servers was out of the question.

Then, I discovered a miracle feature in Fastmail... the photo gallery.  I don’t remember the year I made this discovery, but it had to have been around 2005 or 2006.  I loved it – all I needed to do was upload my photos to a folder and… bam!  Instant photo gallery.  Upload a CSS file to that folder and suddenly my photo album had the same UI as the rest of my website.  Easy solution with no need to migrate my website.

And then, I decided I wanted a blog. Why? Because blogging is cool. Everyone is doing it and I wanted in. So, I started a blog on LiveJournal (remember that?) and eventually migrated it to WordPress.  I wanted to link my website and my blog together, but that seemed to be easier said than done.  I cannot install WordPress on Fastmail's servers and migrating my photo gallery, which at that point had become quite extensive, into a WordPress install would have taken a significant amount of effort.

Long story short, I took one look at my website analytics _(thank you Google)_ and decided that integrating the two sites was not worth the effort at the time.  I experimented with different themes in WordPress to try to get it to match my main website, but it never felt quite right.

## Oh my goodness... what am I doing here?

I was not happy with the Frankenstein-esque nature that my website has now taken.  My static pages lived at www.jhalabi.com, which I considered to be my core site.  My photo gallery, which granted, was on the same server as my core site, had to live under its own sub-domain for the gallery to work properly.  My blog lived on WordPress.com.

How did I get here?  Two words.  Scope creep.

Those dreaded words are the bane of all web developers’ professional lives.  We have to mitigate this with our clients all the time.  I have zero explanation as to how I let myself to do this.

## I need a solution... stat!

Finally, after years of allowing my monster website to live on, I decided that this was the year to make things right.  I wanted one website on one host using one platform.

Choosing a platform was the easy part.  Granted, there are a lot of platforms out there.  I had worked with WordPress and Drupal before.  Joomla is a popular choice too.  Plus there are a whole slew of smaller CMS platforms out there.  (Perch looks like a cute one – and not just because of the birdie on their website. Well, maybe a little because of that.)

I chose WordPress because it felt right for me.  It is open source, easy to use, and built on PHP (which is my comfort zone).

## Building this puppy… and making it responsive.

I liked the design of my existing core website _(where my core pages live)_.  In addition, my existing website was responsive, so I wanted my upgraded website to be responsive too.

This made migrating my CSS from my old site to my new WordPress theme relatively painless.  Yes, I did need to edit the CSS quite a bit to work with the DOM in the WordPress templates, but overall, this was not a bad process at all.

My static pages from the old site became pages in the WordPress site.  I was able to export my blog posts from WordPress.com into my new site easily too.  (There is a great [blog post with instructions](https://problogger.com/how-to-move-from-wordpresscom-to-wordpressorg/).)

The tricky part was my photo gallery.  Photo galleries are not exactly out-of-the-box functionality in WordPress.  After some trial and error with a couple of different plugins, I found the perfect one for my needs – [NextGen Gallery](http://wordpress.org/plugins/nextgen-gallery/).  NextGen gives me a separate area in the WP admin where I can upload photos and organize them into galleries and albums – a paradigm I was using on my existing site.  Photos are placed into galleries and galleries are organized into albums.  This allowed me to organize all of my galleries into albums by year.  Perfect!  And crazy easy to use.

Finally, web hosting.  After a 10-ish year relationship with Fastmail being my web host, I had to finally admit to myself that I outgrew it.  Fastmail is a fantastic host for simple, static website, but sadly, it is not even possible for WordPress.

Fortunately, I discovered that GoDaddy offers free web hosting for customers who registered their domains with them.  And guess where I registered jhalabi.com… GoDaddy!  GoDaddy’s free service has a wizard that can be used to install WordPress, but that was completely broken for me.  I just uploaded the WP download to my server space and manually installed the platform.  After that, I uploaded my theme directory, imported my database and my website was live!

## Final thoughts.

The analytics on my website really did not justify the need for me to re-platform my website like this, but I got to a point where I no longer cared.  That crazy monster website had been bothering me for way too long and it was definitely time for a change. And I feel so much better for it.

I am still on the fence about GoDaddy as a web host.  Administering my website is a snap there, but the server speeds vary a lot.  I am not sure if this is because I am using a free account here.  I have been considering upgrading to a paid account, but need more information to make sure it will help with the speed issues before I spend any money on it.  (Advice appreciated here!)

I am definitely a fan of WordPress and a definitely a fan of NextGen.  Seriously – that plugin saved me a lot of heartache.  Is it right for you?  Maybe!  I cannot tell you that.  This post is really a summary of my own experiences with re-platforming my website.  However keep in mind that all of the decisions I made here were right for me.  What is right for me and right for you may be two different things.

That being said, check out NextGen.  Oh yeah, and the rest of my website.  Because it is seriously awesome now.
