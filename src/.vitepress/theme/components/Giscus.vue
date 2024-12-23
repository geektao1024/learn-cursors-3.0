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
      repo="geektao1024/learn-cursors-3.0"
      repo-id="R_kgDOMwn2tg"
      category="Ideas"
      category-id="DIC_kwDOMwn2ts4Cld08"
      mapping="pathname"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="bottom"
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
