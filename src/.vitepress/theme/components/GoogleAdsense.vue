<!--
  This component is responsible for displaying Google AdSense ads.
  It provides a simple container for ad units.
-->
<script setup lang="ts">
// 广告配置
defineProps<{
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  slot?: string
}>()
</script>

<template>
  <div class="google-adsense-container">
    <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-6152848695010247"
      :data-ad-slot="slot"
      :data-ad-format="format"
      data-full-width-responsive="true"
    />
    <script>
      (adsbygoogle = window.adsbygoogle || []).push({})
    </script>
  </div>
</template>

<style scoped>
.google-adsense-container {
  display: block;
  text-align: center;
  margin: 1rem 0;
  overflow: hidden;
}

.adsbygoogle {
  display: block;
  margin: 0 auto;
}
</style>
