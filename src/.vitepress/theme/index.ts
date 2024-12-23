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
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// Styles
import './styles/vars.css'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    // 注册 Element Plus
    app.use(ElementPlus)

    // 注册组件
    app.component('BlogList', BlogList)
    app.component('BlogPost', BlogPost)
    app.component('DocFooter', DocFooter)
  },
  // 布局映射
  layouts: {
    // 博客文章使用 BlogPost 布局
    post: BlogPost,
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(DocFooter),
      'layout-top': () => h(GoogleAdsense),
    })
  },
} as Theme
