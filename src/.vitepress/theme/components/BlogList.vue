<script setup lang="ts">
import type { Post } from '../../../blog/data'
import { useData, withBase } from 'vitepress'
import { computed, ref, watchEffect } from 'vue'
import { data as zhPosts } from '../../../blog/data'
import { data as enPosts } from '../../../en/blog/data'
import { data as jaPosts } from '../../../ja/blog/data'

const { lang } = useData()
const allPosts = ref<Post[]>([])

// 根据语言加载博客数据
watchEffect(() => {
  switch (lang.value) {
    case 'ja':
      allPosts.value = jaPosts
      break
    case 'en':
      allPosts.value = enPosts
      break
    default:
      allPosts.value = zhPosts
  }
})

// 获取当前语言的文章
const currentPosts = computed(() => {
  return allPosts.value
})

// 格式化日期
function getDateTime(time: number) {
  return new Date(time).toLocaleString(lang.value === 'ja' ? 'ja-JP' : lang.value === 'en' ? 'en-US' : 'zh')
}

// 获取文章URL
function getPostUrl(url: string) {
  return withBase(url)
}

// 从文章数据中统计标签
const tags = computed(() => {
  // 首先创建一个包含所有文章的标签
  const allTags = new Map()
  const tagLabel = lang.value === 'ja' ? '全ての記事' : lang.value === 'en' ? 'All Posts' : '所有文章'
  allTags.set(tagLabel, currentPosts.value.length)

  // 遍历所有文章，统计每个标签的数量
  currentPosts.value.forEach((post) => {
    const postTags = post.tags || []
    postTags.forEach((tag) => {
      const tagName = tag.toUpperCase()
      const currentCount = allTags.get(tagName) || 0
      allTags.set(tagName, currentCount + 1)
    })
  })

  // 转换为数组格式并排序
  const sortedTags = Array.from(allTags.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      // "所有文章" 始终排在第一位
      if (a.name === tagLabel)
        return -1
      if (b.name === tagLabel)
        return 1
      // 其他标签按数量降序排序
      return b.count - a.count
    })

  return sortedTags
})

// 当前选中的标签
const selectedTag = ref(lang.value === 'ja' ? '全ての記事' : lang.value === 'en' ? 'All Posts' : '所有文章')

// 根据标签筛选文章
const filteredPosts = computed(() => {
  const tagLabel = lang.value === 'ja' ? '全ての記事' : lang.value === 'en' ? 'All Posts' : '所有文章'
  if (selectedTag.value === tagLabel)
    return currentPosts.value
  return currentPosts.value.filter((post) => {
    const postTags = post.tags || []
    return postTags.map(tag => tag.toUpperCase()).includes(selectedTag.value)
  })
})

// 分页相关
const pageSize = 10 // 每页显示10篇文章
const currentPage = ref(1)

// 当标签改变时，重置页码
watchEffect(() => {
  const _ = selectedTag.value // 监听标签变化
  currentPage.value = 1
})

// 分页后的文章列表
const paginatedPosts = computed(() => {
  const posts = filteredPosts.value
  const start = (currentPage.value - 1) * pageSize
  const end = Math.min(start + pageSize, posts.length)
  return posts.slice(start, end)
})

// 总页数
const totalPages = computed(() => Math.max(1, Math.ceil(filteredPosts.value.length / pageSize)))

// 页码导航
function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // 平滑滚动到顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}
</script>

