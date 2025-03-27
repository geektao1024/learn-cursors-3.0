<script setup lang="ts">
interface FAQ {
  question: string
  answer: string
  keywords?: string[]
}

defineProps<{
  title: string
  description: string
  faqs: FAQ[]
}>()

// 添加处理markdown链接的方法
function processMarkdownLinks(text: string) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="faq-link">$1</a>')
}
</script>

<template>
  <div id="faq-section" class="faq-section" aria-labelledby="faq-title">
    <div class="faq-header">
      <h2 id="faq-title">
        {{ title }}
      </h2>
      <p>{{ description }}</p>
    </div>
    <div class="faq-list" itemscope itemtype="https://schema.org/FAQPage">
      <details
        v-for="(faq, index) in faqs"
        :key="index"
        class="faq-item"
        itemscope
        itemprop="mainEntity"
        itemtype="https://schema.org/Question"
        :data-keywords="faq.keywords ? faq.keywords.join(', ') : ''"
      >
        <summary class="faq-question">
          <h3 itemprop="name">
            {{ faq.question }}
          </h3>
          <div class="faq-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="plus-icon"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="minus-icon"><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </div>
        </summary>
        <div class="faq-answer" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
          <div itemprop="text" v-html="processMarkdownLinks(faq.answer)" />
        </div>
      </details>
    </div>
  </div>
</template>

<style scoped>
.faq-section {
  padding: 64px 24px;
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
}

.faq-header {
  text-align: center;
  margin-bottom: 48px;
}

.faq-header h2 {
  font-size: 2rem;
  line-height: 1.4;
  font-weight: 600;
  margin-bottom: 16px;
  background-image: linear-gradient(120deg, #646cff, #9580ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.faq-header p {
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.8;
  max-width: 768px;
  margin: 0 auto;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
}

.faq-item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.faq-item:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.faq-question {
  padding: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
}

.faq-question h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-icon {
  min-width: 24px;
}

.faq-item[open] .plus-icon {
  display: none;
}

.faq-item:not([open]) .minus-icon {
  display: none;
}

.faq-answer {
  padding: 0 20px 20px;
  line-height: 1.6;
}

.faq-answer p {
  margin-top: 0;
}

.faq-answer p:last-child {
  margin-bottom: 0;
}

.faq-answer a {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.faq-answer a:hover {
  text-decoration: underline;
  color: var(--vp-c-brand-dark);
}

.faq-answer a.faq-link {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.faq-answer a.faq-link:hover {
  text-decoration: underline;
  color: var(--vp-c-brand-dark);
}

/* 添加SEO相关样式，使内容对搜索引擎更友好 */
.faq-item[data-keywords]::after {
  content: attr(data-keywords);
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

@media (max-width: 640px) {
  .faq-question h3 {
    font-size: 1rem;
  }

  .faq-header h2 {
    font-size: 1.75rem;
  }

  .faq-header p {
    font-size: 1rem;
  }
}
</style>
