import firebase from '@/firebase'

const state = {
  userProfile: {},
  isLogin: false,
  currentChannel: {},
  isPrivate: false
}

const getters = {
  userProfile: ({ userProfile }) => userProfile,
  isLogin: ({ isLogin }) => isLogin,
  currentChannel: ({ currentChannel }) => currentChannel,
  isPrivate: ({ isPrivate }) => isPrivate
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
  },
  SET_CURRENT_CHANNEL (state, payload) {
    state.currentChannel = payload
  },
  SET_PRIVATE (state, payload) {
    state.isPrivate = payload
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
  async logout (store, uid) {
    try {
      await firebase.database().ref('presence').child(uid).remove()
      await firebase.auth().signOut()
      window.localStorage.removeItem('isLogin')
    } catch (error) {
      console.log(error)
    }
  },
  setCurrentChannel ({ commit }, payload) {
    commit('SET_CURRENT_CHANNEL', payload)
  },
  setPrivate ({ commit }, payload) {
    commit('SET_PRIVATE', payload)
  }
}

export default {
  namespaced: true, // vuex 語法結構化，可讀性更強
  state,
  getters,
  mutations,
  actions
}
