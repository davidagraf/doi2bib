'use strict';

/* global bibparser */

angular.module('Doi2BibApp')
.factory('Bib', [function() {
  var

  BibClass = function(bibStr) {
    var bib = bibparser.parse(bibStr);

    if (bib.pages === 'n/a–n/a') {
      delete bib.pages;
    }

    if (bib.id) {
      bib.id = bib.id.replace(/_/g, '');
    }

    this.toPrettyString = function() {
      var result;

      result = '@' + bib.type + '{' + bib.id;

      angular.forEach(bib.tags, function(value, key) {
        result += ',\n  ' + key + '= {' + (value.join ? value.join(', ') : value) + '}';
      }, result);

      result += '\n}';

      return result;
    };
  };

  return BibClass;
}]);
