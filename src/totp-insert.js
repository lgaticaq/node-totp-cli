#!/usr/bin/env node

'use strict';

import {exec} from 'child_process';
import program from 'commander';
import inquirer from 'inquirer';

const setCode = (service) => {
  inquirer.prompt([
    {
      type: 'password',
      message: `Enter code for ${service}:`,
      name: 'code1'
    },
    {
      type: 'password',
      message: `Re-Enter code for ${service}:`,
      name: 'code2'
    }
  ], (answers) => {
    if (answers.code1 === answers.code2) {
      const pass = exec(`pass insert 2fa/${service}/code`);
      pass.stdin.write(`${answers.code1}\n`);
      pass.stdin.write(`${answers.code1}\n`);

      pass.stderr.on('data', (data) => {
        console.log(`Error: ${data}`);
      });
      pass.on('close', () => {
        process.exit(0);
      });
    } else {
      console.log('Wrong code');
    }
  });
};

program
  .usage('<service>')
  .parse(process.argv);

if (program.args.length === 0) {
  console.error('service required');
  process.exit(1);
} else {
  setCode(program.args[0]);
}
