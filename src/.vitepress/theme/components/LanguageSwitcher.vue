<script setup lang="ts">
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon } from 'element-plus'
import { useData, useRouter } from 'vitepress'
import { computed } from 'vue'
import 'element-plus/dist/index.css'

const { lang } = useData()
const router = useRouter()

// 定义固定的语言配置
const LOCALES = {
  root: '简体中文',
  en: 'English',
  ja: '日本語',
} as const

const currentLang = computed(() => {
  return LOCALES[lang.value as keyof typeof LOCALES] || LOCALES.root
})

const availableLocales = computed(() => {
  return Object.entries(LOCALES).map(([value, label]) => ({
    label,
    value: value === 'root' ? '' : value,
  }))
})

function switchLanguage(newLocale: string) {
  const currentPath = router.route.path
  const currentLocale = lang.value === 'root' ? '' : `/${lang.value}`

  // 处理首页特殊情况
  if (currentPath === '/' || currentPath === '/index.html') {
    window.location.href = newLocale ? `/${newLocale}/` : '/'
    return
  }

  // 处理其他页面
  const pathWithoutLocale = currentPath.replace(currentLocale, '')
  const newPath = newLocale ? `/${newLocale}${pathWithoutLocale}` : pathWithoutLocale

  window.location.href = newPath
}
</script>

<template>
  <div class="language-switcher">
    <ElDropdown @command="switchLanguage">
      <span class="el-dropdown-link">
        {{ currentLang }}
        <ElIcon class="el-icon--right">
          <i-ep-arrow-down />
        </ElIcon>
      </span>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem
            v-for="locale in availableLocales"
            :key="locale.value"
            :command="locale.value"
          >
            {{ locale.label }}
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>

<style scoped>
.language-switcher {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 0 12px;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.el-icon--right {
  margin-left: 8px;
}
</style>
