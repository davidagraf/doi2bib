/* global describe,browser,element,by,it,expect,beforeEach */
'use strict';

var fs = require('fs');

describe('bib app', function() {

  var dois = JSON.parse(fs.readFileSync(__dirname + '/testcases.json', 'utf8'));

  beforeEach(function() {
    browser.get('index.html');
  });


  var doiInput = element(by.model('doi')),
      button = element(by.buttonText('get BibTeX')),
      bibEl = element(by.binding('bib')),
      i,

  doTest = function(doi) {
    it('check doi ' + doi, function() {
      doiInput.sendKeys(doi);
      button.click();
      expect(bibEl.getText()).toMatch(/^@article/);
    });
  };

  for(i = 0; i < dois.length; ++i) {
    doTest(dois[i]);
  }

});
