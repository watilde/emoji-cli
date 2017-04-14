var clipboardy = require('clipboardy')
var emojilib = require('emojilib').lib
var inquirer = require('inquirer')
var filter = require('lodash.filter')
var intersectionWith = require('lodash.intersectionwith')
var sortBy = require('lodash.sortby')
var fuzzy = require('fuzzysearch')
var random = 0

function search (keywords, options, cb) {
  cb = typeof cb === 'function' ? cb : false
  var emojis = filter(emojilib, function (emoji, name) {
    if (!emoji.char) return false
    if (keywords.length === 0) return true
    emoji.weight = intersectionWith(emoji.keywords, keywords, function (keyword, term) {
      return options.fuzzy ? fuzzy(term, keyword) : term === keyword
    }).length * -1

    if (keywords.length === 1 && keywords[0] === name) emoji.weight = -9999
    if (options.fuzzy && keywords.length === 1 && fuzzy(keywords[0], name)) {
      emoji.weight = Math.abs(keywords[0].length - name.length)
    }
    if (emoji.weight === 0) return false
    return true
  })

  if (emojis.length === 0) {
    if (cb) return cb([])
    console.log('Emoji not found 😿')
    return
  }

  if (emojis.length === 1) {
    if (cb) return cb([emojis[0].char])
    clipboardy.writeSync(emojis[0].char)
    console.log('Copied ' + emojis[0].char)
    return
  }

  if (options.random) {
    random = Math.floor(Math.random() * emojis.length)
    if (cb) return cb([emojis[random].char])
    clipboardy.writeSync(emojis[random].char)
    console.log('Copied ' + emojis[random].char)
    return
  }

  if (emojis.length > 1) {
    emojis.push({
      keywords: ['.exit'],
      char: '.exit',
      category: 'flags',
      weight: -Infinity
    })
  }

  emojis = sortBy(emojis, 'weight').map(function (emoji) {
    return emoji.char
  })

  if (cb) return cb(emojis)

  inquirer.prompt([{
    type: 'list',
    name: 'emoji',
    message: 'Emojis:\n',
    choices: emojis
  }]).then(function (o) {
    if (o.emoji === '.exit') {
      console.log('Exit')
      return
    }
    clipboardy.writeSync(o.emoji)
    console.log('Copied ' + o.emoji)
  })
}

module.exports = search
