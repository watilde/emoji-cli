# emoji-cli [![Build Status](https://api.travis-ci.org/watilde/emoji-cli.svg)](https://travis-ci.org/watilde/emoji-cli)
Emoji searcher

## install
via npm
```
$ npm install -g emoji-cli
```

## usage
See `emoji -h`
```
Usage: emoji <keywords>

Options:

  -h, --help     output usage information
  -V, --version  output the version number
  -r, --random   pick a emoji randomly and copy it to clipboard
```

## screenshots
One result
![emoji](./img/emoji.png)

Multiple results
![emojis](./img/emojis.png)

Pick a emoji randomly
![random emoji](./img/random_emoji.png)

Emoji not found
![emoji not found](./img/emoji_not_found.png)

## api
Basic usage. Checkout the `test/` folder for `require('emoji-cli')` examples.
```
var emoji = require('emoji-cli')

// callback ------------------------------------------+
// options ---------------------------+               |
// keywords -------+                  |               |
// method -+       |                  |               |
//         v       v                  v               v
    emoji.search(['face', 'smile'], {random: true}, function (emoji) {
      console.log(emoji)
    })
```

### emoji.search(keywords, options, callback)
+ `keywords` {Array} Arguments to `emoji` command
+ `options` {Object} Can be `random: true`
+ `callback` {Function} To receive results

## based on
Thanks :exclamation:
+ https://github.com/muan/emoji-cli
