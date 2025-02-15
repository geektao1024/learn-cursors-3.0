<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, ref } from 'vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import './custom.css'

const { Layout } = DefaultTheme

// 简化状态管理
const isClient = ref(false)
const isHydrated = ref(false)

// 初始化
onMounted(() => {
  if (typeof window === 'undefined')
    return

  isClient.value = true
  nextTick(() => {
    isHydrated.value = true
  })
})

// 组件显示逻辑
const shouldShow = () => isClient.value && isHydrated.value
</script>

<template>
  <Layout>
    <div
      class="theme-container"
      :class="{ 'is-hydrated': isHydrated }"
    >
      <header
        class="navbar"
        :class="{ 'is-ready': shouldShow() }"
      >
        <div class="navbar-left">
          <Transition name="fade">
            <a v-if="shouldShow()" class="logo" href="/">
              <img src="/logo.png" alt="Cursor Tutorial">
            </a>
          </Transition>
          <nav class="nav-links">
            <slot name="nav-links" />
          </nav>
        </div>
        <div class="navbar-right">
          <Transition name="fade">
            <LanguageSwitcher v-if="shouldShow()" />
          </Transition>
          <div class="social-links">
            <slot name="social-links" />
          </div>
        </div>
      </header>

      <main class="main-content">
        <div
          class="content-container"
          :class="{ 'is-hydrated': isHydrated }"
        >
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

/* 基础过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 容器状态样式 */
.theme-container,
.content-container {
  opacity: 0;
  transform: translateY(5px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-container.is-hydrated,
.content-container.is-hydrated {
  opacity: 1;
  transform: translateY(0);
}

/* 导航栏样式 */
.navbar {
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar.is-ready {
  opacity: 1;
  transform: translateY(0);
}

/* 内容布局 */
:deep(.vp-doc) {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
}

@media (min-width: 640px) {
  :deep(.vp-doc) {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  :deep(.vp-doc) {
    padding: 0 64px;
  }
}

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  .theme-container,
  .content-container,
  .navbar,
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s linear;
    transform: none;
  }
}
</style>
