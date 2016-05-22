const Tag = require('./Tag');
const ObjectIs = require('./util/object-is');
const TypeErrorMessage = require('./util/type-error-message');

/**
 * @todo:
 * - Alter existing DOM
 * - Handle options
 * - Create and add DOM for tags
 * - Create event handlers for editor mode
 */
class Taggd {
  constructor() {
    this.tags = [];
  }

  /**
   * Add a single tag
   * @param {Taggd.Tag} tag - The tag to add
   * @return {Taggd} Current Taggd instance
   */
  addTag(tag) {
    if (!ObjectIs.ofType(tag, Tag)) {
      throw new TypeError(TypeErrorMessage.getTagMessage(tag));
    }

    this.tags.push(tag);
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

    this.tags.splice(index, 1);
    return this;
  }

  /**
   * Set all tags
   * @param {Taggd.Tag[]} tags An array of tags
   */
  setTags(tags) {
    this.deleteTags()
    this.addTags(tags);
    return this;
  }

  /**
   * Add multiple tags
   * @param {Taggd.Tag[]} tags - An array of tags
   * @return {Taggd} Current Taggd instance
   */
  addTags(tags) {
    if (Array.isArray(tags)) {
      throw new TypeError(TypeErrorMessage.getArrayMessage(tags, 'Taggd.Tag'));
    }

    this.tags.forEach((tag) => this.addTag(tag));
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
    this.tags.length = 0;
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
