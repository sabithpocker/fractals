<template>
  <section class="l__container">
    <header class="l__main-header l__main-header--red">
      <h1>Fractals Using Javascript, VueJS and WebGL</h1>
    </header>
    <section class="l__cards">
      <article class="l__card l__card--primary">
        <header class="l__card-header">Sierpinski</header>
        <koch/>
      </article>
      <article class="l__card l__card--primary">
        <header class="l__card-header">Koch Code</header>
      </article>
      <article class="l__card l__card--primary">
        <header class="l__card-header">KochSnowflake</header>
      </article>
      <article class="l__card l__card--primary">
        <header class="l__card-header">KochSnowinverse</header>
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

<style>
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
  grid-template-columns: repeat(12, minmax(30px, 1fr));
}
.l__card {
  grid-column: span 3;
}
.l__card--primary {
  background-color: #efefef;
}
</style>
