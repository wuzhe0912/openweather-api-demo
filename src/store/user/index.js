import firebase from '@/firebase'

const state = {
  userProfile: {},
  isLogin: false
}

const getters = {
  userProfile: ({ userProfile }) => userProfile,
  isLogin: ({ isLogin }) => isLogin
}

const mutations = {
  USER_DETAILS (state, userProfile) {
    state.isLogin = true
    state.userProfile = {
      name: userProfile.displayName,
      picture: userProfile.photoURL
    }
  },
  LOGOUT (state) {
    state.isLogin = false
    state.userProfile = {}
  }
}

const actions = {
  async login (store, social) {
    if (store.state.isLogin) return

    switch (social) {
      case 'google': {
        const provider = new firebase.auth.GoogleAuthProvider()
        try {
          await firebase.auth().signInWithPopup(provider)
        } catch (error) {
          console.log(error)
        }
        break
      }
      case 'twitter': {
        console.log('login with twitter')
        break
      }
      default:
        break
    }
  },

  async logout () {
    try {
      await firebase.auth().signOut()
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
