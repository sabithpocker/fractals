<template>
  <section class="l__container">
    <header class="l__main-header l__main-header--red">
      <h1>Fractals Using Javascript, VueJS and WebGL</h1>
    </header>
    <section class="l__full-view">
      <article class="l__card l__card--primary">
        <header class="l__card-header">Koch Code</header>
        <koch/>
      </article>
    </section>
  </section>
</template>

<script>
import Koch from '../components/koch'

export default {
  components: {
    koch: Koch
  }
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
.l__full-view {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(12, minmax(30px, 1fr));
  grid-template-rows: 1fr;
}
.l__card {
  grid-column: span 12;
}
.l__card--primary {
  background-color: #efefef;
}
</style>
