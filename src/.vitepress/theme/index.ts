/// <reference types="vite/client" />
/// <reference path="./vue-shims.d.ts" />

// Types
import type { Theme } from 'vitepress'

// Element Plus
import ElementPlus from 'element-plus'

// Vue & VitePress
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

// Components
import BlogList from './components/BlogList.vue'
import BlogPost from './components/BlogPost.vue'
import DocFooter from './components/DocFooter.vue'
import HomeContent from './components/HomeContent.vue'
import RulesPage from './components/RulesPage.vue'

// Styles
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/vars.css'
import './custom.css'

// 仅在生产环境导入广告组件
const AmpAds = typeof window !== 'undefined' && import.meta.env.PROD
  ? () => import('./components/AmpAds.vue').then(m => m.default)
  : null
const GoogleAdsense = typeof window !== 'undefined' && import.meta.env.PROD
  ? () => import('./components/GoogleAdsense.vue').then(m => m.default)
  : null

// 定义主题配置
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册 Element Plus
    app.use(ElementPlus)

    // 注册全局组件
    app.component('BlogList', BlogList)
    app.component('BlogPost', BlogPost)
    app.component('DocFooter', DocFooter)
    app.component('HomeContent', HomeContent)
    app.component('RulesPage', RulesPage)

    // 仅在生产环境加载广告组件
    if (typeof window !== 'undefined' && import.meta.env.PROD) {
      if (AmpAds)
        app.component('AmpAds', AmpAds)
      if (GoogleAdsense)
        app.component('GoogleAdsense', GoogleAdsense)

      // 添加 Adsterra 广告脚本
      const script = document.createElement('script')
      script.src = '//pl25383702.profitablecpmrate.com/b8386c573e08182e1305476b04b5e74e/invoke.js'
      script.async = true
      script.setAttribute('data-cfasync', 'false')
      document.head.appendChild(script)
    }
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(DocFooter),
      'layout-top': () => {
        if (typeof window !== 'undefined' && import.meta.env.PROD) {
          return [
            GoogleAdsense && h(GoogleAdsense),
            AmpAds && h(AmpAds),
          ].filter(Boolean)
        }
        return []
      },
      'nav-screen-content-after': () => null,
      'nav-bar-content-before': () => null,
      'nav-bar-content-after': () => null,
    })
  },
  // 添加 Markdown 处理器
  markdown: {
    config: (md) => {
      // 处理 Markdown 导入
      md.use(require('markdown-it-container'), 'import', {
        validate: (params: string) => params.trim().match(/^import\s+(.*)$/),
        render: (tokens: any[], idx: number) => {
          if (tokens[idx].nesting === 1) {
            const m = tokens[idx].info.trim().match(/^import\s+(.*)$/)
            return `<div class="import">${m[1]}\n`
          }
          return '</div>\n'
        },
      })
    },
  },
  setup() {
    // 客户端加载完成后执行
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        setupImagePreview()
      })
    }
  },
} satisfies Theme

function setupImagePreview() {
  // 创建预览容器
  const previewContainer = document.createElement('div')
  previewContainer.className = 'image-preview'
  previewContainer.innerHTML = `
    <span class="close-btn">&times;</span>
    <img id="preview-image" src="" alt="预览图">
  `
  document.body.appendChild(previewContainer)

  const preview = previewContainer
  const previewImg = preview.querySelector('#preview-image')
  const closeBtn = preview.querySelector('.close-btn')

  // 获取所有图片
  const images = document.querySelectorAll('.project-image img, .tech-image img, .workflow-image img, .ui-showcase img')

  // 为每个图片添加点击事件
  images.forEach((img) => {
    img.addEventListener('click', function () {
      previewImg.src = this.src
      preview.style.display = 'block'
      document.body.style.overflow = 'hidden'
    })
  })

  // 点击预览区域关闭预览
  preview.addEventListener('click', (e) => {
    if (e.target === preview || e.target === closeBtn) {
      preview.style.display = 'none'
      document.body.style.overflow = 'auto'
    }
  })

  // ESC键关闭预览
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && preview.style.display === 'block') {
      preview.style.display = 'none'
      document.body.style.overflow = 'auto'
    }
  })
}
