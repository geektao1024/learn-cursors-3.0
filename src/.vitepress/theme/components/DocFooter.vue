<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import Giscus from './Giscus.vue'

const { page } = useData()

// 检查是否是文章页面（不是首页或列表页）
const isArticlePage = computed(() => {
  const path = page.value.relativePath
  // Check if it's not an index page
  const isNotIndex = !path.endsWith('index.md') && path !== 'index.md' && path !== ''
  // Check if it's in wiki, docs-zh, or blog sections
  const isContentSection = path.startsWith('wiki/') || path.startsWith('docs-zh/') || path.startsWith('blog/')
  return isNotIndex && isContentSection
})
</script>

<template>
  <div v-if="isArticlePage" class="doc-footer">
    <Giscus />
  </div>
</template>

<style scoped>
.doc-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}
</style>
