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
