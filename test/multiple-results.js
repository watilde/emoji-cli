var test = require('tap').test
var emoji = require('../lib/main')

test('multiple results', function (t) {
  emoji.search(['face', 'smile'], {}, function (err, emojis) {
    t.ifError(err)
    t.ok(emojis.length > 0)
    t.end()
  })
})

test('all results', function (t) {
  emoji.search([], {}, function (err, emojis) {
    t.ifError(err)
    t.ok(emojis.length > 0)
    t.end()
  })
})
