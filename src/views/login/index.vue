<template>
  <div class="index-container">
    <img
      src="@/assets/logo.png"
      alt="logo"
      class="logo animate__animated animate__bounceIn"
    />
    <van-form
      class="login-form animate__animated animate__bounceIn"
      @submit="onSubmit"
    >
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-cell>
        <template #title>
          <van-checkbox v-model="isRememberPassword" shape="square">
            记住密码
          </van-checkbox>
        </template>
      </van-cell>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    components: {},
    data() {
      return {
        username: 'admin',
        password: '123456',
        isRememberPassword: false,
      }
    },
    created() {
      this.getPassword()
    },
    mounted() {},
    methods: {
      // 提交表单
      onSubmit(values) {
        const loading = this.$global.baseLoading('登陆中', true)
        this.$store
          .dispatch('user/login', values)
          .then(() => {
            this.rememberPassword()
            this.$router.push('/').catch(() => {})
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            loading.clear()
          })
      },
      // 记住密码
      rememberPassword() {
        if (this.isRememberPassword) {
          localStorage.setItem('username', this.username)
          localStorage.setItem('password', this.password)
        }
      },
      // 取出密码
      getPassword() {
        let username = localStorage.getItem('username')
        let password = localStorage.getItem('password')
        if (username && password) {
          this.username = username
          this.password = password
          this.isRememberPassword = true
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .index-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 100px 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo {
      width: 100px;
      height: 100px;
    }

    .login-form {
      margin-top: 40px;
    }
  }
</style>
