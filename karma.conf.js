module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'dest/taggd.js',
      'tests/functions.js',
      'tests/units/*.js',
      'tests/behavior/*.js',

      {
        pattern: 'tests/assets/**/*.jpg',
        watched: false,
        included: false,
        served: true,
        nocache: false,
      },
    ],
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity,
    preprocessors: {
      'dest/taggd.js': 'coverage',
    },
  });
};
