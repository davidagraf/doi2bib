'use strict';

var 
request = require('request'),

doi = '10.1158/0008-5472.CAN-09-1089',

options = {
  url: 'http://dx.doi.org/' + doi,
  headers: {
    'Accept': 'application/x-bibtex; charset=utf-8'
  }
};

request(options, function(error, response, body) {
  console.log(body); 
});
