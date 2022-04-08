---
layout: post
title: "Backbone: No more hash tags!"
date: "2014-12-18"
categories:
  - development
---

Is one of your Backbone.js pet-peeves the fact that all of your routes have to start with a hash tag? It was mine!

The other day, it finally became a problem when I had to integrate my Backbone app inside of a larger application… one that is not hash tag friendly. (The story behind this integration is a much longer one.)

I thought I would have to write something custom… and then I discovered Backbone History’s “root” parameter. It took me quite a while to find documentation on it (oddly), but this definitely fixed my issue.  Here is how:

## 1. You do not have to change your router.

You can use the standard Backbone router:

{% highlight javascript %}
var myRouter = Backbone.Router.extend({
  routes: {
    "page-one": "openPageOne"
  }
});
{% endhighlight %}

## 2. Update the instantiation of your Backbone History.

You do have to add a couple of parameters to your Backbone History start in order for this to work.  The first is, of course, the _root_ parameter.  This parameter defines the root path to your Backbone application.  This is normally set to “/”; however, in my experience, you will want to change it to something else (i.e. “/myapp/”).  I am not sure why, but leaving it set to its default was not working for me.

Also (and this bit is important!), make sure that you do not include your domain in the route.

The other parameter you need to add is the _pushState_ parameter.  This parameter needs to be set to _true_.

{% highlight javascript %}
Backbone.history.start({pushState: true, root: '/myapp/'});
{% endhighlight %}

## 3. Test!

The URL of your page (in this example) should be: [DOMAIN]/myapp/page-one
