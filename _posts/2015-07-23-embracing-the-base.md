---
layout: post
title: "Embracing the base: A little advice that developers might find surprising"
date: "2015-07-23"
categories:
  - development
---

A few weeks ago, I spent some time interacting with candidates for a development job and peppering them with questions at a recruiting event. One candidate who had just started to learn to code finally asked me a question, which isn’t exactly common.

“If you were to hire me, what is the one thing I should definitely learn?” he asked. It’s a question that’s actually broadly relevant to any developer entering the job market.

As a development manager, I meet new developers all the time, and I am usually the one who asks them a whole round of questions: What programming languages do you know? What are your current projects? Is there anything new you’re learning?

It was refreshing to hear such a straightforward question from a job candidate, so I gave him an equally straightforward answer: Start with the basics. Learn Javascript without using any libraries.

He was surprised. And this surprised me.

Every other recruiter in the room told him to start with [jQuery](http://jquery.com/). Or [Angular](https://angularjs.org/). Or [Node](https://nodejs.org/). Or [Ember](https://emberjs.com/). All of these are libraries or frameworks that extend Javascript to make development easier and give web applications a structure. I was the first person suggest starting with nothing.

It’s true that Javascript developers no longer write in plain old Javascript. Almost all apps and websites use some sort of library framework — from the ones suggested to my new developer friend to many others.

jQuery is a popular example. It was first [released in 2006](https://jquery.org/history/) and is now used in about [64 percent of all websites](https://w3techs.com/technologies/details/js-jquery). jQuery has become so synonymous with Javascript and front-end development that a good number of resumes now list jQuery as a technical skill in place of Javascript.

There is no doubt that these libraries — including jQuery, Prototype, or YUI — make Javascript development a much easier task today. We can now more easily select elements, create click events, make AJAX calls, and so forth.

But is this such a good thing? Yes and no..

Although more complex web applications might be suited for something like jQuery, what about sites that require just a little bit of Javascript for key pieces of functionality? Is jQuery or another library really the right choice? Or, can the same functionality be accomplished with [vanilla Javascript](http://plainjs.com/)?

It’s true that vanilla Javascript is not as sexy as jQuery. For example:

```javascript
document.querySelectorAll(‘div.foo’) // native JS
```

is not nearly as slick looking as:

```javascript
$(‘div.foo’) // jQuery equivalent
```

The web community is finally discussing how [bloated](https://zurb.com/blog/hit-the-weights-and-take-the-bloat-out-of) [jQuery](https://www.sitepoint.com/do-you-really-need-jquery/) and other [frameworks](https://bitworking.org/news/2014/05/zero_framework_manifesto/) are. So much so that, for jQuery users, Paul Irish released [bling.js](https://gist.github.com/paulirish/12fb951a8b893a454b32) last month, which is a quick 15 lines of Javascript that provides “the $ of jQuery without the jQuery”.

The trend to learn libraries first — or only libraries — puts these new developers on an unsustainable path. All Javascript libraries and frameworks are obviously based in Javascript. But a beginner is not learning vanilla Javascript when they dive into one or more of these libraries. Sure, learning Javascript this way will demonstrate how to write a conditional or a loop. It will demonstrate how to declare variables and to write and call functions. But it will not demonstrate why the code works the way it does.

If you are a new developer, learn the basics of Javascript — or any other new language — and learn about its libraries and frameworks. You need all of this knowledge. Knowing the frameworks will get you a job today, but having a solid understanding of Javascript as a base language will let you keep your job tomorrow. New frameworks are introduced to our community all the time, and while one may be the “hot” framework that everyone wants right now, that will probably not be true five or even two years from now.

The most important skill you can acquire is the the ability to know how today’s frameworks work under the hood, so that you can more quickly learn the frameworks of tomorrow.
