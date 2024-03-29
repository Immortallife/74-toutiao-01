import Vue from 'vue'
import App from './App.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
// 配置axios
import axios from '@/api/axios.js'
import components from '@/components'
// 导入全局样式
import '@/styles/index.less'
Vue.use(components)
Vue.prototype.axios = axios
Vue.use(Element)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
