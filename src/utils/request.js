import axios from 'axios'
import store from '@/store'
import { message as $message } from '@/libs'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  headers: { icode: '8AFF55CC092BC93E' },
  timeout: 5000
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // TODO：业务错误
      return Promise.reject(new Error(message))
    }
  },
  error => {
    // 处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // TODO: token超时
      store.dispatch('user/logout')
    }
    // TODO: 提示错误消息
    return Promise.reject(error)
  }
)

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
