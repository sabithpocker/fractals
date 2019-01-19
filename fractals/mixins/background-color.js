export default {
  props: {
    backgroundColor: {
      type: Object,
      default: { rgba: { r: 0, g: 0, b: 0, a: 1 } }
    }
  },
  methods: {
    getBackgroundColorRBGA() {
      return [
        this.backgroundColor.rgba.r / 255,
        this.backgroundColor.rgba.b / 255,
        this.backgroundColor.rgba.g / 255,
        this.backgroundColor.rgba.a
      ]
    }
  },
  watch: {
    backgroundColor: function(newVal, oldVal) {
      const { gl, simpleShader } = this.$data
      this.paint(gl, simpleShader)
    }
  }
}
