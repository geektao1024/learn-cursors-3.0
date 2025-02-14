<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, ref, watch } from 'vue'
import GlobalAdContainer from './components/GlobalAdContainer.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import './custom.css'

const { Layout } = DefaultTheme

// 水合状态管理
const hydrationState = {
  isClient: ref(false),
  isHydrated: ref(false),
  isContentReady: ref(false),
  isStylesApplied: ref(false),
  isInteractive: ref(false),
}

// 渐进式水合控制器
const hydrationController = {
  // 初始化客户端状态
  initClient() {
    hydrationState.isClient.value = true
  },

  // 处理基础水合
  async handleBaseHydration() {
    await nextTick()
    hydrationState.isHydrated.value = true
  },

  // 处理内容就绪
  handleContentReady() {
    hydrationState.isContentReady.value = true
  },

  // 应用样式
  handleStylesApplied() {
    hydrationState.isStylesApplied.value = true
  },

  // 激活交互
  handleInteractive() {
    hydrationState.isInteractive.value = true
  },
}

// 监视水合状态变化
watch(
  () => hydrationState.isHydrated.value,
  (newVal) => {
    if (newVal) {
      // 内容就绪延迟
      setTimeout(() => {
        hydrationController.handleContentReady()
      }, 50)

      // 样式应用延迟
      setTimeout(() => {
        hydrationController.handleStylesApplied()
      }, 100)

      // 交互激活延迟
      setTimeout(() => {
        hydrationController.handleInteractive()
      }, 150)
    }
  },
)

// 渐进式水合初始化
onMounted(async () => {
  // 使用 requestAnimationFrame 确保DOM已更新
  requestAnimationFrame(async () => {
    // 第一阶段：初始化客户端
    hydrationController.initClient()

    // 第二阶段：基础水合
    await hydrationController.handleBaseHydration()
  })
})

// 计算属性用于控制组件显示
function shouldShowComponent(priority: 'high' | 'medium' | 'low') {
  const { isClient, isHydrated, isContentReady, isStylesApplied } = hydrationState

  switch (priority) {
    case 'high':
      return isClient.value && isHydrated.value
    case 'medium':
      return isClient.value && isHydrated.value && isContentReady.value
    case 'low':
      return isClient.value && isHydrated.value && isContentReady.value && isStylesApplied.value
    default:
      return false
  }
}
</script>

<template>
  <Layout>
    <template #layout-top>
      <ClientOnly>
        <Transition name="fade">
          <GlobalAdContainer v-if="shouldShowComponent('medium')" />
        </Transition>
      </ClientOnly>
    </template>

    <template #aside-outline-after>
      <Transition name="fade">
        <div
          v-if="shouldShowComponent('low')"
          class="content-ad-container"
          :class="{
            'is-hydrated': hydrationState.isHydrated,
            'is-interactive': hydrationState.isInteractive,
          }"
        >
          <ClientOnly>
            <GlobalAdContainer v-if="shouldShowComponent('medium')" />
          </ClientOnly>
        </div>
      </Transition>
    </template>

    <div
      class="theme-container"
      :class="{
        'is-hydrated': hydrationState.isHydrated,
        'is-content-ready': hydrationState.isContentReady,
        'is-styles-applied': hydrationState.isStylesApplied,
        'is-interactive': hydrationState.isInteractive,
      }"
    >
      <ClientOnly>
        <Transition name="fade">
          <GlobalAdContainer v-if="shouldShowComponent('low')" />
        </Transition>
      </ClientOnly>

      <header
        class="navbar"
        :class="{ 'is-ready': shouldShowComponent('high') }"
      >
        <div class="navbar-left">
          <Transition name="fade">
            <a v-if="shouldShowComponent('high')" class="logo" href="/">
              <img src="/logo.png" alt="Cursor Tutorial">
            </a>
          </Transition>
          <nav class="nav-links">
            <slot name="nav-links" />
          </nav>
        </div>
        <div class="navbar-right">
          <Transition name="fade">
            <LanguageSwitcher v-if="shouldShowComponent('medium')" />
          </Transition>
          <div class="social-links">
            <slot name="social-links" />
          </div>
        </div>
      </header>

      <main class="main-content">
        <div
          class="content-container"
          :class="{
            'is-hydrated': hydrationState.isHydrated,
            'is-content-ready': hydrationState.isContentReady,
            'is-interactive': hydrationState.isInteractive,
          }"
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

/* 基础容器样式 */
.theme-container {
  position: relative;
  min-height: 100vh;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 水合状态样式 */
.theme-container.is-hydrated {
  opacity: 0.3;
  transform: translateY(5px);
}

.theme-container.is-content-ready {
  opacity: 0.6;
  transform: translateY(3px);
}

.theme-container.is-styles-applied {
  opacity: 0.8;
  transform: translateY(1px);
}

.theme-container.is-interactive {
  opacity: 1;
  transform: translateY(0);
}

/* 内容容器渐进式样式 */
.content-container {
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(5px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-container.is-hydrated {
  opacity: 0.5;
  transform: translateY(3px);
}

.content-container.is-content-ready {
  opacity: 0.8;
  transform: translateY(1px);
}

.content-container.is-interactive {
  opacity: 1;
  transform: translateY(0);
}

/* 广告容器样式 */
.content-ad-container {
  margin-top: 2rem;
  padding: 1rem 0;
  border-top: 1px solid var(--vp-c-divider-light);
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-ad-container.is-hydrated {
  opacity: 0.5;
  transform: translateX(5px);
}

.content-ad-container.is-interactive {
  opacity: 1;
  transform: translateX(0);
}

/* 导航栏渐进式样式 */
.navbar {
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar.is-ready {
  opacity: 1;
  transform: translateY(0);
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 响应式过渡 */
@media (max-width: 960px) {
  .theme-container,
  .content-container,
  .content-ad-container {
    transition-duration: 0.3s;
  }
}

@media (prefers-reduced-motion: reduce) {
  .theme-container,
  .content-container,
  .content-ad-container,
  .navbar,
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s linear;
    transform: none;
  }
}

/* 保留原有的响应式布局样式 */
@media (max-width: 960px) {
  .navbar {
    padding: 0.75rem 1rem;
  }

  .nav-links {
    display: none;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.5rem;
  }

  .logo img {
    height: 1.75rem;
  }
}
</style>
