import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import { message } from 'antd'
import Util from './utils'
import store from './store'
import { setCurrentUserToken } from './store/actions'
interface MyAxiosInstance extends AxiosInstance {
  setToken: (token: string) => void
}

// 创建axios实例
const instance = axios.create({
  timeout: 20000,
  withCredentials: true
}) as MyAxiosInstance

// 在axios实例上添加setToken方法，用于登陆后将最新的token动态的添加到header，
// 同时将token更新到cookie中
instance.setToken = (token: string) => {
  instance.defaults.headers['X-Token'] = token
  // 更新cookie，时效7天
  Util.setCookie('auth', token, 7)
}

// 请求拦截
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = Util.getCookie('auth')
    if (token) {
      store.dispatch(setCurrentUserToken(token))
      config.headers['X-Token'] = token
    }
    return config
  },
  (error) => {
    window.location.href = '/login'
    Promise.reject(error)
  }
)

// 响应拦截
instance.interceptors.response.use(
  (config: AxiosResponse) => {
    if (config.data.status === 'E0000') {
      message.error(config.data.message)
      return Promise.reject(config)
    }
    return config
  },
  (error) => {
    console.log(error.response)
    const { response } = error
    if (response) {
      if (response.status === 401) {
        console.log(1)
        Util.removeCookie('auth')
      }
    }
    message.error(error.message)
  }
)
export default instance
