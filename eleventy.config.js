/**
 * Eleventy configuration file.
 */

/* 
  I want to be able to add HTML attributes (i.e. classes) in
  markdown. `markdown-it` will help me do that.
 */
const markdownIt = require('markdown-it'),
      markdownItAttrs = require('markdown-it-attrs'),
      markdownItDeflist = require('markdown-it-deflist'),
      markdownItFootnote = require('markdown-it-footnote');


const markdownItOptions = {
  html: true,
  breaks: false,
  linkify: true
}


/* 11ty configuration exports. */
module.exports = function(eleventyConfig) {
  // Pass through media asset files to the built site.
  eleventyConfig.addPassthroughCopy( 'source/assets' );

  // Pass through press kit documents to the built site.
  eleventyConfig.addPassthroughCopy( 'source/press-kit/docs' );

  // Pass through resume PDF to the built site.
  eleventyConfig.addPassthroughCopy( 'source/coding/*.pdf' );

  // Pass through documents linked to from the blog to the built site.
  eleventyConfig.addPassthroughCopy( 'source/blog/docs/*' );

  // Pass through documents linked to from the blog to the built site.
  eleventyConfig.addPassthroughCopy( 'source/press-kit/docs/*' );

  // Watch CSS files and automatically reload the browser if 
  // there are changes.
  eleventyConfig.setBrowserSyncConfig({
		files: './build/css/**/*.css'
	});

  // Pass the markdown library to allow me to use HTML attributes and 
  // definition lists.
  let markdownLib = markdownIt( markdownItOptions ).use( markdownItAttrs ).use( markdownItDeflist ).use( markdownItFootnote );

  // Customize the default opening code for the footnotes block to remove
  // the default `hr`. 
  // See: https://github.com/markdown-it/markdown-it-footnote
  markdownLib.renderer.rules.footnote_block_open = () => (
    '<section class="footnotes">' +
    '<ol class="footnotes-list">'
  );

  eleventyConfig.setLibrary( 'md', markdownLib );
};


/* Configure my source and build directories. */
module.exports.config = {
  dir: {
    input: "source",
    output: "build"
  }
};
