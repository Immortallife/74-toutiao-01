import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login.vue'
import home from '@/views/home/home.vue'
import welcome from '@/views/welcome/index.vue'
import notfound from '@/views/404/index.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: login },
    {
      path: '/',
      component: home,
      children: [
        {
          name: 'welcome', path: '/', component: welcome
        }
      ] },
    { name: '404', path: '*', component: notfound }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const user = window.sessionStorage.getItem('74-toutiao')
  if (user) return next()
  next('/login')
})
export default router
