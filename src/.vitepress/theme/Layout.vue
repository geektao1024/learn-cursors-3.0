<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { onMounted, ref } from 'vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import './custom.css'

const { Layout } = DefaultTheme

// 简化状态管理，只保留一个加载状态
const isLoaded = ref(false)

onMounted(() => {
  // 延迟一点显示过渡效果
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<template>
  <Layout>
    <div class="theme-container" :class="{ 'is-loaded': isLoaded }">
      <header class="navbar" :class="{ 'is-loaded': isLoaded }">
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
        <div class="content-container" :class="{ 'is-loaded': isLoaded }">
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
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.theme-container.is-loaded {
  opacity: 1;
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

/* 响应式布局 */
@media (max-width: 768px) {
  .content-container {
    padding: 0 1rem;
  }

  .navbar {
    padding: 0.5rem 1rem;
  }
}

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  .theme-container,
  .navbar,
  .content-container {
    transition: none;
  }
}
</style>
