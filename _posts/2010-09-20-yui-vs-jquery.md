---
layout: post
title: "YUI vs. jQuery"
date: "2010-09-20"
redirect_from: "/blog/yui-vs-jquery"
categories:
  - development
excerpt: Ever since I started my consulting gig, I have been learning so many new technologies.
---

Ever since I started my consulting gig, I have been learning so many new _(or, rather, new to me)_ technologies.  Most of my learning experiences have centered around JavaScript libraries –- namely jQuery and YUI.  In light of the fact that I’ve only been consulting for about 9 months now, I’m going to preface this entire post with the fact that I definitely do not consider myself an expert in either of these libraries.

That being said, it really boggles the mind (or, at least my mind) that YUI requires so much more complexity than jQuery does.  I mean, sure, YUI has neat features like data tables.  (I am sure jQuery does too, but I have not found it just yet.) However, it seems to be a struggle to even perform basic functions in YUI.

Inexperience?  Maybe.  Frustrating?  Oh yes.  This has actually been bothering me since I started learning YUI.

For example, take a look at DOM selectors in both.  In jQuery, you can use the same syntax to select parts of the DOM by ID, class name, or tag.  You can even nest all of these things easily.  YUI definitely prefers all selection to be done by tag, though there are functions to get an array of elements by class name or tag, and nesting these things is not trivial.

As an exercise for a project at work, I created an example to illustrate my point regarding DOM selection between YUI and jQuery.  The example is simple – all it does is replace the text in a paragraph tag when a link is clicked.   The example DOM is minimal:

```html
<div id="block" class="container-block">
  <h2>YUI Example</h2>
  <p>This is my original text.</p>
  <a href="<a>#</a>">Click here to change the text above.</a>
</div>
```

I implemented the solution in both jQuery and YUI.

Here is my jQuery implementation:

```html
<script src="/js/jQuery.min.js"></script>

<script type="text/javascript">
  $("#jQuery-block a").click(function(e) {
  e.preventDefault();
       $("#jQuery-block p").html("This text was updated via jQuery.");
  });
</script>
```

And here is my YUI implementation:

```html
<script src="/yui/yahoo-min.js"></script>
<script src="/yui/dom-min.js"></script>
<script src="/yui/event-min.js" ></script>

<script type="text/javascript">
  var block = YAHOO.util.Dom.get("yui-block");
  var para = block.getElementsByTagName("p");
  var link = block.getElementsByTagName("a");

  if (link) {
    YAHOO.util.Event.addListener(link, "click", function(e) {
    YAHOO.util.Event.preventDefault(e);
      if (para) { para[0].innerHTML = "This text was updated via YUI."; }
    });
  }
</script>
```

In both cases, I am grabbing the base libraries required for what I need to do here.  YUI requires 3 server calls for 3 different library files, but the 1 library file for jQuery is almost twice as large than the sum of the YUI files.  (The jQuery file is 24.1KB, whereas the sum of the 3 YUI files is 13.5KB.) So, I am going to call that a wash.

However, my real issue with YUI is that I need to declare 3 variables and include an if statement to update this text, whereas with jQuery, I can accomplish the same task in 1 line.  (I’m not counting the prevent default commands for either case here, since the 2 are basically equivalent.)

This has been my biggest pet peeve about YUI.  Again, I am not sure if it is due to inexperience, but the more I look at the YUI documentation, the more I think it is not me.
