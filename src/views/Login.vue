<template lang="pug">
  .wrap
    v-app-bar.login__bar(app dark color="primary")
      span.bar__title Vue Channel
    v-main
      v-container
        .row.justify-center.ma-12
          v-img(
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="../assets/images/login-chat.png"
            transition="scale-transition"
            width="140"
          )
        .row.justify-center.login__wrap(v-for="item in list")
          v-btn.login__list(
            :key="item.code"
            @click="login(item.code)"
            color="primary"
          )
            v-icon {{ item.icon }}
            span {{ item.name }}
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',

  data: () => ({
    list: [
      { code: 'google', icon: 'mdi-google', name: '使用 Google 登入' },
      { code: 'twitter', icon: 'mdi-twitter', name: '使用 twitter 登入' }
    ]
  }),

  methods: {
    ...mapActions('user', {
      login: 'login'
    })
  }
}
</script>

<style lang="scss">
  .login__bar {
    .v-toolbar__content {
      justify-content: center;
    }
  }
  .bar__title {
    font-size: 28px;
  }
  .login__list {
    margin-top: 12px;
    width: 200px;

    span {
      width: 140px;
      text-align: left;
    }
    .v-icon {
      margin-right: 8px;
    }
  }
</style>
