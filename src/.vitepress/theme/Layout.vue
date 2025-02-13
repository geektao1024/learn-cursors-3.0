<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import LanguageDetector from '../components/LanguageDetector.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import './custom.css'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <LanguageDetector />
    </template>
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

.theme-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 2rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.main-content {
  flex: 1;
  width: 100%;
}

.content-container {
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}

.footer {
  padding: 2rem;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
}

/* 响应式布局 */
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
