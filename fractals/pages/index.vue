<template>
  <section class="l__container">
    <header class="l__main-header l__main-header--red">
      <h1>Fractals Using Javascript, VueJS and WebGL</h1>
    </header>
    <section class="l__cards">
      <article class="l__card l__card--primary">
        <header class="l__card-header">Koch Code</header>
        <figure><koch-code/></figure>
        <footer class="l__card-footer">
          <nuxt-link to="/koch-code">View</nuxt-link>
        </footer>
      </article>
      <article class="l__card l__card--primary">
        <header class="l__card-header">Koch Snow Flake</header>
        <figure>
          <koch-snow-flake 
            :show-growth="kochSnowFlake.checked"/>
        </figure>
        <footer class="l__card-footer">
          <nuxt-link to="/koch-snow-flake">View</nuxt-link>
          <input
            id="koch-snow-flake"
            v-model="kochSnowFlake.checked"
            type="checkbox">
          <label for="koch-snow-flake">Show Growth</label>
        </footer>
      </article>
      <article class="l__card l__card--primary">
        <header class="l__card-header">Koch Snow Inverse</header>
        <figure>
          <koch-snow-inverse 
            :show-growth="kochSnowInverse.checked"/>
        </figure>
        <footer class="l__card-footer">
          <nuxt-link to="/koch-snow-inverse">View</nuxt-link>
          <input
            id="koch-snow-inverse"
            v-model="kochSnowInverse.checked"
            type="checkbox">
          <label for="koch-snow-inverse">Show Growth</label>
        </footer>
      </article>
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

export default {
  components: {
    'koch-code': KochCode,
    'koch-snow-flake': KochSnowFlake,
    'koch-snow-inverse': KochSnowInverse,
    sierpinski: Sierpinski
  },
  data: () => ({
    kochCode: {
      checked: false
    },
    kochSnowFlake: {
      checked: false
    },
    kochSnowInverse: {
      checked: false
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
  grid-auto-rows: 320px;
}
.l__card {
  grid-column: span 3;
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
</style>
