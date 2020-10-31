<template lang="pug">
  .channel__wrap
    v-navigation-drawer.pa-3(v-model="drawer" app)
      .nav__info
        v-btn(@click="logout()" color="primary") Logout
      List
    v-app-bar.channel__header(app)
      .row.align-center
        v-app-bar-nav-icon(@click="drawer = !drawer")
        v-toolbar-title Hello
          span.ml-3.primary--text {{ userProfile.name }}
        v-avatar.ml-3(size="48")
          img(v-if="userProfile.avatar !== ''" :src="userProfile.avatar")
          v-icon(v-else) mdi-account-circle
    v-main.channel__content
      Messages
      MessageForm
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import List from '@/components/List'
import Messages from '@/components/Messages'
import MessageForm from '@/components/MessageForm'

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
    selectedItem: 1
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
