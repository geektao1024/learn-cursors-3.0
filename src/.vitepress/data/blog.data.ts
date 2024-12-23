import { createContentLoader } from 'vitepress'

interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  tags?: string[]
}

function formatDate(raw: string): Post['date'] {
  const date = new Date(`${raw} UTC+8`)
  return {
    time: +date,
    string: date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}

// 创建单个 ContentLoader 实例
const blogLoader = createContentLoader('blog/posts/*.md', {
  transform(raw): Post[] {
    return raw
      .filter(({ frontmatter }) => !frontmatter.draft)
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title,
        url: url.replace(/\.md$/, '.html'),
        date: formatDate(frontmatter.date),
        tags: frontmatter.tags || [],
      }))
      .sort((a, b) => b.date.time - a.date.time)
  },
})

export default blogLoader
export const data = [] as Post[]

// 初始化数据
blogLoader.load().then((posts) => {
  data.splice(0, data.length, ...posts)
})
