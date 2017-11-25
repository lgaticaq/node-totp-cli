#!/usr/bin/env node

'use strict'

const exec = require('child_process').exec
const program = require('commander')
const chalk = require('chalk')
const notp = require('notp')
const ncp = require('copy-paste')
const base32 = require('thirty-two')
const updateNotifier = require('update-notifier')
const pkg = require('../package.json')

updateNotifier({ pkg }).notify()

const getCode = service => {
  let key
  const pass = exec(`pass 2fa/${service}/code`)

  pass.stdout.on('data', data => {
    key = data
  })
  pass.stderr.on('data', () => {
    console.log(chalk.red(`Error: ${service} not stored`)) // eslint-disable-line
    process.exit(1)
  })
  pass.on('close', () => {
    const totp = notp.totp.gen(base32.decode(key))
    console.log(chalk.green(totp)) // eslint-disable-line
    ncp.copy(totp.toString())
    process.exit(0)
  })
}

program.usage('<service>').parse(process.argv)

if (program.args.length === 0) {
  console.log(chalk.red('Service required')) // eslint-disable-line
  process.exit(1)
} else {
  getCode(program.args[0])
}
