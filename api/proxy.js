// api/proxy.js
// 该服务为 vercel serve跨域处理
import { createProxyMiddleware } from 'http-proxy-middleware'

module.exports = (req, res) => {
  let target = ''
  // 代理目标地址
  if (req.url.startsWith('/cloudflare-api')) {
    target = 'https://api.cloudflare.com/client/v4/graphql'
  }
  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/cloudflare-api/': '/',
    },
  })(req, res)
}