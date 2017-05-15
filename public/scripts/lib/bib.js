'use strict';

/* global bibparser */

angular.module('Doi2BibApp')
.factory('Bib', ['SpecialChars', function(SpecialChars) {
  var

  BibClass = function(bibStr) {
    var bib = bibparser.parse(bibStr),
        encodeSpecialChars;

    /* pages specific */
    if (bib.tags.pages === 'n/a-n/a') {
      delete bib.tags.pages;
    }
    if (bib.tags.pages && bib.tags.pages.indexOf('--') === -1) {
      bib.tags.pages = bib.tags.pages.replace(/\-/g, '--');
    }

    /* id specific */
    if (bib.id) {
      bib.id = bib.id.replace(/_/g, '');
    }

    // bib url contains url encoding -> we decode those characters here
    bib.tags.url = decodeURIComponent(bib.tags.url);

	  /**
		 * Sometimes, the greek chars aren't properlty formatted in the received bib.
		 * e.g. the bib for 10.1002/cncr.29046 contains {\varEpsilon} instead of {$\varEpsilon$}.
     * There, we inject the missing $ chars into the title string.
	   */
		bib.tags.title = bib.tags.title.replace(/(\{)(\\var[A-Z]?[a-z]*)(\})/, '$1$$$2$$$3');

    encodeSpecialChars = function(str) {
      return str.replace(
        new RegExp(Object.keys(SpecialChars).join('|'),'gi'),
        function(matched){
          return SpecialChars[matched];
        }
      );
    };

    this.toPrettyString = function() {
      var result;

      result = '@' + bib.type + '{' + bib.id;

      angular.forEach(bib.tags, function(value, key) {
        result += ',\n  ' + key + ' = {' +
                  encodeSpecialChars(value.join ? value.join(', ') : value) + '}';
      }, result);

      result += '\n}';

      return result;
    };

    this.getURL = function() {
      return bib.tags.url;
    };
  };

  return BibClass;
}])
.constant('SpecialChars', {
  'à': '\\`a',
  'ô': '\\^o',
  'ê': '\\^e',
  'â': '\\^a',
  '®': '{\\textregistered}',
  'ç': '\\c{c}',
  'ö': '\\"{o}',
  'ä': '\\"{a}',
  'ü': '\\"{u}',
  'Ö': '\\"{O}',
  'Ä': '\\"{A}',
  'Ü': '\\"{U}'
});
