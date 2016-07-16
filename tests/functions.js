/**
 * Adds an image to the document
 * @param {Function} done - The callback to call after image has loaded
 */
function createImage(done) {
  var image = document.createElement('img');
  image.onload = done;
  image.src = '/base/tests/assets/512x256.jpg';

  document.body.appendChild(image);
}

/**
 * Clears the body
 */
function destroyBody() {
  var element = document.body;

  while (element.hasChildNodes()) {
   element.removeChild(document.body.lastChild);
  }
}

/**
 * Gets the image element
 * @return {DomNode} - The image element
 */
function getImageElement() {
  var images = document.getElementsByTagName('img');
  return images[0];
}

/**
 * Trigger an event on element
 * @param {DomNode} element - The element to trigger the event on
 * @param {String} eventName - The event name
 */
function triggerEvent(element, eventName) {
  element.dispatchEvent(new Event(eventName, {
    'bubbles': true,
    'cancelable': true,
    'view': window,
  }));
}

/**
 * Create a random tag
 * @return {Taggd.Tag} - The tag
 */
function createTag() {
  var characterSet = 'abcdefghijklmnopqrstuvwxyz';
  var textLength = 0xF;
  var text = '';

  do {
    text += characterSet[Math.floor(Math.random() * characterSet.length)];
  } while (--textLength);

  return new Taggd.Tag({
    x: Math.random(),
    y: Math.random(),
  }, text);
}

function shortDelay(callback) {
  setTimeout(callback, 1000 / 8);
}
