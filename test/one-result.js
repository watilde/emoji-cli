var test = require('tap').test
var emoji = require('../lib/main')

test('one results', function (t) {
  emoji.search(['sushi'], {}, function (emojis) {
    t.equal(emojis.length, 1)
    t.end()
  })
})
