import type { UserConfig } from 'vitepress'

const ogDescription
  = 'Learn Cursor提供最全面的Cursor教程，从安装设置到高级应用，深入讲解AI编程助手的所有功能与使用技巧。无论你是新手入门还是寻求进阶，都能在这里找到专业指南。'
const ogImage = '/logo.png'
const ogTitle = 'Cursor教程 | AI编程助手使用指南与技巧教程'
const ogUrl = 'https://www.learn-cursor.com'

export const head: UserConfig['head'] = [
  ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.png' }],
  ['link', { rel: 'alternate', type: 'application/rss+xml', href: '/rss.rss' }],
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:title', content: ogTitle }],
  ['meta', { property: 'og:image', content: ogImage }],
  ['meta', { property: 'og:url', content: ogUrl }],
  ['meta', { property: 'og:description', content: ogDescription }],
  ['meta', { name: 'theme-color', content: '#646cff' }],
  // 新的谷歌分析代码
  [
    'script',
    {
      async: '',
      src: 'https://www.googletagmanager.com/gtag/js?id=G-XHJEPSKT4G',
    },
  ],
  [
    'script',
    {},
    `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XHJEPSKT4G');`,
  ],
  // 百度统计代码
  [
    'script',
    {},
    `var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?15f47d5cafd63c84ff842289217863a5";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();`,
  ],
]
