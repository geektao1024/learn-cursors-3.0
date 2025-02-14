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

// 初始化广告
function initAd() {
  // 如果组件已卸载，不再继续加载
  if (isComponentUnmounted.value)
    return

  if (retryCount.value >= 3)
    return // 最多重试3次

  try {
    // 确保在客户端环境
    if (typeof window === 'undefined')
      return

    // 确保 adsbygoogle 已经定义
    if (typeof window.adsbygoogle === 'undefined') {
      retryCount.value++
      setTimeout(initAd, 1000) // 1秒后重试
      return
    }

    // 清除现有广告
    if (adContainer.value) {
      adContainer.value.innerHTML = ''
    }

    // 创建广告容器
    const ins = document.createElement('ins')
    ins.className = 'adsbygoogle'
    ins.style.display = 'block'
    ins.setAttribute('data-ad-client', 'ca-pub-6152848695010247')
    ins.setAttribute('data-ad-format', 'auto')
    ins.setAttribute('data-full-width-responsive', 'true')

    // 添加到容器
    adContainer.value.appendChild(ins)

    // 推送广告
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      isAdLoaded.value = true
    }
    catch (error) {
      console.error('Ad push error:', error)
      isAdError.value = true
    }
  }
  catch (error) {
    console.error('Ad initialization error:', error)
    isAdError.value = true
    retryCount.value++
    setTimeout(initAd, 1000) // 1秒后重试
  }
}

// 组件挂载时初始化广告
onMounted(() => {
  if (isContentPage.value) {
    // 添加全局广告脚本
    const script = document.createElement('script')
    script.async = true
    script.crossOrigin = 'anonymous'
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6152848695010247'
    document.head.appendChild(script)

    nextTick(() => {
      initAd()
    })
  }
})

// 组件卸载时清理
onUnmounted(() => {
  isComponentUnmounted.value = true
})
</script>

<template>
  <div v-if="isContentPage" ref="adContainer" class="ad-container">
    <div v-if="isAdError" class="ad-error">
      <!-- 可以添加广告加载失败的提示或备用内容 -->
    </div>
  </div>
</template>

<style scoped>
.ad-container {
  margin: 20px 0;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ad-error {
  display: none;
}
</style>
