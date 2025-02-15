<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { onMounted, ref } from 'vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import './custom.css'

const { Layout } = DefaultTheme

// 简化状态管理，只保留一个加载状态
const isLoaded = ref(false)

onMounted(() => {
  // 立即设置加载状态，避免不必要的延迟
  isLoaded.value = true
})
</script>

<template>
  <Layout>
    <!-- 使用固定宽度布局，避免动态计算 -->
    <div class="theme-container">
      <header class="navbar">
        <div class="navbar-left">
          <a class="logo" href="/">
            <img src="/logo.png" alt="Cursor Tutorial">
          </a>
          <nav class="nav-links">
            <slot name="nav-links" />
          </nav>
        </div>
        <div class="navbar-right">
          <LanguageSwitcher />
          <div class="social-links">
            <slot name="social-links" />
          </div>
        </div>
      </header>

      <main class="main-content">
        <div class="content-container">
          <slot />
        </div>
      </main>

      <footer class="footer">
        <slot name="footer" />
      </footer>
    </div>
  </Layout>
</template>

<style>
@import './custom.css';

/* 基础布局样式 */
.theme-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 内容区域样式 */
.content-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  flex: 1;
}

/* 导航栏样式 */
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 0.7rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo img {
  height: 2rem;
  width: auto;
}

/* 文档内容样式 */
:deep(.vp-doc) {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .content-container {
    padding: 0 1rem;
  }

  .navbar {
    padding: 0.5rem 1rem;
  }
}
</style>
