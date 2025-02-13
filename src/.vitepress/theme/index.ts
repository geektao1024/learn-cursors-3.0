/// <reference types="vite/client" />
/// <reference path="./vue-shims.d.ts" />

// Types
import type { Theme } from 'vitepress'
import type { VNode } from 'vue'

// Element Plus
import ElementPlus from 'element-plus'

// Vue & VitePress
import DefaultTheme from 'vitepress/theme'
import { defineAsyncComponent, h } from 'vue'
import { messages } from '../i18n/messages'

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
const AmpAds = import.meta.env.PROD && typeof window !== 'undefined'
  ? defineAsyncComponent(() => import('./components/AmpAds.vue'))
  : null
const GoogleAdsense = import.meta.env.PROD && typeof window !== 'undefined'
  ? defineAsyncComponent(() => import('./components/GoogleAdsense.vue'))
  : null

// 注册语言检测组件
const LanguageDetectorComponent = typeof window !== 'undefined'
  ? defineAsyncComponent({
      loader: () => import('../components/LanguageDetector.vue'),
      timeout: 3000,
      suspensible: false,
      loadingComponent: () => null,
      errorComponent: () => null,
      onError: (error) => {
        console.error('[LanguageDetector] Failed to load:', error)
      },
    })
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

    // 注册语言检测组件
    if (typeof window !== 'undefined' && LanguageDetectorComponent) {
      app.component('LanguageDetector', LanguageDetectorComponent)
    }

    // 添加i18n支持
    app.config.globalProperties.$t = (key: string, params = {}) => {
      const path = key.split('.')
      let value = messages[app.config.globalProperties.$lang] || messages.en
      for (const k of path) {
        value = value?.[k]
      }
      return value?.replace(/\{(\w+)\}/g, (_, k) => params[k] || '') || key
    }

    // 仅在生产环境加载广告组件
    if (typeof window !== 'undefined' && import.meta.env.PROD) {
      if (AmpAds)
        app.component('AmpAds', AmpAds)
      if (GoogleAdsense)
        app.component('GoogleAdsense', GoogleAdsense)

      // 添加 Adsterra 广告脚本
      try {
        const script = document.createElement('script')
        script.src = '//pl25383702.profitablecpmrate.com/b8386c573e08182e1305476b04b5e74e/invoke.js'
        script.async = true
        script.setAttribute('data-cfasync', 'false')
        document.head.appendChild(script)
      }
      catch (error) {
        console.error('[Adsterra] Failed to load:', error)
      }
    }
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(DocFooter),
      'layout-top': () => {
        if (typeof window !== 'undefined') {
          const components: VNode[] = []
          if (LanguageDetectorComponent) {
            components.push(h(LanguageDetectorComponent))
          }
          if (import.meta.env.PROD) {
            if (GoogleAdsense)
              components.push(h(GoogleAdsense))
            if (AmpAds)
              components.push(h(AmpAds))
          }
          return components.filter(Boolean)
        }
        return null
      },
      'nav-screen-content-after': () => null,
      'nav-bar-content-before': () => null,
      'nav-bar-content-after': () => null,
    })
  },
  setup() {
    // 客户端加载完成后执行
    if (typeof window !== 'undefined') {
      window.addEventListener('load', async () => {
        setupImagePreview()
      })
    }
  },
} satisfies Theme

function setupImagePreview() {
  const images = document.querySelectorAll('img') as NodeListOf<HTMLImageElement>
  images.forEach((img) => {
    if (!img.classList.contains('no-preview')) {
      img.addEventListener('click', () => {
        const previewImg = document.createElement('img')
        previewImg.src = img.src
        previewImg.style.maxWidth = '90vw'
        previewImg.style.maxHeight = '90vh'
        previewImg.style.objectFit = 'contain'

        const overlay = document.createElement('div')
        overlay.style.position = 'fixed'
        overlay.style.top = '0'
        overlay.style.left = '0'
        overlay.style.width = '100vw'
        overlay.style.height = '100vh'
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
        overlay.style.display = 'flex'
        overlay.style.justifyContent = 'center'
        overlay.style.alignItems = 'center'
        overlay.style.zIndex = '9999'
        overlay.appendChild(previewImg)

        overlay.addEventListener('click', () => {
          document.body.removeChild(overlay)
        })

        document.body.appendChild(overlay)
      })
    }
  })
}
