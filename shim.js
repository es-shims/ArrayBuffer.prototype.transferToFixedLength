'use strict';

var $SyntaxError = require('es-errors/syntax');

var define = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shimTransferToFixedLength() {
	if (typeof ArrayBuffer !== 'function') {
		throw new $SyntaxError('ArrayBuffer is not available in this environment');
	}

	var polyfill = getPolyfill();
	define(
		ArrayBuffer.prototype,
		{ transferToFixedLength: polyfill },
		{ transferToFixedLength: function () { return ArrayBuffer.prototype.transferToFixedLength !== polyfill; } }
	);

	return polyfill;
};
