// 封装一个vue插件，完成当前文件夹下所有组件的全局注册
// 导入这个模块后，使用vue.use(使用这个模块)，vue会调用install这个函数 默认传入vue对象
import MyBread from '@/components/my-bread.vue'
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
  }
}
