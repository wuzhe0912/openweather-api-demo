<template lang="pug">
  div {{ userProfile.name }}
    v-btn(@click="logout()" color="primary") Logout
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Channel',

  computed: {
    ...mapGetters('user', {
      userProfile: 'userProfile',
      isLogin: 'isLogin'
    })
  },

  watch: {
    isLogin: 'checkLogin'
  },

  data: () => ({}),

  methods: {
    ...mapActions('user', {
      logout: 'logout'
    }),

    checkLogin () {
      if (!this.isLogin) {
        this.$router.push({ name: 'login' })
      } else {
        console.log('logout fail')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
