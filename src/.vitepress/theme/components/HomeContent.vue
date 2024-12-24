<script setup lang="ts">
defineProps<{
  tip: string
  warning: string[]
}>()
</script>

<template>
  <div class="home-content">
    <div class="content-container">
      <div class="info-box tip">
        <div class="icon">
          ℹ️
        </div>
        <div class="content">
          {{ tip }}
        </div>
      </div>

      <div class="info-box warning">
        <div class="icon">
          ⚠️
        </div>
        <div class="content">
          <ul>
            <li v-for="(item, index) in warning" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-content {
  width: 100%;
  margin-top: 48px;
}

.content-container {
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  padding: 0;
  display: grid;
  gap: 24px;
}

.info-box {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 24px;
}

.info-box .icon {
  font-size: 20px;
  line-height: 24px;
}

.info-box.tip {
  background-color: rgba(100, 108, 255, 0.08);
  border: 1px solid rgba(100, 108, 255, 0.2);
}

.info-box.warning {
  background-color: rgba(234, 179, 8, 0.08);
  border: 1px solid rgba(234, 179, 8, 0.2);
}

.info-box .content {
  flex: 1;
}

.info-box ul {
  margin: 0;
  padding-left: 20px;
}

.info-box li {
  margin: 4px 0;
}

@media (min-width: 640px) {
  .content-container {
    padding: 0;
  }
}

@media (min-width: 960px) {
  .content-container {
    padding: 0;
  }
}
</style>
