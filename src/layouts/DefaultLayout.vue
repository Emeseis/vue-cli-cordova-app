<template>
  <v-app-bar>
    <template #prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>
    <template #title>
      <span class="font-weight-bold">{{ $route.name?.toString() }}</span>
    </template>
    <template #append>
      <v-btn icon="mdi-arrow-u-down-left mdi-rotate-90" @click="$router.back"></v-btn>
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined">
    <v-list mandatory :items="items" :selected="selected" @update:selected="changeRoute"></v-list>
  </v-navigation-drawer>
  <v-main>
    <slot />
  </v-main>
</template>

<script>
export default {
  name: 'DefaultLayout',
  computed: {
    currentRoute() {
      return this.$route.path
    },
    selected() {
      return [this.currentRoute]
    }
  },
  data: () => ({
    drawer: false,
    items: [
      { title: 'Home', value: '/', props: { prependIcon: 'mdi-home-outline' } },
      { title: 'Code Reader', value: '/code-reader', props: { prependIcon: 'mdi-barcode-scan' } },
      { title: 'Send Picture', value: '/send-picture', props: { prependIcon: 'mdi-camera-outline' } },
      { title: 'Text Recognizer', value: '/text-recognizer', props: { prependIcon: 'mdi-text-recognition' } },
    ]
  }),
  methods: {
    changeRoute([route]) {
      if (route !== this.currentRoute) this.$router.push(route)
    }
  }
}
</script>

<style scoped>
:deep(.v-toolbar__prepend) {
  margin-inline: 8px auto !important;
}
:deep(.v-toolbar__append) {
  margin-inline: auto 8px !important;
}
</style>