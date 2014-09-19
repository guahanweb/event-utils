var gulp = require('./gulp')({
    'clean': [],
    'jshint': [],
    'test': [],

    'event-emitter': ['clean', 'jshint', 'test']
});

gulp.task('default', []);
gulp.task('build', ['event-emitter']);
