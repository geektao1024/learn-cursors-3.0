import fs from 'node:fs'
import path from 'node:path'
import { getTerms } from '../../data/glossary'

interface TranslationStatus {
  missing: string[]
  outdated: string[]
  total: number
  translated: number
}

// 获取文件的最后修改时间
function getFileModTime(filePath: string): number {
  try {
    const stats = fs.statSync(filePath)
    return stats.mtimeMs
  }
  catch {
    return 0
  }
}

// 检查翻译状态
export async function checkTranslationStatus(sourceLang: string, targetLang: string, dir: string): Promise<TranslationStatus> {
  const status: TranslationStatus = {
    missing: [],
    outdated: [],
    total: 0,
    translated: 0,
  }

  const sourceDir = path.join(process.cwd(), 'src', sourceLang, dir)
  const targetDir = path.join(process.cwd(), 'src', targetLang, dir)

  try {
    const files = fs.readdirSync(sourceDir)
    status.total = files.length

    for (const file of files) {
      const sourceFile = path.join(sourceDir, file)
      const targetFile = path.join(targetDir, file)

      // 检查文件是否存在
      if (!fs.existsSync(targetFile)) {
        status.missing.push(file)
        continue
      }

      // 检查文件是否过期
      const sourceModTime = getFileModTime(sourceFile)
      const targetModTime = getFileModTime(targetFile)
      if (sourceModTime > targetModTime) {
        status.outdated.push(file)
        continue
      }

      status.translated++
    }
  }
  catch (error) {
    console.error(`Error checking translation status: ${error}`)
  }

  return status
}

// 创建翻译模板
export function createTranslationTemplate(sourcePath: string, targetPath: string, targetLang: string) {
  try {
    // 读取源文件
    const content = fs.readFileSync(sourcePath, 'utf-8')
    const terms = getTerms(targetLang)

    // 创建目标目录（如果不存在）
    const targetDir = path.dirname(targetPath)
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    // 替换常用术语
    let translatedContent = content
    Object.entries(terms).forEach(([key, value]) => {
      const regex = new RegExp(`\\b${key}\\b`, 'gi')
      translatedContent = translatedContent.replace(regex, value)
    })

    // 写入目标文件
    fs.writeFileSync(targetPath, translatedContent)
    return true
  }
  catch (error) {
    console.error(`Error creating translation template: ${error}`)
    return false
  }
}

// 生成翻译报告
export function generateTranslationReport(status: TranslationStatus): string {
  const { missing, outdated, total, translated } = status
  const progress = (translated / total * 100).toFixed(2)

  return `
# Translation Status Report

## Summary
- Total files: ${total}
- Translated files: ${translated}
- Progress: ${progress}%

## Missing Translations (${missing.length})
${missing.map(file => `- ${file}`).join('\n')}

## Outdated Translations (${outdated.length})
${outdated.map(file => `- ${file}`).join('\n')}
`
}

// 同步翻译内容
export async function syncTranslations(sourceLang: string, targetLangs: string[], dir: string) {
  const results: Record<string, TranslationStatus> = {}

  for (const targetLang of targetLangs) {
    // 检查翻译状态
    const status = await checkTranslationStatus(sourceLang, targetLang, dir)
    results[targetLang] = status

    // 为缺失的文件创建翻译模板
    const sourceDir = path.join(process.cwd(), 'src', sourceLang, dir)
    const targetDir = path.join(process.cwd(), 'src', targetLang, dir)

    for (const file of status.missing) {
      const sourcePath = path.join(sourceDir, file)
      const targetPath = path.join(targetDir, file)
      createTranslationTemplate(sourcePath, targetPath, targetLang)
    }
  }

  // 生成报告
  let report = '# Translation Sync Report\n\n'
  for (const [lang, status] of Object.entries(results)) {
    report += `## ${lang}\n${generateTranslationReport(status)}\n\n`
  }

  // 保存报告
  const reportPath = path.join(process.cwd(), 'translation-report.md')
  fs.writeFileSync(reportPath, report)

  return results
}
