import { visit } from "unist-util-visit"

export default function remarkFigureImage() {
  return (tree) => {
    visit(tree, "paragraph", (node) => {
      if (node.children.length === 1 && node.children[0].type === "image") {
        const { title, url, alt: _alt } = node.children[0]
        const alt = _alt || ""
        if (title) {
          const html = `<figure><img src="${url}" alt="${alt}" title="${title}" /><figcaption>${title}</figcaption></figure>`
          node.type = "html"
          node.value = html
          node.children = []
        }
      }
    })
  }
}
