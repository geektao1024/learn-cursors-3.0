<script setup lang="ts">
import { withBase } from 'vitepress'
import { computed, ref } from 'vue'
import { data as posts } from '../../../.vitepress/data/blog.data'

function getDateTime(time: number) {
  return new Date(time).toLocaleString('zh-CN')
}

function getPostUrl(url: string) {
  return withBase(url)
}

// 从文章数据中统计标签
const tags = computed(() => {
  // 首先创建一个包含所有文章的标签
  const allTags = new Map()
  allTags.set('所有文章', posts.length)

  // 遍历所有文章，统计每个标签的数量
  posts.forEach((post) => {
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
      if (a.name === '所有文章')
        return -1
      if (b.name === '所有文章')
        return 1
      // 其他标签按数量降序排序
      return b.count - a.count
    })

  return sortedTags
})

// 当前选中的标签
const selectedTag = ref('所有文章')

// 根据标签筛选文章
const filteredPosts = computed(() => {
  if (selectedTag.value === '所有文章')
    return posts
  return posts.filter((post) => {
    const postTags = post.tags || []
    return postTags.map(tag => tag.toUpperCase()).includes(selectedTag.value)
  })
})

// 分页相关
const pageSize = 10
const currentPage = ref(1)

// 分页后的文章列表
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredPosts.value.slice(start, end)
})

// 总页数
const totalPages = computed(() => Math.ceil(filteredPosts.value.length / pageSize))

// 页码导航
function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="blog-container">
    <div class="blog-hero">
      <h1>博客</h1>
      <p class="description">
        分享 Cursor AI 使用技巧和最新动态
      </p>
    </div>

    <div class="blog-content">
      <!-- 左侧标签栏 -->
      <aside class="blog-sidebar">
        <h2 class="sidebar-title">
          所有文章
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
          <article v-for="post of paginatedPosts" :key="post.url" class="blog-entry">
            <div class="blog-entry-content">
              <h2 class="title">
                <a :href="getPostUrl(post.url)">{{ post.title }}</a>
              </h2>
              <div class="meta">
                <time :datetime="getDateTime(post.date.time)">
                  {{ post.date.string }}
                </time>
                <div class="post-tags">
                  <span v-for="tag in post.tags" :key="tag" class="post-tag">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <el-empty v-else description="暂无内容" />

        <!-- 分页导航 -->
        <div v-if="totalPages > 1" class="pagination">
          <button
            class="page-btn"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            上一页
          </button>
          <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
          <button
            class="page-btn"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-container {
  width: 100%;
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  padding: 0 24px;
}

.blog-hero {
  padding: 2rem 0;
  text-align: center;
  margin-bottom: 2rem;
}

.blog-hero h1 {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.blog-hero .description {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin: 0.5rem 0;
}

.blog-content {
  display: flex;
  gap: 2rem;
}

/* 左侧边栏样式 */
.blog-sidebar {
  flex-shrink: 0;
  width: 240px;
  padding-right: 1rem;
  border-right: 1px solid var(--vp-c-divider);
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
  padding: 0.4rem 0.6rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.tag-link:hover {
  background-color: var(--vp-c-bg-soft);
}

.tag-count {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

/* 右侧文章列表样式 */
.blog-list-wrapper {
  flex-grow: 1;
  min-width: 0;
}

.blog-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.blog-entry {
  padding: 1.5rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
}

.blog-entry:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.blog-entry-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.4;
}

.title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s;
}

.title a:hover {
  color: var(--vp-c-brand);
}

.meta {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .blog-container {
    padding: 0 16px;
  }

  .blog-content {
    flex-direction: column;
  }

  .blog-sidebar {
    width: 100%;
    padding-right: 0;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag-item {
    margin-bottom: 0;
  }

  .tag-link {
    background-color: var(--vp-c-bg-soft);
    padding: 0.3rem 0.8rem;
  }

  .blog-entry {
    padding: 1rem;
  }
}

/* Dark mode adjustments */
:root.dark .blog-entry {
  background: var(--vp-c-bg-soft);
}

:root.dark .blog-entry:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

:root.dark .tag-link:hover {
  background-color: var(--vp-c-bg-mute);
}

.tag-link.active {
  background-color: var(--vp-c-brand);
  color: white;
}

.tag-link.active .tag-count {
  color: rgba(255, 255, 255, 0.8);
}

.tag-link:hover:not(.active) {
  background-color: var(--vp-c-bg-soft);
}

/* Dark mode adjustments */
:root.dark .tag-link:hover:not(.active) {
  background-color: var(--vp-c-bg-mute);
}

/* 文章标签样式 */
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.post-tag {
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
}

.post-tag:hover {
  background-color: var(--vp-c-brand);
  color: white;
}

/* 分页导航样式 */
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

/* 响应式调整 */
@media (max-width: 768px) {
  .post-tags {
    margin-top: 0.3rem;
  }

  .post-tag {
    font-size: 0.75rem;
    padding: 0.15rem 0.5rem;
  }

  .pagination {
    margin-top: 1.5rem;
  }
}

/* Dark mode adjustments */
:root.dark .post-tag {
  background-color: var(--vp-c-bg-soft);
}

:root.dark .post-tag:hover {
  background-color: var(--vp-c-brand);
}

:root.dark .page-btn {
  background-color: var(--vp-c-bg-soft);
}

:root.dark .page-btn:hover:not(:disabled) {
  background-color: var(--vp-c-brand);
}
</style>
