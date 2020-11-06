<template lang="pug">
  .form__wrap
    v-toolbar.message__form(dense='')
      //- trim 自動過濾使用者首尾誤輸入的空白字符
      v-text-field(v-model.trim="message" @keyup.enter="sendMessage()" hide-details='' single-line='')
      v-btn(@click="sendMessage()" icon='')
        v-icon(color="primary") mdi-send
      v-btn(@click="changeFileUploadModal()" icon='')
        v-icon(color="primary") mdi-cloud-upload
    FileUploadModal(:fileUpload="fileUpload" @cancleModal="changeFileUploadModal()")
</template>

<script>
import firebase from '@/firebase'
import { mapGetters } from 'vuex'
import FileUploadModal from './FileUploadModal'

export default {
  name: 'message-form',

  components: {
    FileUploadModal
  },

  computed: {
    ...mapGetters('user', {
      userProfile: 'userProfile',
      currentChannel: 'currentChannel'
    })
  },

  data: () => ({
    message: '',
    errorText: [],
    fileUpload: false
  }),

  methods: {
    sendMessage () {
      const newMessage = {
        content: this.message,
        // 使用 fiebase 提供的時間戳記
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          name: this.userProfile.name,
          avatar: this.userProfile.avatar,
          id: this.userProfile.uid
        }
      }

      // 驗證，當使用者不在任何頻道時，不發送訊息
      if (this.currentChannel !== null) {
        // 訊息不為空
        if (this.message.length > 0) {
          this.$parent.getMessagesRef().child(this.currentChannel.id).push().set(newMessage)
            .then(() => {
            })
            .catch(error => {
              if (error) console.log(this.error)
            })
            // initial message
          this.message = ''
        }
      }
    },

    uploadFile (file, metaData) {
      if (file === null) {
        return false
      } else {
        // 找到檔案要傳入的頻道 ID
        // const uploadPath = this.currentChannel.id
        // const ref = this.$parent.getMessagesRef()
      }
    },

    changeFileUploadModal (file, metaData) {
      this.fileUpload = !this.fileUpload
    }
  }
}
</script>

<style lang="scss">
  .message__form {
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  @media screen and (max-width: 768px) {
    .message__form {
      bottom: -8px;
    }
  }
</style>
