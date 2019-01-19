<template>
  <article class="l__card l__card--primary">
    <header class="l__card-header"><slot name="title" /></header>
    <figure>
      <slot
        :settings="settings"
        name="fractal" />
    </figure>
    <footer class="l__card-footer">
      <nuxt-link to="/koch-code">View</nuxt-link>
      <span class="color-picker-wrapper">
        <button @click="settings.displayColorPicker = !settings.displayColorPicker">Color</button>
        <no-ssr>
          <color-picker
            v-if="settings.displayColorPicker"
            v-model="settings.color"
            @blur="settings.displayColorPicker = false"/>
        </no-ssr>
      </span>
      <input
        id="koch-code"
        v-model="settings.checked"
        type="checkbox">
      <label for="koch-code">Show Growth</label>
      <input
        id="koch-code-levels"
        v-model.number="settings.levels"
        min="0"
        max="5"
        type="number">
    </footer>
  </article>
</template>

<script>
if (process.client) {
  import('../plugins/color-picker')
}
export default {
  data: () => ({
    settings: {
      checked: false,
      levels: 5,
      color: { rgba: { r: 255, g: 0, b: 0, a: 1 } },
      displayColorPicker: false
    }
  })
}
</script>

<style>
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
</style>
