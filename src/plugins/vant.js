// 按需全局引入 vant组件
import Vue from 'vue'
import { Button } from 'vant'
import { Form } from 'vant'
import { Field } from 'vant'
import { Checkbox } from 'vant'
import { Cell, CellGroup } from 'vant'
import { Tabbar, TabbarItem } from 'vant'
import { Image as VanImage } from 'vant'

Vue.use(VanImage)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Checkbox)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
