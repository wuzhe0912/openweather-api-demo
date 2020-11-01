<template lang="pug">
  v-toolbar.message__form(dense='')
    //- trim 自動過濾使用者首尾誤輸入的空白字符
    v-text-field(v-model.trim="message" @keyup.enter="sendMessage()" hide-details='' single-line='')
    v-btn(@click="sendMessage()" icon='')
      v-icon(color="primary") mdi-send
    v-btn(icon='')
      v-icon(color="primary") mdi-cloud-upload
</template>

<script>
import firebase from '@/firebase'
import { mapGetters } from 'vuex'

export default {
  name: 'message-form',

  computed: {
    ...mapGetters('user', {
      userProfile: 'userProfile',
      currentChannel: 'currentChannel'
    })
  },

  data: () => ({
    message: '',
    errorText: [],
    messagesRef: firebase.database().ref('messages')
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
          this.messagesRef.child(this.currentChannel.id).push().set(newMessage)
            .then(() => {})
            .catch(error => {
              if (error) console.log(this.error)
            })
            // initial message
          this.message = ''
        }
      }
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
</style>
