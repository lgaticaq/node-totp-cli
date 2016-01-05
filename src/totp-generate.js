#!/usr/bin/env node

'use strict';

import {exec} from 'child_process';
import program from 'commander';
import notp from 'notp';
import ncp from 'copy-paste';
import base32 from 'thirty-two';


const getCode = (service) => {
  let key;
  const pass = exec(`pass 2fa/${service}/code`);

  pass.stdout.on('data', (data) => {
    key = data;
  });
  pass.stderr.on('data', (data) => {
    console.log(`Error: ${data}`);
  });
  pass.on('close', () => {
    const totp = notp.totp.gen(base32.decode(key));
    console.log(totp);
    ncp.copy(totp.toString());
    process.exit(0);
  });
};

program
  .usage('<service>')
  .parse(process.argv);

if (program.args.length === 0) {
  console.error('service required');
  process.exit(1);
} else {
  getCode(program.args[0]);
}
