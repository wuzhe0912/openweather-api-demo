<template lang="pug">
  v-dialog(v-model='fileUpload' persistent='' max-width='600px')
    v-card
      v-card-title
        span.headline 上傳檔案
      v-card-text
        v-container
          v-row
            v-col(cols='12')
              v-file-input(label='File input' outlined dense)
      v-card-actions
        v-spacer
        v-btn(color='blue darken-1' text='' @click='cancleModal()')
          | Close
        v-btn(color='blue darken-1' text='' @click='sendFile()')
          | Upload
</template>

<script>
export default {
  name: 'file-upload-modal',

  props: {
    fileUpload: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    file: null
  }),

  methods: {
    addFile (value) {

    },

    sendFile () {

    },

    cancleModal () {
      this.$emit('cancleModal')
    }
  }
}
</script>
