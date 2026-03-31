<script setup lang="ts">
interface ResourceCard {
  badge: string
  title: string
  description: string
  href: string
  cta: string
  external?: boolean
}

interface SpotlightResource {
  label: string
  title: string
  description: string
  href: string
  cta: string
  bullets: string[]
  external?: boolean
}

interface UseCase {
  title: string
  description: string
}

defineProps<{
  eyebrow: string
  title: string
  description: string
  narrative: string[]
  spotlight: SpotlightResource
  entries: ResourceCard[]
  useCases: UseCase[]
}>()

function renderLinks(text: string) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const attrs = href.startsWith('http')
      ? ' target="_blank" rel="noopener noreferrer"'
      : ''

    return `<a href="${href}" class="resource-inline-link"${attrs}>${label}</a>`
  })
}
</script>

<template>
  <section class="resource-hub-section" aria-labelledby="resource-hub-title">
    <div class="resource-hub-header">
      <span class="resource-hub-eyebrow">{{ eyebrow }}</span>
      <h2 id="resource-hub-title">
        {{ title }}
      </h2>
      <p>{{ description }}</p>
    </div>

    <div class="resource-hub-shell">
      <div class="resource-hub-copy">
        <p
          v-for="(paragraph, index) in narrative"
          :key="index"
          class="resource-paragraph"
          v-html="renderLinks(paragraph)"
        />

        <article class="resource-spotlight">
          <div class="resource-spotlight-head">
            <span class="resource-spotlight-label">{{ spotlight.label }}</span>
            <h3>{{ spotlight.title }}</h3>
          </div>
          <p class="resource-spotlight-description">
            {{ spotlight.description }}
          </p>
          <ul class="resource-spotlight-points">
            <li v-for="(bullet, index) in spotlight.bullets" :key="index">
              {{ bullet }}
            </li>
          </ul>
          <a
            class="resource-spotlight-link"
            :href="spotlight.href"
            :target="spotlight.external ? '_blank' : undefined"
            :rel="spotlight.external ? 'noopener noreferrer' : undefined"
          >
            {{ spotlight.cta }}
            <span aria-hidden="true">→</span>
          </a>
        </article>
      </div>

      <div class="resource-grid">
        <a
          v-for="(entry, index) in entries"
          :key="index"
          class="resource-card"
          :data-kind="entry.external ? 'external' : 'internal'"
          :href="entry.href"
          :target="entry.external ? '_blank' : undefined"
          :rel="entry.external ? 'noopener noreferrer' : undefined"
        >
          <span class="resource-card-badge">{{ entry.badge }}</span>
          <h3>{{ entry.title }}</h3>
          <p class="resource-card-description">
            {{ entry.description }}
          </p>
          <span class="resource-card-cta">
            {{ entry.cta }}
            <span aria-hidden="true">→</span>
          </span>
        </a>
      </div>
    </div>

    <div class="resource-use-cases">
      <article
        v-for="(useCase, index) in useCases"
        :key="index"
        class="resource-use-case"
      >
        <h3>{{ useCase.title }}</h3>
        <p>{{ useCase.description }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.resource-hub-section {
  --resource-accent: #0f766e;
  --resource-accent-strong: #115e59;
  --resource-accent-soft: rgba(15, 118, 110, 0.12);
  --resource-border-strong: rgba(15, 118, 110, 0.24);
  padding: 72px 24px 28px;
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
}

.resource-hub-header {
  text-align: center;
  margin-bottom: 28px;
}

.resource-hub-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--resource-accent-soft);
  color: var(--resource-accent-strong);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.resource-hub-header h2 {
  margin: 16px 0 10px;
  border-top: none;
  padding-top: 0;
  font-size: 2.15rem;
  line-height: 1.2;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.resource-hub-header p {
  max-width: 760px;
  margin: 0 auto;
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--vp-c-text-2);
}

.resource-hub-shell {
  display: grid;
  gap: 22px;
}

.resource-hub-copy {
  position: relative;
  overflow: hidden;
  padding: 28px;
  border-radius: 24px;
  border: 1px solid var(--resource-border-strong);
  background:
    radial-gradient(circle at top right, rgba(14, 165, 233, 0.16), transparent 34%),
    linear-gradient(135deg, rgba(15, 23, 42, 0.04), rgba(15, 118, 110, 0.12));
}

.resource-hub-copy::after {
  content: '';
  position: absolute;
  inset: auto -40px -60px auto;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: rgba(15, 118, 110, 0.08);
  filter: blur(10px);
  pointer-events: none;
}

.resource-paragraph {
  position: relative;
  z-index: 1;
  max-width: 62ch;
  margin: 0 0 14px;
  font-size: 1.02rem;
  line-height: 1.85;
  color: var(--vp-c-text-1);
}

