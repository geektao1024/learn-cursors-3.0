<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import GoogleAdsense from './GoogleAdsense.vue'

// 配置常量
const CONFIG = {
  DELAYS: {
    CONTAINER_INIT: 3000, // 容器初始化延迟
    HYDRATION_WAIT: 1000, // 水合完成后等待时间
    IDLE_TIMEOUT: 5000, // requestIdleCallback 超时
  },
} as const

// 广告位配置
const AD_SLOTS = {
  top: {
    id: '7259884977',
    priority: 0, // 顶部广告优先加载
  },
  sidebar: {
    id: '7259884977',
    priority: 1, // 侧边栏次要加载
  },
  bottom: {
    id: '7259884977',
    priority: 2, // 底部最后加载
  },
} as const

const isReady = ref(false)
let initTimeout: NodeJS.Timeout | null = null

// 控制广告位置的显示
const showTopAd = ref(true)
const showSidebarAd = ref(true)
const showBottomAd = ref(true)

// 检查视窗大小，决定是否显示某些广告
function checkViewport() {
  const width = window.innerWidth
  showSidebarAd.value = width >= 1200
  showTopAd.value = width >= 768
}

// 防抖函数
function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null
  return function (this: any, ...args: Parameters<T>) {
    if (timer)
      clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

// 防抖处理的视窗检查
const debouncedCheckViewport = debounce(checkViewport, 200)

// 初始化广告容器
function initializeContainer() {
  // 等待页面完全加载和水合完成
  if (document.readyState === 'complete') {
    setTimeout(() => {
      isReady.value = true
      checkViewport()
    }, CONFIG.DELAYS.HYDRATION_WAIT)
  }
  else {
    window.addEventListener('load', () => {
      setTimeout(() => {
        isReady.value = true
        checkViewport()
      }, CONFIG.DELAYS.HYDRATION_WAIT)
    })
  }
}

onMounted(() => {
  // 初始检查视窗大小
  checkViewport()

  // 延迟初始化
  setTimeout(() => {
    // 使用 requestIdleCallback 在浏览器空闲时初始化广告
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        initializeContainer()
      }, { timeout: CONFIG.DELAYS.IDLE_TIMEOUT })
    }
    else {
      // 降级处理：使用 setTimeout
      initTimeout = setTimeout(() => {
        initializeContainer()
      }, CONFIG.DELAYS.CONTAINER_INIT)
    }
  }, CONFIG.DELAYS.CONTAINER_INIT)

  // 添加视窗大小变化监听
  window.addEventListener('resize', debouncedCheckViewport)
})

onUnmounted(() => {
  if (initTimeout) {
    clearTimeout(initTimeout)
  }
  window.removeEventListener('resize', debouncedCheckViewport)
})
</script>

<template>
  <div class="global-ad-container">
    <ClientOnly>
      <template v-if="isReady">
        <!-- 顶部广告位 -->
        <div v-if="showTopAd" class="ad-slot top-ad">
          <GoogleAdsense
            :ad-slot="AD_SLOTS.top.id"
            :priority="AD_SLOTS.top.priority"
          />
        </div>

        <!-- 侧边栏广告位 -->
        <Transition name="fade">
          <div v-if="showSidebarAd" class="ad-slot sidebar-ad">
            <GoogleAdsense
              :ad-slot="AD_SLOTS.sidebar.id"
              :priority="AD_SLOTS.sidebar.priority"
              format="vertical"
            />
          </div>
        </Transition>

        <!-- 底部广告位 -->
        <div v-if="showBottomAd" class="ad-slot bottom-ad">
          <GoogleAdsense
            :ad-slot="AD_SLOTS.bottom.id"
            :priority="AD_SLOTS.bottom.priority"
          />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
.global-ad-container {
  position: relative;
  width: 100%;
  z-index: 1;
}

.ad-slot {
  margin: 2rem 0;
  transition: opacity 0.5s ease;
}

.top-ad {
  position: relative;
  width: 100%;
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}

.sidebar-ad {
  position: fixed;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  z-index: 10;
}

.bottom-ad {
  width: 100%;
  max-width: var(--vp-layout-max-width);
  margin: 2rem auto;
  padding: 0 1.5rem;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1200px) {
  .sidebar-ad {
    display: none;
  }
}

@media (max-width: 768px) {
  .top-ad {
    padding: 0 1rem;
  }

  .bottom-ad {
    padding: 0 1rem;
  }
}
</style>
