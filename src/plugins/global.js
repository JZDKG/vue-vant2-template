/**
 * @Description: 对element组件进行全局封装
 * @author TK
 * @date 2022-06-29 12:06:02
 */
import { Notify, Toast } from 'vant'
import Vue from 'vue'
import * as lodash from 'lodash'

const global = {
  baseToast: (message, type) => {
    Toast({
      message,
      type,
      duration: 2000,
      overlay: true,
      forbidClick: true,
    })
  },
  baseNotify: (message, type) => {
    Notify({
      message,
      type: type || 'success',
      duration: 2000,
    })
  },
  baseLoading: (message, forbidClick) => {
    return Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: !!forbidClick,
      message: message ? message : '加载中',
    })
  },
  /* 全局lodash */
  baseLodash: lodash,
}

Vue.prototype.$global = global
