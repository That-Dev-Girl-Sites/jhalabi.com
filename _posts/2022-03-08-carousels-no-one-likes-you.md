---
layout: post
title: "Carousels: No one likes you"
date: "2022-03-08"
redirect_from: "/blog/carousels-no-one-likes-you"
categories:
  - accessibility
  - user-experience
---

Oh carousels. The last time I wrote about carousels, it was 2017 _(seemingly a lifetime ago)_, when I shared a solution for fixing [keyboard navigation in carousels](/blog/keyboard-navigation-with-carousels).

I know carousels have not magically disappeared in the last 5 years, but they have come up yet again in (work) conversation. To make a _very_ long story short, we know we have clients who want carousels on their sites. They tend to be our bigger sites, so we made a decision: Carousels on our main sites only. And you only get one. On the home page. That's it. All you smaller sites: no carousels for you. You don't need them.

Now, guess who wants carousels? You guessed it. _Everyone._

_[insert exasperated sigh here]_

So, for all of you clients who want a carousel on your site, this post is for you.

## No one wants to see your f-ing carousel

I'm serious. The only person who wants a carousel on your site is you. That's it. It's a self-serving vanity project so that you can showcase all of your babies at the same time without telling the world which one is your favorite.

If you would like a succinct source telling you why carousels are awful, there is an entire website dedicated to [why you shouldn't use carousels](https://shouldiuseacarousel.com/).

There have been numerous studies of the efficacy of carousels over the years. All of them concluded that carousels are terrible.

### Carousels look like ads

From [That Big Sliding Banner? Yeah, It's Rubbish](http://beantin.se/sliding-banner-content-slider-carousel-rotator/), by James Royal-Lawson, carousels are distracting and confusing to the user. They look like ads, or at the very least, not relevant content, so they are ignored.

Do you want your carousel babies to look like annoying banner ads? I'm guessing no.

### No one interacts with carousels

From the study, [How effective are interactive carousels on websites in 2018 – The Stats](https://www.cheapwebdesign.co.uk/blog/how-effective-are-interactive-carousels-on-websites-in-2018-the-stats/), via Cheap Web Design, almost no one is clicking on the links inside carousels. This particular study showed that only 1% of users clicked on the feature and, of those users, an overwhelming majority - 84% - clicked on the first slide.

So, pretty much everyone is ignoring your carousel and those few who noticed it only see the first slide anyway.

### Carousels annoy people

From [Auto-Forwarding Carousels and Accordions Annoy Users and Reduce Visibility](https://www.nngroup.com/articles/auto-forwarding/) by Jakob Nielsen, carousels, particularly the ones that auto-rotate, are mostly just frustrating. Users will just move on from the rotator, especially if the rotator is advancing too fast for someone to read and digest all of its information.

Still want a carousel on your page? I'm not sure why, but consider this point:

## Carousels are terrible for accessibility

It is remarkably difficult to make a carousel accessible to everyone, even with all the semantic markup and ARIA attributes that exist. Here is just a quick list of all of the aspects you need to think about:

1. __Current slide position:__ How do you present which slide the user is currently on? For visual users, you can use bubbles or numbers. For non-visual users, you can announce the slide and its position as it is displayed on the screen.
2. __Slide controls:__ How does the user get from one slide to the next? Are there forward and back buttons? Where are they visually? Can you tab to one and then the other easily, if you are not a mouse user? Are these buttons announced if you are not a visual user? Also, for non-visual users, how will you know that these buttons exist in the first place?
3. __Handling auto-rotation:__ For starters, never, ever, ever auto-rotate anything. But, if you insist, is there a pause button? Is the pause button obvious? Is the pause button obvious for a non-visual user? How much time does a user get to read a single slide? Is the rotation speed too fast? Too fast means that your user may not have enough time to read the slide. Or interact with it. Or, they do interact with it but they accidentally go to another page because they clicked on the slide as it was rotating. Or the animation is so fast that even someone who is trying to ignore the carousel can't because it is way too distracting. Seriously, never auto-rotate. Ever.
4. __Reading the current slide:__ What is the on the current slide? Is it an image? If so, is that image described adequately for non-visual users? If you have an auto-rotator, is the new image announced to your non-visual users? Is that announcement annoying because the carousel is auto-rotating too fast and a new slide is announced to non-visual users every 10 seconds. _(Yet another reason to __never auto-rotate__.)_

That's just the list that I could think of while I am writing this post. There are almost certainly more considerations. If you get any of these things wrong, you'll likely lose your site visitor.

And, perhaps worse, if you suggest adding a carousel to your site, you'll likely get a resounding "no" from your developer. Your users are sick of looking at them. Your developers are sick of creating them.

## Some alternatives

If you're still with me here, I would like to suggest an easy alternative to adding a carousel to your page.

Are you ready?

__Think about the content on your page.__

Carousels are a desperate attempt to give the same level of importance to multiple pieces of content. If everything is important, nothing is important. So, think about what is actually important for your users to see. What would thrill you to see your users click on or read?

When you decide, make _that_ the focus of your page.

Your users _(and developers)_ will thank you.
