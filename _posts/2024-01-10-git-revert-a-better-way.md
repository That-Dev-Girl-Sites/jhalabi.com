---
layout: post
title: "Git reversions by tag: a much better way"
date: "2024-01-10"
redirect_from: "/blog/git-revert-a-better-way"
categories:
  - development
---

Almost a year ago, I published an article about what could be described as the [worst way to revert tags in git](https://jhalabi.com/blog/git-reversions-by-tag). I regret that article. The process I outlined there was an experiment gone awry. I conclude the post by telling my readers to "use the knowledge here at your own risk." I hope you all listened.

I am bringing this up because I was recently put into a situation (_again_) where I needed to revert a git repository back to a specific tag. This is not a task I do often, so off to the internet I went, entering the keywords "git revert by tag" into the search bar. This unearthed my previous post.[^1]


## This is promising?

I completely forgot about this post and, at first, was very excited. That is, until I actually _read_ the entire post. I was disappointed, but determined to find a better way. The other top search results were not the step-by-step tutorial that I was hoping for, but, eventually, I found a method that I am much happier with.


## The current state of my repo

My goal was to revert my repo to a previous tag, but, unlike last year's "solution", not destroy any commits along the way. The `git log` looked something like this:

```powershell
11111 (HEAD -> main, tag: LatestTag) Latest commit
22222 Another fun feature
33333 Fun feature
44444 (tag: PreviousTag) More changes
55555 Random changes
66666 (tag: MuchOlderTag) Changes
```

The log starts with the most recent commit and goes backwards in time. My most recent commit was tagged (`LatestTag`), but I needed to revert this repo back to an older tag -- `PreviousTag`. This change would revert 3 commits: `11111`, `22222`, and `33333`.[^2]


## Step 1: Revert the repo locally

This first step is to revert the repo locally to its state at the `PreviousTag` tag by rolling each commit back _separately_. 

```powershell
git revert HEAD..PreviousTag
```

A confirmation of each commit's reversion appears as part of this `revert` command. Git treats each reversion as its own commit, so you will need to review and save each commit as they pop up on your screen. 

There is a chance that some merge conflicts will arise. I did not encounter that, but if you do, use whatever method you usually use to resolve conflicts.

Once git has finished rolling back each commit, a `git status` looks something like this:

```powershell
[main 33333a] Revert "Fun feature"
 1 file changed, 3 insertions(+), 3 deletions(-)
[main 22222a] Revert "Another fun feature"
 1 file changed, 1 insertion(+), 1 deletion(-)
[main 11111a] Revert "Latest commit"
 1 file changed, 1 insertion(+), 1 deletion(-)
```

Three changes were reverted, resulting in three, separate commits.


## Step 2: Verify and push

Reverting one commit can be daunting. Reverting _multiple_ commits is a big deal. I cannot stress this enough: Test your code before doing anything else!

Once you have verified that that your code works as expected, push the changes to remote. 

```powershell
git push origin main
```


## Step 3: Goal achieved!

Not only has the repo been reverted to its previous commit, but the commit history has been preserved _and_ each reversion is saved as a separate commit _(just in case you need to do more "fun" things with git)_. 

Now, do yourself a favor and forget about last year's post.[^3]



[^1]: My post was the third link on the search results page. _Third._ That is either embarassing or pretty amazing SEO.
[^2]: The commit hashes were (obviously) changed to something easier to read, so no one gets lost in a sea of characters. At the very least, this is easier on my eyes. You're welcome.
[^3]: One may ask why I don't just delete that old post. I don't really believe in deleting my old content (unless it is truly harmful). That old post is not a great idea, but I also admit that in the post, so I hope readers will take that to heart. 