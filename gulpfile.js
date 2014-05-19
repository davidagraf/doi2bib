'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('jshint', function () {
    return gulp.src('*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')));
});
