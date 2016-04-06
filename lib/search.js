var ncp = require('copy-paste')
var emojilib = require('emojilib').lib
var inquirer = require('inquirer')
var filter = require('lodash.filter')
var intersection = require('lodash.intersection')
var sortBy = require('lodash.sortby')
var random = 0

function search (words, options, cb) {
  cb = typeof cb === 'function' ? cb : false
  var emojis = filter(emojilib, function (emoji, name) {
    if (!emoji.char) return false
    if (words && words.length > 0) {
      emoji.weight = intersection(emoji.keywords, words).length * -1
      if (words.length === 1 && words[0] === name) emoji.weight = -9999
      if (emoji.weight === 0) return false
      return true
    } else {
      return true
    }
  })

  if (emojis.length === 0 && !options.random) {
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
    ncp.copy(o.emoji, function () {
      console.log('Copied ' + o.emoji)
    })
  })
}

module.exports = search
