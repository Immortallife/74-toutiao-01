import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login.vue'
import home from '@/views/home/home.vue'
import welcome from '@/views/welcome/index.vue'
import notfound from '@/views/404/index.vue'
import article from '@/views/article/index.vue'
import Image from '@/views/image/index.vue'
import Publish from '@/views/publish/index.vue'
import Comment from '@/views/comment/index.vue'
import Setting from '@/views/setting/index.vue'
import Fans from '@/views/fans/index.vue'

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
        },
        { name: 'article', path: '/article', component: article },
        { name: 'image', path: '/image', component: Image },
        { name: 'publish', path: '/publish', component: Publish },
        { name: 'comment', path: '/comment', component: Comment },
        { name: 'setting', path: '/setting', component: Setting },
        { name: 'fans', path: '/fans', component: Fans }

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
