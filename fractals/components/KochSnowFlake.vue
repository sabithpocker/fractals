<template>
  <canvas
    ref="kochSnowFlake" 
    class="l__canvas"/>
</template>

<script language="javascript">
import WebGLM from '../mixins/webgl.mixin'
import Line from '../mixins/line.mixin'
import EquilateralLines from '../mixins/equilateral-lines.mixin'
import ShowGrowth from '../mixins/show-growth'
import DynamicLevels from '../mixins/dynamic-levels.mixin'
import PaintColor from '../mixins/paint-color'
import BackgroundColor from '../mixins/background-color'
import ArrayUtils from '../mixins/array.utils.mixin'
export default {
  mixins: [
    WebGLM,
    Line,
    EquilateralLines,
    ShowGrowth,
    DynamicLevels,
    PaintColor,
    BackgroundColor,
    ArrayUtils
  ],
  mounted: function() {
    const canvas = this.$refs.kochSnowFlake
    const { gl, simpleShader } = this.initialize(canvas)
    this.$data.gl = gl
    this.$data.simpleShader = simpleShader
    this.paint(gl, simpleShader)
  },
  methods: {
    paint: function(gl, simpleShader) {
      console.log(this.levels)
      this.changeColor(...this.getPaintColorRBGA())
      this.clearCanvas(gl, this.getBackgroundColorRBGA())
      const width = gl.canvas.width
      const height = gl.canvas.height
      const center = { x: width / 2, y: height / 2 }
      const side = Math.min(width, height) * (2 / 3)
      const points = this.getEquilateralLines(center, side)
      const childPoints = this.showGrowth
        ? this.getRangeArray(this.levels).reduce(
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
            (acc, point) => [
              ...acc,
              ...this.getChildLinePoints(point, this.levels)
            ],
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
