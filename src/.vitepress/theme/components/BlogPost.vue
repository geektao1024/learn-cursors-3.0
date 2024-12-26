<script setup lang="ts">
import { useData } from 'vitepress'
import Giscus from './Giscus.vue'

const { frontmatter } = useData()
</script>

<template>
  <div class="blog-post">
    <article class="blog-post-content">
      <div class="blog-post-header">
        <h1 class="title">
          {{ frontmatter.title }}
        </h1>
        <div class="meta">
          <time :datetime="frontmatter.date">{{ frontmatter.date }}</time>
          <div v-if="frontmatter.tags" class="tags">
            <span v-for="tag in frontmatter.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
      <Content />
    </article>

    <!-- 广告区域 -->
    <div class="ad-container">
      <ClientOnly>
        <div id="container-b8386c573e08182e1305476b04b5e74e" />
      </ClientOnly>
    </div>

    <!-- 添加评论组件 -->
    <Giscus />
  </div>
</template>

<style scoped>
.blog-post {
  width: 100%;
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  padding: 0 24px;
}

.blog-post-content {
  margin-bottom: 2rem;
}

.blog-post-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  transition: all 0.2s ease;
}

.tag:hover {
  background-color: var(--vp-c-brand);
  color: white;
}

@media (max-width: 768px) {
  .blog-post {
    padding: 0 16px;
  }

  .title {
    font-size: 1.8rem;
  }

  .meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}

.ad-container {
  margin: 2rem 0;
  text-align: center;
}
</style>
