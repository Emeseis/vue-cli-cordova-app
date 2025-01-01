<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
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
          await this.$nextTick();
          console.group('Loading Scanner plugin...')
          console.log(window.nfc)
          console.groupEnd()
        }
      })    
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
