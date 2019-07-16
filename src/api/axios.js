import axios from 'axios'
import JSONBig from 'json-bigint'
const instance = axios.create({

  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  transformResponse: [(data) => {
    // 这里的data就是json数据
    if (data) {
      // 避免后端无响应内容的情况 做一下判断
      return JSONBig.parse(data)
    }
    return data
  }]
  // headers: { Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('74-toutiao')).token }
})
// 请求拦截器
// axios提供的方法，在axios发送请求的时候处理，在这里不用每次初始化main.js的时候执行headers里的代码了，
// 只需要在请求拦截器里面设置 当发送请求的时候才将headers里面设置上token
instance.interceptors.request.use((config) => {
  const user = window.sessionStorage.getItem('74-toutiao')
  if (user) {
    config.headers = { Authorization: 'Bearer ' + JSON.parse(user).token }
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
// token保存的事件为两小时
instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  // 错误响应的对象有数据并且响应的状态码是401都满足的情况下 避免后端无响应内容的情况
  if (error.response && error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
}
)
export default instance
