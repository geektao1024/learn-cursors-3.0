<script setup lang="ts">
import type { PluginInfo } from '@data/plugins.data'
import { computed } from 'vue'

const props = defineProps<{
  authorName: string
  plugins: Array<PluginInfo>
}>()

const _emits = defineEmits(['clear'])

const selectedAuthorInfo = computed(() => {
  if (!props.authorName)
    return null
  return props.plugins.find(plugin => plugin.author.name === props.authorName)?.author
})

const pluginCount = computed(() => props.plugins.length)
const totalStars = computed(() =>
  props.plugins.reduce((sum, plugin) => sum + (plugin.stars || 0), 0),
)
</script>

<template>
  <el-card v-if="selectedAuthorInfo" class="author-card" shadow="hover">
    <div class="card-content">
      <el-button
        class="close-btn"
        size="small"
        type="danger"
        circle
        @click="$emit('clear')"
      >
        <el-icon><i-ep-close-bold /></el-icon>
      </el-button>

      <div class="basic-info">
        <div class="avatar">
          <el-avatar
            v-if="selectedAuthorInfo.avatar"
            :src="selectedAuthorInfo.avatar"
            :size="50"
            shape="square"
            fit="fill"
          />
          <el-avatar v-else size="large">
            ?
          </el-avatar>
        </div>

        <div class="info">
          <h3>{{ selectedAuthorInfo.name }}</h3>
          <el-link :href="selectedAuthorInfo.url" target="_blank" type="primary">
            作者主页
          </el-link>
        </div>
      </div>

      <div class="statistic">
        <el-statistic title="已发布插件" :value="pluginCount" />

        <el-statistic title="收到星标" :value="totalStars" />
      </div>

      <div class="watermark">
        {{ selectedAuthorInfo.name }}
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.close-btn {
  position: absolute;
  top: 1rem;
  right: 0.5rem;
  z-index: 10;
}

.card-content {
  display: flex;
  position: relative;
  flex-direction: row;
  text-align: left;
  align-items: flex-start;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .card-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.basic-info {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.info h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.info .el-link {
  margin-top: 0.5rem;
  display: inline-block;
}

.statistic {
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  padding: 0 10rem 0 0;
}

@media (max-width: 768px) {
  .statistic {
    width: 100%;
    padding: 1rem 0 0 0;
  }
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.watermark {
  position: absolute;
  top: 50%;
  right: 5rem;
  transform: translateY(-50%);
  font-family: 'French Script MT', 'Apple Chancery', 'Lucida Calligraphy', Cursive, 'Brush Script MT', 'Times New Roman';
  font-size: 3rem;
  font-weight: bold;
  font-style: italic;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
}
@media (max-width: 768px) {
  .watermark {
    display: none;
  }
}
</style>
