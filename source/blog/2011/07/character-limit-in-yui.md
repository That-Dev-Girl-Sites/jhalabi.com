---
layout: post
title: Adding a character limit to a text area using YUI
date: 2011-07-29
tags:
  - blog
  - development
excerpt: In the UI world, it is a good idea to let the users know about any constraints they have on any form fields. 
---

In the UI world, it is a good idea to let the users know about any constraints they have on any form fields.  We all know this.  There are a million ways to do this –- through error messages, help text, and so on.  For character limits on input fields, the best way to avoid a user error is to limit the number of characters the user can physically type in the field.

This is super easy for input boxes.  Simply add the _maxlength_ attribute to the input HTML filed and _voila_!

However, text area fields are a bit trickier.  Character limits are not built into text area fields just yet as they are with input fields, so it is necessary to have a JavaScript implementation if you need to limit the text prior to submitting a form.

So… I decided to write one.  I sort of ran away with this example, mostly because there are so many things to consider from a user perspective.  If someone is entering in a longer piece of text – for example, an e-mail to a customer service department or a review on a product – is it really better to just cut them off from entering more text before they have finished their thought?  True, the user will not be able to submit the form until their giant essay has been tamed to fit within the character constraints.  From a programmatic perspective, it is better to simply cut the user off.  This ensures a successful form submission.

On the other hand, there are some people _(like me)_ who would much rather finish their thought, and then go back and edit the text down to size.  In this case, it is much more useful to have an _(obvious)_ indicator of how long the entered text is, so that the user knows how much needs to be cut.

Long story short _(I know… too late)_, I decided to create a proof of concept for limiting character limits that contains options for both scenarios above.

## Step 1: Create a web page.

First, I created a very simple page with 3 elements:

1. A text area input field.
2. A message letting the user know how many characters they have typed and how many characters they are allowed.
3. A check box to determine whether or not the text box will allow the user to continue to enter text once they have reached the character limit.

## Step 2: Write the JavaScript.

The JavaScript part of this POC contains 3 major functions:

### Function to update the text area alert

This function is called as soon as the page loads and then each time a key is pressed _(on the keyup event)_ to update the number of characters used in the character limit message to the user.  Also, if the user has entered more characters than allowed by the limit, the truncate text area function is called.

```javascript
function updateTextAreaAlert() {
  var text = Dom.get("yui-textarea").value;
  var charsUsed = text.length || 0;

  if (charsUsed >= textLimit) {
    Dom.addClass("yui-textarea-chars", "over-limit");
    truncateTextArea();
  }
  else if (charsUsed >= textLimit * 0.9) {
    Dom.addClass("yui-textarea-chars", "near-limit");
  }
  else {
    Dom.removeClass("yui-textarea-chars", "near-limit");
    Dom.removeClass("yui-textarea-chars", "over-limit");
  }

  Dom.get("yui-textarea-chars").innerHTML = charsUsed;
}
```

### Function to check the text area limit.

This function checks to see if the value of the text area field is longer than the set character limit.  If so, the function to truncate the text area’s contents is called.  This function is called each time a key is pressed on the key down event.  This is to avoid issues with the text “jumping” – the text area contents are actually updated after the key down event is called – so we call this function on key down so that we have a chance to suppress the content update if the user is over the character limit.

```javascript
function checkTextAreaLimit(e) {
  var text = Dom.get("yui-textarea").value;

  // Check to see if a delete key was pressed; backspace is 8; delete is 46.
   var key = (window.event) ? e.which: e.keyCode;
   var pressedDel = (key == 8 || key == 46) ? true : false;

  if (!allowOverLimit() && text.length >= textLimit && !pressedDel) {
    Event.preventDefault(e);
     truncateTextArea();
   }
}
```

### Function to truncate the contents of the text area.

This function truncates the text in the text area field if the user is over the character limit.  This function is called by the two functions listed above.

```javascript
function truncateTextArea() {
  var text = Dom.get("yui-textarea").value;

  if (!allowOverLimit()) {
     Dom.get("yui-textarea").value = Dom.get("yui-textarea").value.substring(0, textLimit);
     Dom.get("yui-textarea-chars").innerHTML = Dom.get("yui-textarea").value.length;
  }
}
```
