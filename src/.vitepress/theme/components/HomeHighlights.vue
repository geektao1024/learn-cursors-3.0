<script setup lang="ts">
interface Highlight {
  title: string
  description: string
  icon: string
  image: string
  altText: string
  action?: {
    text: string
    link: string
  }
  keywords?: string[]
}

defineProps<{
  title: string
  subtitle: string
  highlights: Highlight[]
}>()
</script>

<template>
  <div class="highlights-section">
    <div class="highlights-header">
      <h2>{{ title }}</h2>
      <p>{{ subtitle }}</p>
    </div>

    <div v-for="(highlight, index) in highlights" :key="index" class="highlight-container" :class="{ reverse: index % 2 !== 0 }">
      <div class="highlight-content" :data-keywords="highlight.keywords ? highlight.keywords.join(', ') : ''">
        <div class="highlight-icon">
          {{ highlight.icon }}
        </div>
        <h3>{{ highlight.title }}</h3>
        <p>{{ highlight.description }}</p>
        <a v-if="highlight.action" :href="highlight.action.link" class="highlight-action">
          {{ highlight.action.text }}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </a>
      </div>
      <div class="highlight-image">
        <img :src="highlight.image" :alt="highlight.altText">
      </div>
    </div>
  </div>
</template>

<style scoped>
.highlights-section {
  padding: 64px 24px;
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
}

.highlights-header {
  text-align: center;
  margin-bottom: 64px;
}

.highlights-header h2 {
  font-size: 2rem;
  line-height: 1.4;
  font-weight: 600;
  margin-bottom: 16px;
  background-image: linear-gradient(120deg, #646cff, #9580ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  margin-bottom: 80px;
  align-items: center;
}

@media (min-width: 768px) {
  .highlight-container {
    grid-template-columns: 1fr 1fr;
  }

  .highlight-container.reverse {
    direction: rtl;
  }

  .highlight-container.reverse .highlight-content,
  .highlight-container.reverse .highlight-image {
    direction: ltr;
  }
}

.highlight-content {
  display: flex;
  flex-direction: column;
}

.highlight-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.highlight-content h3 {
  font-size: 1.75rem;
  line-height: 1.4;
  font-weight: 600;
  margin: 0 0 16px 0;
}

.highlight-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.8;
  margin: 0 0 24px 0;
}

.highlight-action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
}

.highlight-action:hover {
  text-decoration: underline;
}

.highlight-image {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--vp-c-divider);
}

.highlight-image img {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  display: block;
}
</style>
