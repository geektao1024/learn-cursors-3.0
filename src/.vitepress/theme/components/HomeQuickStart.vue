<script setup lang="ts">
interface Step {
  title: string
  description: string
  icon: string
  link: string
  keywords?: string[]
}

defineProps<{
  title: string
  description: string
  steps: Step[]
}>()
</script>

<template>
  <div class="quickstart-section">
    <div class="quickstart-header">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>

    <div class="steps-container">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step-item"
        :data-keywords="step.keywords ? step.keywords.join(', ') : ''"
      >
        <div class="step-number">
          {{ index + 1 }}
        </div>
        <div class="step-icon">
          {{ step.icon }}
        </div>
        <h3>{{ step.title }}</h3>
        <p>{{ step.description }}</p>
        <a :href="step.link" class="step-link">
          查看详情
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quickstart-section {
  padding: 64px 24px;
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
  background-color: var(--vp-c-bg-soft);
  border-radius: 16px;
}

.quickstart-header {
  text-align: center;
  margin-bottom: 48px;
}

.quickstart-header h2 {
  font-size: 2rem;
  line-height: 1.4;
  font-weight: 600;
  margin-bottom: 16px;
  background-image: linear-gradient(120deg, #646cff, #9580ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.quickstart-header p {
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.8;
  max-width: 768px;
  margin: 0 auto;
}

.steps-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  position: relative;
}

@media (min-width: 640px) {
  .steps-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .steps-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

.step-item {
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.step-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.step-number {
  position: absolute;
  top: -12px;
  left: -12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  z-index: 1;
}

.step-icon {
  font-size: 2rem;
  margin-bottom: 16px;
}

.step-item h3 {
  font-size: 1.2rem;
  margin: 0 0 12px 0;
  font-weight: 600;
}

.step-item p {
  margin: 0 0 16px 0;
  line-height: 1.6;
  opacity: 0.8;
  flex-grow: 1;
}

.step-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
  margin-top: auto;
}

.step-link:hover {
  text-decoration: underline;
}
</style>
