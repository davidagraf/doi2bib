'use strict';

var 
querystring = require('querystring'),
Q = require('q'),
request = require('request'),
xml2js = require('xml2js'),
path = require('JSONPath'),

crossRefKey = 'fx.coudert@chimie-paristech.fr', // TODO ?
doi = '10.1158/0008-5472.CAN-09-1089',

params = {
  'id' : 'doi:' + doi,
  'noredirect' : 'true',
  'pid' : crossRefKey,
  'format' : 'unixref'
};

(function() {
  var deferred = Q.defer();
  request('http://www.crossref.org/openurl?' + querystring.stringify(params),
          function(error, response, body) {
    xml2js.parseString(body, {trim: true, explicitArray: false}, function(err, result){
      deferred.resolve(result);
    });
  });
  return deferred.promise;
})()
.then(function(crossref) {
  console.log(JSON.stringify(crossref, null, 2));
});
