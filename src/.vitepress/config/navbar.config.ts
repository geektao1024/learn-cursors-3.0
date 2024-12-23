import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
  { text: '入门教程', link: '/wiki/user-guide/', activeMatch: '/wiki/user-guide/' },
  { text: '文章博客', link: '/blog/' },
  { text: '中文文档', link: '/docs-zh/', activeMatch: '/docs-zh/' },
  { text: '规则指南', link: '/rules/', activeMatch: '/rules/' },
  { text: 'ChatGPT 合租', link: 'https://nf.video/Up9Xa', target: '_blank' },
]
