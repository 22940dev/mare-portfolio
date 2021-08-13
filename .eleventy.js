const CleanCSS = require('clean-css');
const Image = require('@11ty/eleventy-img');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('css');

  // inline css
  eleventyConfig.addFilter('cssmin', function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  return {
    dir: {
      includes: '../_includes',
      data: '../_data',
      input: 'pages',
      output: '_site',
    },
  };
};
