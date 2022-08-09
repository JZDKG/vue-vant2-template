/**
 * @Description: 路由守卫
 * @author TK
 * @date 2022-05-31 13:53:17
 */
import router from '@/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from '@/store'
import getPageTitle from '@/utils/pageTitle'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeResolve(async (to, from, next) => {
  // 顶部进度条开始
  NProgress.start()
  let hasToken = store.getters['accessToken']
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // hack:
    } else {
      next()
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
