import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login.vue'
import home from '@/views/home'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: login },
    { name: 'home', path: '/', component: home }
  ]
})
export default router
