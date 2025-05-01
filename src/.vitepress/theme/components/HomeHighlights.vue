<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Highlight {
  title: string
  description: string
  icon: string
  image: string | string[] // 支持单张图片或图片数组用于轮播
  altText: string
  action?: {
    text: string
    link: string
  }
  keywords?: string[]
  width?: number
  height?: number
}

const props = defineProps<{
  title: string
  subtitle: string
  highlights: Highlight[]
}>()

// 轮播控制
const DURATION = 5000
const currentIndex = ref(0)
const intervalId = ref<number | null>(null)
const progressWidth = ref(0)

// 设置当前展示的项目
function setActiveItem(index: number) {
  currentIndex.value = index
  resetProgress()
}

// 自动轮播到下一项
function nextItem() {
  currentIndex.value = (currentIndex.value + 1) % props.highlights.length
  resetProgress()
}

// 重置并启动进度条
function resetProgress() {
  progressWidth.value = 0
  // 动画进度条
  const startTime = Date.now()
  const animate = () => {
    const elapsedTime = Date.now() - startTime
    progressWidth.value = (elapsedTime / DURATION) * 100
    if (elapsedTime < DURATION) {
      requestAnimationFrame(animate)
    }
  }
  requestAnimationFrame(animate)
}

// 启动和停止自动轮播
function startAutoplay() {
  resetProgress()
  intervalId.value = window.setInterval(() => {
    nextItem()
  }, DURATION)
}

function stopAutoplay() {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

// 组件挂载时启动自动轮播
onMounted(() => {
  startAutoplay()
})

// 组件卸载前清除定时器
onBeforeUnmount(() => {
  stopAutoplay()
})
</script>

<template>
  <div class="highlights-section">
    <div class="highlights-header">
      <span class="benefits-label">Benefits</span>
      <h2>{{ title }}</h2>
      <p>{{ subtitle }}</p>
    </div>

    <div class="highlight-container">
      <div class="highlight-accordion">
        <div
          v-for="(highlight, index) in highlights"
          :key="index"
          class="accordion-item"
          :class="{ 'accordion-active': currentIndex === index }"
          @click="setActiveItem(index); stopAutoplay()"
          @mouseenter="stopAutoplay()"
          @mouseleave="startAutoplay()"
        >
          <div class="accordion-header">
            <div class="accordion-icon">
              {{ highlight.icon }}
            </div>
            <h3>{{ highlight.title }}</h3>
          </div>
          <div
            class="accordion-content"
            :class="{ 'accordion-content-expanded': currentIndex === index }"
          >
            <p>{{ highlight.description }}</p>
            <a v-if="highlight.action" :href="highlight.action.link" class="highlight-action">
              {{ highlight.action.text }}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </a>
            <div v-if="currentIndex === index" class="progress-bar">
              <div class="progress-indicator" :style="{ width: `${progressWidth}%` }" />
            </div>
          </div>
        </div>
      </div>

      <div class="carousel-wrapper">
        <div class="carousel-container">
          <div
            v-for="(highlight, index) in highlights"
            :key="index"
            class="carousel-item"
            :class="{ 'carousel-active': currentIndex === index }"
          >
            <img
              v-if="!Array.isArray(highlight.image)"
              :src="highlight.image"
              :alt="highlight.altText"
              loading="lazy"
              decoding="async"
              :width="highlight.width || 800"
              :height="highlight.height || 450"
            >

            <img
              v-else
              :src="highlight.image[0]"
              :alt="highlight.altText"
              loading="lazy"
              decoding="async"
              :width="highlight.width || 800"
              :height="highlight.height || 450"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.highlights-section {
  padding: 20px 0; /* 减小上下内边距，移除左右内边距 */
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
}

.highlights-header {
  text-align: center;
  margin-bottom: 46px; /* 从30px减小到20px */
  position: relative;
}

.benefits-label {
  display: inline-block;
  background-color: #f0f0f0;
  color: #333;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.highlights-header h2 {
  font-size: 2.5rem;
  line-height: 1.3;
  font-weight: 700;
  margin-bottom: 8px;
}

.highlights-header p {
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.8;
  max-width: 768px;
  margin: 0 auto;
}

.highlight-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-bottom: 40px;
  align-items: start;
}

@media (min-width: 768px) {
  .highlight-container {
    grid-template-columns: 1fr 1fr;
  }
}

.highlight-accordion {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.accordion-item {
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.accordion-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.accordion-active {
  border-left: 3px solid var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.accordion-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
}

.accordion-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.accordion-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  padding: 0 16px;
  transition: all 0.3s ease;
}

.accordion-content-expanded {
  max-height: 500px;
  padding: 0 16px 16px;
}

.accordion-content p {
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.8;
  margin-bottom: 16px;
}

.highlight-action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
}

.highlight-action:hover {
  text-decoration: underline;
}

.progress-bar {
  height: 2px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-top: 16px;
  border-radius: 2px;
  overflow: hidden;
}

.progress-indicator {
  height: 100%;
  background-color: var(--vp-c-brand);
  width: 0;
  border-radius: 2px;
}

.carousel-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--vp-c-divider);
  height: 100%;
}

.carousel-container {
  position: relative;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
}

.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.6s ease;
  display: none;
}

.carousel-active {
  opacity: 1;
  display: block;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
