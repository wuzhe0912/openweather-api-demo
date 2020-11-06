<template lang="pug">
  .channel__wrap
    v-navigation-drawer.pa-3(v-model="drawer" app)
      .info__wrap.row.align-center.pl-4
        v-avatar(size="48")
          img(v-if="userProfile.avatar !== ''" :src="userProfile.avatar")
          v-icon(v-else) mdi-account-circle
        v-toolbar-title.primary--text.ml-4 {{ userProfile.name }}
      .logout__btn.mt-4
        v-btn(@click="logout(userProfile.uid)" color="primary") Logout
      List
    v-app-bar.channel__header(app)
      .row.align-center
        v-app-bar-nav-icon(@click="drawer = !drawer")
        h2.channel__name.primary--text.ml-4 {{ channelName }}
    v-main.channel__content
      Messages
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import List from '@/components/List'
import Messages from '@/components/Messages'
import firebase from '@/firebase'

export default {
  name: 'channel',

  components: {
    List,
    Messages
  },

  computed: {
    ...mapGetters('user', {
      userProfile: 'userProfile',
      isLogin: 'isLogin',
      currentChannel: 'currentChannel',
      isPrivate: 'isPrivate'
    }),

    channelName () {
      if (this.channel !== null) {
        return this.isPrivate ? '@ ' + this.channel.name : '# ' + this.channel.name
      } else return ''
    }
  },

  watch: {
    isLogin: 'checkLogin',
    currentChannel: function () {
      this.channel = this.currentChannel
    }
  },

  data: () => ({
    drawer: null,
    selectedItem: 1,
    channel: null,
    presenceRef: firebase.database().ref('presence')
  }),

  methods: {
    ...mapActions('user', {
      logout: 'logout'
    }),

    checkLogin () {
      if (!this.isLogin) {
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style lang="scss">
.channel__header {
  .v-toolbar__content {
    width: 100%;
  }
}

.channel__content {
  overflow: hidden;
  position: relative;
  height: 100vh;
}
</style>
