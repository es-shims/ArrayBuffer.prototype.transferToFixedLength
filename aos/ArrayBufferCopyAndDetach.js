'use strict';

var GetIntrinsic = require('get-intrinsic');

var min = GetIntrinsic('%Math.min%');
var $TypeError = GetIntrinsic('%TypeError%');
var $ArrayBuffer = GetIntrinsic('%ArrayBuffer%', true);
var $Uint8Array = GetIntrinsic('%Uint8Array%', true);

var callBound = require('call-bind/callBound');

var $byteLength = callBound('%ArrayBuffer.prototype.byteLength%', true)
	|| function byteLength(ab) { return ab.byteLength; }; // in node < 0.11, byteLength is an own nonconfigurable property
var $maxByteLength = callBound('%ArrayBuffer.prototype.maxByteLength%', true);
var copyInto = function copyAB(dest, src, start, end) {
	var that = new $Uint8Array(src);
	if (typeof end === 'undefined') {
		end = that.length; // eslint-disable-line no-param-reassign
	}
	var resultArray = new $Uint8Array(dest);
	for (var i = 0; i < resultArray.length; i++) {
		resultArray[i] = that[i + start];
	}
	return dest;
};
var $abSlice = callBound('%ArrayBuffer.prototype.slice%', true)
	|| function slice(ab, a, b) { // in node < 0.11, slice is an own nonconfigurable property
		return ab.slice ? ab.slice(a, b) : copyInto(new $ArrayBuffer(b - a), ab, a, b); // node 0.8 lacks `slice`
	};

var DetachArrayBuffer = require('es-abstract/2022/DetachArrayBuffer');
var IsDetachedBuffer = require('es-abstract/2022/IsDetachedBuffer');
var ToIndex = require('es-abstract/2022/ToIndex');

var IsResizableArrayBuffer = require('./IsResizableArrayBuffer');

var isArrayBuffer = require('is-array-buffer');
var isSharedArrayBuffer = require('is-shared-array-buffer');

module.exports = function ArrayBufferCopyAndDetach(arrayBuffer, newLength, preserveResizability) {
	if (preserveResizability !== 'preserve-resizability' && preserveResizability !== 'fixed-length') {
		throw new $TypeError('`preserveResizability` must be "preserve-resizability" or "fixed-length"');
	}

	if (!isArrayBuffer(arrayBuffer) || isSharedArrayBuffer(arrayBuffer)) {
		throw new $TypeError('`arrayBuffer` must be an ArrayBuffer'); // step 1
	}

	var abByteLength;

	var newByteLength;
	if (typeof newLength === 'undefined') { // step 3
		newByteLength = $byteLength(arrayBuffer); // step 3.a
		abByteLength = newByteLength;
	} else { // step 4
		newByteLength = ToIndex(newLength); // step 4.a
	}

	if (IsDetachedBuffer(arrayBuffer)) {
		throw new $TypeError('`arrayBuffer` must not be detached'); // step 5
	}

	var newMaxByteLength;
	if (preserveResizability === 'preserve-resizability' && IsResizableArrayBuffer(arrayBuffer)) { // step 6
		newMaxByteLength = $maxByteLength(arrayBuffer); // step 6.a
	} else { // step 7
		newMaxByteLength = 'empty'; // step 7.a
	}

	// commented out since there's no way to set or access this key

	// 8. If arrayBuffer.[[ArrayBufferDetachKey]] is not undefined, throw a TypeError exception.

	// 9. Let newBuffer be ? AllocateArrayBuffer(%ArrayBuffer%, newByteLength, newMaxByteLength).
	var newBuffer = newMaxByteLength === 'empty' ? new $ArrayBuffer(newByteLength) : new $ArrayBuffer(newByteLength, { maxByteLength: newMaxByteLength });
	if (typeof abByteLength !== 'number') {
		abByteLength = $byteLength(arrayBuffer);
	}
	var copyLength = min(newByteLength, abByteLength); // step 10
	if (newByteLength === copyLength) {
		newBuffer = $abSlice(arrayBuffer, 0, copyLength); // ??
	} else {
		copyInto(newBuffer, arrayBuffer, 0, copyLength);
	}
	/*
	11. Let fromBlock be arrayBuffer.[[ArrayBufferData]].
	12. Let toBlock be newBuffer.[[ArrayBufferData]].
	13. Perform CopyDataBlockBytes(toBlock, 0, fromBlock, 0, copyLength).
	14. NOTE: Neither creation of the new Data Block nor copying from the old Data Block are observable. Implementations may implement this method as a zero-copy move or a realloc.
	*/

	DetachArrayBuffer(arrayBuffer); // step 15

	return newBuffer; // step 16
};
