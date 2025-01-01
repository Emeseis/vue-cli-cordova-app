<template>
  <div></div>
</template>

<script>
export default {
  name: 'Scanner',
  mounted() {
    this.registerScanner()
  },
  unmounted() {
    this.unregisterScanner()
  },
  methods: {
    registerScanner() {
      if (!this.$vuetify.display.mobile) return;

      document.removeEventListener('resume', this.registerScanner, false)

      if (window.plugins.zebra.scanner.test.available) {
        window.plugins.zebra.scanner.test.stop()
        console.log('Scanner is available')
        window.plugins.zebra.scanner.test.start(this.onSuccess, this.onFailure)
      } else {
        console.log('Scanner is not available')
      }
    },
    onSuccess({ data, type, timestamp }) {
      console.group(timestamp, '|', data.length, '|', type)
      console.log(data)
      console.groupEnd()

      this.$emit('scan', { data, type, timestamp })
    },
    onFailure(err) {
      console.group('Enable scanner failure')
      console.log(err.message)
      console.groupEnd()
    },
    unregisterScanner() {
      if (!this.$vuetify.display.mobile) return;

      window.plugins.zebra.scanner.test.stop()
    },
  }
}
</script>
