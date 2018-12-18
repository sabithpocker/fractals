export default {
  methods: {
    drawTriangle(gl, shader, x1, y1, x2, y2, x3, y3) {
      // setRectangle(gl,600,600,100,100);
      this.setTriangle(gl, x1, y1, x2, y2, x3, y3)

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
      this.renderTriangle(gl)
    },
    setTriangle(gl, x1, y1, x2, y2, x3, y3) {
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([x1, y1, x2, y2, x3, y3]),
        gl.STATIC_DRAW
      )
    },
    renderTriangle(gl) {
      var primitiveType = gl.TRIANGLES
      var offset = 0
      var count = 3
      gl.drawArrays(primitiveType, offset, count)
    }
  }
}
