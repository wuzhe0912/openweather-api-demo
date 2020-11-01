<template lang="pug">
  .wrap
    v-main.mt-12
      v-container(v-if="isLogin === false")
        .row.justify-center.mb-8
          v-img(
            alt="Logo"
            class="shrink mr-2"
            contain
            src="../assets/images/login-logo.svg"
            transition="scale-transition"
            width="260px"
          )
        .row.justify-center.animation-fade-in(v-for="item in list")
          v-btn.mt-6.justify-start.white--text(
            :key="item.code"
            @click="login(item.code)"
            color="blue darken-1"
            width="200px"
          )
            v-icon.mr-4 {{ item.icon }}
            span {{ item.name }}
      v-container.animation-fade-in(v-else)
        .row.justify-center.ma-12
          v-btn.login__list(@click="checkLogin" color="primary") 返回 Channel
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import firebase from '@/firebase'

export default {
  name: 'login',

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
    list: [
      { code: 'google', icon: 'mdi-google', name: 'Login Google' },
      { code: 'github', icon: 'mdi-github', name: 'Login GitHub' },
      { code: 'twitter', icon: 'mdi-twitter', name: 'Login twitter' }
    ],
    usersRef: firebase.database().ref('users')
  }),

  methods: {
    ...mapActions('user', {
      login: 'login'
    }),

    checkLogin () {
      if (this.isLogin) {
        this.saveUserToUsersRef(this.userProfile)
        this.$router.push({ name: 'channel' })
      } else {
        console.log('login fail')
      }
    },

    saveUserToUsersRef (user) {
      return this.usersRef.child(user.uid).set({
        name: user.name,
        avatar: user.avatar
      })
    }
  }
}
</script>

<style lang="scss">
  .wrap {
    width: 100%;
    height: 100vh;
    background: linear-gradient(180deg, rgba(0, 136, 255, 1) 0%, rgba(0, 48, 90, 1) 100%);
  }
  .login__bar {
    .v-toolbar__content {
      justify-content: center;
    }
  }
  .bar__title {
    font-size: 28px;
  }
</style>
