'use strict';

var 
request = require('request'),
Q = require('q'),

doi2bibOptions = function(doi) {
  return {
    url: 'http://dx.doi.org/' + doi,
    headers: {
      'Accept': 'application/x-bibtex; charset=utf-8'
    }
  };
},
doi2bib = function(doi) {
  var deferred = Q.defer();
  request(doi2bibOptions(doi), function(error, response, body) {
    if (response.statusCode === 200) {
      deferred.resolve(body);
    } else {
      deferred.reject(response.statusCode);
    }
  });
  return deferred.promise;
},
pmid2doiOptions = function(pimd) {
  var options = {
    url: 'http://www.pubmedcentral.nih.gov/utils/idconv/v1.0/?format=json&ids=' + pimd,
    json: true
  };
  return options;
},
pmid2doi = function(pmid) {
  var deferred = Q.defer();
  request(pmid2doiOptions(pmid), function(error, response, body) {
    if (response.statusCode !== 200) {
      deferred.reject(response.statusCode);
    } else if (!body.records || !body.records.length > 0) {
      deferred.reject(204);
    } else {
      deferred.resolve(body.records[0].doi);
    }
  });
  return deferred.promise;
};

module.exports = {
  doi2bib: doi2bib,
  pmid2doi: pmid2doi
};
