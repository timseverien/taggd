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
 * Get example URL by slug.
 * @param {String} extension - The filename extension
 * @return {Function} A factory function to generate an example URL thing
 */
function getExampleUrlFactory(extension) {
  /**
   * @param {String} slug - The example slug
   * @return {String} The relative example URL
   */
  return function (slug) {
    return 'examples/' + slug + '.' + extension;
  }
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
 * @param {String} slug - The example slug
 * @return {Object} An object containing all URLs
 */
function createExampleUrlsObject(slug) {
  return {
    markdown: getExampleUrlFactory('html')(slug),
    script: getExampleUrlFactory('js')(slug),
    snippet: getExampleUrlFactory('txt')(slug),
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
var getExampleUrlFromContainer = pipe(getExampleSlugFromContainer, createExampleUrlsObject);
// Get all example containers
var exampleContainers = document.querySelectorAll('[data-example]');
// Get all URLs for examples
var exampleUrls = Array.prototype.map.call(exampleContainers, getExampleUrlFromContainer);
// Load examples and populate their respective containers
exampleUrls.forEach(function (exampleUrls, index) {
  fetchExample(exampleUrls.markdown, function (response) {
    if (!response) return;

    var exampleContainer = exampleContainers[index];
    exampleContainer.innerHTML = response;
    exampleContainer.appendChild(createScriptElement(exampleUrls.script));

    if (exampleContainer.hasAttribute('data-example-snippet')) {
      fetchExample(exampleUrls.snippet, function (snippet) {
        exampleContainer.appendChild(createCodeSnippetElement(snippet));
      });
    }
  });
});
