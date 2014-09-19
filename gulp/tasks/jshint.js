var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');

module.exports = function () {
    return gulp.src([
            "src/**/*.js"
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .on('error', function (e) {
            gutil.log('JSHINT: ' + e.message);
        });
};
