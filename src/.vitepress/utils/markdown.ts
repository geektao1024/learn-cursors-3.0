/**
 * 获取 markdown 内容中的标题
 */
export function getDefaultTitle(content: string) {
  const match = content.match(/^(#+)\s+(.+)/m)
  return match?.[2] || ''
}

export function getTextSummary(text: string, count = 100) {
  return (
    text
      // 去除frontmatter
      ?.replace(/^---[\s\S]*?---/, '')
      // 首个标题
      ?.replace(/^#+\s+.*/, '')
      // 除去标题
      ?.replace(/#/g, '')
      // 除去图片
      ?.replace(/!\[.*?\]\(.*?\)/g, '')
      // 除去链接
      ?.replace(/\[(.*?)\]\(.*?\)/g, '$1')
      // 除去加粗
      ?.replace(/\*\*(.*?)\*\*/g, '$1')
      ?.split('\n')
      ?.filter(v => !!v)
      ?.join('\n')
      ?.replace(/>(.*)/, '')
      ?.replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      ?.trim()
      ?.slice(0, count)
  )
}
