const accessTokens = {
  admin: 'admin-Token',
  editor: 'editor-Token',
  test: 'test-Token',
}

module.exports = [
  {
    url: '/login',
    type: 'post',
    response(config) {
      const { username } = config.body
      const accessToken = accessTokens[username]
      if (!accessToken) {
        return {
          code: 500,
          msg: '帐户或密码不正确。',
        }
      }
      return {
        code: 200,
        msg: 'success',
        data: { accessToken },
      }
    },
  },
  {
    url: '/userInfo',
    type: 'post',
    response(config) {
      const { accessToken } = config.body
      let permissions = ['admin']
      let username = 'admin'
      if ('admin-Token' === accessToken) {
        permissions = ['admin']
        username = 'admin'
      }
      if ('editor-Token' === accessToken) {
        permissions = ['editor']
        username = 'editor'
      }
      if ('test-Token' === accessToken) {
        permissions = ['admin', 'editor']
        username = 'test'
      }
      return {
        code: 200,
        msg: 'success',
        data: {
          permissions,
          username,
          'avatar|1': [
            'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
            'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
          ],
        },
      }
    },
  },
]
