<!-- 基础广告组件 -->
<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  try {
    // @ts-expect-error: AdSense global object
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }
  catch (error) {
    console.error('AdSense error:', error)
  }
})
</script>

<template>
  <ClientOnly>
    <div class="google-ad">
      <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-6152848695010247"
        data-ad-slot="5887104144"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  </ClientOnly>
</template>

<style scoped>
.google-ad {
  display: block;
  text-align: center;
  margin: 2rem 0;
  min-height: 280px;
  background: transparent;
}

.google-ad ins {
  background: transparent;
}
</style>
