'use strict';

/* global bibparser */

angular.module('Doi2BibApp')
.factory('Bib', ['SpecialChars', function(SpecialChars) {
  var

  BibClass = function(bibStr) {
    var bib = bibparser.parse(bibStr),
        encodeSpecialChars;

    if (bib.pages === 'n/a-n/a') {
      delete bib.pages;
    }
    
    /* geht nicht
    if (bib.pages) {
      bib.pages = bib.pages.replace(/\-/g, '--');
    }*/

    if (bib.id) {
      bib.id = bib.id.replace(/_/g, '');
    }

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
        result += ',\n  ' + key + '= {' +
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
  'ç': '\\c{c}'
});
