---
layout: home
title: Home
---

My name is Joni and I am a **web developer**. And a **mother**. And an aspiring #kitlit **writer**. And a **runner**. And a **music** lover. And an occasional **ukulele** student. And an eclectic **reader**. And an overzealous **baker**. And a ridiculously slow **knitter**.

But, this site is mostly about my development life and _(as of late)_ writing life.


<section markdown="1" class="has-background copper" aria-label="News">

## Latest News

I am writing a book! I know, cue the "Seriously?" and "Is this a nerd book" imposter-syndrome-style responses. I am just as surprised as you are. But it's true! Check it out in my "coming out" [#amWriting](/blog/am-writing) post and stay tuned to my blog for news about my self-publishing journey.

<a href="/blog/writing" class="button">Articles about writing</a>

</section>


<section markdown="1" class="has-background timberwolf" aria-label="Latest blog post">
{% assign post = site.posts.first %}

## Latest Article

<div markdown="1" class="latest-post">
### [{{post.title}}]({{ post.url }})

<p class="date">{{ post.date | date_to_long_string }}</p>

<p class="excerpt">{{ post.content | strip_html | truncatewords:50, '…' }}</p>

<a href="{{ post.url }}" class="button" aria-label="Read more about {{ post.title }}">Read more...</a>
</div>
</section>
