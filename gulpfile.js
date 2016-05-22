const del = require('del');
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
};

const paths = {
  scripts: {
    src: `${DIR_SOURCE}/scripts/**/*.js`,
    dest: DIR_BUILD,
  },
  styles: {
    src: `${DIR_SOURCE}/styles/**/*.css`,
    dest: DIR_BUILD,
  },
};

function buildScripts() {
  return gulp.src(paths.scripts.src)
    .pipe($.sourcemaps.init())
    .pipe($.concat('taggd.js'))
    .pipe($.babel(OPTIONS_BABEL))
    .pipe(gulp.dest(paths.scripts.dest))
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
