<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// 声明 window.adsbygoogle 类型
declare global {
  interface Window {
    adsbygoogle: any[]
    adsenseInitialized?: boolean
    activeAdSlots?: Set<string>
    adsenseQueue?: Set<() => void>
  }
}

const props = defineProps({
  adSlot: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    default: 'auto',
  },
  responsive: {
    type: Boolean,
    default: true,
  },
  priority: {
    type: Number,
    default: 0,
  },
})

// 配置常量
const CONFIG = {
  DELAYS: {
    QUEUE_PROCESS: 3000, // 队列处理延迟
    INIT_TIMEOUT: 8000, // 初始化超时时间
    RETRY_INTERVAL: 500, // 重试间隔
    LOAD_OFFSET: 500, // 每个广告的加载偏移
  },
  OBSERVER: {
    threshold: 0.1,
    rootMargin: '100px', // 增加预加载距离
  },
} as const

// 广告配置常量
const ADSENSE_CONFIG = {
  client: 'ca-pub-6152848695010247',
  crossorigin: 'anonymous',
} as const

const isClient = ref(false)
const isLoaded = ref(false)
const hasError = ref(false)
const adContainer = ref<HTMLElement | null>(null)
let adInterval: NodeJS.Timeout | null = null
let observer: IntersectionObserver | null = null

// 检查广告位是否已存在
function checkAdSlotAvailable(slot: string): boolean {
  if (!window.activeAdSlots) {
    window.activeAdSlots = new Set()
  }
  if (window.activeAdSlots.has(slot)) {
    console.warn(`AdSense: 广告位 ${slot} 已经在使用中`)
    return false
  }
  window.activeAdSlots.add(slot)
  return true
}

// 释放广告位
function releaseAdSlot(slot: string) {
  window.activeAdSlots?.delete(slot)
}

// 初始化广告队列
function initAdsenseQueue() {
  if (!window.adsenseQueue) {
    window.adsenseQueue = new Set()
  }
}

// 添加到广告加载队列
function addToAdsenseQueue(callback: () => void) {
  initAdsenseQueue()
  window.adsenseQueue!.add(callback)
}

// 加载 AdSense 脚本
function loadAdSenseScript() {
  if (document.querySelector('script[src*="adsbygoogle"]')) {
    return Promise.resolve()
  }

  return new Promise<void>((resolve, reject) => {
    // 延迟脚本加载
    setTimeout(() => {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CONFIG.client}`
      script.crossOrigin = ADSENSE_CONFIG.crossorigin
      script.onload = () => {
        // 脚本加载完成后，延迟处理队列
        setTimeout(() => {
          processAdsenseQueue()
          resolve()
        }, CONFIG.DELAYS.QUEUE_PROCESS)
      }
      script.onerror = error => reject(error)
      document.head.appendChild(script)
    }, CONFIG.DELAYS.QUEUE_PROCESS)
  })
}

// 处理广告队列
function processAdsenseQueue() {
  if (!window.adsenseQueue)
    return

  // 将队列转换为数组并按优先级排序
  const sortedCallbacks = Array.from(window.adsenseQueue)
  window.adsenseQueue.clear()

  // 使用 requestIdleCallback 在空闲时间处理广告
  if (window.requestIdleCallback) {
    sortedCallbacks.forEach((callback, index) => {
      window.requestIdleCallback(
        () => {
          // 根据索引增加延迟
          setTimeout(callback, index * CONFIG.DELAYS.LOAD_OFFSET)
        },
        { timeout: CONFIG.DELAYS.INIT_TIMEOUT },
      )
    })
  }
  else {
    // 降级处理：使用 setTimeout 并错开时间
    sortedCallbacks.forEach((callback, index) => {
      setTimeout(
        callback,
        CONFIG.DELAYS.QUEUE_PROCESS + index * CONFIG.DELAYS.LOAD_OFFSET,
      )
    })
  }
}

onMounted(async () => {
  // 等待 DOM 完全加载
  await new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve(true)
    }
    else {
      window.addEventListener('load', () => resolve(true), { once: true })
    }
  })

  // 延迟初始化
  setTimeout(() => {
    isClient.value = true
    if (!checkAdSlotAvailable(props.adSlot)) {
      hasError.value = true
      return
    }

    const loadAd = () => {
      setupIntersectionObserver()
    }
    addToAdsenseQueue(loadAd)

    loadAdSenseScript().catch((error) => {
      console.error('Failed to load AdSense script:', error)
      hasError.value = true
    })
  }, CONFIG.DELAYS.QUEUE_PROCESS)
})

onUnmounted(() => {
  cleanup()
  releaseAdSlot(props.adSlot)
})

function setupIntersectionObserver() {
  if (!window.IntersectionObserver) {
    initializeAd()
    return
  }

  observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry.isIntersecting && !isLoaded.value && !hasError.value) {
      initializeAd()
      observer?.disconnect()
    }
  }, CONFIG.OBSERVER)

  if (adContainer.value) {
    observer.observe(adContainer.value)
  }
}

function initializeAd() {
  try {
    if (!window.adsenseInitialized) {
      window.adsenseInitialized = true
    }

    if (window.adsbygoogle) {
      window.adsbygoogle.push({})
      isLoaded.value = true
    }
    else {
      adInterval = setInterval(() => {
        if (window.adsbygoogle) {
          window.adsbygoogle.push({})
          isLoaded.value = true
          cleanup()
        }
      }, CONFIG.DELAYS.RETRY_INTERVAL)

      setTimeout(() => {
        if (!isLoaded.value) {
          cleanup()
          hasError.value = true
          console.warn('AdSense initialization timeout')
        }
      }, CONFIG.DELAYS.INIT_TIMEOUT)
    }
  }
  catch (error) {
    console.error('AdSense error:', error)
    hasError.value = true
    cleanup()
  }
}

function cleanup() {
  if (adInterval) {
    clearInterval(adInterval)
    adInterval = null
  }
  if (observer) {
    observer.disconnect()
    observer = null
  }
}
</script>

<template>
  <ClientOnly>
    <div
      v-if="isClient && !hasError"
      ref="adContainer"
      class="ad-container"
      :class="{ 'ad-loaded': isLoaded }"
    >
      <ins
        class="adsbygoogle"
        :style="{ display: 'block' }"
        :data-ad-client="ADSENSE_CONFIG.client"
        :data-ad-slot="adSlot"
        :data-ad-format="format"
        :data-full-width-responsive="responsive"
      />
    </div>
  </ClientOnly>
</template>

<style scoped>
.ad-container {
  margin: 1em 0;
  min-height: 280px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--vp-c-bg-soft);
  transition: all 0.5s ease;
  opacity: 0;
  will-change: opacity;
}

.ad-loaded {
  opacity: 1;
}

.adsbygoogle {
  width: 100%;
  min-height: inherit;
  display: block !important;
}
</style>
