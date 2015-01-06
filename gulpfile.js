var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');

gulp.task('default', function() {
	return gulp.src('js/jquery.taggd.js')
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(rename('jquery.taggd.min.js'))
		.pipe(gulp.dest('./js'));
});