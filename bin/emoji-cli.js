#!/usr/bin/env node
var emojiCli = require('../lib/main')
var pkg = require('../package.json')
var updateNotifier = require('update-notifier')
var program = require('commander')

updateNotifier({
  packageName: pkg.name,
  packageVersion: pkg.version
}).notify()

program
  .version(pkg.version)
  .usage('<keyword>')
  .option('-r, --random', 'pick a emoji randomly and copy it to clipboard')
  .parse(process.argv)

program.parse(process.argv)

if (program.args.length === 0) {
  program.help()
} else {
  emojiCli.search(program.args, program.options)
}
