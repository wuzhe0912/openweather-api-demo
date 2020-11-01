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
    v-main.channel__content
      Messages
      MessageForm
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import List from '@/components/List'
import Messages from '@/components/Messages'
import MessageForm from '@/components/MessageForm'
import firebase from '@/firebase'

export default {
  name: 'channel',

  components: {
    List,
    MessageForm,
    Messages
  },

  computed: {
    ...mapGetters('user', {
      userProfile: 'userProfile',
      isLogin: 'isLogin'
    })
  },

  watch: {
    isLogin: 'checkLogin'
  },

  data: () => ({
    drawer: null,
    selectedItem: 1,
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
  position: relative;
  height: 100vh;
}
</style>
