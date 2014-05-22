'use strict';

var 
  request = require('request'),
  Q = require('q'),


genOptions = function(doi) {
  return {
    url: 'http://dx.doi.org/' + doi,
    headers: {
      'Accept': 'application/x-bibtex; charset=utf-8'
    }
  };
};

module.exports = {
  doi2bib: function(doi) {
    var deferred = Q.defer();
    request(genOptions(doi), function(error, response, body) {
      deferred.resolve(body);
    });
    return deferred.promise;
  }
};
