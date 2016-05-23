const ObjectIs = require('./util/object-is');
const TypeErrorMessage = require('./util/type-error-message');

/**
 * @todo:
 * - Generate DOM
 */
class Tag {
  constructor() {
    this.setPosition(0, 0);
    this.setText('');
  }

  /**
   * Show the tag
   * @return {Taggd.Tag} Current Tag
   */
  show() {
    return this;
  }

  /**
   * Hide the tag
   * @return {Taggd.Tag} Current Tag
   */
  hide() {
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

    this.text = text;
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

    this.position = {x, y};
    return this;
  }
}

module.exports = Tag;
