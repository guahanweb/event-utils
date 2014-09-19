var gulp = require('gulp');
var gutil = require('gulp-util');
var insert = require('gulp-insert');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var util = require(process.cwd() + '/gulp/utils');

module.exports = function () {
    var license = util.license();

    return gulp.src(["src/**/*.js"])
        .pipe(insert.wrap(license, "\n"))
        .pipe(rename(function (path) {
            path.dirname = 'lib/' + path.dirname;
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(uglify())
        .on('error', function (e) {
            gutil.log("UGLIFY: " + e.message);
            process.exit(1);
        })
        .pipe(insert.wrap(license, "\n"))
        .pipe(rename(function (path) {
            path.extname = '.min.js'
        }))
        .pipe(gulp.dest('dist/'));
};