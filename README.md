# ArrayBuffer.prototype.transferToFixedLength <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

An ES6 spec-compliant `ArrayBuffer.prototype.transferToFixedLength` shim. Invoke its "shim" method to shim ArrayBuffer.prototype.transferToFixedLength if it is unavailable.

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES5-supported environment and complies with the proposed [spec](https://tc39.es/proposal-arraybuffer-transfer/#sec-get-arraybuffer.prototype.transfertofixedlength).

Most common usage:
```js
var assert = require('assert');
var transferToFixedLength = require('arraybuffer.prototype.transfertofixedlength');
var IsDetachedBuffer = require('es-abstract/2022/IsDetachedBuffer');

var ab = new ArrayBuffer('a');

assert.equal(IsDetachedBuffer(ab), false);
transferToFixedLength(ab);
assert.equal(IsDetachedBuffer(ab), true);

if (!ArrayBuffer.prototype.transferToFixedLength) {
	transferToFixedLength.shim();
}

var ab2 = new ArrayBuffer('a');
assert.equal(IsDetachedBuffer(ab2), false);
ab2.transferToFixedLength();
assert.equal(IsDetachedBuffer(ab2), true);
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/arraybuffer.prototype.transfertofixedlenfth
[npm-version-svg]: https://versionbadg.es/es-shims/ArrayBuffer.prototype.transferToFixedLength.svg
[deps-svg]: https://david-dm.org/es-shims/ArrayBuffer.prototype.transferToFixedLength.svg
[deps-url]: https://david-dm.org/es-shims/ArrayBuffer.prototype.transferToFixedLength
[dev-deps-svg]: https://david-dm.org/es-shims/ArrayBuffer.prototype.transferToFixedLength/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/ArrayBuffer.prototype.transferToFixedLength#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/arraybuffer.prototype.transfertofixedlenfth.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/arraybuffer.prototype.transfertofixedlenfth.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/arraybuffer.prototype.transfertofixedlenfth.svg
[downloads-url]: https://npm-stat.com/charts.html?package=arraybuffer.prototype.transfertofixedlenfth
[codecov-image]: https://codecov.io/gh/es-shims/ArrayBuffer.prototype.transferToFixedLength/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/es-shims/ArrayBuffer.prototype.transferToFixedLength/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/ArrayBuffer.prototype.transferToFixedLength
[actions-url]: https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/actions
