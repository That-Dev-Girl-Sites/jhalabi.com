---
layout: post
title: "Bold and strong are not the same thing"
date: "2017-07-10"
categories:
  - development
  - accessibility
---

Believe it or not, the &lt;b&gt;, &lt;i&gt;, &lt;strong&gt;, and &lt;em&gt; tags have all been a part of the HTML spec since nearly the beginning. All four of these tags were introduced in HTML 2. However, for a very long time, the community was focused on the &lt;b&gt; and &lt;i&gt; tags only. It is only recently that the &lt;strong&gt; and &lt;em&gt; tags have become “popular”.

Over time, the &lt;strong&gt; and &lt;em&gt; tags gained a reputation of being pretty much the same as the &lt;b&gt; and &lt;i&gt; tags. After all, the default browser behavior of &lt;strong&gt; and &lt;b&gt; are both the same, as is that of &lt;em&gt; and &lt;i&gt;.

Therefore, systems formed opinions on the matter. CMS editors will insert &lt;strong&gt; and &lt;em&gt; tags into your content when you click on the bold and italic button in the WYSIWYG editor. Some accessibility monitors even go so far as to say that &lt;strong&gt; and &lt;em&gt; are the “correct” tags to use in situations where you want to bold or italicize something. They say that &lt;b&gt; and &lt;i&gt; should never be used.

However, this is wrong. All four of these tags have different semantic meanings and can validly be used, depending on what you are trying to accomplish.

Let’s start with the &lt;strong&gt; and &lt;b&gt; tags. The &lt;strong&gt; tag should be used for phrases that you want to emphasize. For example:

```html
<p>I <strong>do not</strong> want to see a mess in my kitchen!</p>
```

In contrast, the &lt;b&gt; tag should be used for phrases that do not require emphasis, but should visually be bold. For example:

```html
<p>I like <b>cookies</b> and <b>cakes</b>, but not pies.</p>
```

There are similar differences between the &lt;em&gt; and &lt;i&gt; tags. The &lt;em&gt; tag should be used for phrases that you want to emphasize. For example:

```html
<p>I am <em>extremely</em> excited about the Superbowl.</p>
```

In contrast, the &lt;i&gt; tag should be used for phrases that do not require emphasis, but should be visually italicized. The &lt;i&gt; tag is often used when referencing book titles or foreign words. For example:

```html
<p>I think <i>Make Way For Ducklings</i> is a classic piece of literature that all children should read.</p>
```

In short, pay attention to your content.  How should it look?  How would it sound if you were to read it out loud? Should there be an emphasis on a particular word to drive your point?  The answers to these questions will guide which tag to use to support your content.  

---

References:

* [HTML tag history](http://www.martinrinehart.com/frontend-engineering/engineers/html/html-tag-history.html)
* [Semantic differences between &lt;b&gt;, &lt;strong&gt;, &lt;i&gt;, and &lt;em&gt;](http://html5doctor.com/i-b-em-strong-element/)
