<script setup lang="ts">
import Giscus from '@giscus/vue'
import { useData } from 'vitepress'

const { frontmatter, title, isDark } = useData()
</script>

<template>
  <div
    v-if="frontmatter.comments !== false"
    :key="title"
    class="comments-container"
  >
    <Giscus
      id="comments"
      repo="your-repo/cursor-tutorial"
      repo-id="R_xxx"
      category="Comments"
      category-id="DIC_xxx"
      mapping="pathname"
      strict="1"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      :theme="isDark ? 'transparent_dark' : 'light'"
      lang="zh-CN"
      loading="lazy"
    />
  </div>
</template>

<style>
.comments-container {
  margin-top: 5rem;
}
</style>
