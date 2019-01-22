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
import FractalTree from '../datastructures/FractalTree/FractalTree'
import generateChildren from '../datastructures/FractalTree/generateChildren'

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
      this.changeColor(...this.getPaintColorRBGA())
      const width = gl.canvas.width
      const margin = 10
      const points = [0 + margin, 0 + margin, width - margin, 0 + margin]
      const fractalTree = new FractalTree(points, generateChildren, this.levels)
      const rangeArray = this.getRangeArray(this.levels)
      if (this.showGrowth) {
        rangeArray.forEach(level => {
          fractalTree
            .getValuesAtDepth(level)
            .forEach(points => this.drawLine(gl, simpleShader, ...points))
        })
      } else {
        fractalTree
          .getValuesAtDepth(this.levels)
          .forEach(points => this.drawLine(gl, simpleShader, ...points))
      }
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
