export default {
  props: {
    paintColor: {
      type: Object,
      default: { r: 0, g: 0, b: 0, a: 1 }
    }
  },
  watch: {
    paintColor: function(newVal, oldVal) {
      const { gl, simpleShader } = this.$data
      this.clearCanvas(gl)
      this.paint(gl, simpleShader)
    }
  }
}
