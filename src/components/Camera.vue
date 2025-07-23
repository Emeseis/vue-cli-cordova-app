<template>
  <v-btn :icon="icon" :color="color" :size="size" @click="onPicture"></v-btn>
</template>

<script>
export default {
  name: 'Camera',
  props: {
    /**
     * Icon to display on the button
     */
    icon: {
      type: String,
      default: 'mdi-camera',
    },
    /**
     * Button size
     */
    size: {
      type: String,
      default: 'x-large',
    },
    /**
     * Button color
     */
    color: {
      type: String,
      default: 'white',
    },
    /**
     * Choose the format of the return value.
     * Defined in navigator.camera.DestinationType. Default is FILE_URI.
     *
     * - DATA_URL: 0 – Return image as base64-encoded string
     * - FILE_URI: 1 – Return image file URI
     */
    returnType: {
      type: Number,
      default: Camera.DestinationType.FILE_URI,
      validator: (value) => Object.values(Camera.DestinationType).includes(value),
    },
    /**
     * Set the source of the picture.
     * Defined in navigator.camera.PictureSourceType. Default is CAMERA.
     * PHOTOLIBRARY: 0,
     * CAMERA: 1,
     * SAVEDPHOTOALBUM: 2
     */
    sourceType: {
      type: Number,
      default: Camera.PictureSourceType.CAMERA,
      validator: (value) => Object.values(Camera.PictureSourceType).includes(value),
    },
  },
  methods: {
    convertFileUriToBlobUrl(fileUri) {
      return new Promise((resolve, reject) => {
        if (!window.resolveLocalFileSystemURL) {
          return reject(new Error('resolveLocalFileSystemURL is not available. Ensure Cordova is ready'))
        }

        window.resolveLocalFileSystemURL(fileUri, fileEntry => {
          fileEntry.file(file => {
            const reader = new FileReader()

            reader.onloadend = () => {
              const blob = new Blob([reader.result], { type: file.type || 'image/jpeg' })
              const blobUrl = URL.createObjectURL(blob)
              resolve(blobUrl)
            }

            reader.onerror = (e) => reject(new Error(`Error reading file: ${e.target.error.code}`))
            reader.readAsArrayBuffer(file)
          }, (err) => reject(new Error(`Error getting file from fileEntry: ${err.code}`)))
        }, (err) => reject(new Error(`Error resolving fileEntry: ${err.code}`)))
      })
    },
    async loadImageInfo(imageData) {
      let imageSrc = imageData

      if (this.returnType === Camera.DestinationType.FILE_URI && imageData.startsWith('file://')) {
        try {
          imageSrc = await this.convertFileUriToBlobUrl(imageData)
        } catch (err) {
          console.error('Error converting FILE_URI to Blob URL:', err)
          return
        }
      }

      try {
        const info = await new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            resolve({
              src: imageSrc,
              width: img.width,
              height: img.height,
            })
          }
          img.onerror = (e) => {
            console.error('Error loading image to get dimensions:', e)
            reject(new Error('Could not load image to get dimensions'))
          }
          img.src = imageSrc
        })
        this.$emit('picture', info)
      } catch (error) {
        console.error(error);        
      }
    },
    onPicture() {
      // Ensure navigator.camera is available (Cordova plugin)
      if (!window.navigator.camera) {
        console.warn('navigator.camera is not available. Ensure the Cordova plugin is installed and the device is ready')
        return
      }

      // Check if cordova.plugins.diagnostic is available
      if (!window.cordova || !window.cordova.plugins || !window.cordova.plugins.diagnostic) {
        console.warn('cordova.plugins.diagnostic is not available. Camera presence check will be skipped')
        this.onCamera(this.sourceType) // Proceed with default source type
        return
      }

      // Check camera presence and then proceed
      cordova.plugins.diagnostic.isCameraPresent((hasCamera) => {
        const sourceType = hasCamera ? this.sourceType : Camera.PictureSourceType.PHOTOLIBRARY
        this.onCamera(sourceType)
      }, (err) => {
        console.error('Error checking camera presence:', err)
        this.onCamera(this.sourceType) // Fallback to default if check fails
      })
    },
    onCamera(sourceType) {
      navigator.camera.getPicture(this.onSuccess, this.onFailure, {
        destinationType: this.returnType,
        sourceType: sourceType,
        correctOrientation: true,
      })
    },
    onSuccess(imageData) {
      this.loadImageInfo(imageData)
    },
    onFailure(error) {
      console.error('onCamera error:', error)
    },
  },
}
</script>