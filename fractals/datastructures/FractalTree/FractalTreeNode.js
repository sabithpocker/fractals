export default class FractalTreeNode {
  constructor(value, parentNode = null, generateChildren, depth) {
    this.value = value
    this.parentNode = parentNode
    this.children = []
    this.depth = depth
    if (depth) {
      generateChildren(value).forEach(childValue => {
        this.addChild(childValue, generateChildren, depth)
      })
    }
  }
  addChild(value, generateChildren, depth) {
    this.children.push(
      new FractalTreeNode(value, this, generateChildren, depth - 1)
    )
  }
  hasChildren() {
    return Boolean(this.children.length)
  }
  getFirstChild() {
    return this.children[0]
  }
  hasNextSibling() {
    if (this.parentNode !== null) {
      const index = this.parentNode.children.indexOf(this)
      return Boolean(index + 1 < this.parentNode.children.length)
    } else {
      return false
    }
  }
  getNextSibling() {
    const index = this.parentNode.children.indexOf(this)
    return this.parentNode.children[index + 1]
  }
}
