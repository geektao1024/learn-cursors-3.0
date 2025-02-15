<script setup lang="ts">
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, onBeforeMount, onErrorCaptured, onMounted, onUpdated, ref, watch } from 'vue'
import { adsConfig } from '../config/ads.config'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import { useHydration } from './utils/hydration'
import { logger } from './utils/logger'
import './custom.css'

const { Layout } = DefaultTheme
const { isHydrated } = useHydration()
const route = useRoute()
const componentErrors = ref<Error[]>([])

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
</script>

<template>
  <Layout>
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
