<!-- AMP广告组件 -->
<script setup lang="ts">
// AMP广告配置
defineProps<{
  type?: string
  slot?: string
}>()
</script>

<template>
  <amp-auto-ads
    type="adsense"
    data-ad-client="ca-pub-6152848695010247"
    :data-ad-slot="slot"
  />
</template>

<style scoped>
amp-auto-ads {
  display: block;
  margin: 1rem 0;
}
</style>
