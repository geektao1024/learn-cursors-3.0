<script setup>
import { computed, ref } from 'vue'

const selectedOS = ref('windows')
const searchTerm = ref('')

const icons = {
  'Cursor Tab (AI 代码补全)': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <path d="M9 12h6m-6 4h6m-6-8h6"/>
  </svg>`,
  'Cmd K (内联编辑)': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z"/>
    <path d="M8 12h8"/>
    <path d="M12 8v8"/>
  </svg>`,
  '聊天界面': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>`,
  'Composer': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 20h9M3 20h3m3 0h3M3 12h18M3 4h18"/>
  </svg>`,
  '编辑器导航': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  </svg>`,
  '编辑器操作': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
  </svg>`,
  '终端和调试': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M4 17l6-6-6-6m8 14h8"/>
  </svg>`,
  'Git 操作': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="18" cy="18" r="3"/>
    <circle cx="6" cy="6" r="3"/>
    <path d="M13 6h3a2 2 0 0 1 2 2v7"/>
    <line x1="6" y1="9" x2="6" y2="21"/>
  </svg>`,
  '窗口管理': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="21" x2="9" y2="9"/>
  </svg>`,
  '搜索和替换': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>`,
}

const shortcutGroups = [
  {
    title: 'Cursor Tab (AI 代码补全)',
    description: 'AI 驱动的智能代码补全功能，更快地编写',
    shortcuts: [
      {
        action: '接受建议',
        shortcut: 'Tab',
        description: '接受 AI 提供的完整代码建议',
      },
      {
        action: '拒绝建议',
        shortcut: 'Esc',
        description: '拒绝当前的 AI 代码建议',
      },
      {
        action: '部分接受',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + →' : '⌘ + →'),
        description: '只接受建议的一部分内容',
      },
      {
        action: '触发建议',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Space' : '⌘ + Space'),
        description: '手动触发 AI 代码建议',
      },
    ],
  },
  {
    title: 'Cmd K (内联编辑)',
    description: '快速进行代码编辑和重构的内联工具',
    shortcuts: [
      {
        action: '打开 Cmd K',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + K' : '⌘ + K'),
        description: '打开内联编辑工具',
      },
      {
        action: '应用更改',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Enter' : '⌘ + Return'),
        description: '确认并应用编辑更改',
      },
      {
        action: '取消更改',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Backspace' : '⌘ + Delete'),
        description: '取消当前的编辑更改',
      },
      {
        action: '选择性应用',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + Enter' : '⌘ + Shift + Return'),
        description: '选择性应用部分更改',
      },
    ],
  },
  {
    title: '聊天界面',
    description: '与 AI 助手进行实时对话，获取编程帮助',
    shortcuts: [
      {
        action: '打开聊天',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + L' : '⌘ + L'),
        description: '打开 AI 聊天窗口',
      },
      {
        action: '将代码添加到聊天',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + L' : '⌘ + L'),
        description: '将选中的代码发送到聊天窗口',
      },
      {
        action: '发送消息',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Enter' : '⌘ + Return'),
        description: '发送聊天消息',
      },
      {
        action: '新建聊天',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + L' : '⌘ + Shift + L'),
        description: '创建新的聊天会话',
      },
    ],
  },
  {
    title: 'Composer',
    description: '强大的 AI 代码生成和编辑工具',
    shortcuts: [
      {
        action: '打开 Composer',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + I' : '⌘ + I'),
        description: '打开 Composer 工具窗口',
      },
      {
        action: '打开全屏 Composer',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + I' : '⌘ + Shift + I'),
        description: '以全屏模式打开 Composer',
      },
      {
        action: '生成代码',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Enter' : '⌘ + Return'),
        description: '生成或应用 AI 建议的代码',
      },
    ],
  },
  {
    title: '编辑器导航',
    description: '快速在代码中导航和跳转',
    shortcuts: [
      {
        action: '转到定义',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'F12' : 'F12'),
        description: '跳转到符号定义处',
      },
      {
        action: '查找所有引用',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Shift + F12' : 'Shift + F12'),
        description: '查找符号的所有引用',
      },
      {
        action: '快速打开文件',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + P' : '⌘ + P'),
        description: '快速搜索和打开文件',
      },
      {
        action: '转到行',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + G' : '⌘ + G'),
        description: '跳转到指定行号',
      },
      {
        action: '转到符号',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + O' : '⌘ + Shift + O'),
        description: '在当前文件中查找符号',
      },
      {
        action: '全局符号搜索',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + T' : '⌘ + T'),
        description: '在整个工作区搜索符号',
      },
    ],
  },
  {
    title: '编辑器操作',
    description: '常用的编辑和选择操作',
    shortcuts: [
      {
        action: '多光标选择',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Alt + Click' : '⌥ + Click'),
        description: '添加多个光标',
      },
      {
        action: '选择所有匹配',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + L' : '��� + Shift + L'),
        description: '选择所有匹配的文本',
      },
      {
        action: '复制行',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Shift + Alt + ↑/↓' : 'Shift + ⌥ + ↑/↓'),
        description: '向上或向下复制当前行',
      },
      {
        action: '移动行',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Alt + ↑/↓' : '⌥ + ↑/↓'),
        description: '向上或向下移动当前行',
      },
      {
        action: '格式化代码',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Shift + Alt + F' : 'Shift + ⌥ + F'),
        description: '格式化当前文件或选中的代码',
      },
      {
        action: '注释/取消注释',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + /' : '⌘ + /'),
        description: '切换行注释',
      },
    ],
  },
  {
    title: '终端和调试',
    description: '终端操作和调试功能',
    shortcuts: [
      {
        action: '打开/关闭终端',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + `' : '⌘ + `'),
        description: '切换集成终端的显示',
      },
      {
        action: '新建终端',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + `' : '⌘ + Shift + `'),
        description: '创建新的终端实例',
      },
      {
        action: '开始调试',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'F5' : 'F5'),
        description: '启动调试会话',
      },
      {
        action: '调试步进',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'F11' : 'F11'),
        description: '调试时单步执行',
      },
      {
        action: '调试步过',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'F10' : 'F10'),
        description: '调试时跳过当前行',
      },
      {
        action: '继续/暂停',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'F5' : 'F5'),
        description: '继续执行或暂停调试',
      },
    ],
  },
  {
    title: 'Git 操作',
    description: '版本控制相关操作',
    shortcuts: [
      {
        action: '显示 Git 面板',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + G' : '⌘ + Shift + G'),
        description: '打开源代码管理面板',
      },
      {
        action: '提交更改',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Enter' : '⌘ + Return'),
        description: '在源代码管理面板中提交更改',
      },
      {
        action: '刷新 Git 状态',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + R' : '⌘ + Shift + R'),
        description: '刷新 Git 状态和更改',
      },
      {
        action: '显示 Git 历史',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + H' : '⌘ + Shift + H'),
        description: '查看文件或行的 Git 历史',
      },
    ],
  },
  {
    title: '窗口管理',
    description: '编辑器窗口和面板管理',
    shortcuts: [
      {
        action: '新建窗口',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + N' : '⌘ + Shift + N'),
        description: '打开新的编辑器窗口',
      },
      {
        action: '关闭窗口',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + W' : '⌘ + W'),
        description: '关闭当前编辑器窗口',
      },
      {
        action: '切换侧边栏',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + B' : '⌘ + B'),
        description: '显示/隐藏侧边栏',
      },
      {
        action: '切换全屏',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'F11' : '⌃ + ⌘ + F'),
        description: '切换编辑器全屏模式',
      },
    ],
  },
  {
    title: '搜索和替换',
    description: '文本搜索和替换功能',
    shortcuts: [
      {
        action: '查找',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + F' : '⌘ + F'),
        description: '在当前文件中搜索',
      },
      {
        action: '替换',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + H' : '⌘ + H'),
        description: '在当前文件中替换',
      },
      {
        action: '全局搜索',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + F' : '⌘ + Shift + F'),
        description: '在所有文件中搜索',
      },
      {
        action: '全局替换',
        shortcut: computed(() => selectedOS.value === 'windows' ? 'Ctrl + Shift + H' : '⌘ + Shift + H'),
        description: '在所有文件中替换',
      },
    ],
  },
]

