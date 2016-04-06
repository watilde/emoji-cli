var test = require('tap').test
var emoji = require('../lib/main')

test('one results', function (t) {
  emoji.search(['taiyaki'], {}, function (emojis) {
    t.equal(emojis.length, 0)
    t.end()
  })
})
