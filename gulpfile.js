var gulp = require('./gulp')({
    'jshint': [],
    'test': []
});

gulp.task('default', []);
gulp.task('build', ['jshint', 'test']);
