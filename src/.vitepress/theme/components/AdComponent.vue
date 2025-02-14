<!-- AdComponent.vue -->
<script setup>
import { nextTick, onMounted, ref } from 'vue'

const isAdLoaded = ref(false)
const adContainer = ref(null)

onMounted(async () => {
  // 等待主要内容渲染完成
  await nextTick()

  // 使用 Intersection Observer 延迟加载广告
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isAdLoaded.value) {
        isAdLoaded.value = true
        // 延迟初始化广告
        setTimeout(() => {
          try {
            ;(window.adsbygoogle = window.adsbygoogle || []).push({})
          }
          catch (err) {
            console.error('Ad loading error:', err)
          }
        }, 1000) // 延迟1秒加载广告
        observer.disconnect()
      }
    })
  }, {
    threshold: 0.1,
  })

  if (adContainer.value) {
    observer.observe(adContainer.value)
  }
})
</script>

<template>
  <ClientOnly>
    <div v-show="isAdLoaded" ref="adContainer" class="ad-container">
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
  margin: 1rem 0;
  min-height: 100px;
}
</style>
