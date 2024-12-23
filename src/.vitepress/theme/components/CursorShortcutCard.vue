<script setup lang="ts">
interface ShortcutCardProps {
  title: string
  description: string
  keys: string[]
  category: string
}

defineProps<{ shortcut: ShortcutCardProps }>()
</script>

<template>
  <div class="shortcut-card">
    <div class="card-header">
      <h3>{{ shortcut.title }}</h3>
      <span class="category-tag">{{ shortcut.category }}</span>
    </div>
    <p class="description">
      {{ shortcut.description }}
    </p>
    <div class="keys-container">
      <kbd
        v-for="(key, index) in shortcut.keys"
        :key="index"
        class="shortcut-key"
      >
        {{ key }}
      </kbd>
    </div>
  </div>
</template>

<style scoped>
.shortcut-card {
  @apply bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow;
}

.card-header {
  @apply flex justify-between items-center mb-3;
}

h3 {
  @apply text-lg font-semibold text-gray-800;
}

.category-tag {
  @apply px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs;
}

.description {
  @apply text-gray-600 mb-4;
}

.keys-container {
  @apply flex gap-2;
}

.shortcut-key {
  @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono border border-gray-200;
}
</style>
