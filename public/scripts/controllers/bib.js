'use strict';

angular.module('Doi2BibApp')
.controller('BibCtrl', ['$scope', '$http', '$timeout', '$routeParams', '$location', 'Bib', 'locationChanger',
    function($scope, $http, $timeout, $routeParams, $location, Bib, locationChanger) {

  if ($routeParams.doi) {
    $scope.doi = $routeParams.doi;
    $timeout(function() {
      $scope.toBib();
    });
  }


  $scope.toBib = function() {
    $scope.error = $scope.bib = $scope.url = undefined;
    var url;
    var doiToSend = $scope.doi;

    if (doiToSend.match(/^doi:/)) {
      doiToSend = doiToSend.substring(4);
    }

    if (doiToSend.match(/^10\..+\/.+$/)) {
      url = '/doi2bib';
    } else if (doiToSend.match(/^\d+$|^PMC\d+(\.\d+)?$/)) {
      url = '/pmid2bib';
    }

    if(!url) {
      $scope.error = 'Invalid ID. Must be DOI or PMID.';
    } else {
      $scope.workinprogress = true;
      $http({
        method: 'GET',
        url: url,
        params: {
          id: doiToSend
        }
      }).
      success(function(data) {
        try {
          var bib = new Bib(data);
          $scope.bib = bib.toPrettyString();
          $scope.url = bib.getURL();
          locationChanger.navigateWithoutReload('/doi/' + $scope.doi);
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
