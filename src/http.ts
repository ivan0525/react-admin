import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'

// 请求拦截
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// 响应拦截
axios.interceptors.response.use(
  (config: AxiosResponse) => {
    console.log(config)
    if (config.data.status === 'E0000') {
      message.error(config.data.message)
      return Promise.reject(config)
    }
    return config
  },
  (error) => {
    message.error(error.message)
  }
)
export default axios
