import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Channel from '../views/Channel.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/channel',
    name: 'Channel',
    component: Channel
  }
]

const router = new VueRouter({
  routes
})

export default router
