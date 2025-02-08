import { syncTranslations } from '../src/.vitepress/utils/i18n/translation'

async function main() {
  // 检查核心文档的翻译状态
  const coreDocs = [
    'wiki/getting-started',
    'wiki/user-guide',
    'wiki/advanced',
    'shortcuts',
    'rules'
  ]

  for (const dir of coreDocs) {
    console.log(`\nChecking translations for ${dir}...`)
    await syncTranslations('/', ['en', 'ja'], dir)
  }
}

main().catch(console.error) 