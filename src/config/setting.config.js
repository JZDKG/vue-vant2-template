/**
 * @description 导出默认通用配置
 */
const setting = {
  //标题
  title: 'vue-vant2-template',
  // token类型----默认为localStorage,可选值：localStorage,sessionStorage,cookie
  storage: 'cookie',
  // token名称
  tokenName: 'Token',
  //需要加loading层的请求，防止重复提交
  debounce: ['doEdit'],
  //是否开启登录拦截
  loginInterception: true,
}
module.exports = setting
