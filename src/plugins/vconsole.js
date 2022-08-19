// 引入 Vconsole
import Vconsole from 'vconsole'
// 在 test 环境才使用
process.env.NODE_ENV === 'development' ? new Vconsole() : ''
