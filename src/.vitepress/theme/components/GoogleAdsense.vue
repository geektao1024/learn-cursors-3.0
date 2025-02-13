<!--
  This component is responsible for loading Google Adsense script and initializing ad units.
  It uses composition API for better organization and reusability.
-->
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

// 广告配置
const props = withDefaults(defineProps<{
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  responsive?: boolean
  slot?: string
  lazyLoad?: boolean // 是否延迟加载
  timeout?: number // 加载超时时间
}>(), {
  format: 'auto',
  responsive: true,
  slot: 'auto',
  lazyLoad: true,
  timeout: 3000,
})

// 广告状态
const adContainer = ref<HTMLDivElement | null>(null)
const isLoaded = ref(false)
const error = ref<Error | null>(null)
const isVisible = ref(false)

// 创建广告单元
function createAdUnit() {
  if (!adContainer.value || isLoaded.value)
    return

  try {
    const ins = document.createElement('ins')
    ins.className = 'adsbygoogle'
    ins.style.display = 'block'

    // 设置广告属性
    Object.assign(ins.dataset, {
      adClient: 'ca-pub-6152848695010247',
      adSlot: props.slot,
      adFormat: props.format,
      fullWidthResponsive: props.responsive ? 'true' : 'false',
    })

    // 清空容器并添加新广告
    adContainer.value.innerHTML = ''
    adContainer.value.appendChild(ins)

    // 使用 requestIdleCallback 在空闲时初始化广告
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        initAd()
      }, { timeout: props.timeout })
    }
    else {
      // 降级处理
      setTimeout(initAd, 100)
    }
  }
  catch (err) {
    error.value = err as Error
    console.error('Failed to create ad unit:', err)
  }
}

// 初始化广告
function initAd() {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
    isLoaded.value = true
  }
  catch (err) {
    error.value = err as Error
    console.error('Failed to initialize ad:', err)
  }
}

// 加载广告脚本
function loadAdScript() {
  return new Promise<void>((resolve, reject) => {
    // 检查是否已加载
    if (document.querySelector('script[src*="adsbygoogle"]')) {
      resolve()
      return
    }

    // 设置加载超时
    const timeoutId = setTimeout(() => {
      reject(new Error('Ad script load timeout'))
    }, props.timeout)

    const script = document.createElement('script')
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6152848695010247'
    script.async = true
    script.crossOrigin = 'anonymous'

    script.onload = () => {
      clearTimeout(timeoutId)
      resolve()
    }

    script.onerror = (err) => {
      clearTimeout(timeoutId)
      reject(err)
    }

    // 使用 requestIdleCallback 在空闲时加载脚本
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        document.head.appendChild(script)
      }, { timeout: props.timeout })
    }
    else {
      document.head.appendChild(script)
    }
  })
}

// 加载广告
async function loadAd() {
  if (isLoaded.value)
    return

  try {
    await loadAdScript()
    createAdUnit()
  }
  catch (err) {
    error.value = err as Error
    console.error('Failed to load ad:', err)
  }
}

// 组件挂载
onMounted(() => {
  if (typeof window === 'undefined')
    return

  if (props.lazyLoad) {
    // 添加交叉观察器
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true
        loadAd()
        observer.disconnect()
      }
    }, {
      threshold: 0.1,
    })

    if (adContainer.value) {
      observer.observe(adContainer.value)
    }
  }
  else {
    // 直接加载
    loadAd()
  }
})

// 组件卸载
onUnmounted(() => {
  if (adContainer.value) {
    adContainer.value.innerHTML = ''
  }
})
</script>

<template>
  <div ref="adContainer" class="google-adsense-container">
    <div v-if="error" class="ad-error">
      <!-- 错误时不显示任何内容，确保不影响页面布局 -->
    </div>
    <div v-else-if="!isLoaded" class="ad-placeholder">
      <!-- 可选的占位内容 -->
    </div>
  </div>
</template>

<style scoped>
.google-adsense-container {
  display: block;
  text-align: center;
  min-height: 100px;
  margin: 1rem 0;
  overflow: hidden;
  transition: height 0.3s ease;
}

.adsbygoogle {
  display: block;
  margin: 0 auto;
}

.ad-error {
  display: none;
}

.ad-placeholder {
  height: 0;
  opacity: 0;
}

/* 当广告加载时的样式 */
.google-adsense-container:has(.adsbygoogle[data-ad-status='filled']) {
  height: auto;
}
</style>

<style>
/* 全局样式，处理广告加载状态 */
.adsbygoogle[data-ad-status='unfilled'] {
  display: none !important;
}
</style>
