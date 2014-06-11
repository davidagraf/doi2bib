/* global describe,browser,element,by,it,expect */
'use strict';

describe('bib app', function() {
  browser.get('index.html');

  element(by.model('doi')).sendKeys('10.1063/1.449203');

  element(by.buttonText('get BibTeX')).click();

  var bibEl = element(by.binding('bib'));

  it('should returns an article', function() {
    expect(bibEl.getText()).toMatch(/^@article/);
  });

});
