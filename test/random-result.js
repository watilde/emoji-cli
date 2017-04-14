var test = require('tap').test
var emoji = require('../lib/main')

test('one results', function (t) {
  emoji.search(['face'], {random: true}, function (err, emojis) {
    t.ifError(err)
    t.equal(emojis.length, 1)
    t.end()
  })
})

test('one result from all results', function (t) {
  emoji.search([], {random: true}, function (err, emojis) {
    t.ifError(err)
    t.ok(emojis.length > 0)
    t.end()
  })
})
