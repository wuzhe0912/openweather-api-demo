<template lang="pug">
  .message__wrp
    .message__content.animation-fade-in
      v-list(three-line='')
        template(v-for='(item, index) in message')
          v-list-item(:key='item.timestamp')
            v-list-item-avatar
              v-img(:src='item.user.avatar')
            v-list-item-content
              v-list-item-title.primary--text {{ item.user.name }}
                span.secondary--text.ml-2 - {{ item.timestamp | fromNow }}
              v-list-item-subtitle {{ item.content }}
    MessageForm
</template>

<script>
import firebase from '@/firebase'
import { mapGetters } from 'vuex'
import moment from 'moment'
import MessageForm from './MessageForm'

export default {
  name: 'message',

  components: {
    MessageForm
  },

  computed: {
    ...mapGetters('user', {
      currentChannel: 'currentChannel',
      userProfile: 'userProfile',
      isPrivate: 'isPrivate'
    })
  },

  data: () => ({
    message: [],
    messagesRef: firebase.database().ref('messages'),
    privateMessagesRef: firebase.database().ref('privateMessages')
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
    // 判斷是進入公共頻道或是私人聊天
    getMessagesRef () {
      if (this.isPrivate) {
        return this.privateMessagesRef
      } else return this.messagesRef
    },

    getMessageList () {
      const ref = this.getMessagesRef()
      this.message = [] // 若切換頻道則初始化訊息列表
      ref.child(this.currentChannel.id).on('child_added', (snapshot) => {
        const message = snapshot.val()
        // eslint-disable-next-line
        message['id'] = snapshot.key
        this.message.push(message)
        // 應用 $nextTick 的特性，等資料撈取完畢，再渲染 DOM
        this.$nextTick(() => {
          const container = this.$el.querySelector('.message__content')
          container.scrollTop = container.scrollHeight
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .message__content {
    overflow-y: scroll;
    height: calc(100vh - 64px - 48px);

    .v-list-item__subtitle {
      -webkit-line-clamp: initial;
    }
  }
</style>
