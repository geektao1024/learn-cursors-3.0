<script setup lang="ts">
import type { SchemaType } from './types/schema'
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, nextTick, onBeforeMount, onErrorCaptured, onMounted, onUpdated, ref, watch } from 'vue'
import { adsConfig } from '../config/ads.config'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import { useHydration } from './utils/hydration'
import { logger } from './utils/logger'
import './custom.css'

const { Layout } = DefaultTheme
const { isHydrated } = useHydration()
const { frontmatter } = useData()
const route = useRoute()
const componentErrors = ref<Error[]>([])
const effectiveGateAd = {
  containerId: 'container-b8386c573e08182e1305476b04b5e74e',
  scriptSrc: 'https://pl25383702.effectivegatecpm.com/b8386c573e08182e1305476b04b5e74e/invoke.js',
} as const

// 监控路由变化
watch(() => route.path, (newPath, oldPath) => {
  logger.log('[路由变化]', {
    from: oldPath,
    to: newPath,
    timestamp: new Date().toISOString(),
  })
})

// 监控水合状态
watch(isHydrated, (newVal) => {
  logger.log('[水合状态变化]', {
    isHydrated: newVal,
    timestamp: new Date().toISOString(),
  })
})

// 生命周期钩子日志
onBeforeMount(() => {
  logger.log('[生命周期] Layout组件 onBeforeMount', {
    timestamp: new Date().toISOString(),
  })
})

onMounted(async () => {
  logger.log('[生命周期] Layout组件 onMounted - 开始', {
    timestamp: new Date().toISOString(),
  })

  try {
    await nextTick()
    isHydrated.value = true

    // 检查关键DOM元素
    const container = document.querySelector('.vp-doc.container')
    logger.log('[DOM状态]', {
      containerExists: !!container,
      containerStyles: container ? window.getComputedStyle(container) : null,
      timestamp: new Date().toISOString(),
    })

    // 监控广告加载
    if (typeof window !== 'undefined') {
      const effectiveGateContainer = document.getElementById(effectiveGateAd.containerId)
      let effectiveGateScript = document.querySelector(`script[src="${effectiveGateAd.scriptSrc}"]`)

      if (effectiveGateContainer && !effectiveGateScript) {
        const script = document.createElement('script')
        script.async = true
        script.setAttribute('data-cfasync', 'false')
        script.src = effectiveGateAd.scriptSrc
        effectiveGateContainer.appendChild(script)
        effectiveGateScript = script
      }

      const adScript = document.querySelector('script[src*="pagead2.googlesyndication.com"]')
      const ampScript = document.querySelector('script[src*="cdn.ampproject.org"]')
      const ampAdsElement = document.querySelector('amp-auto-ads')

      logger.log('[广告状态]', {
        adScriptLoaded: !!adScript,
        ampScriptLoaded: !!ampScript,
        ampAdsElementExists: !!ampAdsElement,
        effectiveGateContainerExists: !!effectiveGateContainer,
        effectiveGateScriptLoaded: !!effectiveGateScript,
        timestamp: new Date().toISOString(),
      })
    }
  }
  catch (error) {
    logger.error('[错误] Layout组件 onMounted中发生错误', {
      error,
      timestamp: new Date().toISOString(),
    })
  }

  logger.log('[生命周期] Layout组件 onMounted - 完成', {
    timestamp: new Date().toISOString(),
  })
})

onUpdated(() => {
  logger.log('[生命周期] Layout组件 onUpdated', {
    timestamp: new Date().toISOString(),
  })
})

// 错误捕获
onErrorCaptured((err, instance, info) => {
  const error = {
    message: err.message,
    stack: err.stack,
    componentInfo: info,
    timestamp: new Date().toISOString(),
  }

  componentErrors.value.push(err)
  logger.error('[错误捕获]', error)

  // 可以选择是否阻止错误向上传播
  return false
})

// 性能监控
if (typeof window !== 'undefined') {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      logger.log('[性能监控]', {
        name: entry.name,
        duration: entry.duration,
        timestamp: new Date().toISOString(),
      })
    }
  })

  observer.observe({ entryTypes: ['measure', 'paint'] })
}

