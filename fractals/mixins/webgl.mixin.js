import { vertexShaderSource } from '../shaders/vertex-shader-source'
import { fragmentShaderSource } from '../shaders/fragment-shader-source'
export default {
  methods: {
    getWebGLContext(canvas) {
      const gl = canvas.getContext('webgl', {
        antialias: true
      })
      if (!gl) {
        console.error('WEBGL not available')
      }
      return gl
    },
    data: () => ({
      gl: null,
      simpleShader: null
    }),
    resize(gl) {
      var realToCSSPixels = window.devicePixelRatio

      // Lookup the size the browser is displaying the canvas in CSS pixels
      // and compute a size needed to make our drawingbuffer match it in
      // device pixels.
      var displayWidth = Math.floor(gl.canvas.clientWidth * realToCSSPixels)
      var displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels)

      // Check if the canvas is not the same size.
      if (
        gl.canvas.width !== displayWidth ||
        gl.canvas.height !== displayHeight
      ) {
        // Make the canvas the same size
        gl.canvas.width = displayWidth
        gl.canvas.height = displayHeight
      }
    },
    clearCanvas(gl, color = [0, 0, 0, 0]) {
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      // Clear the canvas
      gl.clearColor(...color)
      gl.clear(gl.COLOR_BUFFER_BIT)
    },
    createProgram(gl, vertexShader, fragmentShader) {
      var program = gl.createProgram()
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)
      var success = gl.getProgramParameter(program, gl.LINK_STATUS)
      if (success) {
        return program
      }
      console.error(gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
    },
    createShader(gl, type, source) {
      var shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
      if (success) {
        return shader
      }
      console.log('Create Shader ERROR: ', gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
    },
    getSimpleVertexShader(gl) {
      return this.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    },
    getSimpleFragmentShader(gl) {
      return this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    },
    initSimpleProgram(
      gl,
      program,
      resolutionUniformLocation,
      colorUniformLocation,
      positionAttributeLocation,
      positionBuffer
    ) {
      gl.useProgram(program)
      // set the resolution
      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
      // Set a random color.
      gl.uniform4f(colorUniformLocation, 0, 0, 0, 1)
      gl.enableVertexAttribArray(positionAttributeLocation)
      // Bind the position buffer.
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    },
    changeColor(r = 0, g = 0, b = 0, a = 1) {
      this.$data.gl.uniform4f(
        this.$data.simpleShader.colorUniformLocation,
        r,
        b,
        g,
        a
      )
    },
    initialize(canvas) {
      const gl = this.getWebGLContext(canvas)
      this.resize(gl)
      this.clearCanvas(gl)
      const program = this.createProgram(
        gl,
        this.getSimpleVertexShader(gl),
        this.getSimpleFragmentShader(gl)
      )
      const positionAttributeLocation = gl.getAttribLocation(
        program,
        'a_position'
      )
      const resolutionUniformLocation = gl.getUniformLocation(
        program,
        'u_resolution'
      )
      const colorUniformLocation = gl.getUniformLocation(program, 'u_color')
      const positionBuffer = gl.createBuffer()
      const simpleShader = {
        program: program,
        positionAttributeLocation: positionAttributeLocation,
        resolutionUniformLocation: resolutionUniformLocation,
        colorUniformLocation: colorUniformLocation,
        positionBuffer: positionBuffer
      }
      this.initSimpleProgram(
        gl,
        program,
        resolutionUniformLocation,
        colorUniformLocation,
        positionAttributeLocation,
        positionBuffer
      )

      return { gl: gl, simpleShader: simpleShader }
    }
  }
}
