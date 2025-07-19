<template>
  <div class="text-center" style="height: 100%;">
    <h1>Scan any type of code</h1>
    <img height="200" alt="Scan Logo" :src="require('../assets/scan.png')">
    <div class="code" v-if="scanned">
      <span>Código escaneado: </span>
      <span>{{ scanned }}</span>
    </div>
  </div>
  <Scanner @scan="onScan" />
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
