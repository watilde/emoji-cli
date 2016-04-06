var ncp = require('copy-paste')
var emojilib = require('emojilib').lib
var inquirer = require('inquirer')
var filter = require('lodash.filter')
var intersection = require('lodash.intersection')
var sortBy = require('lodash.sortby')
var random = 0

function search (words, options) {
  var emojis = filter(emojilib, function (emoji, name) {
    if (!emoji.char) return false
    emoji.weight = intersection(emoji.keywords, words).length * -1
    if (words.length === 1 && words[0] === name) emoji.weight = -9999
    if (emoji.weight === 0) return false
    return true
  })

  if (emojis.length === 0) {
    console.log('Emoji not found 😿')
    return
  }

  if (emojis.length === 1) {
    return ncp.copy(emojis[0].char, function () {
      console.log('Copied ' + emojis[0].char)
    })
  }

  if (options.random) {
    random = Math.floor(Math.random() * emojis.length)
    return ncp.copy(emojis[random].char, function () {
      console.log('Copied ' + emojis[random].char)
    })
  }

  prompt(sortBy(emojis, 'weight'))
}

function prompt (emojis) {
  var choices = emojis.map(function (emoji) {
    return emoji.char
  })

  inquirer.prompt([{
    type: 'list',
    name: 'emoji',
    message: 'Emojis:\n',
    choices: choices
  }], function (o) {
    ncp.copy(o.emoji, function () {
      console.log('Copied ' + o.emoji)
    })
  })
}

module.exports = search
