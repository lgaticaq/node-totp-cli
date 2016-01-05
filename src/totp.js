#!/usr/bin/env node

'use strict';

import program from 'commander';
import pkg from '../package.json';

program
  .version(pkg.version)
  .description('Insert/Generate a TOTP for a service from pass')
  .command('insert [service]', 'insert a new service')
  .command('generate [service]', 'generate a code for a service')
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
