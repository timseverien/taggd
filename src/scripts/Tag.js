const ObjectIs = require('./util/object-is');
const TypeErrorMessage = require('./util/type-error-message');

class Tag {
  constructor() {
    this.buttonElement = document.createElement('button');
    this.popupElement = document.createElement('span');

    this.setPosition(0, 0);
    this.setText('');
  }

  /**
   * Show the tag
   * @return {Taggd.Tag} Current Tag
   */
  show() {
    this.popupElement.style.display = 'none';
    return this;
  }

  /**
   * Hide the tag
   * @return {Taggd.Tag} Current Tag
   */
  hide() {
    this.popupElement.style.display = '';
    return this;
  }

  /**
   * Set the tag’s text
   * @param {String} text - The tag’s content
   * @return {Taggd.Tag} Current Tag
   */
  setText(text) {
    if (!ObjectIs.ofType(text, 'string') && ObjectIs.function(text)) {
      throw new Error(TypeErrorMessage.getMessage(type, 'a string or a function'));
    }

    if (ObjectIs.function(text)) {
      this.popupElement.innerHTML = text(this);
    } else {
      this.popupElement.innerHTML = text;
    }

    return this;
  }

  /**
   * Set the tag’s position
   * @param {Number} x - The tag’s x-coordinate
   * @param {Number} y - The tag’s y-coordinate
   * @return {Taggd.Tag} Current Tag
   */
  setPosition(x, y) {
    if (!Number.isNumber(x)) {
      throw new Error(TypeErrorMessage.getIntegerMessage(x));
    }
    if (!Number.isNumber(y)) {
      throw new Error(TypeErrorMessage.getIntegerMessage(y));
    }

    const positionStyle = Tag.getPositionStyle(x, y);
    this.popupElement.style.left = positionStyle.left;
    this.popupElement.style.top = positionStyle.top;

    return this;
  }

  /**
   * Get the position style
   * @param {Number} x - The tag’s x-coordinate
   * @param {Number} y - The tag’s y-coordinate
   * @return {Object} The style
   */
  static getPositionStyle(x, y) {
    return {
      left: (x * 100) + '%',
      top: (y * 100) + '%',
    };
  }
}

module.exports = Tag;
