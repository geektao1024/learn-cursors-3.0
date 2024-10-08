/** @type {import('next').NextConfig} */
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  // 仅应用于 `/docs` 路由
  extensible: true,
})

const path = require('path')

module.exports = withNextra({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    return config
  },
  // 确保 API 路由可以正常工作
  async rewrites() {
    return [
      {
        source: '/docs/:path*',
        destination: '/docs/:path*',
      },
    ]
  },
  async redirects() {
    return [
      // 如果有重定向规则，请确保它们不会影响 /api/login
    ]
  },
})