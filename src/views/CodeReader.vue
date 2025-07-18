<template>
  <div class="container">
    <h1>Code Reader</h1>
    <img height="200" alt="Scan Logo" :src="require('../assets/scan.png')">
    <Scanner @scan="onScan" />
    <div class="code" v-if="scanned">
      <span>Código escaneado: </span>
      <span>{{ scanned }}</span>
    </div>
  </div>
</template>

<script>
import Scanner from '@/components/Scanner.vue'
export default {
  name: 'CodeReader',
  components: {
    Scanner
  },
  data: () => ({
    scanned: '',
  }),
  methods: {
    onScan({ data }) {
      this.scanned = data
    }
  }
}
</script>
