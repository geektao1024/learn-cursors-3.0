<script setup lang="ts">
import { onMounted } from 'vue'

// 声明 window.adsbygoogle 类型
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

defineProps({
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
})

onMounted(() => {
  try {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }
  catch (error) {
    console.error('AdSense error:', error)
  }
})
</script>

<template>
  <div class="ad-container">
    <ins
      class="adsbygoogle"
      :style="{ display: 'block' }"
      data-ad-client="ca-pub-6152848695010247"
      :data-ad-slot="adSlot"
      :data-ad-format="format"
      :data-full-width-responsive="responsive"
    />
  </div>
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
  transition: background-color 0.5s ease;
}

.adsbygoogle {
  width: 100%;
  min-height: inherit;
}
</style>
