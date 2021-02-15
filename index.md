---
layout: home
title: Home
---

My name is Joni and I am a **web developer**. And a **mother**. And a **runner**. And a **music** lover. And a **ukulele** student. And an eclectic **reader**. And an overzealous **baker**. And a ridiculously slow **knitter**.

But, this site is really only about those first two things.


<section markdown="1" class="has-background copper" aria-label="News">

## Latest News

After years of maintaining two different sites — personal and professional — I got tired of the overhead involved in splitting my online self in two.

So... welcome to my **new**, unified, simplified website! If you previously enjoyed `thatdevgirl.com`, all of that content is here _(particularly the [blog](/blog))_. My personal and professional blogs are now combined into a single "me!" blog.

</section>


<section markdown="1" class="has-background timberwolf" aria-label="Latest blog post">
{% assign post = site.posts.first %}

## Latest Post

<div markdown="1" class="latest-post">
### [{{post.title}}]({{ post.url }})

<p class="date">{{ post.date | date_to_long_string }}</p>

<p class="excerpt">{{ post.content | strip_html | truncatewords: 40, '…' }}</p>

<a href="{{ post.url }}" class="button" aria-label="Read more about {{ post.title }}">Read more...</a>
</div>
</section>
