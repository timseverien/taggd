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
