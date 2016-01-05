# node-totp-cli

[![npm version](https://img.shields.io/npm/v/totp-cli.svg?style=flat-square)](https://www.npmjs.com/package/totp-cli)
[![npm downloads](https://img.shields.io/npm/dm/totp-cli.svg?style=flat-square)](https://www.npmjs.com/package/totp-cli)
[![dependency Status](https://img.shields.io/david/lgaticaq/node-totp-cli.svg?style=flat-square)](https://david-dm.org/lgaticaq/node-totp-cli#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/node-totp-cli.svg?style=flat-square)](https://david-dm.org/lgaticaq/node-totp-cli#info=devDependencies)
[![Join the chat at https://gitter.im/lgaticaq/node-totp-cli](https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg?style=flat-square)](https://gitter.im/lgaticaq/node-totp-cli?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Insert/Generate a TOTP for a service from pass. Inspired by [totp-cli](https://github.com/hobarrera/totp-cli)

## Requirements

- [pass](http://www.passwordstore.org/)
- [xclip (for Linux and OpenBSD)](http://linux.die.net/man/1/xclip)

## Installation

```bash
npm i -g totp-cli
```

## Use

Insert a new service

```bash
totp insert <service>
? Enter code for <service>: ************
? Re-Enter code for <service>: ************
```

Generate code for a service. Print and copy to clipboard the code.

```bash
totp generate <service>
123456
```
