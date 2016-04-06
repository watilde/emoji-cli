var test = require('tap').test
var emoji = require('../lib/main')

test('one results', function (t) {
  emoji.search(['face'], {random: true}, function (emojis) {
    t.equal(emojis.length, 1)
    t.end()
  })
})

test('one result from all results', function (t) {
  emoji.search([], {random: true}, function (emojis) {
    t.ok(emojis.length > 0)
    t.end()
  })
})
