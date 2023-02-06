'use strict';

var inspect = require('object-inspect');
var IsDetachedBuffer = require('es-abstract/2022/IsDetachedBuffer');
var callBound = require('call-bind/callBound');

var forEach = require('for-each');
var v = require('es-value-fixtures');

var byteLength = callBound('ArrayBuffer.prototype.byteLength', true);

module.exports = function runTests(transferToFixedLength, t) {
	forEach(v.primitives.concat(v.objects), function (nonAB) {
		t['throws'](
			function () { transferToFixedLength(nonAB); },
			TypeError,
			inspect(nonAB) + ' is not an ArrayBuffer'
		);
	});

	t.test('ArrayBuffers', { skip: typeof ArrayBuffer === 'undefined' }, function (st) {
		var ab = new ArrayBuffer(0);

		st.equal(IsDetachedBuffer(ab), false, 'ArrayBuffer is not detached');

		try {
			var nb = transferToFixedLength(ab);
		} catch (e) {
			if (e instanceof SyntaxError) {
				st.skip('Detaching ArrayBuffer is not supported');
				return st.end();
			}
			console.log(e.stack);
		}

		st.equal(IsDetachedBuffer(ab), true, 'ArrayBuffer is now detached');
		st.equal(IsDetachedBuffer(nb), false, 'new ArrayBuffer is not detached');

		var ab2 = new ArrayBuffer(8);
		st.equal(byteLength(ab2), 8, 'original ArrayBuffer has length 8');
		try {
			var nbLen = transferToFixedLength(ab2, 4);
		} catch (e) {
			if (e instanceof SyntaxError) {
				st.skip('Detaching ArrayBuffer is not supported');
				return st.end();
			}
		}
		st.equal(IsDetachedBuffer(ab2), true, 'ArrayBuffer is now detached');
		st.equal(IsDetachedBuffer(nbLen), false, 'new ArrayBuffer is not detached');

		st.equal(byteLength(ab2), 0, 'detached original ArrayBuffer has length 0');
		st.equal(byteLength(nbLen), 4, 'newly transferToFixedLengthred ArrayBuffer has length 4');

		return st.end();
	});

	t.test('SharedArrayBuffers', { skip: typeof SharedArrayBuffer === 'undefined' }, function (st) {
		var sab = new SharedArrayBuffer(0);

		st['throws'](
			function () { transferToFixedLength(sab); },
			TypeError,
			inspect(sab) + ' is not an ArrayBuffer'
		);

		st.end();
	});
};
