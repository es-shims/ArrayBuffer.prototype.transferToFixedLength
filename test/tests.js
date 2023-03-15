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

		st.test('test262: test/built-ins/ArrayBuffer/prototype/transferToFixedLength/from-fixed-to-larger.js', function (s2t) {
			var source = new ArrayBuffer(4);

			var sourceArray = new Uint8Array(source);
			sourceArray[0] = 1;
			sourceArray[1] = 2;
			sourceArray[2] = 3;
			sourceArray[3] = 4;

			var dest = transferToFixedLength(source, 5);

			s2t.equal(source.byteLength, 0, 'source.byteLength');
			s2t.ok(IsDetachedBuffer(source), 'source is detached');

			s2t.equal(dest.resizable, false, 'dest.resizable', { skip: !('resizable' in ArrayBuffer.prototype) });
			s2t.equal(dest.byteLength, 5, 'dest.byteLength');
			s2t.equal(dest.maxByteLength, 5, 'dest.maxByteLength', { skip: !('maxByteLength' in ArrayBuffer.prototype) });

			var destArray = new Uint8Array(dest);

			s2t.equal(destArray[0], 1, 'destArray[0]');
			s2t.equal(destArray[1], 2, 'destArray[1]');
			s2t.equal(destArray[2], 3, 'destArray[2]');
			s2t.equal(destArray[3], 4, 'destArray[3]');
			s2t.equal(destArray[4], 0, 'destArray[4]');

			s2t.end();
		});

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
