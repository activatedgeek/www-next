const fs = require("fs").promises
const TOML = require("@iarna/toml")
const { getAllRawPages } = require("./kb")

async function getStorkConfig() {
  return {
    input: {
      frontmatter_handling: "Omit",
      files: (await getAllRawPages())
        .map(({ filePath: path, title, uri: url, internal }) => {
          if (!internal) {
            return {
              path,
              title,
              url,
              filetype: "Markdown",
            }
          }
        })
        .filter((r) => r !== undefined)
        .flat(),
    },
  }
}

getStorkConfig().then((storkConfig) => {
  fs.writeFile("public/index.toml", TOML.stringify(storkConfig), (err) => {
    if (err) throw err
  })
})
