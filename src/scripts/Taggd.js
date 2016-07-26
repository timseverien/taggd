const Tag = require('./Tag');
const EventEmitter = require('./util/event-emitter');
const ObjectIs = require('./util/object-is');
const TypeErrorMessage = require('./util/type-error-message');

class Taggd extends EventEmitter {
  /**
   * Create a new taggd instance
   * @param {HTMLElement} image - The image to wrap
   * @param {Object} [options = {}] - The [options]{@link https://doclets.io/timseverien/taggd/master/options}
   * @param {Array} [data = []] - The tags
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
      const position = {
        x: e.clientX / this.image.width,
        y: e.clientY / this.image.height,
      };

      const tag = new Tag(position, Tag.LABEL_NEW_TAG);
      tag.enableControls();

      this.addTag(tag);
    };

    this.setOptions(options);
    this.setTags(data);
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

    if (!isCanceled) {
      // Add events to show/hide tags
      tag.buttonElement.addEventListener(this.options.show, () => tag.show());
      tag.buttonElement.addEventListener(this.options.hide, () => tag.hide());

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
      this.wrapper.appendChild(tag.buttonElement);

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
      this.wrapper.removeChild(tag.buttonElement);
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
    this.tags.slice(0, this.tags.length);
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
 * @type {Object}
 */
Taggd.DEFAULT_OPTIONS = {
  show: 'mouseenter',
  hide: 'mouseleave',
};

module.exports = Taggd;
module.exports.Tag = Tag;

window.Taggd = module.exports;
