const getElementOffset = require('offset');
const getScrollTop = require('scrolltop');

const Tag = require('./Tag');
const EventEmitter = require('../util/event-emitter');
const ObjectIs = require('../util/object-is');
const TypeErrorMessage = require('../util/type-error-message');

class Taggd extends EventEmitter {
  /**
   * Create a new taggd instance
   * @param {HTMLElement} image - The image to wrap
   * @param {Object} [options = {}] - The [options]{@link https://doclets.io/timseverien/taggd/master/options}
   * @param {Array} [data = []] - The [tags]{@link https://timseverien.github.io/taggd/v3/generator}
   */
  constructor(image, options = {}, data = []) {
    if (!image instanceof Element) {
      throw new TypeError(TypeErrorMessage.getMessage(image, Element));
    }

    super();

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('taggd');

    image.classList.add('taggd__image');

    image.parentElement.insertBefore(this.wrapper, image);
    image.parentElement.removeChild(image);
    this.wrapper.appendChild(image);

    this.image = image;
    this.options = {};
    this.tags = [];

    this.imageClickHandler = (e) => {
      const scrollTop = getScrollTop();
      const offset = getElementOffset(this.image);

      const position = {
        x: (e.pageX - offset.left) / this.image.width,
        y: (e.pageY - offset.top - scrollTop) / this.image.height,
      };

      const tag = new Tag(position, Tag.LABEL_NEW_TAG);
      tag.enableControls();

      this.addTag(tag);
    };

    this.setOptions(options);
    this.setTags(data);
  }

  /**
   * Subscribe to an event.
   * @param {String} eventName - The event to subscribe to.
   * @param {Function} handler - The handler to execute.
   * @return {Taggd} Current Taggd instance
   */
  on(eventName, handler) {
    return super.on(eventName, handler);
  }

  /**
   * Unsubscribe from an event.
   * @param {String} eventName - The event to unsubscribe from.
   * @param {Function} handler - The handler that was used to subscribe.
   * @return {Taggd} Current Taggd instance
   */
  off(eventName, handler) {
    return super.off(eventName, handler);
  }

  /**
   * Subscribe to an event and unsubscribe once triggered.
   * @param {String} eventName - The event to subscribe to.
   * @param {Function} handler - The handler to execute.
   * @return {Taggd} Current Taggd instance
   */
  once(eventName, handler) {
    return super.once(eventName, handler);
  }

  /**
   * Set taggd options
   * @param {Object} options - The options to set
   * @return {Taggd} Current Taggd instance
   */
  setOptions(options) {
    if (!ObjectIs.ofType(options, 'object') || Array.isArray(options)) {
      throw new TypeError(TypeErrorMessage.getObjectMessage(options));
    }

    this.options = Object.assign(this.options, Taggd.DEFAULT_OPTIONS, options);
    return this;
  }

  /**
   * Add a single tag
   * @param {Taggd.Tag} tag - The tag to add
   * @return {Taggd} Current Taggd instance
   */
  addTag(tag) {
    if (!ObjectIs.ofInstance(tag, Tag)) {
      throw new TypeError(TypeErrorMessage.getTagMessage(tag));
    }

    const isCanceled = !this.emit('taggd.tag.add', this, tag);
    let hideTimeout;

    /**
     * Test whether the event’s target is the button Element
     * @param {Event} e - The event object
     * @return {Boolean} Whether the event’s target is the button element
     */
    const isTargetButton = (e) => e.target === tag.buttonElement;
    const clearTimeout = () => {
      if (hideTimeout) {
        window.clearTimeout(hideTimeout);
        hideTimeout = undefined;
      }
    };

    if (!isCanceled) {
      // Add events to show/hide tags
      // If show and hide event are identical, set show/hide mode to toggle
      if (this.options.show === this.options.hide) {
        tag.buttonElement.addEventListener(this.options.show, (e) => {
          if (!isTargetButton(e)) return;

          clearTimeout();

          if (tag.isHidden()) {
            tag.show();
          } else {
            tag.hide();
          }
        });
      } else {
        tag.buttonElement.addEventListener(this.options.show, (e) => {
          if (!isTargetButton(e)) return;

          clearTimeout();
          tag.show();
        });
        tag.buttonElement.addEventListener(this.options.hide, (e) => {
          if (!isTargetButton(e)) return;

          clearTimeout();

          // If the use moves the mouse between the button and popup, a delay should give some time
          // to do just that. This only applies to the mouseleave event.
          if (this.options.hide === 'mouseleave') {
            hideTimeout = window.setTimeout(() => tag.hide(), this.options.hideDelay);
          } else {
            tag.hide();
          }
        });

        // Force visibility if user interacts with the popup element
        if (this.options.hide === 'mouseleave') {
          tag.popupElement.addEventListener('mouseover', () => clearTimeout());
          tag.popupElement.addEventListener('mouseleave', () => tag.hide());
        }
      }

      tag.once('taggd.tag.delete', () => {
        const tagIndex = this.tags.indexOf(tag);

        if (tagIndex >= 0) {
          this.deleteTag(tagIndex);
        }
      });

      // Route all tag events through taggd instance
      tag.onAnything((eventName, ...args) => {
        this.emit(eventName, this, ...args);
      });

      this.tags.push(tag);
      this.wrapper.appendChild(tag.wrapperElement);

      this.emit('taggd.tag.added', this, tag);
    }

    return this;
  }

