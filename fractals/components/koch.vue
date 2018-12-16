<template>
  <canvas
    ref="kochCanvas" 
    class="l__canvas"/>
</template>

<script>
import WebGLM from '../mixins/webgl.mixin'
import Fractal from '../mixins/fractal.mixin'
import Line from '../mixins/line.mixin'
export default {
  mixins: [WebGLM, Fractal, Line],
  mounted: function() {
    const canvas = this.$refs.kochCanvas
    const gl = this.getWebGLContext(canvas)
    this.resize(gl)
    this.clearCanvas(gl)
    const program = this.createProgram(
      gl,
      this.getSimpleVertexShader(gl),
      this.getSimpleFragmentShader(gl)
    )
    const positionAttributeLocation = gl.getAttribLocation(
      program,
      'a_position'
    )
    const resolutionUniformLocation = gl.getUniformLocation(
      program,
      'u_resolution'
    )
    const colorUniformLocation = gl.getUniformLocation(program, 'u_color')
    const positionBuffer = gl.createBuffer()
    const simpleShader = {
      program: program,
      positionAttributeLocation: positionAttributeLocation,
      resolutionUniformLocation: resolutionUniformLocation,
      colorUniformLocation: colorUniformLocation,
      positionBuffer: positionBuffer
    }
    this.initSimpleProgram(
      gl,
      program,
      resolutionUniformLocation,
      colorUniformLocation,
      positionAttributeLocation,
      positionBuffer
    )
    const width = gl.canvas.width
    const margin = 10
    const points = [0 + margin, 0 + margin, width - margin, 0 + margin]
    const childPoints = this.getChildLinePoints(points, 4)
    childPoints.forEach(points => this.drawLine(gl, simpleShader, ...points))
  }
}
</script>

<style scoped>
.l__canvas {
  width: 100%;
  height: 100%;
}
</style>
