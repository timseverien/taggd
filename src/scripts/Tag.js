const EventEmitter = require('./util/event-emitter');
const ObjectIs = require('./util/object-is');
const TypeErrorMessage = require('./util/type-error-message');

class Tag extends EventEmitter {
  constructor(position, text, buttonAttributes = {}, popupAttributes = {}) {
    super();

    this.buttonElement = document.createElement('button');
    this.popupElement = document.createElement('span');

    this.isControlsEnabled = false;
    this.inputLabelElement = undefined;
    this.buttonSaveElement = undefined;
    this.buttonDeleteElement = undefined;

    this.buttonSaveElementClickHandler = () => this.setText(this.inputLabelElement.value);
    this.buttonDeleteElementClickHandler = () => {
      this.emit('taggd.tag.doDelete', this);
    };

    this.text = undefined;

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
    const isCanceled = !this.emit('taggd.tag.show', this);

    if (!isCanceled) {
      this.popupElement.style.display = '';
      this.emit('taggd.tag.shown', this);
    }

    return this;
  }

  /**
   * Hide the tag
   * @return {Taggd.Tag} Current Tag
   */
  hide() {
    const isCanceled = !this.emit('taggd.tag.hide', this);

    if (!isCanceled) {
      this.popupElement.style.display = 'none';
      this.emit('taggd.tag.hidden', this)
    }

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

    const isCanceled = !this.emit('taggd.tag.change', this);

    if (!isCanceled) {
      if (ObjectIs.function(text)) {
        this.text = text(this);
      } else {
        this.text = text;
      }

      if (!this.isControlsEnabled) {
        this.popupElement.innerHTML = this.text;
      } else {
        this.inputLabelElement.value = this.text;
      }

      this.emit('taggd.tag.changed', this);
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

    const isCanceled = !this.emit('taggd.tag.change', this);

    if (!isCanceled) {
      const positionStyle = Tag.getPositionStyle(x, y);
      this.popupElement.style.left = positionStyle.left;
      this.popupElement.style.top = positionStyle.top;

      this.emit('taggd.tag.changed', this);
    }

    return this;
  }

  /**
   * Set the tag button’s attributes
   * @param {Object} atttributes - The attributes to set
   * @return {Taggd.Tag} Current tag
   */
  setButtonAttributes(attributes = {}) {
    const isCanceled = !this.emit('taggd.tag.change', this);

    if (!isCanceled) {
      Tag.setElementAttributes(this.buttonElement, attributes);
      this.emit('taggd.tag.changed', this);
    }

    return this;
  }

  /**
   * Set the tag popup’s attributes
   * @param {Object} atttributes - The attributes to set
   * @return {Taggd.Tag} Current tag
   */
  setPopupAttributes(attributes = {}) {
    const isCanceled = !this.emit('taggd.tag.change', this);

    if (!isCanceled) {
      Tag.setElementAttributes(this.popupElement, attributes);
      this.emit('taggd.tag.changed', this);
    }

    return this;
  }

  /**
   * Enables the tag controls
   * @return {Taggd.Tag} Current tag
   */
  enableControls() {
    this.isControlsEnabled = true;

    this.inputLabelElement = document.createElement('input');
    this.buttonSaveElement = document.createElement('button');
    this.buttonDeleteElement = document.createElement('button');

    this.buttonSaveElement.innerHTML = Tag.LABEL_BUTTON_SAVE;
    this.buttonDeleteElement.innerHTML = Tag.LABEL_BUTTON_DELETE;

    this.buttonSaveElement.addEventListener('click', this.buttonSaveElementClickHandler);
    this.buttonDeleteElement.addEventListener('click', this.buttonDeleteElementClickHandler);

    this.popupElement.innerHTML = '';
    this.popupElement.appendChild(this.inputLabelElement);
    this.popupElement.appendChild(this.buttonSaveElement);
    this.popupElement.appendChild(this.buttonDeleteElement);

    // Set input content
    this.setText(this.text);
  }

  /**
   * Disabled the tag controls
   * @return {Taggd.Tag} Current tag
   */
  disableControls() {
    this.isControlsEnabled = false;

    this.inputLabelElement = undefined;
    this.buttonSaveElement = undefined;
    this.buttonDeleteElement = undefined;

    // Remove elements and set set content
    this.setText(this.text);
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

Tag.LABEL_BUTTON_SAVE = 'save';
Tag.LABEL_BUTTON_DELETE = 'delete';

module.exports = Tag;
