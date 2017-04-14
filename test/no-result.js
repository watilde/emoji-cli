var test = require('tap').test
var emoji = require('../lib/main')

test('one results', function (t) {
  emoji.search(['taiyaki'], {}, function (err, emojis) {
    t.ifError(err)
    t.equal(emojis.length, 0)
    t.end()
  })
})
