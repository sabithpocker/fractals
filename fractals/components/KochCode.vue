<template>
  <canvas
    ref="kochCanvas" 
    class="l__canvas"/>
</template>

<script>
import WebGLM from '../mixins/webgl.mixin'
import Line from '../mixins/line.mixin'
export default {
  mixins: [WebGLM, Line],
  mounted: function() {
    const canvas = this.$refs.kochCanvas
    const { gl, simpleShader } = this.initialize(canvas)
    this.paint(gl, simpleShader)
  },
  methods: {
    paint: function(gl, simpleShader) {
      const width = gl.canvas.width
      const margin = 10
      const points = [0 + margin, 0 + margin, width - margin, 0 + margin]
      const childPoints = this.getChildLinePoints(points, 4)
      childPoints.forEach(points => this.drawLine(gl, simpleShader, ...points))
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
