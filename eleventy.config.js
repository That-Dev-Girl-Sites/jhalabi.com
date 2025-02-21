/**
 * Eleventy configuration file.
 */

/* 
  I want to be able to add HTML attributes (i.e. classes) in
  markdown. `markdown-it` will help me do that.
 */
const markdownIt         = require('markdown-it'),
      markdownItAttrs    = require('markdown-it-attrs'),
      markdownItDeflist  = require('markdown-it-deflist'),
      markdownItFootnote = require('markdown-it-footnote');

const { feedPlugin } = require("@11ty/eleventy-plugin-rss");


const markdownItOptions = {
  html: true,
  breaks: false,
  linkify: true
}


/* 11ty configuration exports. */
module.exports = function(eleventyConfig) {

  /* 
   * Pass through files to the built site.
   */
  // Media assets (images, etc)
  eleventyConfig.addPassthroughCopy( 'source/assets' );

  // Resume PDF
  eleventyConfig.addPassthroughCopy( 'source/coding/*.pdf' );

  // Documents linked to from the blog
  eleventyConfig.addPassthroughCopy( 'source/blog/docs/*' );

  // Press kit documents.
  eleventyConfig.addPassthroughCopy( 'source/press-kit/docs/*' );


  /*
   * Watch CSS files and automatically reload the browser if 
   * there are changes.
   */
  eleventyConfig.setBrowserSyncConfig({
		files: './build/css/**/*.css'
	});


  /*
   * Configure the markdown library. This allows me to add HTML
   * attributes, use definition lists, and create footnotes.
   */
  let markdownLib = markdownIt( markdownItOptions ).use( markdownItAttrs ).use( markdownItDeflist ).use( markdownItFootnote );

  // Customize the default opening code for the footnotes block to
  // remove the default `hr`. 
  // See: https://github.com/markdown-it/markdown-it-footnote
  markdownLib.renderer.rules.footnote_block_open = () => (
    '<section class="footnotes">' +
    '<ol class="footnotes-list">'
  );

  eleventyConfig.setLibrary( 'md', markdownLib );


  /*
   * Configure RSS feed plugin.
   */
  eleventyConfig.addPlugin(feedPlugin, {
		type: "rss",
		outputPath: "/feed.xml",
		collection: {
			name: "blog", // iterate over `collections.blog`
			limit: 0,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "Articles | Joni Halabi",
			subtitle: "A blog about development, wordpress, and life as a single mother by choice.",
			base: "https://jhalabi.com/blog",
			author: {
				name: "Joni Halabi",
				email: "joni@jhalabi.com"
			}
		}
	});
};


/* Configure my source and build directories. */
module.exports.config = {
  dir: {
    input: "source",
    output: "build"
  }
};
