var ncp = require('copy-paste')
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
    if (keywords.length === 1 && (options.fuzzy ? fuzzy(keywords[0], name) : keywords[0] === name)) emoji.weight = -9999
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
    return ncp.copy(emojis[0].char, function () {
      console.log('Copied ' + emojis[0].char)
    })
  }

  if (emojis.length > 1) {
    emojis.push({
      keywords: ['.exit'],
      char: '.exit',
      category: 'flags',
      weight: -Infinity
    })
  }

  if (options.random) {
    random = Math.floor(Math.random() * emojis.length)
    if (cb) return cb([emojis[random].char])
    return ncp.copy(emojis[random].char, function () {
      console.log('Copied ' + emojis[random].char)
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
  }], function (o) {
    if (o.emoji === '.exit') {
      console.log('Exit')
      return
    }
    ncp.copy(o.emoji, function () {
      console.log('Copied ' + o.emoji)
    })
  })
}

module.exports = search
