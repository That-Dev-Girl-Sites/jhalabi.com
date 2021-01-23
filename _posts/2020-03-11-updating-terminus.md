---
layout: post
title: "Updating Terminus: A guide for Pantheon users"
date: "2020-03-11"
categories:
  - development
---

If you are a developer who hosts your sites on Pantheon, I would be willing to bet that you also use [Terminus](https://pantheon.io/docs/terminus/). For all you Terminus users, a message like this probably looks familiar:

```
Terminus 2.2.0
[notice] A new Terminus version v2.3.0 is available.
You are currently using version v2.2.0.
You can update Terminus by running `composer update` or using the Terminus installer:
curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar update
```

If you are like me, you have run that command, only for it to not work at all. The Terminus installer even has an open (as of this writing) [Github issue](https://github.com/pantheon-systems/terminus-installer/issues/31) about it.

So, what do you do? Pantheon does have a [troubleshooting](https://pantheon.io/docs/terminus/updates) page, but those instructions have never worked for me. If you are in the same boat, here are the steps that _do_ work for me:

## Update Terminus by completely blowing it up

_Note:_ These steps are for Mac users and assume that your Terminus installation lives in your home directory. Adjust accordingly if your installation lives somewhere else.

1. Go to your home directory: `cd ~`

2. Rename your existing vendor/ directory (just in case): `mv vendor vendor-old`

3. Download the Terminus installer: `curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar`

4. Install Terminus: `php -d memory_limit=-1 installer.phar install`

5. Verify that you have a new `vendor/` directory in your home directory: `ls vendor`

6. Verify that Terminus has indeed been updated: `terminus -V`
    * You should see the latest version number. You should also not see a message saying there is a new version of Terminus.

7. It is now safe to delete the old Terminus vendor folder: `rm -rf vendor-old`

Your mileage may vary, though hopefully these instructions will work for you too. Best of luck!
