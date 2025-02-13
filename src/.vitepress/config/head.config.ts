import type { UserConfig } from 'vitepress'

const ogDescription
  = '提供最全面的Cursor AI中文教程，包括下载安装、使用教程、Rules规则配置等专业指南。全面指导你使用Cursor AI助手从0到1搭建互联网产品，涵盖项目实战、代码生成、Git集成等核心功能。无论你是想了解Cursor怎么用，还是寻求官方相关教程，都能在这里找到详细图文攻略和实战案例，让AI编程助力你的产品开发之旅。'
const ogImage = '/logo.png'
const ogTitle = 'Cursor中文教程 | AI编程助手入门与实战指南'
const ogUrl = 'https://learn-cursor.com'

export const head: UserConfig['head'] = [
  ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.png' }],
  ['link', { rel: 'alternate', type: 'application/rss+xml', href: '/rss.rss' }],
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:title', content: ogTitle }],
  ['meta', { property: 'og:image', content: ogImage }],
  ['meta', { property: 'og:url', content: ogUrl }],
  ['meta', { property: 'og:description', content: ogDescription }],
  ['meta', { name: 'theme-color', content: '#646cff' }],
  // Google AdSense
  [
    'script',
    {
      async: '',
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6152848695010247',
      crossorigin: 'anonymous',
    },
  ],
  [
    'script',
    {},
    `(adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-6152848695010247",
      enable_page_level_ads: true
    });`,
  ],
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
