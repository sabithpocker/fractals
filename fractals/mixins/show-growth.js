export default {
  props: {
    showGrowth: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showGrowth: function(newVal, oldVal) {
      const { gl, simpleShader } = this.$data
      this.clearCanvas(gl)
      this.paint(gl, simpleShader)
    }
  }
}
