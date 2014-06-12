'use strict';

angular.module('Doi2BibApp')
.controller('BibCtrl', ['$scope', '$http', 'Bib',
    function($scope, $http, Bib) {
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
        try {
          var bib = new Bib(data);
          $scope.bib = bib.toPrettyString();
          ga('send', 'event', '/doi2bib success', $scope.doi);
        } catch (err) {
          $scope.error = err.message;
          ga('send', 'event', '/doi2bib error', $scope.doi, $scope.error);
        }
        $scope.workinprogress = false;
      }).
      error(function(data, status/*, headers, config*/) {
        $scope.error = data;
        $scope.workinprogress = false;
        ga('send', 'event', '/doi2bib error', $scope.doi, data, status);
      });
    }
  };
}]);
