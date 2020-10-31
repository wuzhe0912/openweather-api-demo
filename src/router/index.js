import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './map'
// import firebase from '@/firebase'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  // 頁面切換時，回到網頁頂部
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// 檢查登入狀態
router.beforeEach(async (to, from, next) => {
  const loginStatus = window.localStorage.getItem('isLogin')
  if (to.name !== 'login' && loginStatus === null) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
