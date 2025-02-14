<!-- 广告组件 -->
<script setup lang="ts">
import { useRoute } from 'vitepress'
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'

const props = defineProps<{
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: boolean
}>()

const route = useRoute()

let adsbygoogle: any

function initAd() {
  try {
    if (typeof window === 'undefined')
      return

    // 确保 adsbygoogle 已加载
    adsbygoogle = (window as any).adsbygoogle || []

    const adElement = document.getElementById(props.adSlot)
    if (!adElement)
      return

    // 配置广告单元
    const adUnit = document.createElement('ins')
    adUnit.className = 'adsbygoogle'
    adUnit.style.display = 'block'
    adUnit.setAttribute('data-ad-client', 'ca-pub-6152848695010247')
    adUnit.setAttribute('data-ad-slot', props.adSlot)

    if (props.adFormat) {
      adUnit.setAttribute('data-ad-format', props.adFormat)
    }

    if (props.fullWidthResponsive) {
      adUnit.setAttribute('data-full-width-responsive', 'true')
    }

    // 清空现有内容并插入新广告单元
    adElement.innerHTML = ''
    adElement.appendChild(adUnit)

    // 推送广告请求
    adsbygoogle.push({})
  }
  catch (error) {
    console.error('Failed to initialize Google Ad:', error)
  }
}

// 加载广告脚本
function loadAdScript() {
  if (document.querySelector('script[src*="adsbygoogle"]'))
    return

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6152848695010247'
  script.crossOrigin = 'anonymous'
  document.head.appendChild(script)
}

onMounted(() => {
  loadAdScript()
  initAd()
})

// 路由变化时重新初始化广告
watch(() => route.path, () => {
  nextTick(() => {
    initAd()
  })
})

onBeforeUnmount(() => {
  const adElement = document.getElementById(props.adSlot)
  if (adElement) {
    adElement.innerHTML = ''
  }
})
</script>

<template>
  <div :id="adSlot" class="google-ad" />
</template>

<style scoped>
.google-ad {
  display: block;
  text-align: center;
  margin: 1rem auto;
}
</style>
