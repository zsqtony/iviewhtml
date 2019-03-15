import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import { getStorage,setStorage } from '_u/auth'

Vue.use(Router)
const router = new Router({
  routes
})
const LOGIN_PAGE_NAME = 'login'
router.beforeEach( (to, from, next) => {
  iView.LoadingBar.start()
  next()
  //const token = getStorage('token')
})

router.afterEach( to => {
  // setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router;
