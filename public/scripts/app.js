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
  .when('/contact', {
    templateUrl: 'views/contact.html'
  })
  .otherwise({
    templateUrl: 'views/bib.html',
    controller: 'BibCtrl'
  });
}]);
