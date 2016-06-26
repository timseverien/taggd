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

const DIR_BUILD = 'dest';
const DIR_SOURCE = 'src';

const OPTIONS_BABEL = {
  presets: ['es2015'],
  plugins: ['transform-object-assign'],
};

const paths = {
  scripts: {
    src: `${DIR_SOURCE}/scripts/**/*.js`,
    entry: `${DIR_SOURCE}/scripts/Taggd.js`,
    dest: DIR_BUILD,
  },
  styles: {
    src: `${DIR_SOURCE}/styles/**/*.css`,
    dest: DIR_BUILD,
  },
};

function buildScripts() {
  return browserify()
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
}

function buildStyles() {
  return gulp.src(paths.styles.src)
    .pipe($.sourcemaps.init())
    .pipe($.minifyCss())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
}

function clean() {
  return del(DIR_BUILD);
}

const build = gulp.series(clean, gulp.parallel(buildScripts, buildStyles));

gulp.task('default', build);
gulp.task('build', build);
gulp.task('build:scripts', buildScripts);
gulp.task('build:styles', buildStyles);
gulp.task('clean', clean);

gulp.task('watch', build, () => {
  gulp.watch(paths.scripts.src, buildScripts);
  gulp.watch(paths.styles.src, buildStyles);
});
