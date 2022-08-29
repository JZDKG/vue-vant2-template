import { getUserInfo, login } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/token'
import { title } from '@/config'
import Vue from 'vue'

const state = {
  accessToken: getToken(),
  permissions: [],
  username: '',
  avatar: '',
}

const getters = {
  accessToken: (state) => state.accessToken,
  permissions: (state) => state.permissions,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
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
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
}

const actions = {
  async login({ commit }, userInfo) {
    //...登陆逻辑
    const { data } = await login(userInfo)
    const accessToken = data.accessToken
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
        `${thisTime}，欢迎登录${title}!`,
        'success'
      )
    } else {
      Vue.prototype.$global.baseNotify(`登录接口异常`, 'danger')
    }
  },
  async getUserInfo({ commit }) {
    let { data } = await getUserInfo(state.accessToken)
    if (!data) {
      Vue.prototype.$global.baseNotify('验证失败，请重新登录', 'danger')
      return false
    }
    let { permissions, username, avatar } = data
    if (permissions && username && Array.isArray(permissions)) {
      commit('setPermissions', permissions)
      commit('setUsername', username)
      commit('setAvatar', avatar)
      return permissions
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
