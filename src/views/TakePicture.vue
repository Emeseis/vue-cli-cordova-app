<template>
  <div class="text-center h-100">
    <v-carousel v-model="currentImageIndex" :show-arrows="false" :height="caroulselHeight">
      <v-carousel-item v-for="(img, idx) in images" :key="idx">
        <div class="d-flex align-center justify-center fill-height" style="padding-bottom: 50px;">
          <v-img :src="img.src" :height="imageHeight" contain />
        </div>
      </v-carousel-item>
      <v-btn 
        v-if="images.length" 
        color="red" 
        size="small"
        icon="mdi-delete" 
        class="position-absolute top-0 right-0 ma-3"
        @click="deleteImage" 
      ></v-btn>
    </v-carousel>
    <div class="py-3 position-fixed bottom-0 w-100">
      <Camera @picture="onPicture" icon="mdi-camera-plus" :returnType="1" />
    </div>
  </div>
</template>

<script>
import Camera from '@/components/Camera.vue'

export default {
  name: 'TakePicture',
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
  }),
  methods: {
    async onPicture(base64Image) {
      const info = await this.loadImageInfo('data:image/jpeg;base64,' + base64Image)

      this.images.push(info)
      this.currentImageIndex = this.images.length - 1
    },
    loadImageInfo(src) {
      return new Promise(resolve => {
        const img = new Image()

        img.onload = () => {
          resolve({
            src,
            width: img.width,
            height: img.height,
          })
        }  
        img.src = src
      })
    },
    deleteImage() {
      this.images.splice(this.currentImageIndex, 1)

      if (this.currentImageIndex >= this.images.length) this.currentImageIndex = this.images.length - 1
      if (this.currentImageIndex < 0) this.currentImageIndex = 0
    }
  }
}
</script>
