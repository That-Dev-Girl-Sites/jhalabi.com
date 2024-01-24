---
layout: post
title: "Git reversions by tag (and why git can be a scary place)"
date: "2023-04-14"
redirect_from: "/blog/git-reversions-by-tag"
categories:
  - development
excerpt: I have been using git for over a decade and reverting commits still trips me up.
---

I have been using git for _(checks watch)_ over a decade and reverting commits _still_ trips me up. 

I recently came across a bug in our code. This codebase is regularly deployed to production and we know production does not have this bug. This gave us a good idea of when the bug was introduced. 

Very long story short, the decided goal was to revert this repository back to the last known good commit. _(Seriously, it's a much longer story, irrelevant to this one.)_

To illustrate, here is an example of (basically) what the git log looked like:

```powershell
11111 (HEAD -> master) Latest commit
22222 Another commit
33333 Start of the bug
44444 Last known good commit
55555 Random good commit
66666 Another random good commit
```

The goal is to cleanly revert several commits, back to the "last known good commit."


## Step 1: Bookmark the commits

The first step is to tag the relevant commits for this reversion. This includes the latest commit, the first buggy commit, and the last known good commit. Bookmarking these commits allows me to find them more easily later.

```
git tag -a LatestCommit 11111
git push origin LatestCommit

git tag -a BuggyCommit 33333
git push origin BuggyCommit

git tag -a BeforeBuggy 44444
git push origin BeforeBuggy
```

I can make sure my tags are in place by running `git log --pretty=oneline`. My commits should now look like this:

```powershell
11111 (HEAD -> master, tag: LatestCommit) Latest commit
22222 Another commit
33333 (tag: BuggyCommit) Start of the bug
44444 (tag: BeforeBuggy) Last known good commit
55555 Random good commit
66666 Another random good commit
```


## Step 2: Go back in time

This is the part that is a bit odd. I am sure there is a better way to accomplish a clean reversion. However, this was the method that worked for me.

The first part of this step is to revert `HEAD` to point to the commit where the bug was introduced. I could checkout the tag insead of resetting, but that would put me into a detached head state, which is something I almost always want to avoid.

```
git reset --hard BuggyCommit
```

Locally, this moves `HEAD` to that `BuggyCommit` and removes all commits that came before it. My git log now looks like this:

```powershell
44444 (HEAD -> master, tag: BeforeBuggy) Last known good commit
55555 Random good commit
66666 Another random good commit
```

That is a bit scary, but a quick look at the remote branch in GitHub reassures me that the other commits still exist. 

A `git status` command also tells me that my local branch is behind its remote counterpart by all of the commits that came after this `BuggyCommit`. This makes sense, given that these commits still exist remotely. I have not actually reverted any changes. In order to officially revert this branch to the last known good commit, we must revert the current buggy commit.

```
git revert BuggyCommit
```

This will create a reversion commit for everything that was part of the commit tagged `BuggyCommit`. In order to get this all into `main`, we need to force a push of this reversion.

```
git push origin +main
```

Now, the git log looks like this, both locally and remotely.

```powershell
12345 (HEAD -> master) Revert "Last known good commit"
44444 (tag: BeforeBuggy) Last known good commit
55555 Random good commit
66666 Another random good commit
```

The other commits after that last known good commit have vanished. Well, that's terrifying.


## Is it _really_ terrifying?

Yes and no. The repository's log has permanently changed to remove those newer commits. However, believe it or not, we were smart earlier. 

Remember step 1 above, where we also created those `LatestCommit` and `BuggyCommit` tags? Those tags - and the changes they contain - _still exist_. The magic of tags. I'm still in shock.


## Retrospective

Was this smart? No. 

Was this interesting? Omg, yes!

That being said, there are definitely some things that could have been done differently here.

1. __Make a backup copy of the `main` branch__ before starting any of this. If anything, this fun experiment proved that git, in the wrong hands, will wipe away your data forever. At least if you are not careful. The tags I created saved that data. However, a better backup would have been to create a new branch of `main`, before I started any part of this experiment.
1. __Use `git revert` on all of the commits__. With the method above, I only created a revert commit of the first commit after the last known good state. The rest of the commits were never officially reverted. They simply vanished. It would been more thorough to use `git revert` on all commits individually to create reversion commits for each one. That way, the log history would remain preserved.


## Conclusion

Git is a scary place. I recommend none of the processes in this post _(except for maybe the retrospective)_, so use the knowledge here at your own risk. I wrote all of this up because I did something ridiculous and found it interesting. Don't be like me. Be like... the opposite of me. Or, at least the opposite of the me who wrote this post. Good luck and good day.

