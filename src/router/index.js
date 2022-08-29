import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home'),
        meta: {
          title: '首页',
          keepAlive: true,
        },
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('@/views/my'),
        meta: {
          title: '我的',
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: {
      title: '登陆',
      keepAlive: false,
    },
  },
]

const router = new VueRouter({
  routes,
})

export default router