.resource-paragraph:last-of-type {
  margin-bottom: 0;
}

.resource-paragraph :deep(.resource-inline-link) {
  color: var(--resource-accent);
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: rgba(15, 118, 110, 0.28);
  text-underline-offset: 0.18em;
}

.resource-paragraph :deep(.resource-inline-link:hover) {
  text-decoration-color: currentColor;
}

.resource-spotlight {
  position: relative;
  z-index: 1;
  margin-top: 24px;
  padding: 22px;
  border-radius: 22px;
  border: 1px solid var(--vp-c-divider);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
}

.resource-spotlight-head {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.resource-spotlight-label {
  color: var(--resource-accent-strong);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.resource-spotlight h3 {
  margin: 0;
  font-size: 1.35rem;
  line-height: 1.3;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.resource-spotlight-description {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.75;
  color: var(--vp-c-text-2);
}

.resource-spotlight-points {
  display: grid;
  gap: 10px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}

.resource-spotlight-points li {
  position: relative;
  padding-left: 18px;
  color: var(--vp-c-text-1);
  line-height: 1.65;
}

.resource-spotlight-points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--resource-accent);
}

.resource-spotlight-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  color: var(--resource-accent-strong);
  font-weight: 700;
  text-decoration: none;
}

.resource-spotlight-link:hover {
  color: var(--resource-accent);
}

.resource-grid {
  display: grid;
  gap: 16px;
  align-content: start;
}

.resource-card {
  display: flex;
  flex-direction: column;
  min-height: 198px;
  padding: 22px;
  border-radius: 22px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    border-color 0.24s ease;
}

.resource-card[data-kind="external"] {
  border-color: rgba(148, 163, 184, 0.16);
  background:
    radial-gradient(circle at top right, rgba(56, 189, 248, 0.2), transparent 34%),
    linear-gradient(160deg, rgba(15, 23, 42, 0.98), rgba(15, 118, 110, 0.94));
  color: #f8fafc;
}

.resource-card:hover {
  transform: translateY(-4px);
  border-color: var(--resource-border-strong);
  box-shadow: 0 18px 36px -24px rgba(15, 23, 42, 0.38);
}

.resource-card-badge {
  display: inline-flex;
  width: fit-content;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.12);
  color: var(--resource-accent-strong);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.resource-card[data-kind="external"] .resource-card-badge {
  background: rgba(255, 255, 255, 0.12);
  color: rgba(240, 253, 250, 0.92);
}

.resource-card h3 {
  margin: 16px 0 10px;
  font-size: 1.24rem;
  line-height: 1.3;
  font-weight: 700;
}

.resource-card-description {
  margin: 0;
  line-height: 1.75;
  color: var(--vp-c-text-2);
}

.resource-card[data-kind="external"] .resource-card-description {
  color: rgba(226, 232, 240, 0.84);
}

.resource-card-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 18px;
  color: var(--resource-accent-strong);
  font-weight: 700;
}

.resource-card[data-kind="external"] .resource-card-cta {
  color: #ecfeff;
}

.resource-use-cases {
  display: grid;
  gap: 16px;
  margin-top: 20px;
}

.resource-use-case {
  padding: 20px 20px 18px;
  border-radius: 18px;
  border: 1px solid var(--vp-c-divider);
  border-top: 3px solid var(--resource-accent);
  background: var(--vp-c-bg-soft);
}

.resource-use-case h3 {
  margin: 0 0 10px;
  font-size: 1.02rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.resource-use-case p {
  margin: 0;
  line-height: 1.75;
  color: var(--vp-c-text-2);
}

@media (min-width: 768px) {
  .resource-use-cases {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 960px) {
  .resource-hub-shell {
    grid-template-columns: minmax(0, 1.18fr) minmax(320px, 0.82fr);
  }
}

@media (max-width: 640px) {
  .resource-hub-section {
    padding: 56px 20px 24px;
  }

  .resource-hub-copy,
  .resource-card,
  .resource-spotlight {
    padding: 20px;
  }

  .resource-hub-header h2 {
    font-size: 1.8rem;
  }
}

:global(.dark) .resource-hub-section {
  --resource-accent: #5eead4;
  --resource-accent-strong: #99f6e4;
  --resource-accent-soft: rgba(94, 234, 212, 0.12);
  --resource-border-strong: rgba(94, 234, 212, 0.22);
}

:global(.dark) .resource-hub-copy {
  background:
    radial-gradient(circle at top right, rgba(14, 165, 233, 0.18), transparent 34%),
    linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(15, 118, 110, 0.18));
}

:global(.dark) .resource-spotlight {
  background: rgba(15, 23, 42, 0.72);
}
</style>
