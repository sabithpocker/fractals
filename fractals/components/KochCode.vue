<template>
  <canvas
    ref="kochCanvas"
    class="l__canvas"/>
</template>

<script>
import WebGLM from '../mixins/webgl.mixin'
import Line from '../mixins/line.mixin'
import ShowGrowth from '../mixins/show-growth'
import PaintColor from '../mixins/paint-color'
import DynamicLevels from '../mixins/dynamic-levels.mixin'
import ArrayUtils from '../mixins/array.utils.mixin'
export default {
  mixins: [WebGLM, Line, ShowGrowth, DynamicLevels, PaintColor, ArrayUtils],
  mounted: function() {
    const canvas = this.$refs.kochCanvas
    const { gl, simpleShader } = this.initialize(canvas)
    this.$data.gl = gl
    this.$data.simpleShader = simpleShader
    this.paint(gl, simpleShader)
  },
  methods: {
    paint: function(gl, simpleShader) {
      this.changeColor(
        this.paintColor.r / 255,
        this.paintColor.g / 255,
        this.paintColor.b / 255,
        this.paintColor.a
      )
      const width = gl.canvas.width
      const margin = 10
      const points = [0 + margin, 0 + margin, width - margin, 0 + margin]
      const childPoints = this.showGrowth
        ? this.getChildLinePointsForLevelsArray(
            points,
            this.getRangeArray(this.levels)
          )
        : this.getChildLinePoints(points, this.levels)
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
