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
  .when('/doi', {
    templateUrl: 'views/bib.html',
    controller: 'BibCtrl'
  })
  .when('/doi/:doi*', {
    templateUrl: 'views/bib.html',
    controller: 'BibCtrl'
  })
  .otherwise({
    redirectTo: '/doi'
  });
}])
.service('locationChanger', ['$rootScope', '$route', '$location', function($rootScope, $route, $location) {
  this.navigateWithoutReload = function(url) {
    var lastRoute, unsub;
    $location.url(url);
    lastRoute = $route.current;
    unsub = $rootScope.$on('$locationChangeSuccess', function() {
        $route.current = lastRoute; // fake this to make the route logic think nothing changed
        unsub();
    });
  };
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
