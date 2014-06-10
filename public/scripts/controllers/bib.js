'use strict';

angular.module('Doi2BibApp')
.controller('BibCtrl', ['$scope', '$http', 'Latex',
    function($scope, $http, Latex) {
  $scope.toBib = function() {
    $scope.error = $scope.bib = undefined;

    if($scope.bibForm.$invalid) {
      $scope.error = 'Invalid DOI';
    } else {
      $scope.workinprogress = true;
      $http({
        method: 'GET',
        url: '/doi2bib',
        params: {
          doi: $scope.doi
        }
      }).
      success(function(data) {
//        $scope.bib = Latex.indentBib(Latex.encode(Latex.removeNA(Latex.prettifyId(data.trim()))));
        $scope.bib = Latex.encode(Latex.removeNA(Latex.prettifyId(data.trim())));
        $scope.workinprogress = false;
        ga('send', 'event', '/doi2bib success', $scope.doi);
      }).
      error(function(data, status/*, headers, config*/) {
        $scope.error = data;
        $scope.workinprogress = false;
        ga('send', 'event', '/doi2bib error', $scope.doi, data, status);
      });
    }
  };
}]);
