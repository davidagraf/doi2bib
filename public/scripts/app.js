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
  .otherwise({
    templateUrl: 'views/bib.html',
    controller: 'BibCtrl'
  });
}]);
