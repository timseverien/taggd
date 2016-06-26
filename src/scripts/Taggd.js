const Tag = require('./Tag');
const ObjectIs = require('./util/object-is');
const TypeErrorMessage = require('./util/type-error-message');

/**
 * @todo:
 * - Handle options
 * - Create event handlers for editor mode
 */
class Taggd {
  constructor(image, options = {}, data = []) {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('taggd');

    this.wrapper.insertBefore(image);
    image.parentElement.removeChild(image);
    this.wrapper.appendChild(image);

    this.tags = [];

    this.setOptions(options);
    this.setTags(data);
  }

  setOptions(options) {
    if (!ObjectIs.ofType(options, 'object')) {
      throw new TypeError(TypeErrorMessage.getObjectMessage(tag));
    }

    this.options = options;
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

    this.tags.push(tag);
    this.wrapper.appendChild(tag.buttonElement);
    this.wrapper.appendChild(tag.popupElement);

    return this;
  }

  /**
   * Get a single tag by index
   * @param  {Number} index - The index of the desired tag
   * @return {Taggd.Tag} The tag to get
   */
  getTag(index) {
    if (Number.isInteger(index)) {
      throw new TypeError(TypeErrorMessage.getIntegerMessage(index));
    }

    return this.tags[index];
  }

  /**
   * Delete a single tag by index
   *
   * @param {Number} index - The index of the desired tag
   * @return {Taggd} Current Taggd instance
   */
  deleteTag(index) {
    if (Number.isInteger(index)) {
      throw new TypeError(TypeErrorMessage.getIntegerMessage(index));
    }

    const tag = this.tags.splice(index, 1);
    this.wrapper.removeChild(tag.buttonElement);
    this.wrapper.removeChild(tag.popupElement);

    return this;
  }

  /**
   * Set all tags
   * @param {Taggd.Tag[]} tags An array of tags
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
    this.deleteTags();
  }

  /**
   * Enable editor mode
   * @return {Taggd} Current Taggd instance
   */
  enableEditorMode() {

  }

  /**
   * Disable editor mode
   * @return {Taggd} Current Taggd instance
   */
  disableEditorMode() {

  }
}

module.exports = Taggd;
module.exports.Tag = Tag;

window.Taggd = module.exports;
