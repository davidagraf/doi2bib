'use strict';

var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));

app.get('/doi2bib', function(req, res) {
  res.send('hello doi2bib');
});

app.listen(3000);
