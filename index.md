---
layout: home
title: Home
---

<section markdown="1" class="book-section has-background green remove-top-margin" aria-label="Book">

## Sweet Little You

<div markdown="1" class="book-section-cover">

[![Book cover of Sweet Little You featuring a mom and baby flying in a paper airplane](/assets/images/sweet-little-you-cover.jpg)](/book)

</div>

<div markdown="1" class="book-section-text">

A mother with a dream of having a child makes her wish come true by having a baby on her own. Tenderly written with beautiful painterly illustrations by [Lisa Wee](https://www.lisawee12.com/), _Sweet Little You_ is a loving and unique story about a different path to becoming a family, showing that creating a cherished family doesn’t always involve two parents.

A heartwarming story for single mothers by choice and their families.

*Sweet Little You* is available now wherever books are sold. Order your copy today!

</div>

<div class="book-section-buttons" markdown="1">

[Order on Amazon](https://www.amazon.com/Sweet-Little-You-Joni-Halabi/dp/057839216X/) [View on GoodReads](https://www.goodreads.com/book/show/61153715-sweet-little-you) [More about _Sweet Little You_](/book)

</div>

</section>


{% include newsletter-signup.html home=true %}


<section markdown="1" aria-label="Articles">

## Latest News

{% for post in site.posts limit:5 %}

<article markdown="1" class="latest-post {{post.categories.first}}" aria-label="{{post.title}}">

### [{{post.title}}]({{ post.url }})

<p class="excerpt">{{ post.content | replace:'<sup>1</sup>', '' | strip_html | truncatewords:35, '…' }}</p>

<p class="latest-post-meta">
  {% for cat in post.categories %}
    <span>{{ cat | replace: "-", " " }}</span>
  {% endfor %}
  |
  {{ post.date | date_to_long_string }}
</p>

</article>

{% endfor %}

</section>


<section markdown="1" class="has-background timberwolf" aria-label="Biography">

## About Joni

![My daughter and me](/assets/images/family.jpg)

My name is **Joni** and I am a **"middle-end" web developer** who loves to write code, commit often, and make up her own job titles. I work for Georgetown University and have been writing code since the mid-1980s. I was 2. _(Kidding. Mostly. I know I'm dating myself. Shush.)_

I have developed in all sorts of languages, but I work a lot in WordPress these says, so I spend a lot of time with **JavaScript** and **PHP**. Click around this site for more information about [my work](/work) and [me speaking about my work](/speaking).

### Cool! What else?

I am a single by choice mother to an **amazing pre-schooler** who constantly keeps me on my toes. She and her collection of stuffed animals are going to take over the world.

**I have hobbies.** Stop laughing. I'm serious. I both run and bake, because life is all about balance. I love live music and try to get as many shows as time and babysitters allow. I pretend to knit, by which I mean that I have been working on the same shawl for about 5 years now. I am also learning to play the ukulele, but only when my daughter can't hear me. My skills are not quite up to her standards _(yet?)_. Just wait until I take up the bongos.

**I love to travel.** I have been lucky enough to visit parts of Europe and the Middle East. I have road tripped across a good chunk of the western US and day-hiked in Alaska. I have camped at the Falcon Ridge Folk Festival and the RPI hockey line. _(Camping for college hockey tickets is like real camping, right?)_

**I love books!** I love to read and have books in just about every room of my house. Unfortunately, my reading has dwindled post-baby, but I do [keep track of what I read](/book/reading/), in case you all are interested.

</section>
