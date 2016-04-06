module.exports = process.platform === "win32" ? "clip" :
              process.platform === "darwin" ? "pbcopy" :
              "xsel"
