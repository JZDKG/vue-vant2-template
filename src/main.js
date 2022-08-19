import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
Vue.config.productionTip = false
/**
 * @Description: mock配置（正式环境删除或注释）
 * @author TK
 * @date 2022-05-21 16:35:18
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
