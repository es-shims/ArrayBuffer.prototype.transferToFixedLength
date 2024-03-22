# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.0.5](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/compare/v1.0.4...v1.0.5) - 2024-03-22

### Commits

- [Deps] update `call-bind`, `es-abstract`, `get-intrinsic`, `is-shared-array-buffer` [`3010ed2`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/3010ed2239ceb36cd858cfebaae6ecc72d07555e)
- [actions] remove redundant finisher [`5c9712d`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/5c9712d9a0eabff0b87fcc0fdc226b94384a0055)
- [Dev Deps] update `tape` [`078bece`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/078bece44b236a22d030be3496f9f9cf93127435)

## [v1.0.4](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/compare/v1.0.3...v1.0.4) - 2024-02-05

### Commits

- [Refactor] `IsResizableBuffer` -&gt; `IsFixedLengthArrayBuffer`, per spec [`e6efbbb`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/e6efbbbc14f2c7688f9e6dc0d4b6d590aac8c69f)
- [Refactor] use `es-errors`, so things that only need those do not need `get-intrinsic` [`c25050b`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/c25050bd0e009c5ab5831f460b3e6a1ac4543c25)
- [Deps] update `arraybuffer.prototype.slice`, `call-bind`, `define-properties`, `es-abstract`, `get-intrinsic` [`14fbb8a`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/14fbb8a9e1706b76e5596ea0c8d9d454d12354f5)
- [Deps] update `array-buffer-byte-length`, `arraybuffer.prototype.slice`, `get-intrinsic`, `is-array-buffer` [`678387a`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/678387a74e8af20162bac2c075994ca1eb7dede3)
- [Dev Deps] update `aud`, `npmignore`, `object-inspect`, `tape` [`a669d55`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/a669d55d5afc9b74e6fb09eb6514e032b9b146fc)
- [Refactor] `IsResizableArrayBuffer`: avoid double checking ABness [`2c52c85`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/2c52c85d4656d2346f2c030d087aa32d99ddd43c)

## [v1.0.3](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/compare/v1.0.2...v1.0.3) - 2023-09-06

### Commits

- [Deps] update `es-abstract` [`d5debb4`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/d5debb4307e46db03436aa65bd559d452d08c96b)
- [Dev Deps] update `tape` [`f1f2b6f`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/f1f2b6f0bc9392997fd790a716cb7897c859c08c)
- [Fix] move `es-abstract` to runtime deps [`32d0c39`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/32d0c39142e9006527332848aa26cb478aa8c7dc)

## [v1.0.2](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/compare/v1.0.1...v1.0.2) - 2023-07-11

### Commits

- [Refactor] use `array-buffer-byte-length`, `arraybuffer.prototype.slice` [`4780b72`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/4780b72e0803224154762016e93a18bd002a2663)
- [Dev Deps] update `@es-shims/api`, `@ljharb/eslint-config`, `aud`, `tape` [`edf2398`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/edf239843a1cdf2f0d90195cbbf853253c187116)
- [Deps] update `arraybuffer.prototype.slice` [`572d295`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/572d2956cea8ebd70afa489da7ec895d913bfc8b)
- [Deps] update `get-intrinsic` [`c2c22c5`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/c2c22c5dfff897a425d6a1783ca2cca293530934)

## [v1.0.1](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/compare/v1.0.0...v1.0.1) - 2023-03-15

### Commits

- [Tests] add passing tests from https://github.com/tc39/test262/pull/3796 [`3bb522f`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/3bb522ff9a763736166cc4554823b5afd1c024e1)
- [Fix] when the new length is larger than the old, copy bytes properly [`440b501`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/440b50107bf357688fb9f74437c8bb0ace1babb0)
- [Deps] update `define-properties`, `is-array-buffer` [`b35bc33`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/b35bc3369a0461206de7a45faa8bf37bf6f9ad91)
- [Dev Deps] update `@es-shims/api`, `es-abstract` [`fc539c4`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/fc539c45197ddb7d852f6b6c8dc7d64b056b01f4)

## v1.0.0 - 2023-02-06

### Commits

- Initial implementation, tests, readme [`50c71da`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/50c71da973dc89d849ef24946cc7efb1f029ee8a)
- Initial commit [`d8c5b59`](https://github.com/es-shims/ArrayBuffer.prototype.transferToFixedLength/commit/d8c5b59074ea3006254eb83b641c49fff96fad6a)
