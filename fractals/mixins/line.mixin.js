export default {
  methods: {
    drawLine(gl, shader, x1, y1, x2, y2) {
      // setRectangle(gl,600,600,100,100);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([x1, y1, x2, y2]),
        gl.STATIC_DRAW
      )
      // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
      const size = 2 // 2 components per iteration
      const type = gl.FLOAT // the data is 32bit floats
      const normalize = false // don't normalize the data
      const stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
      const offset = 0 // start at the beginning of the buffer
      gl.vertexAttribPointer(
        shader.positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset
      )
      this.renderLine(gl)
    },
    renderLine(gl) {
      var primitiveType = gl.LINES
      var offset = 0
      var count = 2
      gl.drawArrays(primitiveType, offset, count)
    },
    getChildLinePointsForLevelsArray(points, levelsArray = []) {
      return levelsArray.reduce(
        (a, i) => [...a, ...this.getChildLinePoints(points, i)],
        []
      )
    },
    getChildLinePoints(points, depth = 0) {
      if (depth === 0) {
        const Ax = points[0]
        const Ay = points[1]
        const Bx = points[2]
        const By = points[3]
        const Ux = Bx - Ax
        const Uy = By - Ay
        const Vx = Ay - By
        const Vy = Bx - Ax
        const Px = Ax + (1 / 3) * Ux
        const Py = Ay + (1 / 3) * Uy
        const Qx = Ax + (1 / 2) * Ux + (Math.sqrt(3) / 6) * Vx
        const Qy = Ay + (1 / 2) * Uy + (Math.sqrt(3) / 6) * Vy
        const Rx = Ax + (2 / 3) * Ux
        const Ry = Ay + (2 / 3) * Uy
        return [
          [Ax, Ay, Px, Py],
          [Px, Py, Qx, Qy],
          [Qx, Qy, Rx, Ry],
          [Rx, Ry, Bx, By]
        ]
      } else {
        const xpoints = [...this.getChildLinePoints(points, depth - 1)]
        return xpoints.reduce(
          (acc, point) => [...acc, ...this.getChildLinePoints(point)],
          []
        )
      }
    }
  }
}
