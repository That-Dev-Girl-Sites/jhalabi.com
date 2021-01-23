---
layout: post
title: "The Case of the Disappearing Gutenberg"
date: "2020-06-20"
categories:
  - development
  - tech-tips
  - wordpress
---

Once upon a time, there was a WordPress post editor that discovered it had turned into a simple HTML editor....

(Apologies to Anne Tyler's _Back When We Were Grownups_.) But in all seriousness, has this happened to you?

I ask because this just happened to me. Twice. I logged into WordPress to add a new page and discovered that the Gutenberg editor was gone. No, I did not accidentally install the Classic Editor plugin. Gutenberg simply disappeared. The block library icon was there, but not clickable. The editor had been replaced with a text-only HTML editor.

<figure>
  <img src="{{ site.url }}/assets/images/posts/no-gutenberg.jpg" alt="WordPress editor, which includes the 'Add Title' field, followed by a text-only field with a placeholder saying 'Start writing with text or HTML'">
  <figcaption>What happened to Gutenberg?</figcaption>
</figure>

## Did I break Gutenberg?

My first thought was that _something_ must be going on with one of my plugins, so I disabled all custom and contributed plugins. Still no Gutenberg.

Could it be my theme? I activated the core TwentyTwenty theme, instead of my custom theme. Nope. Still no Gutenberg.

## Umm... is core broken?

At this point, the issue was obviously not with any of my custom code or something I installed. Let's see if core is throwing any errors. I did not see any errors in my browser's developer console, but my PHP error log was throwing errors about not being able to allocate memory.

I checked my `php.ini` file. I already set my memory limit to 128MB, which is the maximum recommended limit, but just for kicks, I upped it to 512MB.

Still no Gutenberg. And, adding insult to injury, I was _still_ seeing memory allocation errors in my PHP logs. This memory limit issue was already ludicrous, so I concluded that this was unlikely to be the culprit of my Gutenberg issue. This was another issue for another day.

## Help me, Obi-Wan Google. You're my only hope.

I turned to the Google and found a number of [support requests](https://wordpress.org/support/topic/block-editor-no-longer-working-only-shows-html/), [issues](https://github.com/WordPress/gutenberg/issues/12760), and [questions](https://wordpress.stackexchange.com/questions/126110/visual-editor-missing-server-side-problem-how-would-you-debug-it). Many of these suggested troubleshooting techniques that I had already tried, but there were also some new ideas here.

I resaved my permalinks, which was admittedly a non-sensical longshot. Still no Gutenberg.

I cleared my browser cache and cookies. Still no Gutenberg.

I switched browsers. (I had been working in Google Chrome.) Still no Gutenberg.

## The (infuriating) eureka moment.

I finally came across a [support topic that suggested the solution](https://wordpress.org/support/topic/block-editor-no-longer-working-only-shows-html/page/3/#post-11093164), though it presented itself as a total longshot.

So, what was this solution? **Make sure your WordPress user profile has a nickname.**

<figure>
  <img src="{{ site.url }}/assets/images/posts/profile-with-nickname.jpg" alt="WordPress admin user screen, with the username, first name, last name, and nickname fields. The username and nickname fields are filled out.">
  <figcaption>Make sure your WordPress user has a nickname. It is apparently important.</figcaption>
</figure>

The user nickname is a required field, but, somehow when I created my account, the nickname did not get set. Apparently, being logged in as a user with no nickname causes issues, like **Gutenberg not f$#@$-ing loading**.

So, remember folks, make sure your WordPress user account has a nickname. Otherwise, WordPress will get angry. You don't want to make WordPress angry.
