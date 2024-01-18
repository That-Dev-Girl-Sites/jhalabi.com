---
layout: post
title: "YUI 3 in a YUI 2 world"
date: "2011-05-24"
redirect_from: "/blog/yui-3-in-a-yui-2-world"
categories:
  - development
---

I know what you are probably thinking.  You want to use YUI 3 inside YUI 2?  Really?  Why not just upgrade to YUI 3 altogether?

The question actually came up in one of my more recent projects, with a client who has been using YUI 2.7 for years now.  Would they like to make the leap to YUI 3?  Probably.  Do they have the time, resources, etc. to actually upgrade their (massive) site to YUI 3?  Not so much.

YUI 3, for those of you who have not yet checked it out, is a completely re-written library, and, so far, seems to be much slicker and more JQuery-esque than its predecessor.

YUI 3 still is not quite complete – at least, in terms of additional widgets.  The core library launched in September 2009, and the widgets available in YUI 2 have been in the process of being rewritten for and released into YUI 3.  This process is still ongoing as far as I can tell, but YUI 3 is clever enough to be able to incorporate YUI 2 libraries into its framework.

However, some of the YUI 3 versions of these widgets are much improved over their YUI 2 counterparts.  So, for my client, the question came up: __Can a YUI 3 widget get along with a core YUI 2 environment?__

Long story short: I conducted a successful experiment using the YUI 3 Drag / Drop library inside a page that is otherwise using YUI 2.7.0 to create a pop-up dialog where users can reorder a group of content blocks by dragging 1 or more blocks to the desired location.

You can check out the full version of this [proof of concept on GitHub](https://github.com/thatdevgirl/color-sequencing).  There is also a short explanation of the basics below:

## Step 1: Creating the dialog.

The code to create a dialog is basic YUI 2 code:

```javascript
openDialog: function() {
  if (COLORWAY.test.dialog == null) {
    COLORWAY.test.dialog = new YAHOO.widget.Dialog("colorway-dialog-box", {
      ... attributes go here ...
    });

    COLORWAY.test.dialog.setHeader("Reorder Color Sequence");
    COLORWAY.test.dialog.render("document.body");
  }

  COLORWAY.test.dialog.show();
}
```

## Step 2: Selecting elements.

As I mentioned earlier, this proof of concept was created to test dragging and dropping 1 element or multiple elements, therefore we need a way to determine whether or not the user is trying to select more than one element.  I opted for the user to hold the shift key down while selecting more than 1 element; however you can really use whatever key you want.  Just make sure to tell the user what to do!  _(I have instructions listed at the top of my dialog box.)_

My code is simple – and still using YUI 2.  If the user selects an element, add a “selected” class to that element.  If the user is pressing the shift key, do not remove the “selected” class from any other element that may be selected.  If the user is not pressing the shift key, unselect everything else.

```javascript
// If the shift key is not pressed, unselect all, then select that item.
if (!COLORWAY.test.shift) {
  var selected = Selector.query("div.selected", wrapper);
  for (var i=0; i<selected.length; i++) {
   Dom.removeClass(selected[i], "selected");
  }
  Dom.addClass(target, "selected");
}

// If the shift key is pressed and the item is selected, unselect it.
else if (Dom.hasClass(target, "selected")) {
  Dom.removeClass(target, "selected");
}

// If the shift key is pressed and the item is not selected, select it.
else {
    Dom.addClass(target, "selected");
}
```

## Step 3: Dragging element(s) to their new location.

Here comes the fun part – dragging and dropping the selected elements.  This entire step is the YUI 3 part of the experiment.  A couple of things need to happen in this step.

First, we need to set up the node that is being dragged.  This happens in the __Y.DD.DDM.on(‘drag:start’, function(e) {}__ event function.  Here, we change the dragged node’ style, change the style of all of the other selected nodes (if they exist) using the e.target.get; so, for example:

```javascript
e.target.get('dragNode').addClass('selected');

e.target.get('dragNode').setStyles({
    backgroundColor: e.target.get('node').getStyle('backgroundColor')
});
```

Next, we need to make sure we know which elements are being dropped into place, and determine if we are dropping 1 or multiple elements.  This is where the “selected” class comes in; all of this code is included in the __Y.DD.DDM.on(‘drop:over’, function(e) {}__ event function:

```javascript
// Add node(s) to this list.
var selected = Selector.query("#colorway-main-container div.selected");

if (selected.length > 1) {
  for (var i=0; i<selected.length; i++) {
    e.drop.get('node').get('parentNode').insertBefore(selected[i], drop);
  }
} else {
  e.drop.get('node').get('parentNode').insertBefore(drag, drop);
}
```

During the drag, all of the YUI 3 magic happens to animate the dragged node from its old location to a new location in the __Y.DD.DDM.on(‘drag:drag’, function(e) {}__ event function.  To be honest, I just copied the basic YUI 3 implementation into my code, but it worked exactly as I expected:

```javascript
Y.DD.DDM.on('drag:drag', function(e) {
  var y = e.target.lastXY[1];
  goingUp = (y < lastY) ? true : false;
  lastY = y;
  Y.DD.DDM.syncActiveShims(true);
});
```

Finally, once the node has been dragged to its final location, we reset the styles of the dragged node in the __Y.DD.DDM.on(‘drag:end’, function(e) {}__ event function, again using e.target.get.

Of course, there is a little more to the code than just this, but I’m not about to paste my entire source code into this post.  You can check out the completed [proof of concept on GitHub](https://github.com/thatdevgirl/color-sequencing).
