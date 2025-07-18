<template>
  <nav class="font-weight-bold justify-space-between d-flex pa-6">
    <router-link to="/">Home</router-link>
    <router-link to="/code-reader">Code Reader</router-link>
    <router-link to="/char-recognizer">Character Recognizer</router-link>
  </nav>
  <router-view/>
</template>

<script>
export default {
  name: "App",
  created() {
    this.registerPlugins()
  },
  methods: {
    async registerPlugins() {
      if (!this.$vuetify.display.mobile) return
      
      document.removeEventListener('resume', this.registerPlugins, false)

      document.addEventListener('deviceready', async () => {
        while (typeof window.plugins.zebra === 'undefined') {
          await this.$nextTick()
          console.group('Loading Scanner plugin...')
          console.log(window.plugins.zebra)
          console.groupEnd()
        }
      })    
    }
  }
}
</script>
