/* global describe,browser,element,by,it,expect,beforeEach */
'use strict';

var fs = require('fs');

describe('bib app', function() {

  var articles = JSON.parse(fs.readFileSync(__dirname + '/articles.json', 'utf8')),
      inproceedings = JSON.parse(fs.readFileSync(__dirname + '/inproceedings.json', 'utf8')),
      incollections = JSON.parse(fs.readFileSync(__dirname + '/incollections.json', 'utf8'));

  beforeEach(function() {
    browser.get('index.html');
  });


  var doiInput = element(by.model('doi')),
      button = element(by.buttonText('get BibTeX')),
      bibEl = element(by.binding('bib')),
      i,

  doTest = function(doi, check) {
    it('check doi ' + doi, function() {
      doiInput.sendKeys(doi);
      button.click();
      check(bibEl.getText());
    });
  },
  
  articleCheck = function(text) {
    expect(text).toMatch(/^@article/);
  },

  inproceedingCheck = function(text) {
    expect(text).toMatch(/^@inproceeding/);
  },

  incollectionCheck = function(text) {
    expect(text).toMatch(/^@incollection/);
  }
  ;

  for(i = 0; i < articles.length; ++i) {
    doTest(articles[i], articleCheck);
  }

  for(i = 0; i < inproceedings.length; ++i) {
    doTest(inproceedings[i], inproceedingCheck);
  }

  for(i = 0; i < incollections.length; ++i) {
    doTest(incollections[i], incollectionCheck);
  }

});
