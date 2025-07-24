<template>
  <div class="text-center h-100">
    <h1>{{ text }}</h1>
    <v-row no-gutters class="py-3 position-absolute bottom-0 w-100">     
      <v-col cols="6">
        <CameraButton @picture="onPicture" icon="mdi-image-plus" :sourceType="0" color="gray" v-show="isCameraPresent" />
      </v-col>
      <v-col cols="6">
        <CameraButton @picture="onPicture" :icon="isCameraPresent ? 'mdi-camera-plus' : 'mdi-image-plus'" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CameraButton from '@/components/Camera.vue'

export default {
  name: 'TextRecognizer',
  components: {
    CameraButton
  },
  data: () => ({
    text: '',
    isCameraPresent: true,
  }),
  mounted() {
    cordova.plugins.diagnostic.isCameraPresent(hasCamera => this.isCameraPresent = hasCamera)
  },
  computed: {
    sourceType() {
      return this.isCameraPresent ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY
    }
  },
  methods: {    
    async onPicture(imgSrc) {
      try {
        this.text = await new Promise((resolve, reject) => {
          mltext.getText(resolve, reject, { imgType: 1, imgSrc })
        })
      } catch (error) {
        console.error('Erro ao capturar ou processar imagem:', error);
      }
    }
  }
}
</script>
