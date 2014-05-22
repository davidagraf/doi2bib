'use strict';

var express = require('express'),
    app = express(),

    doi2bib = require('./app/doi2bib');

app.use(express.static(__dirname + '/public'));

app.get('/doi2bib', function(req, res) {
  res.set('Content-Type', 'application/x-bibtex');
  doi2bib.doi2bib(req.query.doi).then(function(bib) {
    res.send(bib);
  });
});

app.listen(
  process.env.OPENSHIFT_NODEJS_PORT || 3000,
  process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  function() {
    console.log('node server started');
  }
);
