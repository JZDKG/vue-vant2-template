import { getUserInfo, login } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/token'
import { title } from '@/config'
import Vue from 'vue'

const state = {
  accessToken: getToken(),
  permissions: [],
  username: '',
}

const getters = {
  accessToken: (state) => state.accessToken,
  permissions: (state) => state.permissions,
  username: (state) => state.username,
}

const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setToken(accessToken)
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
  setUsername(state, username) {
    state.username = username
  },
}

const actions = {
  async login({ commit }, userInfo) {
    //...登陆逻辑
    const { data } = await login(userInfo)
    const accessToken = data.token
    if (accessToken) {
      commit('setAccessToken', accessToken)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      Vue.prototype.$global.baseNotify(
        `${thisTime}，用户${userInfo.mobile}，欢迎登录${title}!`,
        'success'
      )
    } else {
      Vue.prototype.$global.baseNotify(`登录接口异常`, 'danger')
    }
  },
  async getUserInfo({ commit }) {
    let { data } = await getUserInfo()
    if (!data) {
      Vue.prototype.$global.baseNotify('验证失败，请重新登录...', 'danger')
      return false
    }
    let permissions = ['admin']
    if (permissions && Array.isArray(permissions)) {
      commit('setPermissions', permissions)
      commit('setUsername', data)
    } else {
      Vue.prototype.$global.baseNotify('用户信息接口异常', 'danger')
      return false
    }
  },
  resetAccessToken({ commit }) {
    commit('setPermissions', [])
    commit('setAccessToken', '')
    removeToken()
  },
}

export default { state, getters, mutations, actions }
