// Types
import type { Theme } from 'vitepress'
import type { App } from 'vue'

// Element Plus
import ElementPlus from 'element-plus'

// Vue & VitePress
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

// Components
import BlogList from './components/BlogList.vue'
import BlogPost from './components/BlogPost.vue'
import DocFooter from './components/DocFooter.vue'
import GoogleAdsense from './components/GoogleAdsense.vue'
import HomeContent from './components/HomeContent.vue'
import RulesPage from './components/RulesPage.vue'

// Styles
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/vars.css'
import './styles/custom.css'

// 定义主题配置
export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    // 注册 Element Plus
    app.use(ElementPlus)

    // 注册全局组件
    app.component('BlogList', BlogList)
    app.component('BlogPost', BlogPost)
    app.component('DocFooter', DocFooter)
    app.component('GoogleAdsense', GoogleAdsense)
    app.component('HomeContent', HomeContent)
    app.component('RulesPage', RulesPage)

    // 添加Adsterra广告脚本
    if (typeof window !== 'undefined') {
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
      'layout-top': () => h(GoogleAdsense),
    })
  },
} satisfies Theme
