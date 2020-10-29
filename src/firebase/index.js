import firebase from 'firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyBGEtrNPNoOl2GlUjwxM0ur6bRi2KQuPOY',
  authDomain: 'vue-channel.firebaseapp.com',
  databaseURL: 'https://vue-channel.firebaseio.com',
  projectId: 'vue-channel',
  storageBucket: 'vue-channel.appspot.com',
  messagingSenderId: '24889560262',
  appId: '1:24889560262:web:8fadcbce409ce888875bc7',
  measurementId: 'G-FT9Z0DKD4B'
})

export default firebase
