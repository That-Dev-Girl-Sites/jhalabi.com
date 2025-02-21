---
layout: post
title: "Besan Block: A long time coming"
date: 2019-08-15
tags:
  - blog
  - development
  - wordpress
excerpt: A few times a year, we hold an internal event at work that we call "Serendipity Day."
---

A few times a year, we hold an internal event at work that we call "Serendipity Day." We use this day, inspired by [NPR](https://npr.codes/serendipity-at-npr-5fb185bb5864), to work on projects that are somewhat work related, but have been sitting on our back burners for a while. Sometimes we use this day to research a new topic. More often than not, though, we use this day to build something new.

## Serendipity, take 1

Over a year ago, I decided that for that particular Serendipity Day, I wanted to learn [D3.js](https://d3js.org/). I came up with a project to create charts using D3. I intended the project to be an app for developers. A developer could use it to generate SVG code, to be saved and used separately on a site. I was also working with Google's API to get data from spreadsheets there because, well, I needed to get data from _somewhere_.

After a full day, I was able to learn both Google's API and D3 well enough to produce a single graph. It was great! I learned so much about SVGs as well, because in the process, I also wanted to make these charts accessible. This involved "getting into the weeds" with both SVG code and D3. However, I became very frustrated with D3. The library, while powerful, felt like a whole lot of overhead just to create SVG code.

My intention was to keep working on this project after that Serendipity Day and eventually publish it. Then, life happened and my project remained unpublished.

## Serendipity, take 2

Fast-forward to Serendipity Day this year. Between that earlier Serendipity Day and now, WordPress 5 was released with its new "Gutenberg" core editor. I am now very well versed in the new editor. I have written more custom post editor blocks than I can count. And that charting project from last year is still in the back of my mind.

So, I decided to rewrite my charting project with some major changes. I decided that feeding data from Google was still a good idea. However, I decided to forego D3 and, instead, write the SVG code manually. I also decided that I wanted this project to be a tool anyone could use. I decided to turn this into a custom block for the WordPress editor.

I created a decent proof of concept in less than a day. My POC was a plugin that added a new post editor block where an editor can enter in a Google Sheets URL and a column of data to chart. WordPress turned that information into a bar chart that was both navigable by keyboard and readable by screen readers. The chart was an SVG created "by hand" in PHP. _Success!_

This time, I was very determined to publish my project because, gosh darn it, this is cool! I found the time to add a settings page to save the editor's Google API key. I added options to add a chart caption and change the colors of the bars. I cleaned up chart styles. I spent _way_ too much time naming this plugin. (_Besan_, by the way, is the Vulcan word for "chart". Live long and prosper.)

## OMG. It's happening!

_Finally_, I submitted my plugin to the WordPress plugin library. _And_ it was accepted! This plugin is officially live.

But, I am not done. I have plans to expand the plugin to include more graphs, starting with pie charts as soon as I sit down and actually work out the math around it. Also scatter plots. And line graphs.

In the meantime, check out the [Besan Block plugin](https://wordpress.org/plugins/besan-block/) in all its bar chart glory and have fun!
