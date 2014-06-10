'use strict';

var http = require('http'),
    express = require('express'),
    app = express(),
    env = process.env.NODE_ENV || 'development',

    doi2bib = require('./doi2bib'),
    utils = require('./utils');

if ('development' === env) {
  app.use(express.static(__dirname + '/../.tmp/public'));
}
app.use(express.static(__dirname + '/../public'));

app.get('/doi2bib', function(req, res) {
  res.set('Content-Type', 'application/x-bibtex');

  if (!(new RegExp('^10\\..+\/.+$').test(req.query.doi))) {
    res.writeHead(400);
    res.end('Invalid DOI');
  } else {
    doi2bib.doi2bib(req.query.doi).then(function(bib) {
      res.end(bib);
    }, function(errorCode) {
      if (http.STATUS_CODES[errorCode]) {
        res.writeHead(errorCode);
        res.end(http.STATUS_CODES[errorCode]);
      } else {
        res.writeHead(500);
        res.end(http.STATUS_CODES[500]);
      }
    });
  }
});

app.post('/feedback', function(req, res) {
  utils.sendFeedback(req.query.name, req.query.email, req.query.text);
  res.end();
});

app.listen(
  process.env.OPENSHIFT_NODEJS_PORT || 3000,
  process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  function() {
    console.log('node server started');
  }
);
