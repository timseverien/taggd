(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var numberIsNan = require('number-is-nan');

module.exports = Number.isFinite || function (val) {
	return !(typeof val !== 'number' || numberIsNan(val) || val === Infinity || val === -Infinity);
};

},{"number-is-nan":3}],2:[function(require,module,exports){
'use strict';
var numberIsFinite = require('is-finite');

module.exports = Number.isInteger || function (x) {
	return numberIsFinite(x) && Math.floor(x) === x;
};

},{"is-finite":1}],3:[function(require,module,exports){
'use strict';
module.exports = Number.isNaN || function (x) {
	return x !== x;
};

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventFactory = require('./util/event-factory');
var ObjectIs = require('./util/object-is');
var TypeErrorMessage = require('./util/type-error-message');

/**
 * @todo:
 * - Set custom data (for use in user-defined event handlers)
 */

var Tag = function () {
  function Tag(position, text) {
    var buttonAttributes = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    var popupAttributes = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, Tag);

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


  _createClass(Tag, [{
    key: 'show',
    value: function show() {
      var showEvent = EventFactory.createCancelableTagEvent('taggd.tag.show', this);
      var isCanceled = !this.popupElement.dispatchEvent(showEvent);

      if (!isCanceled) {
        this.popupElement.style.display = '';

        var shownEvent = EventFactory.createTagEvent('taggd.tag.shown', this);
        this.popupElement.dispatchEvent(shownEvent);
      }

      return this;
    }

    /**
     * Hide the tag
     * @return {Taggd.Tag} Current Tag
     */

  }, {
    key: 'hide',
    value: function hide() {
      var hideEvent = EventFactory.createCancelableTagEvent('taggd.tag.hide', this);
      var isCanceled = !this.popupElement.dispatchEvent(hideEvent);

      if (!isCanceled) {
        this.popupElement.style.display = 'none';

        var hiddenEvent = EventFactory.createTagEvent('taggd.tag.hidden', this);
        this.popupElement.dispatchEvent(hiddenEvent);
      }

      return this;
    }

    /**
     * Set the tag’s text
     * @param {String} text - The tag’s content
     * @return {Taggd.Tag} Current Tag
     */

  }, {
    key: 'setText',
    value: function setText(text) {
      if (!ObjectIs.ofType(text, 'string') && ObjectIs.function(text)) {
        throw new Error(TypeErrorMessage.getMessage(type, 'a string or a function'));
      }

      var changeEvent = EventFactory.createCancelableTagEvent('taggd.tag.change', this);
      var isCanceled = !this.popupElement.dispatchEvent(changeEvent);

      if (!isCanceled) {
        if (ObjectIs.function(text)) {
          this.popupElement.innerHTML = text(this);
        } else {
          this.popupElement.innerHTML = text;
        }

        var changedEvent = EventFactory.createTagEvent('taggd.tag.changed', this);
        this.popupElement.dispatchEvent(changedEvent);
      }

      return this;
    }

    /**
     * Set the tag’s position
     * @param {Number} x - The tag’s x-coordinate
     * @param {Number} y - The tag’s y-coordinate
     * @return {Taggd.Tag} Current Tag
     */

  }, {
    key: 'setPosition',
    value: function setPosition(x, y) {
      if (!ObjectIs.number(x)) {
        throw new Error(TypeErrorMessage.getIntegerMessage(x));
      }
      if (!ObjectIs.number(y)) {
        throw new Error(TypeErrorMessage.getIntegerMessage(y));
      }

      var changeEvent = EventFactory.createCancelableTagEvent('taggd.tag.change', this);
      var isCanceled = !this.popupElement.dispatchEvent(changeEvent);

      if (!isCanceled) {
        var positionStyle = Tag.getPositionStyle(x, y);
        this.popupElement.style.left = positionStyle.left;
        this.popupElement.style.top = positionStyle.top;

        var changedEvent = EventFactory.createTagEvent('taggd.tag.changed', this);
        this.popupElement.dispatchEvent(changedEvent);
      }

      return this;
    }

    /**
     * Set the tag button’s attributes
     * @param {Object} atttributes - The attributes to set
     * @return {Taggd.Tag} Current tag
     */

  }, {
    key: 'setButtonAttributes',
    value: function setButtonAttributes() {
      var attributes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var changeEvent = EventFactory.createCancelableTagEvent('taggd.tag.change', this);
      var isCanceled = !this.buttonElement.dispatchEvent(changeEvent);

      if (!isCanceled) {
        Tag.setElementAttributes(this.buttonElement, attributes);

        var changedEvent = EventFactory.createTagEvent('taggd.tag.changed', this);
        this.buttonElement.dispatchEvent(changedEvent);
      }

      return this;
    }

    /**
     * Set the tag popup’s attributes
     * @param {Object} atttributes - The attributes to set
     * @return {Taggd.Tag} Current tag
     */

  }, {
    key: 'setPopupAttributes',
    value: function setPopupAttributes() {
      var attributes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var changeEvent = EventFactory.createCancelableTagEvent('taggd.tag.change', this);
      var isCanceled = !this.popupElement.dispatchEvent(changeEvent);

      if (!isCanceled) {
        Tag.setElementAttributes(this.popupElement, attributes);

        var changedEvent = EventFactory.createTagEvent('taggd.tag.changed', this);
        this.popupElement.dispatchEvent(changedEvent);
      }

      return this;
    }

    /**
     * Set element attributes
     * @param {DomNode} element - The element the attributes should be set to
     * @param {Object} attributes = {} - A map of attributes to set
     * @return {DomNode} The original element
     */

  }], [{
    key: 'setElementAttributes',
    value: function setElementAttributes(element) {
      var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (!ObjectIs.ofType(attributes, 'object')) {
        throw new Error(TypeErrorMessage.getObjectMessage(attributes));
      }

      for (var attribute in attributes) {
        var value = attributes[attribute];

        if (attribute === 'class' && element.getAttribute(attribute)) {
          var classValue = element.getAttribute(attribute) + (' ' + value);
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

  }, {
    key: 'getPositionStyle',
    value: function getPositionStyle(x, y) {
      return {
        left: x * 100 + '%',
        top: y * 100 + '%'
      };
    }

    /**
     * Create a tag from object
     * @param {Object} object - The object containing all information
     * @return {Tag} The created Tag instance
     */

  }, {
    key: 'createFromObject',
    value: function createFromObject(object) {
      return new Tag(object.position, object.text, object.buttonAttributes, object.popupAttributes);
    }
  }]);

  return Tag;
}();

module.exports = Tag;

},{"./util/event-factory":6,"./util/object-is":7,"./util/type-error-message":8}],5:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tag = require('./Tag');
var EventFactory = require('./util/event-factory');
var ObjectIs = require('./util/object-is');
var TypeErrorMessage = require('./util/type-error-message');

Number.isInteger = Number.isInteger || require('number-is-integer');

/**
 * @todo:
 * - Editor mode
 * 	 - Enable/disable mode
 * 	 - Save/delete button configuration
 * 	 - Trigger events upon creation/deletion
 * - Set ARIA roles
 */

var Taggd = function () {
  function Taggd(image) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var data = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    _classCallCheck(this, Taggd);

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('taggd');

    this.wrapper.insertBefore(image);
    image.parentElement.removeChild(image);
    this.wrapper.appendChild(image);

    this.image = image;
    this.tags = [];

    this.setOptions(options);
    this.setTags(data);

    var initEvent = EventFactory.createTaggdEvent('taggd.init', this);
    this.image.dispatchEvent(initEvent);
  }

  _createClass(Taggd, [{
    key: 'setOptions',
    value: function setOptions(options) {
      if (!ObjectIs.ofType(options, 'object')) {
        throw new TypeError(TypeErrorMessage.getObjectMessage(tag));
      }

      this.options = _extends({}, Taggd.DEFAULT_OPTIONS, options);
    }

    /**
     * Add a single tag
     * @param {Taggd.Tag} tag - The tag to add
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'addTag',
    value: function addTag(tag) {
      if (!ObjectIs.ofInstance(tag, Tag)) {
        throw new TypeError(TypeErrorMessage.getTagMessage(tag));
      }

      var addEvent = EventFactory.createCancelableTaggdEvent('taggd.tag.add', this, tag);
      var isCanceled = !this.image.dispatchEvent(addEvent);

      if (!isCanceled) {
        // Add events to show/hide tags
        tag.buttonElement.addEventListener(this.options.show, function () {
          return tag.show();
        });
        tag.buttonElement.addEventListener(this.options.hide, function () {
          return tag.hide();
        });

        this.tags.push(tag);
        this.wrapper.appendChild(tag.buttonElement);
        this.wrapper.appendChild(tag.popupElement);

        var addedEvent = EventFactory.createTaggdEvent('taggd.tag.added', this, tag);
        this.image.dispatchEvent(addedEvent);
      }

      return this;
    }

    /**
     * Get a single tag by index
     * @param  {Number} index - The index of the desired tag
     * @return {Taggd.Tag} The tag to get
     */

  }, {
    key: 'getTag',
    value: function getTag(index) {
      if (!Number.isInteger(index)) {
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

  }, {
    key: 'deleteTag',
    value: function deleteTag(index) {
      if (!Number.isInteger(index)) {
        throw new TypeError(TypeErrorMessage.getIntegerMessage(index));
      }

      if (!this.tags[index]) {
        throw new Error('Tag at index ' + index + ' does not exist.');
      }

      var tag = this.tags[index];
      var deleteEvent = EventFactory.createCancelableTaggdEvent('taggd.tag.delete', this, tag);
      var isCanceled = !this.image.dispatchEvent(deleteEvent);

      if (!isCanceled) {
        this.wrapper.removeChild(tag.buttonElement);
        this.wrapper.removeChild(tag.popupElement);
        this.tags.splice(tag, 1);

        var deletedEvent = EventFactory.createTaggdEvent('taggd.tag.deleted', this, tag);
        this.image.dispatchEvent(deletedEvent);
      }

      return this;
    }

    /**
     * Set all tags
     * @param {Taggd.Tag[]} tags An array of tags
     */

  }, {
    key: 'setTags',
    value: function setTags(tags) {
      this.deleteTags();
      this.addTags(tags);
      return this;
    }

    /**
     * Add multiple tags
     * @param {Taggd.Tag[]} tags - An array of tags
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'addTags',
    value: function addTags(tags) {
      var _this = this;

      if (!Array.isArray(tags)) {
        throw new TypeError(TypeErrorMessage.getArrayMessage(tags, 'Taggd.Tag'));
      }

      tags.forEach(function (tag) {
        return _this.addTag(tag);
      });
      return this;
    }

    /**
     * Get all tags
     * @return {Taggd.Tag[]} All tags of this Taggd instance
     */

  }, {
    key: 'getTags',
    value: function getTags() {
      return this.tags;
    }

    /**
     * Remove all tags
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'deleteTags',
    value: function deleteTags() {
      this.tags.slice(0, this.tags.length);
      return this;
    }

    /**
     * Iterate and replace all tags
     * @param {Function} callback - The callback to execute for all tags
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'map',
    value: function map(callback) {
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

  }, {
    key: 'destroy',
    value: function destroy() {
      var destroyEvent = EventFactory.createTaggdEvent('taggd.destroy', this);
      var isCanceled = !this.image.dispatchEvent(destroyEvent);

      if (!isCanceled) {
        this.deleteTags();
      }
    }

    /**
     * Enable editor mode
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'enableEditorMode',
    value: function enableEditorMode() {
      var enableEditorEvent = EventFactory.createTaggdEvent('taggd.editor.enable', this);
      var isCanceled = !this.image.dispatchEvent(enableEditorEvent);

      if (!isCanceled) {
        // TODO: Enable editor mode
      }
    }

    /**
     * Disable editor mode
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'disableEditorMode',
    value: function disableEditorMode() {
      var disableEditorEvent = EventFactory.createTaggdEvent('taggd.editor.disable', this);
      var isCanceled = !this.image.dispatchEvent(disableEditorEvent);

      if (!isCanceled) {
        // TODO: Enable editor mode
      }
    }
  }]);

  return Taggd;
}();

/**
 * Default options for all Taggd instances
 * @type {Object}
 */


Taggd.DEFAULT_OPTIONS = {
  show: 'mouseenter',
  hide: 'mouseleave'
};

module.exports = Taggd;
module.exports.Tag = Tag;

window.Taggd = module.exports;

},{"./Tag":4,"./util/event-factory":6,"./util/object-is":7,"./util/type-error-message":8,"number-is-integer":2}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventFactory = function () {
  function EventFactory() {
    _classCallCheck(this, EventFactory);
  }

  _createClass(EventFactory, null, [{
    key: 'createTaggdEvent',

    /**
     * Create a new event for a specific tag
     * @param {String} eventName - The event name
     * @param {Taggd} taggd - The Taggd instance
     * @param {Tag} [tag] - The Tag instance
     * @return {CustomEvent} The created event
     */
    value: function createTaggdEvent(eventName, taggd) {
      var tag = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

      var detail = { taggd: taggd };

      if (tag) {
        detail['tag'] = tag;
      }

      return new CustomEvent(eventName, {
        bubbles: true,
        detail: detail
      });
    }

    /**
     * Create a new event for a specific tag
     * @param {String} eventName - The event name
     * @param {Taggd} taggd - The Taggd instance
     * @param {Tag} [tag] - The Tag instance
     * @return {CustomEvent} The created event
     */

  }, {
    key: 'createCancelableTaggdEvent',
    value: function createCancelableTaggdEvent(eventName, taggd) {
      var tag = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

      var detail = { taggd: taggd };

      if (tag) {
        detail['tag'] = tag;
      }

      return new CustomEvent(eventName, {
        bubbles: true,
        cancelable: true,
        detail: detail
      });
    }

    /**
     * Create a new event for a specific tag
     * @param {String} eventName - The event name
     * @param {Tag} tag - The Tag instance
     * @return {CustomEvent} The created event
     */

  }, {
    key: 'createTagEvent',
    value: function createTagEvent(eventName, tag) {
      return new CustomEvent(eventName, {
        bubbles: true,
        detail: {
          tag: tag
        }
      });
    }

    /**
     * Create a new event for a specific tag
     * @param {String} eventName - The event name
     * @param {Tag} tag - The Tag instance
     * @return {CustomEvent} The created event
     */

  }, {
    key: 'createCancelableTagEvent',
    value: function createCancelableTagEvent(eventName, tag) {
      return new CustomEvent(eventName, {
        bubbles: true,
        cancelable: true,
        detail: {
          tag: tag
        }
      });
    }
  }]);

  return EventFactory;
}();

module.exports = EventFactory;

},{}],7:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports = {
  /**
   * Check wheter an object is an instance of type
   * @param {Object} object - The object to test
   * @param {Object} type - The class to test
   * @return {Boolean}
   */
  ofInstance: function ofInstance(object, type) {
    return object instanceof type;
  },

  /**
   * Check whether an object is equals to given type
   * @param {Object} object - The object to test
   * @param {String} type - The type to test
   * @return {Boolean}
   */
  ofType: function ofType(object, type) {
    return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === type;
  },

  /**
   * Check whether given object is a function
   * @param {Object} object - The object to test
   * @return {Boolean}
   */
  function: function _function(object) {
    return typeof object === 'function';
  },

  /**
   * Check whether given object is a Number
   * @param {Object} object - The object to test
   * @return {Boolean}
   */
  number: function number(object) {
    return !isNaN(parseFloat(object));
  }
};

},{}],8:[function(require,module,exports){
'use strict';

var TypeErrorMessage = {
  /**
   * Get the TypeError message
   * @param {Object} object - The tested object
   * @param {String} expectedType - A string describing the expected type
   * @return {String} The error message
   */
  getMessage: function getMessage(object, expectedType) {
    return object + ' should be ' + expectedType;
  },

  /**
   * Get the TypeError Array message
   * @param {Object} object - The tested object
   * @param {String} expectedType - The expected type of all array items
   * @return {String} The error message
   */
  getArrayMessage: function getArrayMessage(object, expectedType) {
    if (expectedType) {
      return this.getTypeErrorMessage(object, 'an array of ' + expectedType);
    }
    return this.getTypeErrorMessage(object, 'an array');
  },

  /**
   * Get the TypeError Function message
   * @param {Object} object - The tested object
   * @return {String} The error message
   */
  getFunctionMessage: function getFunctionMessage(object) {
    return this.getTypeErrorMessage(object, 'a function');
  },

  /**
   * Get the TypeError Integer message
   * @param {Object} object - The tested object
   * @return {String} The error message
   */
  getIntegerMessage: function getIntegerMessage(object) {
    return this.getTypeErrorMessage(object, 'an integer');
  },

  /**
   * Get the TypeError Object message
   * @param {Object} object - The tested object
   * @return {String} The error message
   */
  getObjectMessage: function getObjectMessage(object) {
    return this.getTypeErrorMessage(object, 'an object');
  },

  /**
   * Get the TypeError Taggd.Tag message
   * @param {Object} object - The tested object
   * @return {String} The error message
   */
  getTagMessage: function getTagMessage(object) {
    return this.getTypeErrorMessage(object, 'a tag');
  },

  /**
   * Get TypeError message
   * @param {Object} object - The tested object
   * @param {String} message - The type message
   * @return {String} The error message
   */
  getTypeErrorMessage: function getTypeErrorMessage(object, message) {
    return object + ' is not a ' + message;
  }
};

module.exports = TypeErrorMessage;

},{}]},{},[5]);
