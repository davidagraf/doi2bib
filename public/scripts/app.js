'use strict';

angular.module('Doi2BibApp',['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/about', {
    templateUrl: 'views/about.html'
  })
  .when('/terms', {
    templateUrl: 'views/terms.html'
  })
  .when('/help', {
    templateUrl: 'views/help.html'
  })
  .otherwise({
    templateUrl: 'views/bib.html',
    controller: 'BibCtrl'
  });
}]);

// send all errors to google analytics
/* global window */
window.addEventListener('error', function(e) {
  ga(
    'send',
    'event',
    'js error',
    e.message,
    e.filename + ':  ' + e.lineno
  );
});
