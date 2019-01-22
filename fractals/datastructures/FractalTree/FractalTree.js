import FractalTreeNode from './FractalTreeNode'
export default class FractalTree {
  constructor(start, generateChildren, depth) {
    this.depth = depth
    try {
      this.root = new FractalTreeNode(start, null, generateChildren, depth)
    } catch (e) {
      console.error('Try reducing the depth')
    }
  }
  getValuesAtDepth(depth) {
    return this.getNodesAtDepth(depth).map(node => node.value)
  }
  getNodesAtDepth(depth) {
    if (depth > this.depth) {
      throw new Error('Depth cannot be greater than depth of the tree')
    }
    const nodes = []
    let currentNode = this.root
    let currentDepth = 1
    let stack = []
    let completed = []
    do {
      if (
        currentNode.hasChildren() &&
        currentDepth < depth &&
        !completed.includes(currentNode)
      ) {
        stack.push(currentNode)
        currentNode = currentNode.getFirstChild()
        currentDepth = currentDepth + 1
      } else {
        if (currentDepth === depth && !completed.includes(currentNode)) {
          nodes.push(currentNode)
        }
        if (currentNode.hasNextSibling()) {
          currentNode = currentNode.getNextSibling()
        } else {
          completed.push(currentNode.parentNode)
          currentNode = stack.pop()
          currentDepth = currentDepth - 1
        }
      }
    } while (stack.length)
    return nodes
  }
}
