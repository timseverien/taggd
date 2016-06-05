var TypeErrorMessage = {
  /**
   * Get the TypeError message
   * @param {Object} object - The tested object
   * @param {String} expectedType - A string describing the expected type
   * @return {String} The error message
   */
  getMessage: function (object, expectedType) {
    return `${object} should be ${expectedType}`;
  },

  /**
   * Get the TypeError Array message
   * @param {Object} object - The tested object
   * @param {String} expectedType - The expected type of all array items
   * @return {String} The error message
   */
  getArrayMessage: function (object, expectedType) {
    if (expectedType) {
      return this.getTypeErrorMessage(object, `an array of ${expectedType}`);
    }
    return this.getTypeErrorMessage(object, 'an array');
  },

  /**
   * Get the TypeError Function message
   * @param {Object} object - The tested object
   * @return {String} The error message
   */
  getFunctionMessage: function (object) {
    return this.getTypeErrorMessage(object, 'a function');
  },

  /**
   * Get the TypeError Integer message
   * @param {Object} object - The tested object
   * @return {String} The error message
   */
  getIntegerMessage: function (object) {
    return this.getTypeErrorMessage(object, 'an intenger');
  },

  /**
   * Get the TypeError Object message
   * @param {Object} object - The tested object
   * @return {String} The error message
   */
  getObjectMessage: function (object) {
    return this.getTypeErrorMessage(object, 'an object');
  },

  /**
   * Get the TypeError Taggd.Tag message
   * @param {Object} object - The tested object
   * @return {String} The error message
   */
   getTagMessage: function (object) {
     return this.getTypeErrorMessage(object, 'a tag');
   },

   /**
    * Get TypeError message
    * @param {Object} object - The tested object
    * @param {String} message - The type message
    * @return {String} The error message
    */
   getTypeErrorMessage: function(object, message) {
     return `${object} is not a ${message}`;
   }
};

module.exports = TypeErrorMessage;
