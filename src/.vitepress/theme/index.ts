/// <reference types="vite/client" />
/// <reference path="./vue-shims.d.ts" />

// Types
import type { Theme } from 'vitepress'
import type { VNode } from 'vue'

// Element Plus
import ElementPlus from 'element-plus'

import { useData } from 'vitepress'
// Vue & VitePress
import DefaultTheme from 'vitepress/theme'
import { defineAsyncComponent, h, onMounted } from 'vue'
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

    // 仅在生产环境和客户端加载广告脚本
    if (typeof window !== 'undefined' && import.meta.env.PROD) {
      // 加载图片预览功能
      setupImagePreview()

      // 初始化广告
      const setupAds = () => {
        // 防止重复初始化
        if (document.querySelector('.adsbygoogle')) {
          return
        }

        try {
          // 创建广告容器
          const adContainer = document.createElement('ins')
          adContainer.className = 'adsbygoogle'
          adContainer.style.display = 'block'
          adContainer.style.minHeight = '280px'
          adContainer.setAttribute('data-ad-client', 'ca-pub-6152848695010247')
          adContainer.setAttribute('data-ad-slot', 'auto')
          adContainer.setAttribute('data-ad-format', 'auto')
          adContainer.setAttribute('data-full-width-responsive', 'true')

          // 插入广告容器
          const mainContent = document.querySelector('.VPDoc .content') || document.querySelector('.VPContent .container')
          if (mainContent) {
            mainContent.insertBefore(adContainer, mainContent.firstChild)

            // 设置超时，如果广告加载失败则移除容器
            setTimeout(() => {
              if (adContainer.innerHTML === '') {
                adContainer.remove()
              }
            }, 3000)

            // 初始化广告
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({})
            }
            catch (adError) {
              console.error('Ad push error:', adError)
              adContainer.remove()
            }
          }
        }
        catch (error) {
          console.error('Ad initialization error:', error)
        }
      }

      // 使用 MutationObserver 监听 DOM 变化
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            const content = document.querySelector('.VPDoc .content') || document.querySelector('.VPContent .container')
            if (content && !document.querySelector('.adsbygoogle')) {
              setupAds()
            }
          }
        })
      })

      // 开始观察 DOM 变化
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })

      // 初始加载时尝试设置广告
      if (document.readyState === 'complete') {
        setupAds()
      }
      else {
        window.addEventListener('load', setupAds)
      }
    }
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => {
        // 仅在文档页面显示页脚
        const { page } = useData()
        const isDocPage = page.value.relativePath.startsWith('wiki/')
          || page.value.relativePath.startsWith('docs-zh/')

        if (!isDocPage)
          return null

        return h('div', { class: 'doc-after-container' }, [
          h(DocFooter),
        ])
      },

      // 其他插槽保持不变
      'layout-top': () => {
        if (typeof window !== 'undefined') {
          const components: VNode[] = []
          if (LanguageDetectorComponent) {
            components.push(h(LanguageDetectorComponent))
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
      onMounted(() => {
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
