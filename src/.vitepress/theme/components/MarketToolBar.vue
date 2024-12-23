<template>
  <div class="MarketToolBar">
    <slot />
  </div>
</template>

<style scoped>
.MarketToolBar {
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;
}
.MarketToolBar > * {
  margin: 0.5rem;
}
.MarketToolBar > :deep(.el-select) {
  max-width: 13em;
}

@media only screen and (max-width: 800px) {
  .MarketToolBar {
    flex-wrap: wrap;
  }
  .MarketToolBar > :deep(.el-select) {
    max-width: 100%;
  }
}
</style>
