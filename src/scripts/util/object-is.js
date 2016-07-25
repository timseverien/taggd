module.exports = {
  /**
   * Check wheter an object is an instance of type
   * @param {Object} object - The object to test
   * @param {Object} type - The class to test
   * @return {Boolean}
   */
  ofInstance: (object, type) => object instanceof type,

  /**
   * Check whether an object is equals to given type
   * @param {Object} object - The object to test
   * @param {String} type - The type to test
   * @return {Boolean}
   */
  ofType: (object, type) => typeof object === type,

  /**
   * Check whether given object is a function
   * @param {Object} object - The object to test
   * @return {Boolean}
   */
  function: (object) => typeof object === 'function',

  /**
   * Check whether given object is a Number
   * @param {Object} object - The object to test
   * @return {Boolean}
   */
  number: (object) => !Number.isNaN(Number.parseFloat(object)),
};
