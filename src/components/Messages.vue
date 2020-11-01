<template lang="pug">
  .message__wrap
    v-list(three-line='')
      template(v-for='(item, index) in message')
        v-list-item(:key='item.timestamp')
          v-list-item-avatar
            v-img(:src='item.user.avatar')
          v-list-item-content
            v-list-item-title.primary--text {{ item.user.name }}
              span.secondary--text.ml-2 - {{ item.timestamp | fromNow }}
            v-list-item-subtitle {{ item.content }}
</template>

<script>
import firebase from '@/firebase'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'message',

  computed: {
    ...mapGetters('user', {
      currentChannel: 'currentChannel'
    })
  },

  data: () => ({
    message: [],
    messagesRef: firebase.database().ref('messages')
  }),

  // 監聽當前頻道訊息變化，若有輸入訊息，則重新呼叫函式檢查資料庫內容
  watch: {
    currentChannel: function () {
      this.getMessageList()
    }
  },

  filters: {
    fromNow (value) {
      return moment(value).fromNow()
    }
  },

  methods: {
    getMessageList () {
      this.message = [] // 若切換頻道則初始化訊息列表
      this.messagesRef.child(this.currentChannel.id).on('child_added', (snapshot) => {
        this.message.push(snapshot.val())
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .message__container {
    display: flex;
  }
</style>
