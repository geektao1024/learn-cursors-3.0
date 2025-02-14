<!-- AdComponent.vue -->
<script setup>
import { useData } from 'vitepress'
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

const isAdLoaded = ref(false)
const isAdError = ref(false)
const retryCount = ref(0)
const adContainer = ref(null)
const isVisible = ref(false)
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
  if (isComponentUnmounted.value || !isVisible.value)
    return

  // 使用 requestAnimationFrame 确保DOM更新完成
  requestAnimationFrame(() => {
    if (retryCount.value >= 3)
      return

    try {
      if (typeof window === 'undefined')
        return

      // 预检查广告脚本是否已加载
      if (typeof window.adsbygoogle === 'undefined') {
        retryCount.value++
        setTimeout(initAd, 1000)
        return
      }

      // 清除现有内容
      if (adContainer.value) {
        adContainer.value.innerHTML = ''

        // 添加占位元素
        const placeholder = document.createElement('div')
        placeholder.className = 'ad-placeholder'
        adContainer.value.appendChild(placeholder)

        // 监听广告加载
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
              placeholder.remove()
              observer.disconnect()
            }
          })
        })

        observer.observe(adContainer.value, { childList: true, subtree: true })
      }

      // 创建广告实例
      const ins = document.createElement('ins')
      ins.className = 'adsbygoogle'
      ins.style.display = 'none' // 初始隐藏
      ins.setAttribute('data-ad-client', 'ca-pub-6152848695010247')
      ins.setAttribute('data-ad-format', 'auto')
      ins.setAttribute('data-full-width-responsive', 'true')

      adContainer.value.appendChild(ins)

      // 广告加载完成后显示
      ;(window.adsbygoogle = window.adsbygoogle || []).push({
        callback: () => {
          ins.style.display = 'block'
          isAdLoaded.value = true
        },
      })
    }
    catch (error) {
      console.error('Ad initialization error:', error)
      isAdError.value = true
      retryCount.value++
      setTimeout(initAd, 1000)
    }
  })
}

// 组件挂载时初始化广告
onMounted(() => {
  if (isContentPage.value && typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          initAd()
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px', // 提前50px开始加载
        threshold: 0,
      },
    )

    if (adContainer.value) {
      observer.observe(adContainer.value)
    }
  }
})

// 组件卸载时清理
onUnmounted(() => {
  isComponentUnmounted.value = true
})
</script>

<template>
  <div v-if="isContentPage" ref="adContainer" class="ad-container">
    <div v-if="!isAdLoaded && !isAdError" class="ad-placeholder">
      <!-- 占位内容 -->
    </div>
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

.ad-placeholder {
  width: 100%;
  height: 100px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.ad-error {
  display: none;
}
</style>
