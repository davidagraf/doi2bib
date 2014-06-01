'use strict';

angular.module('Doi2BibApp')
.controller('BibCtrl', ['$scope', '$http', 'Latex',
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
      $scope.bib = Latex.indentBib(Latex.encode(Latex.removeNA(data.trim())));
      $scope.error = undefined;
    }).
    error(function(data/*, status, headers, config*/) {
      $scope.error = data;
      $scope.bib = undefined;
    });
  };
}]);
