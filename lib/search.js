var ncp = require('copy-paste')
var emojilib = require('emojilib').lib
var inquirer = require('inquirer')
var filter = require('lodash.filter')
var intersection = require('lodash.intersection')
var sortBy = require('lodash.sortby')

function search (words, options) {
  var emojis = filter(emojilib, function (emoji, key) {
    var hits = intersection(emoji.keywords, words)
    if (!emoji.char) return false
    if (hits.length === 0) return false
    emoji.weight = -hits.length
    return true
  })

  if (emojis.length === 0) {
    console.log('Emoji not found 😿')
    return
  }

  prompt(sortBy(emojis, 'weight'))
}

function prompt (emojis) {
  var choices = emojis.map(function (emoji) {
    return emoji.char
  })

  inquirer.prompt([{
    type: 'rawlist',
    name: 'emoji',
    message: 'Results:\n',
    choices: choices
  }], function (answer) {
    ncp.copy(answer.emoji, function () {
      console.log('Copied ' + answer.emoji)
    })
  })
}

module.exports = search
