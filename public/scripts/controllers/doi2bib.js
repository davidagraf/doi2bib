'use strict';

var doi2BibApp = angular.module('Doi2BibApp',[]);

doi2BibApp.controller('Doi2BibController', ['$scope', '$http', 'Latex',
    function($scope, $http, Latex) {
  $scope.toBib = function() {
    $http({ 
      method: 'GET',
      url: '/doi2bib',
      params: {
        doi: $scope.doi
      }
    }).
    success(function(data) {
      $scope.bib = Latex.encode(Latex.removeNA(data));
      $scope.error = undefined;
    }).
    error(function(data/*, status, headers, config*/) {
      $scope.error = data;
      $scope.bib = undefined;
    });
  };
}]);
