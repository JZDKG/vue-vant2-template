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
          message: '帐户或密码不正确。',
        }
      }
      return {
        code: 200,
        message: 'success',
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
          avatar: 'https://picsum.photos/200',
        },
      }
    },
  },
]
