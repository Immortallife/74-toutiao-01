import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
Vue.prototype.axios = axios
Vue.use(Element)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
