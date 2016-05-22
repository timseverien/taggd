module.exports = {
  /**
   * Check wheter an object is an instance of type
   * @param {Object} object - The object to test
   * @param {Object} type - The class to test
   * @return {Boolean}
   */
  ofInstance: (object, type) => {
    return object instanceof type;
  },

  /**
   * Check whether given object is a function
   * @param {Object} object - The object to test
   * @return {Boolean}
   */
  function: (object) => {
    return typeof object === 'function';
  },
};
