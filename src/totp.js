#!/usr/bin/env node

'use strict';

const program = require('commander');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

updateNotifier({pkg}).notify();

program
  .version(pkg.version)
  .description('Insert/Generate a TOTP for a service from pass')
  .command('insert [service]', 'insert a new service')
  .command('generate [service]', 'generate a code for a service')
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
