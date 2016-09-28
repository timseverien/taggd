/**
 * Chain functions, basically.
 * @return {Function} A unified function
 */
function pipe() {
  var args = Array.prototype.slice.call(arguments);
  var _pipe = function (value, pipedFunction) {
    return pipedFunction(value);
  };

  return function (input) {
    return args.reduce(_pipe, input);
  };
}

/**
 * Get all example slugs.
 * @return {Array} A list of all example slugs
 */
function getExampleSlugFromContainer(container) {
  return container.getAttribute('data-example-slug');
}

/**
 * Get example markdown URL by slug.
 * @param {String} slug - The example slug
 * @return {String} The relative example URL
 */
function getExampleMarkdownUrl(slug) {
  return 'examples/' + slug + '.html';
}

/**
 * Get example script URL by slug.
 * @param {String} slug - The example slug
 * @return {String} The relative example URL
 */
function getExampleScriptUrl(slug) {
  return 'examples/' + slug + '.js';
}

/**
 * Fetch an example markdown.
 * @param {String} path - The path to load
 * @param {Function} onload - The callback to execute after an load
 * @return {Function} The function to request an request
 */
function fetchExample(path, onload) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function onLoadHandler() {
      xhr.removeEventListener('load', onLoadHandler);
      onload(xhr.responseText);
    });

    xhr.open('GET', path, true);
    xhr.send();
}

/**
 * Create an example URLs object.
 * @param {HTMLElement} element - The container element
 * @return {Object} An object containing all URLs
 */
function createExampleUrlsObject(element) {
  return {
    markdown: getMarkdownUrlFromContainer(element),
    script: getScriptUrlFromContainer(element),
  };
};

/**
 * Create a script element with a source.
 * @param {String} src - The script source to load
 * @return {HTMLElement} The script element
 */
function createScriptElement(src) {
  var script = document.createElement('script');
  script.src = src;
  return script;
}

/**
 * Create a pre element containing given code.
 * @param {String} snippet - The snippet to render
 * @return {HTMLElement} The pre element
 */
function createCodeSnippetElement(snippet) {
  var pre = document.createElement('pre');
  var code = document.createElement('code');

  pre.appendChild(code);
  code.innerHTML = snippet;

  return pre;
}

/**
 * Get snippet with important bits highlighted.
 * @param {String} snippet - The plain snippet
 * @return {String} The highlighted snippet
 */
function getHighlightedSnippet(snippet) {
  function getHighlightHtml(replacement) {
    return '<span class="highlight">' + replacement + '</span>';
  }

  return snippet
    .replace(/Taggd.Tag.createFromObject\([^)]+\)/g, getHighlightHtml('$&'))
    .replace(/new\sTaggd\([^)]+\)/g, getHighlightHtml('$&'))
}

/** @type {Function} */
var getMarkdownUrlFromContainer = pipe(getExampleSlugFromContainer, getExampleMarkdownUrl);
/** @type {Function} */
var getScriptUrlFromContainer = pipe(getExampleSlugFromContainer, getExampleScriptUrl);

// Get all example containers
var exampleContainers = document.querySelectorAll('[data-example]');
// Get all URLs for examples
var exampleUrls = Array.prototype.map.call(exampleContainers, createExampleUrlsObject);
// Load examples and populate their respective containers
exampleUrls.forEach(function (exampleUrls, index) {
  fetchExample(exampleUrls.markdown, function (response) {
    if (!response) return;

    var exampleContainer = exampleContainers[index];
    exampleContainer.innerHTML = response;
    exampleContainer.appendChild(createScriptElement(exampleUrls.script));

    if (exampleContainer.hasAttribute('data-example-snippet')) {
      fetchExample(exampleUrls.script, function (snippet) {
        exampleContainer.appendChild(createCodeSnippetElement(snippet));
      });
    }
  });
});
