/**
 * @Description: cli配置
 * @author TK
 * @date 2022-04-28 11:57:06
 */
const path = require('path')
const { name, version, author } = require('./package.json')
const dayjs = require('dayjs')
const time = dayjs().format('YYYY-M-D HH:mm:ss')
process.env.VUE_APP_TITLE = name || 'vue-easy-template'
process.env.VUE_APP_AUTHOR = author || 'tk'
process.env.VUE_APP_UPDATE_TIME = time
process.env.VUE_APP_VERSION = version

const resolve = (dir) => path.join(__dirname, dir)
// const mockServer = () => {
//   if (process.env.NODE_ENV === 'development')
//     return require('./mock/mock-server')
//   else return ''
// }
module.exports = {
  // 开发以及部署时的URL
  publicPath: '',

  // 生产环境构建文件的目录名
  outputDir: 'dist',

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',

  // 开发环境每次保存时是否输出为eslint编译警告
  lintOnSave: true,
  //所有 webpack-dev-server 的选项都支持。注意：
  // 有些值像 host、port 和 https 可能会被命令行参数覆写。
  // 有些值像 publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 publicPath 同步以保障正常的工作。
  devServer: {
    hot: true,
    port: 1121,
    open: true,
    noInfo: false,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: false,
    },
    // before: require('./mock/mock-server.js'),
  },
  //如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  // 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
  configureWebpack() {
    return {
      devtool: 'source-map',
      resolve: {
        alias: {
          '@': resolve('src'),
        },
      },
    }
  },

  chainWebpack(config) {
    /**
     * @Description: build移除所有console
     * @author TK
     * @date 2022-04-19 11:22:42
     */
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.devtool('source-map')
    })
  },
  //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: true,
  //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。你可以启用本选项，以避免构建后的代码中出现未转译的第三方依赖。
  //
  // 不过，对所有的依赖都进行转译可能会降低构建速度。如果对构建性能有所顾虑，你可以只转译部分特定的依赖：给本选项传一个数组，列出需要转译的第三方包包名或正则表达式即可。
  transpileDependencies: [],
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        /*sass-loader 8.0语法 */
        //prependData: '@import "~@/styles/variables.scss";',

        /*sass-loader 9.0写法，感谢github用户 shaonialife*/
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext
          const relativePath = path.relative(rootContext, resourcePath)
          if (
            relativePath.replace(/\\/g, '/') !== 'src/styles/variables.scss'
          ) {
            return '@import "~@/styles/variables.scss";' + content
          }
          return content
        },
      },
    },
  },
}
