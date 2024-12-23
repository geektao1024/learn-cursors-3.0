<script setup lang="ts">
import { useRouter } from 'vue-router'

const heroContent = {
  title: 'Cursor 快捷键',
  description: '提升效率的键盘快捷键速查表，让你的编程更加高效流畅',
  ctaText: '探索快捷键',
}

const router = useRouter()

function navigateToShortcuts() {
  router.push('/translators/')
}
</script>

<template>
  <div class="cursor-shortcuts-hero">
    <div class="hero-content">
      <h1>{{ heroContent.title }}</h1>
      <p>{{ heroContent.description }}</p>
      <button
        class="cta-button"
        @click="navigateToShortcuts"
      >
        {{ heroContent.ctaText }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.cursor-shortcuts-hero {
  @apply flex items-center justify-center py-16 bg-gradient-to-r from-blue-50 to-indigo-100;
}

.hero-content {
  @apply text-center max-w-2xl;
}

h1 {
  @apply text-4xl font-bold text-gray-800 mb-4;
}

p {
  @apply text-xl text-gray-600 mb-8;
}

.cta-button {
  @apply px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer;
}
</style>
