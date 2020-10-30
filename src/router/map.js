import Login from '../views/Login.vue'
import Channel from '../views/Channel.vue'

export const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/channel',
    name: 'channel',
    component: Channel
  }
]
