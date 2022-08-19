/**
 * @Description: 路由守卫
 * @author TK
 * @date 2022-05-31 13:53:17
 */
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/pageTitle'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeResolve(async (to, from, next) => {
  // 顶部进度条开始
  NProgress.start()
  let token = store.getters['user/accessToken']

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // hack:
    } else {
      const hasPermissions =
        store.getters['user/permissions'] &&
        store.getters['user/permissions'].length > 0
      if (hasPermissions) {
        next()
      } else {
        try {
          await store.dispatch('user/getUserInfo')
          next({ ...to, replace: true })
        } catch {
          await store.dispatch('user/resetAccessToken')
          NProgress.done()
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
  document.title = getPageTitle(to.meta.title)
})
router.afterEach(() => {
  NProgress.done()
})
