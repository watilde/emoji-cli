var test = require('tap').test
var emoji = require('../lib/main')

test('multiple results with fuzzy search', function (t) {
  emoji.search(['face', 'smile'], {fuzzy: true}, function (err, emojis) {
    t.ifError(err)
    t.ok(emojis.length > 0)
    t.end()
  })
})

test('no results with fuzzy search', function (t) {
  emoji.search(['taiyaki'], {fuzzy: true}, function (err, emojis) {
    t.ifError(err)
    t.equal(emojis.length, 0)
    t.end()
  })
})

test('one result with fuzzy search', function (t) {
  emoji.search(['sush'], {fuzzy: true}, function (err, emojis) {
    t.ifError(err)
    t.equal(emojis.length, 3)
    t.end()
  })
})
