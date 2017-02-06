/* eslint arrow-body-style: 0 */

const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const del = require('del');
const source = require('vinyl-source-stream');

const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
  rename: {
    'gulp-uglify': 'minifyJs',
    'gulp-cssnano': 'minifyCss',
  },
});

const DIR_BUILD = 'dist';
const DIR_SOURCE = 'src';

const OPTIONS_BABEL = {
  presets: ['es2015', 'es2017'],
  plugins: ['transform-runtime'],
};
const OPTIONS_BROWSERIFY = {
  standalone: 'Taggd',
};

const paths = {
  scripts: {
    src: `${DIR_SOURCE}/scripts/**/*.js`,
    entry: `${DIR_SOURCE}/scripts/umd.js`,
    dest: DIR_BUILD,
  },
  styles: {
    src: `${DIR_SOURCE}/styles/**/*.css`,
    dest: DIR_BUILD,
  },
};

gulp.task('clean', () => {
  return del(DIR_BUILD);
});

gulp.task('build:scripts', () => {
  return browserify(OPTIONS_BROWSERIFY)
    .transform(babelify, OPTIONS_BABEL)
    .require(paths.scripts.entry, { entry: true })
    .bundle()
    .pipe(source('taggd.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.scripts.dest))

    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.minifyJs())
    .pipe($.rename('taggd.min.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('build:styles', () => {
  return gulp.src(paths.styles.src)
    .pipe($.sourcemaps.init())
    .pipe($.minifyCss())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('build', gulp.series('clean', gulp.parallel('build:scripts', 'build:styles')));
gulp.task('default', gulp.series('build'));

gulp.task('watch', gulp.series('build', () => {
  gulp.watch(paths.scripts.src, gulp.series('build:scripts'));
  gulp.watch(paths.styles.src, gulp.series('build:styles'));
}));
