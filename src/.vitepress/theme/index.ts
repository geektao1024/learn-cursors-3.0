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

import AdComponent from './components/AdComponent.vue'
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

// 添加性能监控
const enablePerformanceMonitoring = typeof window !== 'undefined' && import.meta.env.DEV

// 自定义日志函数
const logger = {
  debug: (...args: any[]) => {
    if (enablePerformanceMonitoring) {
      // eslint-disable-next-line no-console
      console.debug(...args)
    }
  },
}

// 错误处理工具
function errorHandler(error: Error, component: string) {
  logger.debug(`[${component}] 组件加载失败，错误堆栈:`, error.stack)
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

// 性能监控函数
function monitorPerformance() {
  if (!enablePerformanceMonitoring)
    return

  onMounted(() => {
    if (window.performance) {
      const timing = window.performance.timing
      const pageLoad = timing.loadEventEnd - timing.navigationStart
      logger.debug(`页面加载时间: ${pageLoad}ms`)
    }
  })
}

// 定义主题配置
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册 Element Plus
    app.use(ElementPlus)

    // 开发环境启用性能追踪
    if (enablePerformanceMonitoring) {
      app.config.performance = true
    }

    // 全局错误处理
    app.config.errorHandler = (err, vm, info) => {
      logger.debug('全局错误:', { error: err, component: vm, info })
    }

    // 处理 hydration 不匹配
    if (typeof window !== 'undefined') {
      app.config.compilerOptions = {
        whitespace: 'preserve',
      }

      // 延迟加载可能导致不匹配的组件
      app.mixin({
        mounted() {
          if (this.$el && this.$el.style) {
            this.$nextTick(() => {
              if (this.$el.style.display === 'none') {
                this.$el.style.display = ''
              }
            })
          }
        },
      })
    }

    // 监控性能
    monitorPerformance()

    // 注册全局组件
    app.component('BlogList', BlogList)
    app.component('BlogPost', BlogPost)
    app.component('DocFooter', DocFooter)
    app.component('HomeContent', HomeContent)
    app.component('RulesPage', RulesPage)
    app.component('AdComponent', AdComponent)

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

    // 仅在生产环境和客户端加载图片预览功能
    if (typeof window !== 'undefined' && import.meta.env.PROD) {
      setupImagePreview()
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
