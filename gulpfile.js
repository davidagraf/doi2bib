'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('jshint', function () {
    return gulp.src(['*.js', 'app/**/*.js', 'public/scripts/**/*.js'])
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')));
});

gulp.task('serve', function () {
  $.nodemon({ script: 'server.js'});
});
