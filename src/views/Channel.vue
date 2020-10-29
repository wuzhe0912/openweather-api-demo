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

  data: () => ({}),

  methods: {
    ...mapActions('user', {
      logout: 'logout'
    })
  }
}
</script>

<style lang="scss" scoped></style>
