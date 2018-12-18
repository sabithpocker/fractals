<template>
  <canvas
    ref="sierpinski" 
    class="l__canvas"/>
</template>

<script>
import WebGLM from '../mixins/webgl.mixin'
import Triangle from '../mixins/triangle.mixin'
import EquilateralPoints from '../mixins/equilateral-points.mixin'
export default {
  mixins: [WebGLM, Triangle, EquilateralPoints],
  mounted: function() {
    const canvas = this.$refs.sierpinski
    const { gl, simpleShader } = this.initialize(canvas)
    this.$data.gl = gl
    this.$data.simpleShader = simpleShader
    this.paint(gl, simpleShader)
  },
  methods: {
    paint: function(gl, simpleShader) {
      const width = gl.canvas.width
      const height = gl.canvas.height
      const side = Math.min(width, height) - 100
      const altitude = (Math.sqrt(3) / 2) * side
      const center = { x: width / 2, y: altitude / 2 }
      const points = this.getEquilateralPoints(center, side)
      const childPoints = this.getChildTrianglePoints(points, 7)
      childPoints.forEach(points =>
        this.drawTriangle(gl, simpleShader, ...points)
      )
    }
  }
}
</script>

<style scoped>
.l__canvas {
  width: 100%;
  height: 100%;
}
</style>
