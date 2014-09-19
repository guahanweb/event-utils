var gulp = require('./gulp')({
    'clean': [],
    'jshint': [],
    'test': [],

    'build': ['clean', 'jshint', 'test']
});

gulp.task('default', []);
gulp.task('release', ['build']);
