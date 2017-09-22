'use strict';
var Big = require('big.js');

module.exports = function(refStr) {
  var trimmed = refStr.trim();
  if (!trimmed) return '';
  var b = Big(trimmed);
  return b.toString();
};
