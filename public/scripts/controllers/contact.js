'use strict';

angular.module('Doi2BibApp')
.controller('ContactCtrl', ['$scope', '$http',
    function($scope, $http) {
  $scope.send = function() {
    $http({ 
      method: 'POST',
      url: '/feedback',
      params: {
        name: $scope.name,
        email: $scope.email,
        text: $scope.text
      }
    }).
    success(function() {
      console.log('success');
      $scope.name = $scope.email = $scope.text = '';
    }).
    error(function() {
      console.log('error');
    });
  };
}]);
