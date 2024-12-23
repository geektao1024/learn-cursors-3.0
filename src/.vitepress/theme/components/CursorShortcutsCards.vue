<script setup lang="ts">
import CursorShortcutCard from './CursorShortcutCard.vue'

const shortcutCategories = [
  {
    category: 'Navigation',
    shortcuts: [
      {
        title: 'Quick Open',
        description: 'Quickly open files in your project',
        keys: ['Cmd', 'P'],
        category: 'Navigation',
      },
      {
        title: 'Go to Definition',
        description: 'Jump to the definition of a symbol',
        keys: ['Cmd', 'Click'],
        category: 'Navigation',
      },
    ],
  },
  {
    category: 'AI Assistance',
    shortcuts: [
      {
        title: 'AI Chat',
        description: 'Open AI chat interface',
        keys: ['Cmd', 'L'],
        category: 'AI Assistance',
      },
      {
        title: 'Generate Code',
        description: 'Generate code using AI',
        keys: ['Cmd', 'Shift', 'G'],
        category: 'AI Assistance',
      },
    ],
  },
]
</script>

<template>
  <div class="shortcuts-container">
    <div
      v-for="(category, index) in shortcutCategories"
      :key="index"
      class="category-section"
    >
      <h2 class="category-title">
        {{ category.category }} Shortcuts
      </h2>
      <div class="shortcuts-grid">
        <CursorShortcutCard
          v-for="(shortcut, shortcutIndex) in category.shortcuts"
          :key="shortcutIndex"
          :shortcut="shortcut"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.shortcuts-container {
  @apply container mx-auto px-4 py-8;
}

.category-section {
  @apply mb-12;
}

.category-title {
  @apply text-2xl font-bold text-gray-800 mb-6 border-b pb-2;
}

.shortcuts-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}
</style>
