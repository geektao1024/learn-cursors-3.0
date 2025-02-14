<!-- AdComponent.vue -->
<script setup>
import { nextTick, onMounted } from 'vue'

onMounted(async () => {
  // 等待下一个tick确保hydration完成
  await nextTick()
  // 额外添加一个小延迟确保DOM完全稳定
  setTimeout(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    }
    catch (err) {
      console.error('Ad loading error:', err)
    }
  }, 500)
})
</script>

<template>
  <ClientOnly>
    <div class="ad-container">
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
}
</style>
