<!--
  This component is responsible for loading Google Adsense script.
  It uses onMounted to ensure the script is only loaded on the client side.
-->
<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // Only load the script if it hasn't been loaded yet
  if (!document.querySelector('script[src*="adsbygoogle"]')) {
    const script = document.createElement('script')
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6152848695010247'
    script.async = true
    script.crossOrigin = 'anonymous'
    document.head.appendChild(script)
  }
})
</script>

<template>
  <!-- This component doesn't render anything visible -->
  <div class="google-adsense" />
</template>