const filteredGroups = computed(() => {
  return shortcutGroups.map(group => ({
    ...group,
    shortcuts: group.shortcuts.filter(
      shortcut =>
        shortcut.action.toLowerCase().includes(searchTerm.value.toLowerCase())
        || shortcut.description?.toLowerCase().includes(searchTerm.value.toLowerCase()),
    ),
  })).filter(group => group.shortcuts.length > 0)
})
</script>

<template>
  <div class="container">
    <div class="hero-section">
      <h1>Cursor 键盘快捷键速查表</h1>
      <p class="hero-description">
        掌握这些快捷键，显著提升您的编程效率。本速查表涵盖了 Cursor 的所有核心功能，
        包括 AI 代码补全、内联编辑、聊天功能等。
      </p>

      <div class="os-selector">
        <button
          :class="{ active: selectedOS === 'windows' }"
          @click="selectedOS = 'windows'"
        >
          Windows / Linux
        </button>
        <button
          :class="{ active: selectedOS === 'mac' }"
          @click="selectedOS = 'mac'"
        >
          macOS
        </button>
      </div>
    </div>

    <div class="search-section">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="搜索快捷键..."
      >
      <button
        v-if="searchTerm"
        class="clear-search"
        @click="searchTerm = ''"
      >
        ✕
      </button>
    </div>

    <div class="shortcuts-grid">
      <div
        v-for="(group, index) in filteredGroups"
        :key="index"
        class="shortcut-group"
      >
        <div class="group-header">
          <div class="group-header-title">
            <div class="group-header-icon" v-html="icons[group.title]" />
            <h2>{{ group.title }}</h2>
          </div>
          <p>{{ group.description }}</p>
        </div>
        <div class="shortcuts-list">
          <div
            v-for="(shortcut, idx) in group.shortcuts"
            :key="idx"
            class="shortcut-item"
          >
            <div class="shortcut-info">
              <span class="shortcut-action">{{ shortcut.action }}</span>
              <p v-if="shortcut.description" class="shortcut-description">
                {{ shortcut.description }}
              </p>
            </div>
            <code class="shortcut-key">{{ typeof shortcut.shortcut === 'function' ? shortcut.shortcut() : shortcut.shortcut }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Override VitePress layout constraints */
:deep(.VPDoc) {
  min-height: unset !important;
  padding: 0 !important;
  max-width: 100% !important;
  width: 100% !important;
}

:deep(.VPContent) {
  min-height: unset !important;
  padding: 0 !important;
  margin-bottom: 0 !important;
}

:deep(.VPDoc.has-aside .content-container) {
  min-height: unset !important;
  max-width: 100% !important;
}

/* Hide VitePress page nav and adjust bottom spacing */
:deep(.VPDocFooter),
:deep(.next-and-prev-link),
:deep(.pager),
:deep(.VPLastUpdated),
:deep(.aside) {
  display: none !important;
}

:deep(.VPContent.is-home) {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

/* Additional overrides for VitePress layout */
:deep(.VPContent) {
  padding: 0 !important;
}

:deep(.VPContent.has-sidebar) {
  margin: 0 !important;
  padding: 0 !important;
}

:deep(.VPDoc.has-aside .content-container) {
  max-width: 100% !important;
}

:deep(.aside) {
  display: none !important;
}

:deep(.content .main) {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* Make our container full width */
.container {
  width: 100vw !important;
  max-width: 100vw !important;
  margin: 0 !important;
  padding: 0 !important;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw !important;
  margin-right: -50vw !important;
  background: var(--vp-c-bg);
  transform: scale(0.85);
  transform-origin: top center;
  margin-bottom: 0 !important;
}

.hero-section {
  text-align: center;
  margin: 0;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 2rem 2rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%);
  background-size: 60px 60px;
  opacity: 0.1;
}

.hero-section h1 {
  font-size: 2.75rem;
  margin-bottom: 1rem;
  border: none;
  font-weight: 800;
  letter-spacing: -0.5px;
  line-height: 1.2;
  background: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  max-width: 600px;
  margin: 0 auto 2rem;
  opacity: 0.9;
  font-size: 1rem;
  line-height: 1.6;
}

.os-selector {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: -2.5rem;
  transform: translateY(1.25rem);
}

.os-selector button {
  padding: 1rem 3rem;
  border-radius: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1rem;
  backdrop-filter: blur(10px);
}

.os-selector button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.os-selector button.active {
  background: white;
  color: var(--vp-c-brand-1);
  border-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.search-section {
  position: relative;
  margin: 0 auto 4rem;
  max-width: 700px;
  padding: 0 2rem;
  transform: translateY(2rem);
}

.search-section input {
  width: 100%;
  padding: 1.5rem 2rem;
  border-radius: 1.25rem;
  border: 2px solid var(--vp-c-divider);
  font-size: 1.1rem;
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.search-section input:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 4px rgba(var(--vp-c-brand-1), 0.1);
  outline: none;
}

.clear-search {
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--vp-c-text-2);
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  font-size: 1.2rem;
}

.clear-search:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.shortcuts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 2rem 4rem 4rem;
  margin: 0 auto;
  max-width: 1400px;
  background: var(--vp-c-bg);
}

.shortcut-group {
  background: var(--vp-c-bg);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.shortcut-group:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
}

.group-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.group-header-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.group-header-icon {
  width: 2.25rem;
  height: 2.25rem;
  background: var(--vp-c-bg-soft);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0.5rem;
}

.group-header-icon svg {
  width: 100%;
  height: 100%;
  color: var(--vp-c-text-2);
}

.group-header h2 {
  font-size: 1.25rem;
  margin: 0;
  border: none;
  color: var(--vp-c-text-1);
  font-weight: 600;
  line-height: 1.4;
}

.group-header p {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.5;
  padding-left: 3.25rem;
}

.shortcuts-list {
  padding: 0.75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.shortcut-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  background: var(--vp-c-bg-soft);
}

.shortcut-item:hover {
  background: var(--vp-c-bg-mute);
  transform: translateX(4px);
}

.shortcut-info {
  flex: 1;
  margin-right: 1.5rem;
}

.shortcut-action {
  font-weight: 500;
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  display: block;
  margin-bottom: 0.25rem;
}

.shortcut-description {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.shortcut-key {
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.25rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  white-space: nowrap;
  color: var(--vp-c-text-1);
  min-width: 70px;
  text-align: center;
}

@media (max-width: 1280px) {
  .shortcuts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    padding: 1.5rem;
  }

  .hero-section h1 {
    font-size: 2.25rem;
  }
}

@media (max-width: 768px) {
  .shortcuts-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }

  .hero-section {
    padding: 3rem 1rem;
    border-radius: 0 0 1.5rem 1.5rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 0.9rem;
  }

  .search-section {
    padding: 0 1.5rem;
    margin-bottom: 3rem;
  }

  .os-selector {
    flex-direction: column;
    padding: 0 2rem;
    margin-bottom: -2rem;
  }

  .os-selector button {
    width: 100%;
    padding: 0.875rem 2rem;
  }

  .shortcut-item {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .shortcut-key {
    margin-left: 0;
    width: 100%;
  }

  .shortcut-info {
    margin-right: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .shortcut-group,
  .os-selector button,
  .shortcut-item {
    transition: none;
  }
}

/* Dark mode enhancements */
:root.dark .shortcut-group {
  background: var(--vp-c-bg-soft);
}

:root.dark .shortcut-item {
  background: var(--vp-c-bg);
}

:root.dark .shortcut-item:hover {
  background: var(--vp-c-bg-mute);
}

:root.dark .shortcut-key {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-divider);
}

/* Hide VitePress page nav */
:deep(.VPDocFooter),
:deep(.next-and-prev-link),
:deep(.pager),
:deep(.VPLastUpdated) {
  display: none !important;
}

/* Hide VitePress navigation and empty space */
:deep(.VPDocFooter),
:deep(.next-and-prev-link),
:deep(.pager),
:deep(.VPLastUpdated),
:deep(.aside),
:deep(.VPDoc .container > *:last-child),
:deep(.next-page-link),
:deep(.prev-page-link),
:deep(.VPDocAsideOutline),
:deep(.VPNavBarMenu),
:deep(.VPNavScreen),
:deep(.VPFooter),
:deep(.VPNavBar .content),
:deep(.VPDoc .container .outline),
:deep(.VPLocalNav),
:deep(.VPPageNav),
:deep(.VPPageInfo) {
  display: none !important;
}

/* Remove extra spacing */
:deep(.VPDoc .container) {
  max-width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}

:deep(.VPDoc) {
  padding-top: 0 !important;
}

:deep(.VPContent) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>
