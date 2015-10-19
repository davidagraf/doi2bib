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
    var idToSend = $scope.doi;

    idToSend = idToSend.replace(/ /g, '');
    idToSend = idToSend.replace(/^https?:\/\/dx\.doi\.org\//i, '');

    if (idToSend.match(/^(doi:)?10\..+\/.+$/i)) {
      if (idToSend.match(/^doi:/i)) {
        idToSend = idToSend.substring(4);
      }
      url = '/doi2bib';
    } else if (idToSend.match(/^\d+$|^PMC\d+(\.\d+)?$/)) {
      url = '/pmid2bib';
    }
    else if (idToSend.match(/^(arxiv:)?\d+\.\d+(v(\d+))?/i)) {
      if (idToSend.match(/^arxiv:/i)) {
        idToSend = idToSend.substring(6);
      }
      url = '/arxivid2bib';
    }

    if(!url) {
      $scope.error = 'Invalid ID. Must be DOI, PMID, or arXiv ID (after 2007).';
    } else {
      $scope.workinprogress = true;
      $http({
        method: 'GET',
        url: url,
        params: {
          id: idToSend
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