<template>
  <div class="blog-container">
    <div class="blog-hero">
      <h1>{{ lang === 'ja' ? 'ブログ' : lang === 'en' ? 'Blog' : '博客' }}</h1>
      <p class="description">
        {{ lang === 'ja' ? 'Cursor AI の使用方法と最新情報を共有'
          : lang === 'en' ? 'Share Cursor AI tips and updates'
            : '分享 Cursor AI 使用技巧和最新动态' }}
      </p>
    </div>

    <div class="blog-content">
      <!-- 左侧标签栏 -->
      <aside class="blog-sidebar">
        <h2 class="sidebar-title">
          {{ lang === 'ja' ? '全ての記事' : lang === 'en' ? 'All Posts' : '所有文章' }}
        </h2>
        <ul class="tag-list">
          <li v-for="tag in tags" :key="tag.name" class="tag-item">
            <a
              href="#"
              class="tag-link"
              :class="{ active: selectedTag === tag.name }"
              @click.prevent="selectedTag = tag.name"
            >
              {{ tag.name }}
              <span class="tag-count">({{ tag.count }})</span>
            </a>
          </li>
        </ul>
      </aside>

      <!-- 右侧文章列表 -->
      <div class="blog-list-wrapper">
        <div v-if="paginatedPosts.length !== 0" class="blog-list">
          <div v-for="post in paginatedPosts" :key="post.url" class="blog-item">
            <h2 class="blog-title">
              <a :href="getPostUrl(post.url)">{{ post.title }}</a>
            </h2>
            <div class="blog-meta">
              <span class="blog-date">{{ getDateTime(post.date.time) }}</span>
              <span v-if="post.tags && post.tags.length" class="blog-tags">
                <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
              </span>
            </div>
            <p v-if="post.description" class="blog-description">
              {{ post.description }}
            </p>
          </div>
        </div>

        <el-empty v-else :description="lang === 'ja' ? 'コンテンツがありません' : lang === 'en' ? 'No content' : '暂无内容'" />

        <!-- 分页导航 -->
        <div v-if="totalPages > 1" class="pagination">
          <button
            class="page-btn"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            {{ lang === 'ja' ? '前のページ' : lang === 'en' ? 'Previous' : '上一页' }}
          </button>
          <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
          <button
            class="page-btn"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            {{ lang === 'ja' ? '次のページ' : lang === 'en' ? 'Next' : '下一页' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 容器布局 */
.blog-container {
  width: 100%;
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
  min-height: calc(100vh - var(--vp-nav-height) - var(--vp-layout-top-height, 0px));
}

/* 头部样式 */
.blog-hero {
  text-align: center;
  margin-bottom: 3rem;
}

.blog-hero h1 {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.blog-hero .description {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
}

/* 内容区布局 */
.blog-content {
  display: flex;
  gap: 3rem;
  position: relative;
}

/* 侧边栏样式 */
.blog-sidebar {
  position: sticky;
  top: calc(var(--vp-nav-height) + 2rem);
  flex: 0 0 240px;
  height: fit-content;
  padding-right: 24px;
  border-right: 1px solid var(--vp-c-divider);
  overflow-y: auto;
  max-height: calc(100vh - var(--vp-nav-height) - 4rem);
}

.sidebar-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.tag-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tag-item {
  margin-bottom: 0.5rem;
}

.tag-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.tag-link:hover:not(.active) {
  background-color: var(--vp-c-bg-soft);
}

.tag-link.active {
  background-color: var(--vp-c-brand);
  color: white;
}

.tag-count {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.tag-link.active .tag-count {
  color: rgba(255, 255, 255, 0.8);
}

/* 文章列表样式 */
.blog-list-wrapper {
  flex: 1;
  min-width: 0;
}

.blog-list {
  padding: 2rem 0;
}

.blog-item {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.blog-item:last-child {
  border-bottom: none;
}

.blog-title {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  line-height: 1.4;
}

.blog-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s;
}

.blog-title a:hover {
  color: var(--vp-c-brand);
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.blog-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}

.blog-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem 0;
}

.page-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

/* 响应式布局 */
@media (max-width: 1280px) {
  .blog-container {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 960px) {
  .blog-container {
    padding: 1.5rem;
  }

  .blog-content {
    flex-direction: column;
    gap: 2rem;
  }

  .blog-sidebar {
    position: static;
    flex: none;
    width: 100%;
    max-width: 100%;
    padding: 0 0 1.5rem;
    margin-bottom: 1.5rem;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
    max-height: none;
    overflow: visible;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag-item {
    margin: 0;
  }

  .tag-link {
    padding: 0.25rem 0.75rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .blog-container {
    padding: 1rem;
  }

  .blog-hero {
    margin-bottom: 2rem;
  }

  .blog-hero h1 {
    font-size: 1.75rem;
  }

  .blog-item {
    padding: 1rem;
  }

  .blog-item .blog-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .blog-item .blog-tags {
    width: 100%;
  }
}

/* 深色模式调整 */
:root.dark .blog-item {
  background-color: var(--vp-c-bg-soft);
}

:root.dark .tag-link:hover:not(.active) {
  background-color: var(--vp-c-bg-mute);
}
</style>
