import type { DefaultTheme, LocaleConfig } from 'vitepress'

// 中文配置（根目录）
const rootConfig = {
  label: '简体中文',
  lang: 'zh-CN',
  link: '/',
  themeConfig: {
    nav: [
      { text: '快速开始', link: '/wiki/user-guide/programming-basics-for-beginners', activeMatch: '/wiki/user-guide/' },
      { text: '博客', link: '/blog/' },
      { text: '文档', link: '/docs-zh/', activeMatch: '/docs-zh/' },
      { text: '案例分享', link: '/example/', activeMatch: '/example/' },
      { text: 'MUSIC AI', link: 'https://www.sunoaimusical.com', target: '_blank' },
      { text: 'ChatGPT Share', link: 'https://nf.video/Up9Xa', target: '_blank' },
    ],
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024 Learn Cursor 团队',
    },
  },
}

// 英文配置
const enConfig = {
  label: 'English',
  lang: 'en',
  link: '/en/',
  themeConfig: {
    nav: [
      { text: 'Getting Started', link: '/en/wiki/user-guide/programming-basics-for-beginners', activeMatch: '/en/wiki/user-guide/' },
      { text: 'Blog', link: '/en/blog/' },
      { text: 'Documentation', link: '/en/docs/', activeMatch: '/en/docs/' },
      { text: 'Case Sharing', link: '/en/example/', activeMatch: '/en/example/' },
      { text: 'MUSIC AI', link: 'https://www.sunoaimusical.com', target: '_blank' },
      { text: 'ChatGPT Share', link: 'https://nf.video/Up9Xa', target: '_blank' },
    ],
    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © 2024 Learn Cursor Team',
    },
  },
}

// 日文配置
const jaConfig = {
  label: '日本語',
  lang: 'ja',
  link: '/ja/',
  themeConfig: {
    nav: [
      { text: '入門ガイド', link: '/ja/wiki/user-guide/programming-basics-for-beginners', activeMatch: '/ja/wiki/user-guide/' },
      { text: 'ブログ', link: '/ja/blog/' },
      { text: 'ドキュメント', link: '/ja/docs/', activeMatch: '/ja/docs/' },
      { text: 'ケース共有', link: '/ja/example/', activeMatch: '/ja/example/' },
      { text: 'MUSIC AI', link: 'https://www.sunoaimusical.com', target: '_blank' },
      { text: 'ChatGPT シェア', link: 'https://nf.video/Up9Xa', target: '_blank' },
    ],
    footer: {
      message: 'MIT ライセンスで公開',
      copyright: 'Copyright © 2024 Learn Cursor チーム',
    },
  },
}

// 导出 i18n 配置
export const i18nConfig: LocaleConfig<DefaultTheme.Config> = {
  root: rootConfig,
  en: enConfig,
  ja: jaConfig,
}
