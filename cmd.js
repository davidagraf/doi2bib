'use strict';

var doi2bib = require('./app/doi2bib'),
    http = require('http'),
//    correctdoi = '10.1158/0008-5472.CAN-09-1089',
    brokendoi = 'dkalfjsdlkf';

console.log(http.STATUS_CODES[404] );
doi2bib.doi2bib(brokendoi).then(function(bib) {
  console.log(bib);
}, function(error) {
  console.log(http.STATUS_CODES[error]);
});
