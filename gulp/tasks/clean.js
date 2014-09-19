var gulp = require('gulp');
var gutil = require('gulp-util');
var spawn = require('child_process').spawn;

module.exports = function (cb) {
    var cmd = spawn('rm', ['-rf', process.cwd() + '/dist/lib']);
    cmd.on('close', function (code, signal) {
        if (code !== 0) {
            gutil.log("CLEAN: " + e.message);
            process.exit(code);
        }

        cb();
    });
};