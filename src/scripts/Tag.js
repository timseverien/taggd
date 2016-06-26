const ObjectIs = require('./util/object-is');
const TypeErrorMessage = require('./util/type-error-message');

/**
 * @todo:
 * - Set attributes
 * - Set custom data (for use in user-defined event handlers)
 */
class Tag {
  constructor(position, text, buttonAttributes = {}, popupAttributes = {}) {
    this.buttonElement = document.createElement('button');
    this.popupElement = document.createElement('span');

    this.setButtonAttributes(buttonAttributes);
    this.setPopupAttributes(popupAttributes);
    this.setPosition(position.x, position.y);
    this.setText(text);

    this.hide();
  }

  /**
   * Show the tag
   * @return {Taggd.Tag} Current Tag
   */
  show() {
    this.popupElement.style.display = '';
    return this;
  }

  /**
   * Hide the tag
   * @return {Taggd.Tag} Current Tag
   */
  hide() {
    this.popupElement.style.display = 'none';
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
   * Set the tag button’s attributes
   * @param {Object} atttributes - The attributes to set
   * @return {Taggd.Tag} Current tag
   */
  setButtonAttributes(attributes = {}) {
    Tag.setElementAttributes(this.buttonElement, attributes);
    return this;
  }

  /**
   * Set the tag popup’s attributes
   * @param {Object} atttributes - The attributes to set
   * @return {Taggd.Tag} Current tag
   */
  setPopupAttributes(attributes = {}) {
    Tag.setElementAttributes(this.popupElement, attributes);
    return this;
  }

  /**
   * Set element attributes
   * @param {DomNode} element - The element the attributes should be set to
   * @param {Object} attributes = {} - A map of attributes to set
   * @return {DomNode} The original element
   */
  static setElementAttributes(element, attributes = {}) {
    if (!ObjectIs.ofType(attributes, 'object')) {
      throw new Error(TypeErrorMessage.getObjectMessage(attributes));
    }

    for (let attribute in attributes) {
      const value = attributes[attribute];

      if (attribute === 'class' && element.getAttribute(attribute)) {
        const classValue = element.getAttribute(attribute) + ` ${value}`;
        element.setAttribute(attribute, classValue);
        continue;
      }

      element.setAttribute(attribute, value);
    }

    return element;
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
    return new Tag(
      object.position,
      object.text,
      object.buttonAttributes,
      object.popupAttributes
    );
  }
}

module.exports = Tag;
