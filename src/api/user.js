import request from '@/utils/request'

export async function login(data) {
  return request({
    url: '/file/login',
    method: 'post',
    data,
  })
}

// 下载文件
export async function download() {
  return request({
    url: '/file/download',
    method: 'post',
  })
}
