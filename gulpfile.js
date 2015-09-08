'use strict';

var gulp = require('gulp');
var debug = require('gulp-debug');
var fs = require('fs');
var protractor = require('gulp-protractor').protractor;
/*jshint camelcase: false */
var webdriverUpdate = require('gulp-protractor').webdriver_update;
/*jshint camelcase: true */
var check = require('check-dependencies');

// load plugins
var $ = require('gulp-load-plugins')();

// check if dependencies are ok
check({
  checkGitUrls: true
}, function(result) {
  // Print the logged errors if dependencies are not ok
  if (!result.depsWereOk && result.error) {
    result.error.forEach(function(message) {
      console.error(message);
    });
    process.exit(result.status);
  }
});

gulp.task('jshint', function () {
    return gulp.src(['*.js', 'app/**/*.js', 'public/scripts/**/*.js', 'test/**/*.js'])
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')));
});

gulp.task('serve', ['jison'], function () {
  $.nodemon({ script: 'app/server.js'});

  gulp.watch('./utils/*.jison', ['jison']);
});

gulp.task('debug', ['jison'], function () {
  $.run('iron-node app/server.js').exec();

  gulp.watch('./utils/*.jison', ['jison']);
});

gulp.task('distapp', function() {
  return gulp.src('app/**/*.js').pipe(gulp.dest('dist/app')).pipe($.size());
});

gulp.task('distpublic', ['jshint', 'jison'], function () {
    var assets = $.useref.assets({searchPath: ['public', '.tmp/public']});
    var jsFilter = $.filter('**/*.js', {restore: true});
    var cssFilter = $.filter('**/*.css', {restore: true});

    return gulp.src('public/**/*.html')
        .pipe(assets)
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist/public'))
        .pipe($.size());
});

gulp.task('distpackage', function() {
  // TODO do it the gulp way
  fs.readFile('package.json', function (err, data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    data = JSON.parse(data);
    data.devDependencies = [];

    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist');
    }
    fs.writeFile('dist/package.json', JSON.stringify(data, null, 2), function(err) {
      if (err) {
        console.log(err);
      }
    });
  });
});

gulp.task('distimages', function () {
    return gulp.src('public/imgs/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/public/imgs'))
        .pipe($.size());
});

gulp.task('distfonts', function () {
    return gulp.src('public/bower_components/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe($.flatten())
        .pipe(gulp.dest('dist/public/fonts'))
        .pipe($.size());
});

gulp.task('jison', function() {
    return gulp.src('./utils/*.jison')
        .pipe($.jison({moduleName: 'bibparser', moduleType: 'js'}))
        .pipe(gulp.dest('./.tmp/public/scripts/lib'));
});

gulp.task('dist', ['distapp', 'distpublic', 'distpackage', 'distfonts', 'distimages']);

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('webdriver:update', webdriverUpdate);

gulp.task('protractor', ['webdriver:update', 'serve'], function() {
  return gulp.src('test/e2e/**/*.js')
    .pipe(protractor({
      configFile: 'test/protractor-conf.js'
    }))
    .on('error', function(e) {throw e;})
    .on('end', function() {
      process.exit(); // top process when testing is over
    });
});

gulp.task('test', ['jshint', 'protractor']);
