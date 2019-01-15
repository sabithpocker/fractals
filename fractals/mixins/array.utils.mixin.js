export default {
  methods: {
    getRangeArray(length) {
      return [...Array(length).keys()].map(x => x + 1)
    }
  }
}
