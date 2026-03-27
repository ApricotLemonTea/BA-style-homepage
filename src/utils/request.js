/**
 * 前后端都部署到服务器后启用
 */

import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const request = axios.create({
  baseURL: baseUrl,
  timeout: 5000
})

// 请求拦截
request.interceptors.request.use((config) => {
  // 可以加 token
  return config
})

// 响应拦截
request.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
)

export default request
