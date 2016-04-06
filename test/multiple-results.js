var test = require('tap').test
var emoji = require('../lib/main')

test('multiple results', function (t) {
  emoji.search(['face', 'smile'], {}, function (emojis) {
    t.ok(emojis.length > 0)
    t.end()
  })
})
