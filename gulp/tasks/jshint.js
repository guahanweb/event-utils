var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');

var cfg = require(process.cwd() + '/gulp/config.json');

module.exports = function () {
    return gulp.src(cfg.files.lint)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .on('error', function (e) {
            gutil.log('JSHINT: ' + e.message);
        });
};
