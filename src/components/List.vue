<template lang="pug">
  v-card.mx-auto.mt-4(width='300')
    v-list(shaped style="position: relative")
      v-subheader 頻道列表
      v-fab-transition
        v-btn(@click="openDialog()" color="pink" dark absolute top right fab)
          v-icon mdi-plus
      v-list-group(:value='true' prepend-icon='mdi-flag')
        template(v-slot:activator='')
          v-list-item-title 頻道
        v-list-item(
          v-for='(item, index) in channelList'
          :key='item.id'
          @click="changeItem(item, index)"
          :class="{ 'light-blue lighten-5': index === selectedItem }"
          link=''
        )
          v-list-item-icon
            v-icon mdi-cog-outline
          v-list-item-title {{ item.name }}
      //- v-list-group(:value='true' prepend-icon='mdi-account-circle')
      //-   template(v-slot:activator='')
      //-     v-list-item-title Users
      //-   v-list-item(v-for='([title, icon], i) in userList' :key='i' link='')
      //-     v-list-item-icon
      //-       v-icon(v-text='icon')
      //-     v-list-item-title(v-text='title')

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
              | Save
</template>

<script>
import firebase from '@/firebase'

export default {
  name: 'list',

  data: () => ({
    loading: false,
    dialog: false,
    channelList: [],
    selectedItem: 0,
    newChannelName: '',
    isCurrentChannel: null,
    channelsRef: firebase.database().ref('channels')
  }),

  mounted () {
    this.getChannelList()
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

    changeItem (item, index) {
      this.selectedItem = index
      this.$store.dispatch('user/setCurrentChannel', item)
    }
  }
}
</script>

<style lang="scss"></style>
