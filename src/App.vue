<template>
  <v-app>
    <component :is="layoutComponent">
      <router-view />
    </component>
  </v-app>
</template>

<script>
import DefaultLayout from './layouts/DefaultLayout.vue'
import EmptyLayout from './layouts/EmptyLayout.vue'

export default {
  name: 'App',
  created() {
    this.registerMobilePlugins()
  },
  components: {
    DefaultLayout,
    EmptyLayout,
  },
  computed: {
    layoutComponent() {
      return this.$route.meta.layout || 'DefaultLayout'
    },
  },
  methods: {
    async registerMobilePlugins() {
      if (!this.$vuetify.display.mobile) return      
      document.removeEventListener('resume', this.registerMobilePlugins, false)
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
