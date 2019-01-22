export default {
  props: {
    levels: {
      type: Number,
      default: 4
    }
  },
  watch: {
    levels: function(newVal, oldVal) {
      if (!isNaN(newVal)) {
        const { gl, simpleShader } = this.$data
        this.clearCanvas(gl)
        this.paint(gl, simpleShader)
      }
    }
  }
}
