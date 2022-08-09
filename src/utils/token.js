import { storage, tokenName } from '@/config'
import Cookies from 'js-cookie'

/**
 * @Description: 获取token
 * @author TK
 * @date 2022-05-31 17:07:26
 */
export function getToken() {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.getItem(tokenName)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.getItem(tokenName)
    } else if (storage === 'cookie') {
      return Cookies.get(tokenName)
    }
  } else {
    return localStorage.getItem(tokenName)
  }
}

/**
 * @Description: 存储token
 * @author TK
 * @date 2022-05-31 17:15:29
 */
export function setToken(token) {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.setItem(tokenName, token)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.setItem(tokenName, token)
    } else if (storage === 'cookie') {
      return Cookies.set(tokenName, token)
    }
  } else {
    return localStorage.setItem(tokenName, token)
  }
}

/**
 * @Description: 移除token
 * @author TK
 * @date 2022-05-31 17:16:48
 */
export function removeToken() {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.removeItem(tokenName)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.removeItem(tokenName)
    } else if (storage === 'cookie') {
      return Cookies.remove(tokenName)
    }
  } else {
    return localStorage.removeItem(tokenName)
  }
}