  /**
   * Get a single tag by index
   * @param  {Number} index - The index of the desired tag
   * @return {Taggd.Tag} The tag to get
   */
  getTag(index) {
    if (!Number.isInteger(index)) {
      throw new TypeError(TypeErrorMessage.getIntegerMessage(index));
    }

    return this.tags[index];
  }

  /**
   * Delete a single tag by index
   * @param {Number} index - The index of the desired tag
   * @return {Taggd} Current Taggd instance
   */
  deleteTag(index) {
    if (!Number.isInteger(index)) {
      throw new TypeError(TypeErrorMessage.getIntegerMessage(index));
    }

    if (!this.tags[index]) {
      throw new Error(`Tag at index ${index} does not exist.`);
    }

    const tag = this.tags[index];
    const isCanceled = !this.emit('taggd.tag.delete', this, tag);

    if (!isCanceled) {
      this.wrapper.removeChild(tag.wrapperElement);
      this.tags.splice(index, 1);

      this.emit('taggd.tag.deleted', this, tag);
    }

    return this;
  }

  /**
   * Set all tags
   * @param {Taggd.Tag[]} tags An array of tags
   * @return {Taggd} Current Taggd instance
   */
  setTags(tags) {
    this.deleteTags();
    this.addTags(tags);
    return this;
  }

  /**
   * Add multiple tags
   * @param {Taggd.Tag[]} tags - An array of tags
   * @return {Taggd} Current Taggd instance
   */
  addTags(tags) {
    if (!Array.isArray(tags)) {
      throw new TypeError(TypeErrorMessage.getArrayMessage(tags, 'Taggd.Tag'));
    }

    tags.forEach((tag) => this.addTag(tag));
    return this;
  }

  /**
   * Get all tags
   * @return {Taggd.Tag[]} All tags of this Taggd instance
   */
  getTags() {
    return this.tags;
  }

  /**
   * Remove all tags
   * @return {Taggd} Current Taggd instance
   */
  deleteTags() {
    while (this.tags.length > 0) {
      this.deleteTag(0);
    }
    return this;
  }

  /**
   * Iterate and replace all tags
   * @param {Function} callback - The callback to execute for all tags
   * @return {Taggd} Current Taggd instance
   */
  map(callback) {
    if (!ObjectIs.function(callback)) {
      throw new TypeError(TypeErrorMessage.getFunctionMessage(callback));
    }

    this.tags = this.tags.map(callback);
    return this;
  }

  /**
   * Clean up memory
   * @return {Taggd} Current Taggd instance
   */
  destroy() {
    const isCanceled = !this.emit('taggd.destroy', this);

    if (!isCanceled) {
      this.deleteTags();
    }

    return this;
  }

  /**
   * Enable editor mode
   * @return {Taggd} Current Taggd instance
   */
  enableEditorMode() {
    const isCanceled = !this.emit('taggd.editor.enable', this);

    if (!isCanceled) {
      this.image.addEventListener('click', this.imageClickHandler);
      this.getTags().forEach((tag) => tag.enableControls());
    }

    return this;
  }

  /**
   * Disable editor mode
   * @return {Taggd} Current Taggd instance
   */
  disableEditorMode() {
    const isCanceled = !this.emit('taggd.editor.disable', this);

    if (!isCanceled) {
      this.image.removeEventListener('click', this.imageClickHandler);
      this.getTags().forEach((tag) => tag.disableControls());
    }

    return this;
  }
}

/**
 * Default options for all Taggd instances
 * @const
 * @type {Object}
 * @ignore
 */
Taggd.DEFAULT_OPTIONS = {
  show: 'mouseenter',
  hide: 'mouseleave',
  hideDelay: 500,
};

module.exports = Taggd;
module.exports.Tag = Tag;

window.Taggd = module.exports;
