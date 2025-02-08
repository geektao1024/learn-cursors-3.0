interface Term {
  'key': string
  'zh-CN': string
  'en': string
  'ja': string
  'description'?: string
}

export const glossary: Term[] = [
  {
    'key': 'cursor',
    'zh-CN': 'Cursor',
    'en': 'Cursor',
    'ja': 'Cursor',
    'description': 'AI-powered code editor name',
  },
  {
    'key': 'ai-programming',
    'zh-CN': 'AI编程',
    'en': 'AI Programming',
    'ja': 'AIプログラミング',
    'description': 'Using AI for programming tasks',
  },
  {
    'key': 'quick-start',
    'zh-CN': '快速入门',
    'en': 'Quick Start',
    'ja': 'クイックスタート',
    'description': 'Getting started guide',
  },
  {
    'key': 'installation',
    'zh-CN': '安装指南',
    'en': 'Installation Guide',
    'ja': 'インストールガイド',
    'description': 'Installation instructions',
  },
  {
    'key': 'basic-usage',
    'zh-CN': '基本使用',
    'en': 'Basic Usage',
    'ja': '基本的な使い方',
    'description': 'Basic usage instructions',
  },
  {
    'key': 'advanced-features',
    'zh-CN': '高级功能',
    'en': 'Advanced Features',
    'ja': '高度な機能',
    'description': 'Advanced features and capabilities',
  },
  {
    'key': 'code-completion',
    'zh-CN': '代码补全',
    'en': 'Code Completion',
    'ja': 'コード補完',
    'description': 'AI-powered code completion feature',
  },
  {
    'key': 'code-refactoring',
    'zh-CN': '代码重构',
    'en': 'Code Refactoring',
    'ja': 'コードリファクタリング',
    'description': 'Code restructuring and improvement',
  },
  {
    'key': 'keyboard-shortcuts',
    'zh-CN': '快捷键',
    'en': 'Keyboard Shortcuts',
    'ja': 'キーボードショートカット',
    'description': 'Keyboard shortcuts for quick actions',
  },
  {
    'key': 'rules-config',
    'zh-CN': '规则配置',
    'en': 'Rules Configuration',
    'ja': 'ルール設定',
    'description': 'Configuration of AI behavior rules',
  },
]

// 获取特定语言的术语
export function getTerms(lang: 'zh-CN' | 'en' | 'ja') {
  return glossary.reduce((acc, term) => {
    acc[term.key] = term[lang]
    return acc
  }, {} as Record<string, string>)
}

// 获取术语的所有翻译
export function getTermTranslations(key: string) {
  const term = glossary.find(t => t.key === key)
  if (!term)
    return null
  return {
    'zh-CN': term['zh-CN'],
    'en': term.en,
    'ja': term.ja,
    'description': term.description,
  }
}

// 验证术语是否存在
export function validateTerm(key: string, lang: 'zh-CN' | 'en' | 'ja', value: string) {
  const term = glossary.find(t => t.key === key)
  if (!term)
    return false
  return term[lang].toLowerCase() === value.toLowerCase()
}
