module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'dist/taggd.js',
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
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    preprocessors: {
      'dist/taggd.js': 'coverage',
    },
    coverageReporter: {
      reporters: [
        // CLI output
        { type: 'text' },
        // Report to submit to Coveralls
        {
          type: 'lcov',
          dir: 'coverage',
          subdir: '.',
        },
      ],
    },
  });
};
