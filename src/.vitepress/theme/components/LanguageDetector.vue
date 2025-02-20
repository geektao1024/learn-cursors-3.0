<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { messages } from '../../i18n/messages'

const showNotification = ref(false)
const isVisible = ref(false)
const dontShowAgain = ref(false)
const detectedLanguage = ref('')

// 支持的语言配置
const SUPPORTED_LANGUAGES: Record<string, string> = {
  zh: '/',
  en: '/en/',
  ja: '/ja/',
}

// 语言名称映射
const LANGUAGE_NAMES: Record<string, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
}

// 获取语言名称
const getLanguageName = (lang: string): string => LANGUAGE_NAMES[lang] || lang

// 调试日志函数
function debug(...args: any[]) {
  // 生产环境不输出日志
  if (import.meta.env.PROD)
    return
  // eslint-disable-next-line no-console
  console.log('[LanguageDetector]', ...args)
}

// 检测用户首选语言
async function detectPreferredLanguage(): Promise<string> {
  if (typeof window === 'undefined')
    return 'en'

  // 检查浏览器语言
  const browserLang = navigator.language.toLowerCase().split('-')[0]
  if (SUPPORTED_LANGUAGES[browserLang])
    return browserLang

  // 检查系统语言列表
  try {
    const languages = navigator.languages || [navigator.language]
    for (const lang of languages) {
      const simpleLang = lang.toLowerCase().split('-')[0]
      if (SUPPORTED_LANGUAGES[simpleLang])
        return simpleLang
    }
  }
  catch (error) {
    debug('Error getting system languages:', error)
  }

  return 'en'
}

// 获取当前页面语言
function getCurrentPageLanguage(): string {
  if (typeof window === 'undefined')
    return 'zh'

  const path = window.location.pathname

  // 特殊处理根路径
  if (path === '/' || path === '')
    return 'zh'

  // 检查语言前缀
  if (path.startsWith('/en/'))
    return 'en'
  if (path.startsWith('/ja/'))
    return 'ja'

  return 'zh'
}

// 切换语言
function switchLanguage(): void {
  const targetPath = SUPPORTED_LANGUAGES[detectedLanguage.value]
  const currentPath = window.location.pathname
  let newPath = ''

  // 如果目标是中文（根路径）
  if (targetPath === '/') {
    // 移除现有的语言前缀
    newPath = currentPath.replace(/^\/(?:en|ja)\//, '/')
    // 如果路径变成了 '//'，修正为 '/'
    newPath = newPath.replace('//', '/')
  }
  else {
    // 其他语言的情况
    newPath = currentPath.replace(/^\/(?:en|ja)?\//, targetPath)
  }

  window.location.href = newPath
}

// 检查是否应该显示通知
async function shouldShowNotification(): Promise<boolean> {
  if (typeof window === 'undefined')
    return false

  const dismissed = localStorage.getItem('languageNotificationDismissed')
  if (dismissed === 'true')
    return false

  const currentLang = getCurrentPageLanguage()
  const preferredLang = await detectPreferredLanguage()

  return currentLang !== preferredLang
}

// 关闭通知
function closeNotification(): void {
  if (dontShowAgain.value)
    localStorage.setItem('languageNotificationDismissed', 'true')

  isVisible.value = false
  setTimeout(() => {
    showNotification.value = false
  }, 300)
}

// i18n helper
function t(key: string, params: Record<string, string> = {}): string {
  try {
    const path = key.split('.')
    const targetLang = detectedLanguage.value || getCurrentPageLanguage()
    let value = messages[targetLang] || messages.en

    for (const k of path) {
      if (!value || typeof value !== 'object') {
        return key
      }
      value = value[k]
    }

    if (typeof value !== 'string') {
      return key
    }

    return value.replace(/\{(\w+)\}/g, (_, k) => params[k] || '')
  }
  catch (error) {
    debug('Error in t function:', error)
    return key
  }
}

onMounted(async () => {
  try {
    // 先获取首选语言
    detectedLanguage.value = await detectPreferredLanguage()

    // 然后检查是否应该显示通知
    const show = await shouldShowNotification()
    if (show) {
      showNotification.value = true
      setTimeout(() => {
        isVisible.value = true
      }, 100)
    }
  }
  catch (error) {
    debug('Error in mounted hook:', error)
    // 出错时使用默认语言
    detectedLanguage.value = 'en'
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="showNotification"
      class="language-notification"
      :class="{ 'language-notification-show': isVisible }"
    >
      <div class="notification-content">
        <div class="notification-header">
          <h3>{{ t('notification.title') }}</h3>
          <button class="close-button" @click="closeNotification">
            ×
          </button>
        </div>
        <p>{{ t('notification.message', { detectedLanguage: getLanguageName(detectedLanguage) }) }}</p>
        <div class="notification-actions">
          <button class="primary-button" @click="switchLanguage">
            {{ t('notification.switchButton') }}
          </button>
          <button class="secondary-button" @click="closeNotification">
            {{ t('notification.stayButton') }}
          </button>
        </div>
        <div class="notification-footer">
          <label>
            <input v-model="dontShowAgain" type="checkbox">
            {{ t('notification.dontShow') }}
          </label>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.language-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 20px;
  max-width: 400px;
  z-index: 1000;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.3s ease;
}

.language-notification-show {
  opacity: 1;
  transform: translateY(0);
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.notification-header h3 {
  margin: 0;
  font-size: 18px;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  color: #666;
}

.notification-actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}

.primary-button,
.secondary-button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.primary-button {
  background: #1890ff;
  color: white;
}

.secondary-button {
  background: #f0f0f0;
  color: #666;
}

.notification-footer {
  margin-top: 12px;
  font-size: 14px;
  color: #666;
}
</style>
