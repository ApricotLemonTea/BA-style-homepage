import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
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
