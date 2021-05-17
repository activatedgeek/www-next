const visit = require('unist-util-visit');

function plugin(options) {
  function transformer(tree) {
    visit(tree, 'paragraph', function(node) {
      if (node.children.length === 1 && node.children[0].type === 'image') {
        const { title, url, alt } = node.children[0]
        if (title) {
          html = `<figure><img src="${url}" alt="${alt || ''}" title="${title || ''}" />${title ? `<figcaption>${title}</figcaption>` : ''}</figure>`
          node.type = 'html'
          node.value = html
          node.children = []
        }
      }
    });
  }

  return transformer
}

module.exports = plugin