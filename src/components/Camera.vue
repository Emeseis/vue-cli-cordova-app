<template>
  <v-btn :icon="icon" :color="color" :size="size" @click="onCamera"></v-btn>
</template>

<script>
export default {
  name: 'Camera',
  props: {
    icon: {
      type: String,
      default: 'mdi-camera'
    },
    size: {
      type: String,
      default: 'x-large'
    },
    color: {
      type: String,
      default: 'white'
    },
    returnType: {
      type: Number,
      default: 0
    }
  },  
  methods: {
    onCamera() {
      const { FILE_URI, DATA_URL } = Camera.DestinationType

      navigator.camera.getPicture(this.onSuccess, this.onFailure, {
        destinationType: this.returnType === 1 ? DATA_URL : FILE_URI,
        correctOrientation: true
      })
    },
    onSuccess(data) {
      this.$emit('picture', data)
    },
    onFailure(err) {
      console.log(err)
    },
  }
}
</script>
