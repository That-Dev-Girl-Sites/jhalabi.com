---
layout: post
title: "When Git ignore doesn't"
date: "2016-09-01"
redirect_from: "/blog/when-git-ignore-doesnt"
categories:
  - development
excerpt: "Imagine this: You have a file in your Git repository that you need to modify."
---

Imagine this: You have a file in your Git repository that you need to modify. Perhaps it is a settings file for your CMS. The settings file works perfectly for your QA or production environment, but you need to modify it for your local environment to run off of a different port or to enable developer logging or to do whatever else.  These local changes are critical to your local environment, but they will not work on production. No matter what, you __must not__ commit these changes.

So, what is your first instinct?  You add the file to _.gitignore_. You run _git status_.  The file still appears as modified. You look at _.gitignore_ again.  Maybe play around with the path.  You double and triple check the path and the file name. You make a change, thinking this is absolutely the correct path.  You run git status again. The file still appears as modified.

_&lt;Insert an absurd amount of screaming here.  Or maybe that’s just me.&gt;_

The truth is, using _.gitignore_ to ignore a file that has already been committed to your repository will do absolutely nothing.  Git will only actually ignore files that are in your local environment, but __not in the repository__.

Annoying, but it makes sense.  Git is responsible for any committed files and asking Git to ignore a file that it is responsible for is like asking a teacher to ignore one of her students.  _“Hey Ms. Jones.  I know Tommy is in your class and you need to teach him things, but could you please ignore him instead?”_ Sounds a bit silly, right?

You need Git to ignore changes you make to this committed file locally, but Git cannot ignore the file.  So, you have two choices:

1. __Delete the file from the repository, then ignore it.__  Great idea if you do not need the file to exist for other users or environments.  Probably not so great for our settings file that production probably needs.
2. __Tell Git to assume that the file never changes.__  Git has a command called update-index that is pretty powerful.  For our purposes, we can use it to tell Git to pretend that we will never change this file, regardless of whether or not this is actually true.

```powershell
git update-index --assume-unchanged FILE
```

Now, you can make whatever changes you want to your file.  The original file still exists as-is on the repository and Git will look the other way about your changes.  Win-win.

For more information, check out [Git’s documentation on update-index](https://git-scm.com/docs/git-update-index).
