<template>
  <canvas
    ref="kochSnowFlake" 
    class="l__canvas"/>
</template>

<script>
import WebGLM from '../mixins/webgl.mixin'
import Line from '../mixins/line.mixin'
import EquilateralLines from '../mixins/equilateral-lines.mixin'
import ShowGrowth from '../mixins/show-growth'
export default {
  mixins: [WebGLM, Line, EquilateralLines, ShowGrowth],
  mounted: function() {
    const canvas = this.$refs.kochSnowFlake
    const { gl, simpleShader } = this.initialize(canvas)
    this.$data.gl = gl
    this.$data.simpleShader = simpleShader
    this.paint(gl, simpleShader)
  },
  methods: {
    paint: function(gl, simpleShader) {
      const width = gl.canvas.width
      const height = gl.canvas.height
      const center = { x: width / 2, y: height / 2 }
      const side = Math.min(width, height) * (2 / 3)
      const points = this.getEquilateralLines(center, side, true)
      const childPoints = this.showGrowth
        ? [0, 1, 2, 3, 4].reduce(
            (a, i) => [
              ...a,
              ...points.reduce(
                (acc, point) => [...acc, ...this.getChildLinePoints(point, i)],
                []
              )
            ],
            []
          )
        : points.reduce(
            (acc, point) => [...acc, ...this.getChildLinePoints(point, 4)],
            []
          )
      childPoints.forEach(x => this.drawLine(gl, simpleShader, ...x))
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
