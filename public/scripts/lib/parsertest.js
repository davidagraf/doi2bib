'use strict';

(function() {
  //var example = "@article{10.1007/springerreference\_6343, url={http://dx.doi.org/10.1007/springerreference\_6343}, DOI={10.1007/springerreference\_6343}, journal={SpringerReference}, publisher={Springer-Verlag}, year={2011} }";
  var example = '@article{aidee, a={b}, c={d,e,f}}';

  console.log(bibparser.parse(example));
})();
