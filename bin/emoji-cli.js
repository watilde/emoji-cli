#!/usr/bin/env node
var emojiCli = require('../lib/main')
var pkg = require('../package.json')
var updateNotifier = require('update-notifier')
var program = require('commander')
var argv = process.argv
// to overwrite `_name` in commander
argv[1] = argv[1].replace('emoji-cli.js', 'emoji.js')

updateNotifier({
  packageName: pkg.name,
  packageVersion: pkg.version
}).notify()

program
  .version(pkg.version)
  .usage('<keywords>')
  .option('-r, --random', 'pick a emoji randomly and copy it to clipboard')

program.parse(argv)

console.log('(To exit, press ^C or choose ".exit")')

emojiCli.search(program.args, {
  random: program.random
})
