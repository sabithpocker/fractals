export default {
  methods: {
    getRangeArray(length) {
      return [...Array(length).keys()].map(x => x + 1)
    },
    getRandomItem(array) {
      return array[Math.floor(Math.random() * array.length)]
    }
  }
}
