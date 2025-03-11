---
layout: post
title: "WordPress image permalinks: Not the cat's meow"
date: 2025-03-10
tags:
  - blog
  - wordpress
excerpt: WordPress media files are automatically given permalinks that may mess with sites URLs. Here is how I dealt with that.
---

I am in the middle of a big project at work and decided to create a new section of our site for it. I can't talk about the project (yet!), but let's pretend it is about cats _(the animal, not the musical)_.  I want its URL to be short and simple, so I decided to call it `mysite.org/cats`. 

I created the main landing page, clicked "Publish", and went to my new URL: `mysite.org/cats-2`

Well, that is not what I wanted. What is `cats-2` all about?

I was fairly confident `mysite.org/cats` did not already exist, and to prove it, I went there. And there I went, straight through a redirect that took me to `mysite.org/wp-content/uploads/sites/584/2018/12/cats.jpg`.

![A white cat with blue eyes leans over a brown and black spotted furry ledge and looks off into the distance, possibly contemplating the meaning of life.](/assets/images/posts/cats.jpg){width="75%"}

Awww..! What a cutie.. I mean, how did I end up here?!


## How can I fix this?

I inherited this site and recently did a massive page clean up. Because of that reorganization project, I know this site inside and out. I would swear on my mother's cat[^1] that this photo is not used on any pages. Additionally, I theorized that if I remove the photo, that would also automatically remove the redirect, thereby freeing up `mysite.org/cats` for my project.  But, I needed to prove that _before_ removing the photo, just in case.

There are plugins that are built to clean up and organize the media library. This article is not about any of those plugins. I have tested none of them.

Instead, I discovered this neat trick[^2] in the WordPress list of posts page in the admin. We have all seen the search box above the list of posts, that will let you search for a page by keyword.

![A text box with a button labelled Search Pages next to it, creating a small search form. This form is directly above a set of pagination buttons for the list of posts page](/assets/images/posts/search-pages.jpg){width="75%}

But, **did you know** you can also use that form to search for images inside a post? It's simple:

1. Type (or paste) the file name of the image you are searching for; e.g. "cats.jpg".
1. Press the "search" button.

That's it! If that search yields results, that image is being used. If the search yields _no results_, your image is not being used.

### Important caveat!

This search will _(obviously)_ only search a single post type. You will need to individually search for your image on the list of post pages for posts, pages, and any other custom post types that are defined on your site.

The good news is that the number of post types on your site is likely a small number. 

## My results

In my case, `cats.jpg` was not being used on any of my pages or posts, so I could safely remove the image. Also, my original theory was correct. Removing the image also removed the redirect. I edited the permalink to my landing page, changing it from `cats-2` to `cats`. After saving my page, my URL was as it should be: `mysite.org/cats`. 


## What if I needed this photo?

Every file in the media library is automatically given its own slug, which by default is simply the name of the file (minus extension). That slug is used for the file's permalink, but it can also be edited.

1. Find the file in question in the media library and click on it. It will open in a large pop up.
1. At the very bottom of that pop-up, click on the "Edit more details link. This will open the file in its own page.
1. At the top of this page, you will see the file's permalink, but no way to edit it. The option to edit the permalink is hidden away under "Screen options".
1. Open "Screen options" (at the very top of the page). Under "Screen elements" make sure "Slug" has a checkmark next to it.
1. Scroll down to almost the bottom of the page. You will now see a section labeled "Slug", with the file slug in an editable text field. Change the slug to whatever you want. (This will not change the file name, so links to the file are safe.)
1. Scroll back up to the top of the page and click "Update" to save your changes.

That's it!

This foray into WordPress media and permalinks has been brought to you by my stubbornness over a URL. May it be as interesting for you as it was for me.



[^1]: Plot twist. My mother does not now, nor has she ever owned a cat. But I was still really, really sure.
[^2]: This article is also not one of those "one weird trick" click-bait articles that were _everywhere_ once upon a time. Or, at least, it's not trying to be.