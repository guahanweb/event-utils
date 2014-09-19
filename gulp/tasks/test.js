var gulp = require('gulp');
var gutil = require('gulp-util');
var karma = require('gulp-karma');

var files = [
    "src/**/*.js",
    "test/**/*.spec.js"
];

module.exports = function () {
    return gulp.src(files)
        .pipe(karma({
            configFile: process.cwd() + '/test/karma.conf.js',
            action: 'run'
        }))
        .on('error', function (e) {
            gutil.log("Test failed: " + e.message);
            process.exit(1);
        });
};
