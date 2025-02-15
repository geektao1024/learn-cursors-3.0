/// <reference types="vite/client" />
/// <reference path="./vue-shims.d.ts" />

// Types
import type { Theme } from 'vitepress'
import type { VNode } from 'vue'

// Element Plus
import ElementPlus from 'element-plus'

import { inBrowser, useData } from 'vitepress'
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
import { logger as appLogger } from './utils/logger'

// Styles
import './styles/vars.css'
import './custom.css'
import './styles/giscus.dark.css'

// 仅在客户端导入Element Plus样式
if (inBrowser) {
  import('element-plus/dist/index.css')
  import('element-plus/theme-chalk/dark/css-vars.css')
}

// 添加性能监控
const enablePerformanceMonitoring = typeof window !== 'undefined' && import.meta.env.DEV

// 性能监控函数
function monitorPerformance() {
  if (!inBrowser)
    return

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      appLogger.debug('[性能监控]', {
        name: entry.name,
        duration: entry.duration,
        timestamp: new Date().toISOString(),
      })
    }
  })

  observer.observe({ entryTypes: ['measure', 'paint'] })
}

// 错误处理工具
function errorHandler(error: Error, component: string) {
  appLogger.debug(`[${component}] 组件加载失败，错误堆栈:`, error.stack)
}

// 优化异步组件加载配置
function createAsyncComponent(loader: () => Promise<any>, componentName: string) {
  return defineAsyncComponent({
    loader,
    timeout: 5000,
    suspensible: false,
    loadingComponent: () => h('div', { class: 'async-loading' }, `${componentName} 加载中...`),
    errorComponent: () => h('div', { class: 'async-error' }, `${componentName} 加载失败`),
    onError: error => errorHandler(error, componentName),
  })
}

// 注册语言检测组件
const LanguageDetectorComponent = typeof window !== 'undefined'
  ? createAsyncComponent(
      () => import('../components/LanguageDetector.vue'),
      'LanguageDetector',
    )
  : null

// 定义主题配置
export default {
  extends: DefaultTheme,
  Layout: () => {
    // 使用客户端渲染模式，避免水合不匹配
    if (inBrowser) {
      return h(DefaultTheme.Layout, null, {
        'doc-after': () => {
          const { page } = useData()
          const isDocPage = page.value.relativePath.startsWith('wiki/')
            || page.value.relativePath.startsWith('docs-zh/')

          if (!isDocPage)
            return null

          return h('div', { class: 'doc-after-container' }, [
            h(DocFooter),
          ])
        },
      })
    }
    // 服务端渲染时返回基础布局
    return h(DefaultTheme.Layout)
  },
  enhanceApp({ app }) {
    // 注册 Element Plus
    app.use(ElementPlus)

    // 开发环境启用性能追踪
    if (enablePerformanceMonitoring) {
      app.config.performance = true
    }

    // 全局错误处理
    app.config.errorHandler = (err, vm, info) => {
      appLogger.debug('全局错误:', { error: err, component: vm, info })
    }

    if (inBrowser) {
      // 优化水合配置
      app.config.compilerOptions = {
        whitespace: 'condense',
        comments: false,
        delimiters: ['{{', '}}'],
      }

      // 处理水合不匹配
      app.mixin({
        mounted() {
          // 等待下一个tick，确保DOM已更新
          this.$nextTick(() => {
            if (this.$el?.nodeType === 1) {
              // 移除空style属性
              if (this.$el.hasAttribute('style') && this.$el.getAttribute('style') === '') {
                this.$el.removeAttribute('style')
              }
              // 处理class属性
              if (this.$el.hasAttribute('class') && this.$el.getAttribute('class') === '') {
                this.$el.removeAttribute('class')
              }
            }
          })
        },
      })

      // 监控性能
      monitorPerformance()
    }

    // 注册组件
    app.component('BlogList', BlogList)
    app.component('BlogPost', BlogPost)
    app.component('DocFooter', DocFooter)
    app.component('HomeContent', HomeContent)
    app.component('RulesPage', RulesPage)

    // 注册语言检测组件
    if (inBrowser && LanguageDetectorComponent) {
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

    // 仅在生产环境和客户端加载图片预览功能
    if (typeof window !== 'undefined' && import.meta.env.PROD) {
      setupImagePreview()
    }
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
  const images = document.querySelectorAll('img:not(.no-preview)') as NodeListOf<HTMLImageElement>

  const createOverlay = (imgSrc: string) => {
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      cursor: pointer;
    `

    const previewImg = document.createElement('img')
    previewImg.src = imgSrc
    previewImg.style.cssText = `
      max-width: 90vw;
      max-height: 90vh;
      object-fit: contain;
      transition: transform 0.3s ease;
    `
    overlay.appendChild(previewImg)

    const closeOverlay = () => document.body.removeChild(overlay)
    overlay.addEventListener('click', closeOverlay)

    // 支持ESC关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape')
        closeOverlay()
    }, { once: true })

    return overlay
  }

  images.forEach((img) => {
    img.style.cursor = 'pointer'
    img.addEventListener('click', () => {
      const overlay = createOverlay(img.src)
      document.body.appendChild(overlay)
    })
  })
}
