<script setup lang="ts">
interface Feature {
  title: string
  details: string
  icon: string
  link?: string
  keywords?: string[]
}

defineProps<{
  title: string
  description: string
  features: Feature[]
}>()
</script>

<template>
  <div class="features-section">
    <div class="features-header">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
    <div class="features-grid">
      <a
        v-for="(feature, index) in features"
        :key="index"
        :href="feature.link || '#'"
        class="feature-card"
        :data-keywords="feature.keywords ? feature.keywords.join(', ') : ''"
      >
        <div class="feature-icon">{{ feature.icon }}</div>
        <div class="feature-content">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.details }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.features-section {
  padding: 64px 24px;
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
}

.features-header {
  text-align: center;
  margin-bottom: 48px;
}

.features-header h2 {
  font-size: 2rem;
  line-height: 1.4;
  font-weight: 600;
  margin-bottom: 16px;
  background-image: linear-gradient(120deg, #646cff, #9580ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.features-header p {
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.8;
  max-width: 768px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
}

@media (min-width: 640px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--vp-c-divider);
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.feature-content h3 {
  font-size: 1.4rem;
  margin: 0 0 12px 0;
  font-weight: 600;
}

.feature-content p {
  margin: 0;
  opacity: 0.8;
  line-height: 1.6;
}
</style>
