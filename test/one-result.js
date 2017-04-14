var test = require('tap').test
var emoji = require('../lib/main')

test('one result from multiple results', function (t) {
  emoji.search(['sushi'], {}, function (err, emojis) {
    t.ifError(err)
    t.equal(emojis.length, 1)
    t.end()
  })
})
