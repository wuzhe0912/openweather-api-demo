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
      uid: userProfile.uid,
      name: userProfile.displayName,
      avatar: userProfile.photoURL
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
        const provider = new firebase.auth.TwitterAuthProvider()
        try {
          await firebase.auth().signInWithPopup(provider)
        } catch (error) {
          console.log(error)
        }
        break
      }
      case 'github': {
        const provider = new firebase.auth.GithubAuthProvider()
        try {
          await firebase.auth().signInWithPopup(provider)
        } catch (error) {
          console.log(error)
        }
        break
      }
      default:
        break
    }

    window.localStorage.setItem('isLogin', store.state.isLogin)
  },

  async logout () {
    try {
      await firebase.auth().signOut()
      window.localStorage.removeItem('isLogin')
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
