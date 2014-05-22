'use strict';

function Doi2BibController($scope, $http) {
  $scope.toBib = function() {
    //$scope.doi = '10.1158/0008-5472.CAN-09-1089';

    $http({ 
      method: 'GET',
      url: '/doi2bib',
      params: {
        doi: $scope.doi
      }
    }).
    success(function(data) {
      $scope.bib = data;
    }).
    error(function() {
    });
  };
}
