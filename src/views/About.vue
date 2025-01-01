<template>
  <div class="about">
    <h1>This is an about page</h1>
    <img height="200" :src="require('../assets/scan.png')">
    <Scanner @scan="onScan" />
  </div>
</template>

<script>
import Scanner from '@/components/Scanner.vue'
export default {
  name: 'About',
  components: {
    Scanner
  },
  methods: {
    onScan() {
    }
  }
}
</script>