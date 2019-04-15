<template>
  <section class="l__container">
    <header class="l__main-header l__main-header--red">
      <h1>Fractals Using Javascript, VueJS and WebGL TODO: Mixin Color.js with hue-shift and other color functions.</h1>
    </header>
    <section class="l__cards">
      <fractal-card :settings="kochCode">
        <span slot="title">Koch Code</span>
        <template
          slot="fractal"
          slot-scope="props">
          <koch-code
            :paint-color="props.settings.color"
            :background-color="props.settings.backgroundColor"
            :levels="props.settings.levels"
            :show-growth="props.settings.checked"/>
        </template>
      </fractal-card>
      <fractal-card :settings="kochSnowFlake">
        <span slot="title">Koch Snow Flake</span>
        <template
          slot="fractal"
          slot-scope="props">
          <koch-snow-flake
            :paint-color="props.settings.color"
            :background-color="props.settings.backgroundColor"
            :levels="props.settings.levels"
            :show-growth="props.settings.checked"/>
        </template>
      </fractal-card>
      <fractal-card :settings="kochSnowInverse">
        <span slot="title">Koch Snow Inverse</span>
        <template
          slot="fractal"
          slot-scope="props">
          <koch-snow-inverse
            :paint-color="props.settings.color"
            :background-color="props.settings.backgroundColor"
            :levels="props.settings.levels"
            :show-growth="props.settings.checked"/>
        </template>
      </fractal-card>
      <article class="l__card l__card--primary">
        <header class="l__card-header">Sierpinski</header>
        <figure>
          <sierpinski/>
        </figure>
        <footer class="l__card-footer">
          <nuxt-link to="/sierpinski">View</nuxt-link>
        </footer>
      </article>
    </section>
  </section>
</template>

<script>
import KochCode from '../components/KochCode'
import KochSnowFlake from '../components/KochSnowFlake'
import KochSnowInverse from '../components/KochSnowInverse'
import Sierpinski from '../components/Sierpinski'
import FractalCard from '../components/FractalCard'

if (process.client) {
  import('../plugins/color-picker')
}
export default {
  components: {
    'koch-code': KochCode,
    'koch-snow-flake': KochSnowFlake,
    'koch-snow-inverse': KochSnowInverse,
    sierpinski: Sierpinski,
    'fractal-card': FractalCard
  },
  data: () => ({
    kochCode: {
      checked: false,
      levels: 3,
      color: { rgba: { r: 248, g: 231, b: 28, a: 1 } },
      backgroundColor: { rgba: { r: 255, g: 255, b: 255, a: 1 } },
      displayColorPicker: false
    },
    kochSnowFlake: {
      checked: true,
      levels: 5,
      color: { rgba: { r: 248, g: 231, b: 28, a: 1 } },
      backgroundColor: { rgba: { r: 255, g: 255, b: 255, a: 1 } },
      displayColorPicker: false
    },
    kochSnowInverse: {
      checked: false,
      levels: 5,
      color: { rgba: { r: 248, g: 231, b: 28, a: 1 } },
      backgroundColor: { rgba: { r: 255, g: 255, b: 255, a: 1 } },
      displayColorPicker: false
    }
  })
}
</script>

<style scoped>
.l__main-header {
  padding: 20px;
}
.l__main-header--red {
  background-color: #bc0000;
  color: #ffffff;
}
.l__cards {
  display: grid;
  grid-gap: 5px;
  padding: 5px;
  grid-template-columns: repeat(12, minmax(30px, 1fr));
  grid-auto-rows: 520px;
}
.l__card {
  grid-column: span 6;
  display: grid;
  grid-template-rows: 30px 1fr 30px;
}
.l__card--primary {
  background-color: #efefef;
}
.l__card-header {
  background: rgba(183, 189, 88, 0.38);
  padding: 5px;
  border-bottom: 1px solid #b0b584;
  color: #3c420c;
  font-size: 0.85em;
}
.l__card-footer {
  background: rgba(183, 189, 88, 0.38);
  padding: 5px;
  border-top: 1px solid #b0b584;
  color: #3c420c;
  font-size: 0.7em;
}

.color-picker-wrapper {
  position: relative;
}

.color-picker-wrapper .vc-sketch {
  position: absolute;
  top: 10px;
  left: 0px;
}
</style>
