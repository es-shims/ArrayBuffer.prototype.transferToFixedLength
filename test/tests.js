'use strict';

var inspect = require('object-inspect');
var DetachArrayBuffer = require('es-abstract/2023/DetachArrayBuffer');
var IsDetachedBuffer = require('es-abstract/2023/IsDetachedBuffer');

var forEach = require('for-each');
var v = require('es-value-fixtures');

var byteLength = require('array-buffer-byte-length');

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

		st.test('262: test/built-ins/ArrayBuffer/prototype/transferToFixedLength/from-fixed-to-same.js', function (s2t) {
			var source = new ArrayBuffer(4);

			var sourceArray = new Uint8Array(source);
			sourceArray[0] = 1;
			sourceArray[1] = 2;
			sourceArray[2] = 3;
			sourceArray[3] = 4;

			var dest = transferToFixedLength(source);

			s2t.equal(source.byteLength, 0, 'source.byteLength');
			s2t.ok(IsDetachedBuffer(source), 'source is detached');

			s2t.equal(dest.resizable, false, 'dest.resizable', { skip: !('resizable' in ArrayBuffer.prototype) });
			s2t.equal(dest.byteLength, 4, 'dest.byteLength');
			s2t.equal(dest.maxByteLength, 4, 'dest.maxByteLength', { skip: !('maxByteLength' in ArrayBuffer.prototype) });

			var destArray = new Uint8Array(dest);

			s2t.equal(destArray[0], 1, 'destArray[0]');
			s2t.equal(destArray[1], 2, 'destArray[1]');
			s2t.equal(destArray[2], 3, 'destArray[2]');
			s2t.equal(destArray[3], 4, 'destArray[3]');

			s2t.end();
		});

		st.test('262: test/built-ins/ArrayBuffer/prototype/transferToFixedLength/from-fixed-to-smaller.js', function (s2t) {
			var source = new ArrayBuffer(4);

			var sourceArray = new Uint8Array(source);
			sourceArray[0] = 1;
			sourceArray[1] = 2;
			sourceArray[2] = 3;
			sourceArray[3] = 4;

			var dest = transferToFixedLength(source, 3);

			s2t.equal(source.byteLength, 0, 'source.byteLength');
			s2t.ok(IsDetachedBuffer(source), 'source is detached');

			s2t.equal(dest.resizable, false, 'dest.resizable', { skip: !('resizable' in ArrayBuffer.prototype) });
			s2t.equal(dest.byteLength, 3, 'dest.byteLength');
			s2t.equal(dest.maxByteLength, 3, 'dest.maxByteLength', { skip: !('maxByteLength' in ArrayBuffer.prototype) });

			var destArray = new Uint8Array(dest);

			s2t.equal(destArray[0], 1, 'destArray[0]');
			s2t.equal(destArray[1], 2, 'destArray[1]');
			s2t.equal(destArray[2], 3, 'destArray[2]');

			s2t.end();
		});

		st.test('262: test/built-ins/ArrayBuffer/prototype/transferToFixedLength/from-fixed-to-zero.js', function (s2t) {
			var source = new ArrayBuffer(4);

			var sourceArray = new Uint8Array(source);
			sourceArray[0] = 1;
			sourceArray[1] = 2;
			sourceArray[2] = 3;
			sourceArray[3] = 4;

			var dest = transferToFixedLength(source, 0);

			s2t.equal(source.byteLength, 0, 'source.byteLength');
			s2t.ok(IsDetachedBuffer(source), 'source is detached');

			s2t.equal(dest.resizable, false, 'dest.resizable', { skip: !('resizable' in ArrayBuffer.prototype) });
			s2t.equal(dest.byteLength, 0, 'dest.byteLength');
			s2t.equal(dest.maxByteLength, 0, 'dest.maxByteLength', { skip: !('maxByteLength' in ArrayBuffer.prototype) });

			s2t.end();
		});

		st.test('262: test/built-ins/ArrayBuffer/prototype/transferToFixedLength/from-resizable-to-larger.js', { skip: !('resizable' in ArrayBuffer.prototype) }, function (s2t) {
			var source = new ArrayBuffer(4, { maxByteLength: 8 });

			var sourceArray = new Uint8Array(source);
			sourceArray[0] = 1;
			sourceArray[1] = 2;
			sourceArray[2] = 3;
			sourceArray[3] = 4;

			var dest = source.transferToFixedLength(5);

			s2t.equal(source.byteLength, 0, 'source.byteLength');
			s2t.ok(IsDetachedBuffer(source), 'source is detached');

			s2t.equal(dest.resizable, false, 'dest.resizable');
			s2t.equal(dest.byteLength, 5, 'dest.byteLength');
			s2t.equal(dest.maxByteLength, 5, 'dest.maxByteLength');

			var destArray = new Uint8Array(dest);

			s2t.equal(destArray[0], 1, 'destArray[0]');
			s2t.equal(destArray[1], 2, 'destArray[1]');
			s2t.equal(destArray[2], 3, 'destArray[2]');
			s2t.equal(destArray[3], 4, 'destArray[3]');
			s2t.equal(destArray[4], 0, 'destArray[4]');

			s2t.end();
		});

		st.test('262: test/built-ins/ArrayBuffer/prototype/transferToFixedLength/from-resizable-to-same.js', { skip: !('resizable' in ArrayBuffer.prototype) }, function (s2t) {
			var source = new ArrayBuffer(4, { maxByteLength: 8 });

			var sourceArray = new Uint8Array(source);
			sourceArray[0] = 1;
			sourceArray[1] = 2;
			sourceArray[2] = 3;
			sourceArray[3] = 4;

			var dest = transferToFixedLength(source);

			s2t.equal(source.byteLength, 0, 'source.byteLength');
			s2t.ok(IsDetachedBuffer(source), 'source is detached');

			s2t.equal(dest.resizable, false, 'dest.resizable');
			s2t.equal(dest.byteLength, 4, 'dest.byteLength');
			s2t.equal(dest.maxByteLength, 4, 'dest.maxByteLength');

			var destArray = new Uint8Array(dest);

			s2t.equal(destArray[0], 1, 'destArray[0]');
			s2t.equal(destArray[1], 2, 'destArray[1]');
			s2t.equal(destArray[2], 3, 'destArray[2]');
			s2t.equal(destArray[3], 4, 'destArray[3]');

			return s2t.end();
		});

		st.test('262: test/built-ins/ArrayBuffer/prototype/transferToFixedLength/from-resizable-to-smaller.js', { skip: !('resizable' in ArrayBuffer.prototype) }, function (s2t) {
			var source = new ArrayBuffer(4, { maxByteLength: 8 });

			var sourceArray = new Uint8Array(source);
			sourceArray[0] = 1;
			sourceArray[1] = 2;
			sourceArray[2] = 3;
			sourceArray[3] = 4;

			var dest = transferToFixedLength(source, 3);

			s2t.equal(source.byteLength, 0, 'source.byteLength');
			s2t.ok(IsDetachedBuffer(source), 'source is detached');

			s2t.equal(dest.resizable, false, 'dest.resizable');
			s2t.equal(dest.byteLength, 3, 'dest.byteLength');
			s2t.equal(dest.maxByteLength, 3, 'dest.maxByteLength');

			var destArray = new Uint8Array(dest);

			s2t.equal(destArray[0], 1, 'destArray[0]');
			s2t.equal(destArray[1], 2, 'destArray[1]');
			s2t.equal(destArray[2], 3, 'destArray[2]');

			s2t.end();
		});

		st.test('262: test/built-ins/ArrayBuffer/prototype/transferToFixedLength/from-resizable-to-zero.js', { skip: !('resizable' in ArrayBuffer.prototype) }, function (s2t) {
			var source = new ArrayBuffer(4, { maxByteLength: 8 });

			var sourceArray = new Uint8Array(source);
			sourceArray[0] = 1;
			sourceArray[1] = 2;
			sourceArray[2] = 3;
			sourceArray[3] = 4;

			var dest = transferToFixedLength(source, 0);

			s2t.equal(source.byteLength, 0, 'source.byteLength');
			s2t.ok(IsDetachedBuffer(source), 'source is detached');

			s2t.equal(dest.resizable, false, 'dest.resizable');
			s2t.equal(dest.byteLength, 0, 'dest.byteLength');
			s2t.equal(dest.maxByteLength, 0, 'dest.maxByteLength');

			s2t.end();
		});

		st.test('262: test/built-ins/ArrayBuffer/prototype/transferToFixedLength/new-length-excessive.js', function (s2t) {
			var zab = new ArrayBuffer(0);

			s2t['throws'](
				function () {
					// Math.pow(2, 53) = 9007199254740992
					transferToFixedLength(zab, 9007199254740992);
				},
				RangeError,
				'too-large length throws'
			);

			s2t.end();
		});

		var dab = new ArrayBuffer(1);
		DetachArrayBuffer(dab);
		st['throws'](
			function () { transferToFixedLength(dab); },
			TypeError,
			inspect(dab) + ' is detached'
		);

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
