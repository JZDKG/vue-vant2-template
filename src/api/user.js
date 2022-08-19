import request from '@/utils/request'

export async function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}
