const CleanCSS = require('clean-css');
const Image = require('@11ty/eleventy-img');
const path = require('path');

/**
 * Returns a link styled as a button.
 * @param {*} text
 * @param {*} htmlClass
 * @param {*} href
 * @returns
 */
function buttonShortcode(text, href, htmlClass) {
  return `<a class="button ${htmlClass}" href="${href}">${text}</a>`;
}

/**
 * Generates an optimized image for the given src.
 * @param {*} src
 * @param {*} alt
 * @param {*} sizes
 * @returns a shortcode to be used in templates (eg: {% image "images/pencil.jpeg", "photo of my pencil", "(min-width: 30em) 50vw, 100vw" %})
 */
async function imageShortcode(src, alt, sizes = '100vw', htmlClass = '') {
  let metadata = await Image(src, {
    widths: [760, 1120],
    formats: ['avif', 'webp', 'jpeg'],
    outputDir: './_site/images/optimized/',
    urlPath: '/images/optimized/',
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);

      // id is hash based, this gives us readable file names
      return `${name}-${width}w.${format}`;
    },
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
    class: htmlClass,
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: 'inline',
  });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('js');
  eleventyConfig.addPassthroughCopy('images');
  eleventyConfig.addPassthroughCopy({
    './node_modules/lightgallery/css/lightgallery-bundle.min.css': 'lib/lightgallery.css',
  });
  eleventyConfig.addPassthroughCopy({
    './node_modules/lightgallery/lightgallery.min.js': 'lib/lightgallery.js',
  });
  eleventyConfig.addPassthroughCopy({
    './node_modules/lightgallery/plugins/zoom/lg-zoom.min.js': 'lib/lightgallery-zoom.js',
  });
  eleventyConfig.addPassthroughCopy({
    './node_modules/lightgallery/plugins/thumbnail/lg-thumbnail.min.js':
      'lib/lightgallery-thumbnail.js',
  });

  eleventyConfig.addPassthroughCopy({
    './node_modules/justifiedGallery/dist/css/justifiedGallery.min.css': 'lib/justifiedGallery.css',
  });
  eleventyConfig.addPassthroughCopy({
    './node_modules/justifiedGallery/dist/js/jquery.justifiedGallery.min.js':
      'lib/justifiedGallery.js',
  });

  // add a template shortcode to replace image references with optimized ones
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

  eleventyConfig.addNunjucksShortcode('button', buttonShortcode);

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
