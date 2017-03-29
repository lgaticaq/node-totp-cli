#!/usr/bin/env node

'use strict';

const exec = require('child_process').exec;
const program = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

updateNotifier({pkg}).notify();

const setCode = service => {
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
  ]).then(answers => {
    if (answers.code1 === answers.code2) {
      const pass = exec(`pass insert 2fa/${service}/code`);
      pass.stdin.write(`${answers.code1}\n`);
      pass.stdin.write(`${answers.code1}\n`);

      pass.stderr.on('data', data => {
        console.log(chalk.red(`Error: ${data}`));
      });
      pass.on('close', () => {
        console.log(chalk.green('Stored code'));
        process.exit(0);
      });
    } else {
      console.log(chalk.red('Wrong code'));
    }
  });
};

program
  .usage('<service>')
  .parse(process.argv);

if (program.args.length === 0) {
  console.log(chalk.red('Service required'));
  process.exit(1);
} else {
  setCode(program.args[0]);
}
