const ObjectIs = require('./util/object-is');
const TypeErrorMessage = require('./util/type-error-message');

/**
 * @todo:
 * - Set attributes
 * - Set custom data (for use in user-defined event handlers)
 */
class Tag {
  constructor(position, text) {
    this.buttonElement = document.createElement('button');
    this.popupElement = document.createElement('span');

    this.setPosition(position.x, position.y);
    this.setText(text);
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
    if (!ObjectIs.number(x)) {
      throw new Error(TypeErrorMessage.getIntegerMessage(x));
    }
    if (!ObjectIs.number(y)) {
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

  /**
   * Create a tag from object
   * @param {Object} object - The object containing all information
   * @return {Tag} The created Tag instance
   */
  static createFromObject(object) {
    return new Tag(object.position, object.text);
  }
}

module.exports = Tag;
