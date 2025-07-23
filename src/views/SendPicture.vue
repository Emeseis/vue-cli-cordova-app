<template>
  <div class="text-center h-100">
    <v-carousel v-model="currentImageIndex" :show-arrows="false" :height="caroulselHeight">
      <v-carousel-item v-for="(img, idx) in images" :key="idx">
        <div class="d-flex align-center justify-center fill-height" style="padding-bottom: 50px;">
          <v-img :src="img.src" :height="imageHeight" contain />
        </div>
      </v-carousel-item>
      <v-btn 
        v-show="images.length" 
        color="red" 
        size="small"
        icon="mdi-delete" 
        class="position-absolute top-0 right-0 ma-3"
        @click="deleteImage" 
      ></v-btn>
    </v-carousel>
    <v-row no-gutters class="py-3 position-absolute bottom-0 w-100">
      <v-col cols="4">
        <Camera @picture="onPicture" icon="mdi-image-plus" :sourceType="0" color="gray" v-show="isCameraPresent" />
      </v-col>
      <v-col cols="4">
        <Camera @picture="onPicture" :icon="isCameraPresent ? 'mdi-camera-plus' : 'mdi-image-plus'" />
      </v-col>
      <v-col cols="4">
        <v-btn @click="onSendEmail" icon="mdi-send" color="blue" size="x-large" v-show="images.length"></v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Camera from '@/components/Camera.vue'

export default {
  name: 'SendPicture',
  components: {
    Camera
  },
  computed: {
    caroulselHeight() {
      const appBarHeight = 64
      const cameraButtonHeight = 88

      return window.innerHeight - appBarHeight - cameraButtonHeight
    },
    imageHeight() {
      const img = this.images[this.currentImageIndex]

      if (img) return Math.floor(window.innerWidth * (img.height / img.width))
      return 0
    }
  },
  data: () => ({
    images: [],
    currentImageIndex: 0,
    isCameraPresent: true,
  }),
  mounted() {
    cordova.plugins.diagnostic.isCameraPresent(hasCamera => this.isCameraPresent = hasCamera)
  },
  methods: {
    async onPicture(image) {
      this.images.push(image)
      this.currentImageIndex = this.images.length - 1
    },
    deleteImage() {
      this.images.splice(this.currentImageIndex, 1)

      if (this.currentImageIndex >= this.images.length) this.currentImageIndex = this.images.length - 1
      if (this.currentImageIndex < 0) this.currentImageIndex = 0
    },
    onSendEmail() {
      console.group('Send Picture')
      this.images.forEach(i => console.log(i.src))
      console.groupEnd()
    },
  }
}
</script>
