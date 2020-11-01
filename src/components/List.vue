<template lang="pug">
  .list__wrap.mx-auto.mt-4
    v-list(shaped style="position: relative")
      v-subheader 公開頻道列表
      v-fab-transition
        v-btn(@click="openDialog()" color="pink" dark absolute top right fab)
          v-icon mdi-plus
      v-list-group(:value='true' prepend-icon='mdi-flag')
        template(v-slot:activator='')
          v-list-item-title Channels
        v-list-item(
          v-for='(item, index) in channelList'
          :key='item.id'
          @click="changeItem('channel', item, index)"
          :class="{ 'light-blue lighten-5': index === selectedChannel }"
          link=''
        )
          v-list-item-icon
            v-icon mdi-chat-processing-outline
          v-list-item-title {{ item.name }}
      v-subheader 註冊用戶列表
      v-list-group(:value='true' prepend-icon='mdi-account-multiple')
        template(v-slot:activator='')
          v-list-item-title Users
        v-list-item(
          v-for='(item, index) in userList'
          :key='item.uid'
          @click="changeItem('user', item, index)"
          :class="{ 'light-blue lighten-5': index === selectedUser }"
          link=''
        )
          v-avatar(size="28")
            img(v-if="userProfile.avatar !== ''" :src="item.avatar")
            v-icon(v-else) mdi-account-circle
          v-list-item-title.ml-6(
            :class="{'primary--text': item.status === 'online', 'text--disabled': item.status === 'offline' }"
          ) {{ item.name }}
          v-icon(
            :class="{'primary--text': item.status === 'online', 'text--disabled': item.status === 'offline' }"
          ) mdi-message-outline

    v-row(justify='center')
      v-dialog(v-model='dialog' persistent='' max-width='600px')
        v-card
          v-card-title
            span.headline 創建頻道
          v-card-text
            v-container
              v-row
                v-col(cols='12')
                  v-text-field(v-model='newChannelName' label='Channel*' required='')
            small *indicates required field
          v-card-actions
            v-spacer
            v-btn(color='blue darken-1' text='' @click='dialog = false')
              | Close
            v-btn(color='blue darken-1' text='' @click='addChannel()')
              | Create
</template>

<script>
import firebase from '@/firebase'
import { mapGetters } from 'vuex'

export default {
  name: 'list',

  computed: {
    ...mapGetters('user', {
      userProfile: 'userProfile'
    })
  },

  data: () => ({
    loading: false,
    dialog: false,
    channelList: [],
    userList: [],
    selectedChannel: 0,
    selectedUser: 0,
    newChannelName: '',
    isCurrentChannel: null,
    channelsRef: firebase.database().ref('channels'),
    usersRef: firebase.database().ref('users'),
    connectedRef: firebase.database().ref('.info/connected'),
    presenceRef: firebase.database().ref('presence')
  }),

  mounted () {
    this.getChannelList()
    this.getUserList()
  },

  methods: {
    initialData () {
      this.loading = false
      this.dialog = false
      this.newChannelName = ''
    },

    openDialog () {
      this.dialog = true
    },

    addChannel () {
      this.loading = true
      const key = this.channelsRef.push().key
      const newChannel = {
        id: key,
        name: this.newChannelName
      }
      this.channelsRef.child(key).update(newChannel)
        .then(() => {
          this.initialData()
        })
        .catch(error => {
          if (error) {
            console.log(this.error)
            this.loading = false
          }
        })
    },

    changeItem (value, item, index) {
      if (value === 'channel') {
        this.selectedChannel = index
        this.$store.dispatch('user/setCurrentChannel', item)
      } else {
        this.selectedUser = index
      }
    },

    getChannelList () {
      this.channelsRef.on('child_added', snapshot => {
        this.channelList.push(snapshot.val())

        // 設定使用者當前所在的頻道
        if (this.channelList.length > 0) {
          // 使用者進入頁面時，預設頻道
          this.isCurrentChannel = this.channelList[0]
          this.$store.dispatch('user/setCurrentChannel', this.isCurrentChannel)
        }
      })
    },

    getUserList () {
      this.usersRef.on('child_added', (snapshot) => {
        // 檢查當前登入者的 uid，將資料庫中其他使用者塞入陣列
        if (this.userProfile.uid !== snapshot.key) {
          const { name, avatar } = snapshot.val()
          const user = {
            uid: snapshot.key,
            status: 'offline',
            name: name,
            avatar: avatar
          }
          this.userList.push(user)
        }
      })

      // 當有使用者登入時觸發
      this.presenceRef.on('child_added', (snapshot) => {
        // 找到其他目前處於登入狀態的註冊用戶
        if (this.userProfile.uid !== snapshot.key) {
          this.addStatusToUser(snapshot.key)
        }
      })

      // 當有使用者登出時觸發
      this.presenceRef.on('child_removed', snapshot => {
        if (this.userProfile.uid !== snapshot.key) {
          this.addStatusToUser(snapshot.key, false)
        }
      })

      // 將已登入的使用者，塞入 true 狀態
      this.connectedRef.on('value', (snapshot) => {
        if (snapshot.val() === true) {
          const ref = this.presenceRef.child(this.userProfile.uid)
          ref.set(true)
          ref.onDisconnect().remove()
        }
      })
    },

    // 設置註冊用戶 登入/登出 狀態
    addStatusToUser (userId, connected = true) {
      // 傳入目前處於登入狀態的使用者 uid，比對註冊用戶列表中是否有符合
      const index = this.userList.findIndex(item => item.uid === userId)
      // 若有符合的對象，則將狀態轉為 online
      // 若全部不符合，則使用 default 值 offline
      if (index !== -1) {
        connected === true ? this.userList[index].status = 'online' : this.userList[index].status = 'offline'
      }
    }
  }
}
</script>

<style lang="scss"></style>