// 生成结构化数据
const structuredData = computed<SchemaType[]>(() => {
  // 准备基础数据
  const baseUrl = 'https://learn-cursor.com'
  const defaultImage = '/logo.png'
  const defaultPublisher = {
    '@type': 'Organization' as const,
    'name': 'Learn Cursor',
    'logo': {
      '@type': 'ImageObject' as const,
      'url': `${baseUrl}${defaultImage}`,
    },
    'contactPoint': {
      '@type': 'ContactPoint' as const,
      'contactType': 'customer support',
      'url': 'https://github.com/geektao1024/learn-cursors-3.0/issues',
    },
    'foundingDate': '2024-01',
    'sameAs': [
      'https://github.com/cursorAI',
      'https://twitter.com/cursor_ai',
    ],
  } as const

  // 生成面包屑导航
  const generateBreadcrumb = () => {
    const pathSegments = route.path.split('/').filter(Boolean)
    if (pathSegments.length === 0)
      return null

    return {
      '@context': 'https://schema.org' as const,
      '@type': 'BreadcrumbList' as const,
      'itemListElement': pathSegments.map((segment, index) => ({
        '@type': 'ListItem' as const,
        'position': index + 1,
        'item': {
          '@id': `${baseUrl}/${pathSegments.slice(0, index + 1).join('/')}`,
          'name': segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        },
      })),
    }
  }

  const schemas: any[] = []

  // 添加网站全局信息（仅在首页）
  if (route.path === '/' || route.path === '/index.html') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'url': baseUrl,
      'name': 'Learn Cursor',
      'description': frontmatter.value.description,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${baseUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      'publisher': defaultPublisher,
    })
  }

  // 添加面包屑导航（除首页外的所有页面）
  const breadcrumb = generateBreadcrumb()
  if (breadcrumb) {
    schemas.push(breadcrumb)
  }

  // 根据页面类型添加特定的结构化数据
  if (frontmatter.value.layout === 'doc' || route.path.includes('/blog/posts/')) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': frontmatter.value.title,
      'description': frontmatter.value.description,
      'image': frontmatter.value.image || defaultImage,
      'datePublished': frontmatter.value.date,
      'dateModified': frontmatter.value.lastUpdated,
      'author': {
        '@type': 'Person',
        'name': frontmatter.value.author || 'Learn Cursor Team',
      },
      'publisher': defaultPublisher,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `${baseUrl}${route.path}`,
      },
    })
  }
  // 如果是教程页面
  else if (route.path.includes('/wiki/')) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': frontmatter.value.title,
      'description': frontmatter.value.description,
      'provider': {
        '@type': 'Organization',
        'name': 'Learn Cursor',
        'sameAs': 'https://learn-cursor.com',
      },
      'educationalLevel': 'beginner',
      'inLanguage': frontmatter.value.lang || 'zh-CN',
      'coursePrerequisites': 'Basic programming knowledge',
      'learningResourceType': 'Tutorial',
      'image': frontmatter.value.image || '/logo.png',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
        'availability': 'http://schema.org/InStock',
      },
    })
  }
  // 如果是官方文档页面
  else if (route.path.includes('/docs/')) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      'headline': frontmatter.value.title,
      'description': frontmatter.value.description,
      'image': frontmatter.value.image || '/logo.png',
      'dateModified': frontmatter.value.lastUpdated,
      'author': {
        '@type': 'Organization',
        'name': 'Learn Cursor Team',
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Learn Cursor',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://learn-cursor.com/logo.png',
        },
      },
      'about': {
        '@type': 'SoftwareApplication',
        'name': 'Cursor AI',
        'applicationCategory': 'DeveloperApplication',
      },
    })
  }
  // 如果是案例分享页面
  else if (route.path.includes('/example/')) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': frontmatter.value.title,
      'description': frontmatter.value.description,
      'image': frontmatter.value.image || '/logo.png',
      'datePublished': frontmatter.value.date,
      'dateModified': frontmatter.value.lastUpdated,
      'articleSection': 'Case Study',
      'author': {
        '@type': 'Person',
        'name': frontmatter.value.author || 'Learn Cursor Team',
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Learn Cursor',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://learn-cursor.com/logo.png',
        },
      },
    })
  }
  // 如果是规则配置页面
  else if (route.path.includes('/rules/')) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': frontmatter.value.title,
      'description': frontmatter.value.description,
      'image': frontmatter.value.image || '/logo.png',
      'tool': {
        '@type': 'SoftwareApplication',
        'name': 'Cursor AI',
        'applicationCategory': 'DeveloperApplication',
      },
      'step': [
        {
          '@type': 'HowToStep',
          'name': 'Smart Prompts',
          'text': '实时代码建议和自动补全',
        },
        {
          '@type': 'HowToStep',
          'name': 'Auto Formatting',
          'text': '保持一致的代码风格',
        },
        {
          '@type': 'HowToStep',
          'name': 'Code Quality',
          'text': '自动检测潜在问题',
        },
        {
          '@type': 'HowToStep',
          'name': 'Team Collaboration',
          'text': '统一的开发标准',
        },
      ],
    })
  }
  // 如果是快捷键指南页面
  else if (route.path.includes('/shortcuts/')) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': frontmatter.value.title,
      'description': frontmatter.value.description,
      'image': frontmatter.value.image || '/logo.png',
      'tool': {
        '@type': 'SoftwareApplication',
        'name': 'Cursor AI',
        'applicationCategory': 'DeveloperApplication',
      },
      'step': [
        {
          '@type': 'HowToStep',
          'name': 'Basic Operations',
          'text': '基础操作快捷键',
        },
        {
          '@type': 'HowToStep',
          'name': 'Code Navigation',
          'text': '代码导航快捷键',
        },
        {
          '@type': 'HowToStep',
          'name': 'AI Features',
          'text': 'AI功能快捷键',
        },
        {
          '@type': 'HowToStep',
          'name': 'Editor Features',
          'text': '编辑器功能快捷键',
        },
      ],
    })
  }

  return schemas
})
</script>

