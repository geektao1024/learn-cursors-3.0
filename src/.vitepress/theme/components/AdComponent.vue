<!-- AdComponent.vue -->
<script setup>
import { useData } from 'vitepress'
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

const isAdLoaded = ref(false)
const isAdError = ref(false)
const retryCount = ref(0)
const adContainer = ref(null)
const { page } = useData()

// 用于跟踪组件是否已卸载
const isComponentUnmounted = ref(false)

// 判断是否为内容页面（除首页外的所有页面）
const isContentPage = computed(() => {
  // 排除首页
  return page.value.relativePath !== 'index.md'
    && page.value.relativePath !== ''
    && page.value.relativePath !== 'index'
})

// 防抖函数
function debounce(fn, delay) {
  let timer = null
  return (...args) => {
    if (timer)
      clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

// 初始化广告
function initAd() {
  // 如果组件已卸载，不再继续加载
  if (isComponentUnmounted.value)
    return

  if (retryCount.value >= 3)
    return // 最多重试3次

  try {
    // 确保 adsbygoogle 已经定义
    if (typeof window.adsbygoogle === 'undefined') {
      window.adsbygoogle = []
    }

    const adPromise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          // 如果组件已卸载，不执行广告加载
          if (isComponentUnmounted.value) {
            reject(new Error('Component unmounted'))
            return
          }

          // 使用 try-catch 包装广告加载
          try {
            await window.adsbygoogle.push({})
            resolve()
          }
          catch (err) {
            reject(err)
          }
        }
        catch (err) {
          reject(err)
        }
      }, 1000)
    })

    // 设置超时
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Ad load timeout'))
      }, 5000) // 5秒超时
    })

    // 使用 Promise.race 处理超时
    Promise.race([adPromise, timeoutPromise])
      .then(() => {
        if (!isComponentUnmounted.value) {
          isAdLoaded.value = true
          isAdError.value = false
        }
      })
      .catch((err) => {
        if (!isComponentUnmounted.value) {
          console.error('Ad loading error:', err)
          isAdError.value = true
          retryCount.value++

          // 重试间隔随重试次数增加
          const retryDelay = 1000 * (2 ** retryCount.value)
          setTimeout(() => !isComponentUnmounted.value && initAd(), retryDelay)
        }
      })
  }
  catch (err) {
    if (!isComponentUnmounted.value) {
      console.error('Ad initialization error:', err)
      isAdError.value = true
    }
  }
}

// 优化的广告加载处理
const handleAdIntersection = debounce((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !isAdLoaded.value && !isComponentUnmounted.value) {
      initAd()
    }
  })
}, 100) // 100ms 防抖

// 清理函数
function cleanup() {
  isComponentUnmounted.value = true
  if (adContainer.value) {
    try {
      // 尝试清理广告相关资源
      const adFrame = adContainer.value.querySelector('iframe')
      if (adFrame) {
        adFrame.remove()
      }
    }
    catch (err) {
      console.error('Ad cleanup error:', err)
    }
  }
}

onMounted(async () => {
  // 重置卸载标志
  isComponentUnmounted.value = false

  // 等待主要内容渲染完成
  await nextTick()

  // 使用 Intersection Observer 延迟加载广告
  const observer = new IntersectionObserver(handleAdIntersection, {
    threshold: 0.1,
    rootMargin: '50px', // 提前50px开始加载
  })

  if (adContainer.value) {
    observer.observe(adContainer.value)
  }

  // 注册清理函数
  onUnmounted(() => {
    cleanup()
    observer.disconnect()
  })
})
</script>

<template>
  <ClientOnly>
    <div
      v-show="isAdLoaded"
      ref="adContainer"
      class="ad-container"
      :class="{
        'content-page-ad': isContentPage,
        'ad-error': isAdError,
      }"
    >
      <div v-if="!isAdLoaded" class="ad-placeholder">
        <div class="ad-loading" />
      </div>
      <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-6152848695010247"
        data-ad-slot="your-ad-slot"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  </ClientOnly>
</template>

<style scoped>
.ad-container {
  min-height: 100px;
  position: relative;
  transition: all 0.3s ease;
}

/* 内容页面的广告样式 */
.content-page-ad {
  margin: 0.5rem 0;
  transition: opacity 0.3s ease;
}

.content-page-ad:hover {
  opacity: 0.95;
}

/* 加载占位符样式 */
.ad-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.ad-loading {
  width: 24px;
  height: 24px;
  border: 2px solid var(--vp-c-brand);
  border-radius: 50%;
  border-top-color: transparent;
  animation: ad-spin 1s linear infinite;
}

@keyframes ad-spin {
  to {
    transform: rotate(360deg);
  }
}

/* 错误状态样式 */
.ad-error {
  border: 1px solid var(--vp-c-danger);
  opacity: 0.8;
}

/* 响应式优化 */
@media (max-width: 1280px) {
  .content-page-ad {
    margin: 0.75rem 0;
  }
}

@media (max-width: 960px) {
  .content-page-ad {
    margin: 1rem 0;
  }
}

@media (max-width: 768px) {
  .content-page-ad {
    margin: 1rem 0;
  }

  .ad-container {
    min-height: 90px;
  }
}

@media (max-width: 480px) {
  .content-page-ad {
    margin: 0.75rem 0;
  }

  .ad-container {
    min-height: 80px;
  }
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .ad-placeholder {
    background: var(--vp-c-bg-soft);
  }

  .ad-loading {
    border-color: var(--vp-c-brand-dark);
    border-top-color: transparent;
  }
}

/* 打印样式优化 */
@media print {
  .ad-container {
    display: none !important;
  }
}
</style>
