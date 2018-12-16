import {gl} from '../gl'
import { vertexShaderSource } from './2d-vertex-shader-source'
import { createShader } from '../create-shader'

export const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource)
