export default {
  props: {
    paintColor: {
      type: Object,
      default: { rgba: { r: 0, g: 0, b: 0, a: 1 } }
    }
  },
  methods: {
    getPaintColorRBGA() {
      return [
        this.paintColor.rgba.r / 255,
        this.paintColor.rgba.b / 255,
        this.paintColor.rgba.g / 255,
        this.paintColor.rgba.a
      ]
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
