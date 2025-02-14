<!-- 广告组件 -->
<script setup lang="ts">
import { useData } from 'vitepress'
import { onMounted, onUnmounted, ref } from 'vue'

// 声明全局类型
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

const props = defineProps<{
  adSlot?: 'content' | 'sidebar'
}>()

const { isDark } = useData()
const adComponent = ref<HTMLElement | null>(null)
const isClient = typeof window !== 'undefined'
const isProduction = process.env.NODE_ENV === 'production'
const isLoaded = ref(false)

// 广告配置
const adConfig = {
  'data-ad-client': 'ca-pub-6152848695010247',
  'data-ad-slot': props.adSlot === 'sidebar' ? '5887104144' : '5887104144',
  'data-ad-format': props.adSlot === 'sidebar' ? 'vertical' : 'auto',
  'data-full-width-responsive': props.adSlot === 'sidebar' ? 'false' : 'true',
}

// 检查广告脚本是否加载
function checkAdScript(): Promise<void> {
  return new Promise((resolve) => {
    if (window.adsbygoogle) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6152848695010247'
    script.crossOrigin = 'anonymous'
    script.onload = () => resolve()
    document.head.appendChild(script)
  })
}

// 初始化广告
async function initAd() {
  if (!isClient || !isProduction || isLoaded.value)
    return

  try {
    await checkAdScript()
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    isLoaded.value = true
  }
  catch (error) {
    console.error('AdSense error:', error)
  }
}

// 重新加载广告
async function reloadAd() {
  if (!adComponent.value)
    return

  isLoaded.value = false

  // 清除现有广告
  adComponent.value.innerHTML = ''

  // 创建新的广告容器
  const ins = document.createElement('ins')
  ins.className = 'adsbygoogle'
  ins.style.display = 'block'
  Object.entries(adConfig).forEach(([key, value]) => {
    ins.setAttribute(key, value)
  })

  // 添加到 DOM
  adComponent.value.appendChild(ins)

  // 初始化新广告
  await initAd()
}

// 监听主题变化
let observer: MutationObserver | null = null
onMounted(async () => {
  if (!isClient || !isProduction)
    return

  // 初始化广告
  await initAd()

  // 监听主题变化，重新加载广告
  observer = new MutationObserver(async () => {
    await reloadAd()
  })

  const html = document.documentElement
  observer.observe(html, {
    attributes: true,
    attributeFilter: ['class'],
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <ClientOnly>
    <div v-if="isProduction" ref="adComponent" class="google-ad" :class="[`google-ad-${adSlot || 'content'}`]">
      <div v-if="!isLoaded" class="ad-placeholder">
        <div class="ad-loading">
          广告加载中...
        </div>
      </div>
      <ins
        v-show="isLoaded"
        class="adsbygoogle"
        style="display:block"
        v-bind="adConfig"
      />
    </div>
  </ClientOnly>
</template>

<style scoped>
.google-ad {
  display: block;
  text-align: center;
  margin: 2rem 0;
  padding: 1rem;
  background: v-bind('isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"');
  border-radius: 8px;
  transition: background-color 0.3s ease;
  position: relative;
}

.ad-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: v-bind('isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"');
}

.ad-loading {
  font-size: 0.9rem;
  color: v-bind('isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)"');
}

.google-ad-content {
  min-height: 280px;
}

.google-ad-sidebar {
  min-height: 600px;
  width: 300px;
}

.google-ad ins {
  background: transparent;
}

@media (max-width: 768px) {
  .google-ad-content {
    margin: 1rem 0;
    min-height: 200px;
  }

  .google-ad-sidebar {
    display: none;
  }
}
</style>