<template>
  <Layout>
    <template #layout-top>
      <template v-if="structuredData.length > 0">
        <script
          v-for="(schema, index) in structuredData"
          :key="index"
          type="application/ld+json"
          v-html="JSON.stringify(schema)"
        />
      </template>
    </template>
    <div class="theme-container" :class="{ 'is-hydrated': isHydrated }">
      <amp-auto-ads
        v-if="isHydrated"
        type="adsense"
        :data-ad-client="adsConfig.client"
      />
      <!-- 添加错误展示区域(仅在开发环境) -->
      <div v-if="componentErrors.length && import.meta.env.DEV" class="error-container">
        <div v-for="(error, index) in componentErrors" :key="index" class="error-message">
          {{ error.message }}
        </div>
      </div>
      <header class="navbar">
        <div class="navbar-left">
          <a class="logo" href="/">
            <img src="/logo.png" alt="Cursor Tutorial">
          </a>
          <nav class="nav-links">
            <slot name="nav-links" />
          </nav>
        </div>
        <div class="navbar-right">
          <LanguageSwitcher />
          <div class="social-links">
            <slot name="social-links" />
          </div>
        </div>
      </header>

      <main class="main-content">
        <div class="content-container">
          <div class="ad-banner">
            <div :id="effectiveGateAd.containerId"></div>
          </div>
          <slot />
        </div>
      </main>

      <footer class="footer">
        <slot name="footer" />
      </footer>
    </div>
  </Layout>
</template>

<style>
@import './custom.css';

/* 基础布局样式 */
.theme-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.theme-container.is-hydrated {
  opacity: 1;
}

/* 内容区域样式 */
.content-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  flex: 1;
  position: relative;
  z-index: 1;
}

.ad-banner {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}

/* 导航栏样式 */
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 0.7rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo img {
  height: 2rem;
  width: auto;
}

/* 文档内容样式 */
:deep(.vp-doc) {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .content-container {
    padding: 0 1rem;
  }

  .navbar {
    padding: 0.5rem 1rem;
  }
}

/* 使用CSS变量设置固定宽度,避免动态计算 */
:root {
  --vp-layout-max-width: 1317px;
}

.vp-doc.container {
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
}

/* 错误消息样式 */
.error-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  max-width: 400px;
}

.error-message {
  background: #ff4444;
  color: white;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

/* 确保内容布局正确 */
.content-container {
  position: relative;
  z-index: 1;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .content-container {
    padding: 0 1rem;
  }
}
</style>
