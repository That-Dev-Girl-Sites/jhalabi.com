---
layout: post
title: "Cleaner Gmail sent folder"
date: "2015-01-25"
redirect_from: "/blog/cleaner-gmail-sent-folder"
categories:
  - life
---

I just started a new job where all communication is managed via Google – e-mail, calendar, and chat.  This being my first intensive experience with Gmail, I quickly discovered that the sent folder will drive me crazy.

Let me explain: I am a huge advocate of the [inbox zero](http://mashable.com/2013/10/10/inbox-zero/).  I even take it so far to include my sent box.  If something I send out cannot be categorized into a folder, it does not belong in my e-mail.  This makes Gmail’s sent box particularly annoying.

Gmail’s sent box is not a label like inbox or any other label you create.  “Sent Mail” is actually a filter of all e-mails that have your e-mail address in the “From” field.  This means that, even if you add a label to a sent e-mail, it remains in the sent box.

The only way to fix this is to create your own custom “Sent Mail” label.  Here is how I created mine:

1. In Gmail, click on the gear icon and click on “Settings”.
2. Go to the “Labels” tab.  Click on “hide” next to “Sent Mail” and uncheck “Show in IMAP”.
3. Create a new label called “\_Sent Mail” (without the quotes), or something similar.
4. Go to the “Filters” tab and click on “Create a new filter”.
5. Enter your e-mail address in the “From” field.
6. Enter “has:nouserlabels” (without the quotes) in the “Has the words” field.
7. (Optional) Check “Don’t include chats”.
8. Click “Create a filter with this search”.
9. On the next screen, check “Apply the label” and select the “\_Sent Mail” label you created earlier.  Also check “Also apply filter to matching messages”.
10. Click “Create filter”.

You can create more advanced folders and filters with this technique as well; check out Gmails documentation on [Advanced Search](https://support.google.com/mail/answer/7190?hl=en) options.
