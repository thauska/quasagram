<template>
  <q-page class="constrain-more q-pa-lg">
    <div class="camera-frame q-pa-md">
      <video v-show="!imageCaptured" ref="video" class="full-width" autoplay />
      <canvas
        v-show="imageCaptured"
        class="full-width"
        height="240"
        ref="canvas"
      />
    </div>
    <div class="text-center q-pa-md">
      <q-btn
        v-if="hasCameraSupport"
        @click="captureImage"
        color="grey-10"
        icon="eva-camera"
        size="lg"
        round
      />
      <q-file
        v-else
        v-model="imageUpload"
        @input="captureImageFallback"
        label="Choose an image"
        accept="image/*"
        outlined
      >
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.caption"
          class="col col-sm-6"
          label="Caption"
          dense
        />
      </div>
      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.location"
          class="col col-sm-6"
          label="Location"
          dense
        >
          <template v-slot:append>
            <q-btn round dens flat icon="eva-navigation-2-outline" />
          </template>
        </q-input>
      </div>
      <div class="row justify-center q-mt-lg">
        <q-btn color="grey-10" label="Post Image" rounded unelevated />
      </div>
    </div>
  </q-page>
</template>

<script>
import { uid } from "quasar"
require("md-gum-polyfill")

export default {
  name: "PageCamera",
  data() {
    return {
      post: {
        id: uid(),
        caption: "",
        location: "",
        photo: null,
        date: Date.now(),
      },
      imageCaptured: false,
      imageUpload: [],
      hasCameraSupport: true,
    }
  },
  methods: {
    initCamera() {
      // console.log('init camera')
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          this.$refs.video.srcObject = stream
        })
        .catch((error) => {
          this.hasCameraSupport = false
        })
    },
    captureImage() {
      let video = this.$refs.video
      let canvas = this.$refs.canvas
      canvas.width = video.getBoundingClientRect().width
      canvas.height = video.getBoundingClientRect().height

      let context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      this.imageCaptured = true

      this.post.photo = this.dataURItoBlob(canvas.toDataURL())
      this.disableCamera()
    },
    captureImageFallback(file) {
      //console.log("file: ", file)
      this.post.photo = file

      let canvas = this.$refs.canvas
      let context = canvas.getContext("2d")

      // upload image to canvas
      let reader = new FileReader()
      reader.onload = event => {
        let img = new Image()
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          context.drawImage(img, 0, 0)
          this.imageCaptured = true
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)

    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach(track => {
        track.stop()
      })
    },
    dataURItoBlob(dataURI) {
      // URI to Blob
      let byteString = atob(dataURI.split(",")[1])
      let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]
      let ab = new ArrayBuffer(byteString.length)
      let ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      let blob = new Blob([ab], { type: mimeString })
      return blob
    },
  },
  mounted() {
    this.initCamera()
  },
  beforeDestroy() {
    if(this.hasCameraSupport) {
      this.disableCamera()
    }
  }
}
</script>

<style lang="sass" scoped>
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
</style>
