---
layout: post
title: Reverting remote commits in Git
date: 2014-11-07
tags:
  - blog
  - development
excerpt: I had a “git” of a problem this week.
---

I had a “git” of a problem this week.  _(Ha... see what I did there?)_ I committed a bunch of changes to a remote branch, merged them to master, and then needed to back out those changes.  _(Why this need occurred is another story for another time.)_

## First, my git log

This is basically what my git log looked like.

```powershell
383a84a (me) Bad commit 3
f9e5973 (me) Bad commit 2
ac971af (me) Bad commit 1
fe4366a (me) Commit I want to revert back to
```

Obviously, the plan was to revert back to __fe4366a__, a.k.a. “Commit I want to revert back to”.

## What do I do now?

My first instinct was to use “git reset –hard fe4366a”.  However, the problem with this command is that it only reset my working directory back to that “good” commit.  No changes to the branch were made, so I have nothing to push back up to the remote server.

## Solution!

Git checkout to the rescue!  Seriously.  Here’s what I did:

__Step 1:__ Create a new branch (based off of master) for my reversion.

```powershell
git checkout -b my-new-branch
```

__Step 2:__ Checkout my last good commit to the new branch.

```powershell
git checkout fe4366a .
```

__Step 3:__ At this point, all of the files that were modified in the 3 bad commits have been modified again locally, to match the version in the “Commit I want to revert back to”.  Sanity check this just to be sure.

```powershell
git status
git diff
```

__Step 4:__ After confirming that the reverted changes look OK, commit the changes to the branch.

```powershell
git commit -m "Reverting changes!"
```

Done!  At this point, __my-new-branch__ can be merged back up to master or you can do whatever you want with it.

## Give credit where credit is due.

I found the [solution on Stack Overflow](https://stackoverflow.com/questions/4114095/how-do-i-revert-a-git-repository-to-a-previous-commit), because that website is awesome.

There are a few other suggestions on how to revert commits in Git in the answers on that page.  The one I have outlined above was the one that worked best for my situation.  YMMV.  Good luck!
