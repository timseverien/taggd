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

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('./util/event-emitter');
var ObjectIs = require('./util/object-is');
var TypeErrorMessage = require('./util/type-error-message');

var Tag = function (_EventEmitter) {
  _inherits(Tag, _EventEmitter);

  function Tag(position, text) {
    var buttonAttributes = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    var popupAttributes = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, Tag);

    if (!ObjectIs.ofType(position, 'object') || Array.isArray(position)) {
      throw new TypeError(TypeErrorMessage.getObjectMessage(position));
    } else if (!'x' in position || !'y' in position) {
      throw new Error(position + ' should have x and y property');
    }

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tag).call(this));

    _this.buttonElement = document.createElement('button');
    _this.buttonElement.classList.add('taggd__button');

    _this.popupElement = document.createElement('span');
    _this.popupElement.classList.add('taggd__popup');

    _this.buttonElement.appendChild(_this.popupElement);

    _this.isControlsEnabled = false;
    _this.inputLabelElement = undefined;
    _this.buttonSaveElement = undefined;
    _this.buttonDeleteElement = undefined;

    _this.buttonSaveElementClickHandler = function () {
      return _this.setText(_this.inputLabelElement.value);
    };
    _this.buttonDeleteElementClickHandler = function () {
      _this.emit('taggd.tag.doDelete', _this);
    };

    _this.text = undefined;

    _this.setButtonAttributes(buttonAttributes);
    _this.setPopupAttributes(popupAttributes);
    _this.setPosition(position.x, position.y);
    _this.setText(text);

    _this.hide();
    return _this;
  }

  /**
   * Show the tag
   * @return {Taggd.Tag} Current Tag
   */


  _createClass(Tag, [{
    key: 'show',
    value: function show() {
      var isCanceled = !this.emit('taggd.tag.show', this);

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

  }, {
    key: 'hide',
    value: function hide() {
      var isCanceled = !this.emit('taggd.tag.hide', this);

      if (!isCanceled) {
        this.popupElement.style.display = 'none';
        this.emit('taggd.tag.hidden', this);
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
      if (!ObjectIs.ofType(text, 'string') && !ObjectIs.function(text)) {
        throw new TypeError(TypeErrorMessage.getMessage(type, 'a string or a function'));
      }

      var isCanceled = !this.emit('taggd.tag.change', this);

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

  }, {
    key: 'setPosition',
    value: function setPosition(x, y) {
      if (!ObjectIs.number(x)) {
        throw new TypeError(TypeErrorMessage.getFloatMessage(x));
      }
      if (!ObjectIs.number(y)) {
        throw new TypeError(TypeErrorMessage.getFloatMessage(y));
      }

      var isCanceled = !this.emit('taggd.tag.change', this);

      if (!isCanceled) {
        var positionStyle = Tag.getPositionStyle(x, y);

        this.buttonElement.style.left = positionStyle.left;
        this.buttonElement.style.top = positionStyle.top;

        this.emit('taggd.tag.changed', this);
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

      if (!ObjectIs.ofType(attributes, 'object') || Array.isArray(attributes)) {
        throw new TypeError(TypeErrorMessage.getObjectMessage(attributes));
      }

      var isCanceled = !this.emit('taggd.tag.change', this);

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

  }, {
    key: 'setPopupAttributes',
    value: function setPopupAttributes() {
      var attributes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      if (!ObjectIs.ofType(attributes, 'object') || Array.isArray(attributes)) {
        throw new TypeError(TypeErrorMessage.getObjectMessage(attributes));
      }

      var isCanceled = !this.emit('taggd.tag.change', this);

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

  }, {
    key: 'enableControls',
    value: function enableControls() {
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
      return this;
    }

    /**
     * Disabled the tag controls
     * @return {Taggd.Tag} Current tag
     */

  }, {
    key: 'disableControls',
    value: function disableControls() {
      this.isControlsEnabled = false;

      this.inputLabelElement = undefined;
      this.buttonSaveElement = undefined;
      this.buttonDeleteElement = undefined;

      // Remove elements and set set content
      this.setText(this.text);
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

      if (!ObjectIs.ofType(attributes, 'object') || Array.isArray(attributes)) {
        throw new TypeError(TypeErrorMessage.getObjectMessage(attributes));
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
      if (!ObjectIs.number(x)) {
        throw new TypeError(TypeErrorMessage.getFloatMessage(x));
      }
      if (!ObjectIs.number(y)) {
        throw new TypeError(TypeErrorMessage.getFloatMessage(y));
      }

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
}(EventEmitter);

Tag.LABEL_NEW_TAG = 'New tag';
Tag.LABEL_BUTTON_SAVE = 'save';
Tag.LABEL_BUTTON_DELETE = 'delete';

module.exports = Tag;

},{"./util/event-emitter":6,"./util/object-is":7,"./util/type-error-message":8}],5:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tag = require('./Tag');
var EventEmitter = require('./util/event-emitter');
var ObjectIs = require('./util/object-is');
var TypeErrorMessage = require('./util/type-error-message');

Number.isInteger = Number.isInteger || require('number-is-integer');

/**
 * @todo:
 * - Set ARIA roles
 */

var Taggd = function (_EventEmitter) {
  _inherits(Taggd, _EventEmitter);

  /**
   * Create a new taggd instance
   * @param {HTMLElement} image - The image to wrap
   * @param {Object} options = {} - The options
   * @param {Array} data = [] - The tags
   */

  function Taggd(image) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var data = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    _classCallCheck(this, Taggd);

    if (!image instanceof Element) {
      throw new TypeError(TypeErrorMessage.getMessage(image, Element));
    }

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Taggd).call(this));

    _this.wrapper = document.createElement('div');
    _this.wrapper.classList.add('taggd');

    image.classList.add('taggd__image');

    image.parentElement.insertBefore(_this.wrapper, image);
    image.parentElement.removeChild(image);
    _this.wrapper.appendChild(image);

    _this.image = image;
    _this.options = {};
    _this.tags = [];

    _this.imageClickHandler = function (e) {
      var position = {
        x: e.clientX / _this.image.width,
        y: e.clientY / _this.image.height
      };

      var tag = new Tag(position, Tag.LABEL_NEW_TAG);
      tag.enableControls();

      _this.addTag(tag);
    };

    _this.setOptions(options);
    _this.setTags(data);
    return _this;
  }

  /**
   * Set taggd options
   * @param {Object} options - The options to set
   * @return {Taggd} Current Taggd instance
   */


  _createClass(Taggd, [{
    key: 'setOptions',
    value: function setOptions(options) {
      if (!ObjectIs.ofType(options, 'object') || Array.isArray(options)) {
        throw new TypeError(TypeErrorMessage.getObjectMessage(tag));
      }

      this.options = _extends(this.options, Taggd.DEFAULT_OPTIONS, options);
      return this;
    }

    /**
     * Add a single tag
     * @param {Taggd.Tag} tag - The tag to add
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'addTag',
    value: function addTag(tag) {
      var _this2 = this;

      if (!ObjectIs.ofInstance(tag, Tag)) {
        throw new TypeError(TypeErrorMessage.getTagMessage(tag));
      }

      var isCanceled = !this.emit('taggd.tag.add', this, tag);

      if (!isCanceled) {
        // Add events to show/hide tags
        tag.buttonElement.addEventListener(this.options.show, function () {
          return tag.show();
        });
        tag.buttonElement.addEventListener(this.options.hide, function () {
          return tag.hide();
        });

        // Route all tag events through taggd instance
        tag.onAnything(function (eventName) {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          _this2.emit.apply(_this2, [eventName, _this2].concat(args));
        });

        tag.once('taggd.tag.doDelete', function (tag) {
          var tagIndex = _this2.tags.indexOf(tag);

          if (tagIndex >= 0) {
            _this2.deleteTag(tagIndex);
          }
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
      var isCanceled = !this.emit('taggd.tag.delete', this, tag);

      if (!isCanceled) {
        this.wrapper.removeChild(tag.buttonElement);
        this.tags.splice(tag, 1);

        this.emit('taggd.tag.deleted', this, tag);
      }

      return this;
    }

    /**
     * Set all tags
     * @param {Taggd.Tag[]} tags An array of tags
     * @return {Taggd} Current Taggd instance
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
      var _this3 = this;

      if (!Array.isArray(tags)) {
        throw new TypeError(TypeErrorMessage.getArrayMessage(tags, 'Taggd.Tag'));
      }

      tags.forEach(function (tag) {
        return _this3.addTag(tag);
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
      var isCanceled = !this.emit('taggd.destroy', this);

      if (!isCanceled) {
        this.deleteTags();
      }

      return this;
    }

    /**
     * Enable editor mode
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'enableEditorMode',
    value: function enableEditorMode() {
      var isCanceled = !this.emit('taggd.editor.enable', this);

      if (!isCanceled) {
        this.image.addEventListener('click', this.imageClickHandler);
        this.getTags().forEach(function (tag) {
          return tag.enableControls();
        });
      }

      return this;
    }

    /**
     * Disable editor mode
     * @return {Taggd} Current Taggd instance
     */

  }, {
    key: 'disableEditorMode',
    value: function disableEditorMode() {
      var isCanceled = !this.emit('taggd.editor.disable', this);

      if (!isCanceled) {
        this.image.removeEventListener('click', this.imageClickHandler);
        this.getTags().forEach(function (tag) {
          return tag.disableControls();
        });
      }

      return this;
    }
  }]);

  return Taggd;
}(EventEmitter);

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

},{"./Tag":4,"./util/event-emitter":6,"./util/object-is":7,"./util/type-error-message":8,"number-is-integer":2}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EVENT_WILDCARD = '*';

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.handlers = {};
  }

  _createClass(EventEmitter, [{
    key: 'onAnything',
    value: function onAnything(handler) {
      this.on(EVENT_WILDCARD, handler);
    }
  }, {
    key: 'on',
    value: function on(eventName, handler) {
      if (!this.handlers[eventName]) {
        this.handlers[eventName] = [];
      }

      this.handlers[eventName].push(handler);
    }
  }, {
    key: 'off',
    value: function off(eventName, handler) {
      if (!this.handlers[eventName]) return;

      var handlerIndex = this.handlers[eventName].indexOf(handler);

      if (handlerIndex >= 0) {
        this.handlers[eventName].splice(handlerIndex, 1);
      }
    }
  }, {
    key: 'once',
    value: function once(eventName, handler) {
      var _this = this;

      this.on(eventName, function () {
        handler.apply(undefined, arguments);
        _this.off(eventName, handler);
      });
    }
  }, {
    key: 'emit',
    value: function emit(eventName) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var isCanceled = false;

      if (this.handlers[EVENT_WILDCARD]) {
        this.handlers[EVENT_WILDCARD].forEach(function (eventHandler) {
          var returnValue = eventHandler.apply(undefined, [eventName].concat(args));
          isCanceled = returnValue !== undefined && !returnValue || isCanceled;
        });
      }

      if (this.handlers[eventName]) {
        this.handlers[eventName].forEach(function (eventHandler) {
          var returnValue = eventHandler.apply(undefined, args);
          isCanceled = returnValue !== undefined && !returnValue || isCanceled;
        });
      }

      return !isCanceled;
    }
  }]);

  return EventEmitter;
}();

module.exports = EventEmitter;

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
   * Get the TypeError Float message
   * @param {Object} object - The tested object
   * @return {String} The error message
   */
  getFloatMessage: function getFloatMessage(object) {
    return this.getTypeErrorMessage(object, 'a floating number');
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
