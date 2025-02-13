/// <reference types="vite/client" />
/// <reference path="./vue-shims.d.ts" />

// Types
import type { Theme } from 'vitepress'
import type { VNode } from 'vue'

// Element Plus
import ElementPlus from 'element-plus'

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

// 广告配置
const AD_CONFIG = {
  adsense: {
    scriptId: 'google-adsense',
    scriptSrc: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    clientId: 'ca-pub-6152848695010247',
    retryTimes: 3,
    retryInterval: 5000,
  },
}

// 广告组件配置
const adComponents = {
  GoogleAdsense: () => import('./components/GoogleAdsense.vue'),
}

// 检查广告拦截器
function checkAdBlocker(): Promise<boolean> {
  return new Promise((resolve) => {
    const testAd = document.createElement('div')
    testAd.innerHTML = '&nbsp;'
    testAd.className = 'adsbox'
    testAd.style.cssText = 'position: absolute; left: -999px;'
    document.body.appendChild(testAd)

    window.setTimeout(() => {
      const isBlocked = testAd.offsetHeight === 0
      testAd.remove()
      resolve(isBlocked)
    }, 100)
  })
}

// 加载广告脚本
async function loadAdScript(config: typeof AD_CONFIG.adsense, retryCount = 0): Promise<void> {
  try {
    // 检查是否已加载
    if (document.getElementById(config.scriptId)) {
      return
    }

    // 检查广告拦截器
    const isBlocked = await checkAdBlocker()
    if (isBlocked) {
      return
    }

    // 加载脚本
    const script = document.createElement('script')
    script.id = config.scriptId
    script.src = config.scriptSrc
    script.async = true
    script.defer = true
    script.setAttribute('data-cfasync', 'false')
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('data-ad-client', config.clientId)

    // 错误处理和重试
    script.onerror = () => {
      if (retryCount < config.retryTimes) {
        setTimeout(() => {
          loadAdScript(config, retryCount + 1)
        }, config.retryInterval)
      }
    }

    document.head.appendChild(script)
  }
  catch (error) {
    console.error('[Ad] Error:', error)
  }
}

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

    // 仅在生产环境和客户端加载广告组件
    if (typeof window !== 'undefined' && import.meta.env.PROD) {
      // 异步注册广告组件
      Object.entries(adComponents).forEach(([name, component]) => {
        app.component(name, defineAsyncComponent({
          loader: component,
          timeout: 5000,
          suspensible: false,
          loadingComponent: () => null,
          errorComponent: () => null,
          onError: (error) => {
            console.error(`[${name}] Failed to load:`, error)
          },
        }))
      })

      // 等待页面加载完成后再加载广告脚本
      window.addEventListener('load', () => {
        // 延迟加载以确保页面完全渲染
        setTimeout(() => {
          loadAdScript(AD_CONFIG.adsense)
        }, 1000)
      })
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
            const { GoogleAdsense } = adComponents
            components.push(
              h(defineAsyncComponent({
                loader: GoogleAdsense,
                timeout: 5000,
                suspensible: false,
                loadingComponent: () => null,
                errorComponent: () => null,
              })),
            )
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
