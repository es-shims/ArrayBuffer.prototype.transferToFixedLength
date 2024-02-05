'use strict';

var GetIntrinsic = require('get-intrinsic');

var min = GetIntrinsic('%Math.min%');
var $TypeError = require('es-errors/type');
var $ArrayBuffer = GetIntrinsic('%ArrayBuffer%', true);
var $Uint8Array = GetIntrinsic('%Uint8Array%', true);

var callBound = require('call-bind/callBound');

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

var arrayBufferByteLength = require('array-buffer-byte-length');
var arrayBufferSlice = require('arraybuffer.prototype.slice');
var isArrayBuffer = require('is-array-buffer');
var isSharedArrayBuffer = require('is-shared-array-buffer');

var DetachArrayBuffer = require('es-abstract/2023/DetachArrayBuffer');
var IsDetachedBuffer = require('es-abstract/2023/IsDetachedBuffer');
var ToIndex = require('es-abstract/2023/ToIndex');

var IsResizableArrayBuffer = require('./IsResizableArrayBuffer');

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
		newByteLength = arrayBufferByteLength(arrayBuffer); // step 3.a
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
		abByteLength = arrayBufferByteLength(arrayBuffer);
	}
	var copyLength = min(newByteLength, abByteLength); // step 10
	if (newByteLength === copyLength) {
		newBuffer = arrayBufferSlice(arrayBuffer, 0, copyLength); // ??
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
