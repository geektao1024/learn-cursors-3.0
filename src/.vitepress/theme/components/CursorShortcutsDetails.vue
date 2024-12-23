<script setup lang="ts">
import { computed, ref } from 'vue'
import CursorShortcutCard from './CursorShortcutCard.vue'

const activeCategory = ref('All')

const shortcutDetails = [
  {
    category: 'Navigation',
    description: 'Shortcuts to help you navigate your project efficiently',
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
    description: 'AI-powered shortcuts to enhance your coding experience',
    shortcuts: [
      {
        title: 'AI Chat',
        description: 'Open AI chat interface for coding assistance',
        keys: ['Cmd', 'L'],
        category: 'AI Assistance',
      },
      {
        title: 'Generate Code',
        description: 'Generate code snippets using AI',
        keys: ['Cmd', 'Shift', 'G'],
        category: 'AI Assistance',
      },
    ],
  },
]

const filteredShortcuts = computed(() => {
  if (activeCategory.value === 'All')
    return shortcutDetails
  return shortcutDetails.filter(cat => cat.category === activeCategory.value)
})
</script>

<template>
  <div class="shortcuts-details">
    <div class="category-filter">
      <button
        :class="{ active: activeCategory === 'All' }"
        @click="activeCategory = 'All'"
      >
        All Shortcuts
      </button>
      <button
        v-for="category in shortcutDetails.map(c => c.category)"
        :key="category"
        :class="{ active: activeCategory === category }"
        @click="activeCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <div v-for="(category, index) in filteredShortcuts" :key="index" class="category-section">
      <h2>{{ category.category }} Shortcuts</h2>
      <p class="category-description">
        {{ category.description }}
      </p>
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
.shortcuts-details {
  @apply container mx-auto px-4 py-8;
}

.category-filter {
  @apply flex justify-center space-x-4 mb-8;
}

.category-filter button {
  @apply px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors;
}

.category-filter button.active {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.category-section {
  @apply mb-12;
}

.category-section h2 {
  @apply text-2xl font-bold text-gray-800 mb-4 border-b pb-2;
}

.category-description {
  @apply text-gray-600 mb-6;
}

.shortcuts-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}
</style>
