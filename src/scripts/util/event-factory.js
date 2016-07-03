class EventFactory {
  /**
   * Create a new event for a specific tag
   * @param {String} eventName - The event name
   * @param {Taggd} taggd - The Taggd instance
   * @param {Tag} [tag] - The Tag instance
   * @return {CustomEvent} The created event
   */
  static createTaggdEvent(eventName, taggd, tag = undefined) {
    const detail = { taggd };

    if (tag) {
      detail['tag'] = tag;
    }

    return new CustomEvent(eventName, {
      bubbles: true,
      detail,
    });
  }

  /**
   * Create a new event for a specific tag
   * @param {String} eventName - The event name
   * @param {Taggd} taggd - The Taggd instance
   * @param {Tag} [tag] - The Tag instance
   * @return {CustomEvent} The created event
   */
  static createCancelableTaggdEvent(eventName, taggd, tag = undefined) {
    const detail = { taggd };

    if (tag) {
      detail['tag'] = tag;
    }

    return new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      detail,
    });
  }

  /**
   * Create a new event for a specific tag
   * @param {String} eventName - The event name
   * @param {Tag} tag - The Tag instance
   * @return {CustomEvent} The created event
   */
  static createTagEvent(eventName, tag) {
    return new CustomEvent(eventName, {
      bubbles: true,
      detail: {
        tag,
      },
    });
  }

  /**
   * Create a new event for a specific tag
   * @param {String} eventName - The event name
   * @param {Tag} tag - The Tag instance
   * @return {CustomEvent} The created event
   */
  static createCancelableTagEvent(eventName, tag) {
    return new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      detail: {
        tag,
      },
    });
  }
}

module.exports = EventFactory;
