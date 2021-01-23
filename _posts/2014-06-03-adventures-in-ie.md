---
layout: post
title: "Adventures in IE: A story of Javascript dependencies"
date: "2014-06-03"
categories:
  - development
  - javascript
---

I have never really been one for developing in IE. To be honest, I usually exclusively develop using Chrome and save my cross-browser testing for the end of the project. This is very likely a debatable practice, and I may write a blog article about that in the future, but that is not why I am writing now.

I just came across the weirdest IE bug I think I have every seen.

## Background

I have been working on a Backbone / Marionette web application for a client that utilizes Mockjax (for now) to simulate my REST calls to the backend service and Require to load all of my JS dependencies.  Mockjax obviously deals with JSON objects and therefore needs to stringify them, namely in its parse function.

All of this works in Chrome.  It works in Firefox.  However, IE?  JSON is undefined.

## Troubleshooting

At first I thought that I was having a load issue in IE and that I needed to be more specific about dependencies in my Require file.  I thought I was being fairly complete, but hey, you never know.  After experimenting with my Require file, I hit up Google and discovered this:

{% highlight html %}
<meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
{% endhighlight %}

I added it to the top of my HTML file and voila!  Problem solved.

## Yay!... but what is this?

I had really never heard of X-UA-Compatible before today.  It is great that it solved my problem, but what on earth is it?  I consulted Google again and learned that this meta tag allows developers to specify in what version of IE a web page should be rendered.  Basically, it allows users to upgrade their browsers and developers to not necessarily upgrade their websites (i.e. to use modern standards that more recent versions of IE now – finally – support).  Ok, that is the mildly cynical definition of this tag, but even still, it is a pretty neat trick.

Setting this meta tag’s content to “IE=EDGE” tells IE to render the version using the highest version of the browser available to it.  So, a user who has IE 8 installed will always render my page using the IE 8 engine.  IE 9 will always render my page using the IE 9 engine.  And so on.

## Good to know… so why do I need this tag?

My team and I have been specifically developing our application to be standards compliant.  That is actually one of the primary directives of this project.  Therefore, I want IE to render my page using the most recent engine available to it.  And I am testing on IE 11.

My current theory is that IE by default prioritizes its compatibility mode over using the most recent engine available to it.  I have no idea why.  However, setting this tag to IE=EDGE overrides IE’s compatibility mode and forces it to always use the most recent engine.  In my case, IE 11, which supports JSON.  (Engines below IE 8 do not support JSON, which, in compatibility mode appears to be my issue.  At least, that is the working theory.)

## More info about this tag

[http://webdesign.about.com/od/metataglibraries/p/x-ua-compatible-meta-tag.htm](http://webdesign.about.com/od/metataglibraries/p/x-ua-compatible-meta-tag.htm)
