'use strict';

angular.module('Doi2BibApp')
.controller('BibCtrl', ['$scope', '$http', 'Latex',
    function($scope, $http, Latex) {
  $scope.toBib = function() {
    $scope.workinprogress = true;
    $scope.error = $scope.bib = undefined;
    $http({ 
      method: 'GET',
      url: '/doi2bib',
      params: {
        doi: $scope.doi
      }
    }).
    success(function(data) {
      $scope.bib = Latex.indentBib(Latex.encode(Latex.removeNA(data.trim())));
      $scope.workinprogress = false;
    }).
    error(function(data/*, status, headers, config*/) {
      $scope.error = data;
      $scope.workinprogress = false;
    });
  };
}]);
