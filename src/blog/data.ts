import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  tags?: string[]
  author?: string
  description?: string
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

// 导出博客数据
export const data: Post[] = [
  {
    title: 'Cursor 快速入门：10 分钟掌握 AI 编程助手',
    url: '/blog/posts/cursor-quick-start.html',
    date: formatDate('2023-12-25'),
    tags: ['AI', 'Cursor', '开发工具', '效率工具'],
  },
  {
    title: '为什么选择 Cursor？探索 AI 编程的未来',
    url: '/blog/posts/why-choose-cursor.html',
    date: formatDate('2023-12-26'),
    tags: ['AI', 'Cursor', '开发工具'],
  },
  {
    title: 'Cursor Rules：打造个性化的 AI 编程助手',
    url: '/blog/posts/cursor-rules-guide.html',
    date: formatDate('2023-12-27'),
    tags: ['AI', 'Cursor', 'Rules'],
  },
  {
    title: 'Cursor Rules 进阶指南',
    url: '/blog/posts/cursor-rules-advanced.html',
    date: formatDate('2023-12-28'),
    tags: ['AI', 'Cursor', 'Rules'],
  },
  {
    title: 'Cursor + V0 + Reweb：全栈开发新范式',
    url: '/blog/posts/cursor-v0-reweb-guide.html',
    date: formatDate('2023-12-29'),
    tags: ['AI', 'Cursor', 'V0', 'Reweb'],
  },
  {
    title: 'Cursor：引领 AI 编辑器新时代的革命性工具',
    url: '/blog/posts/cursor-next-gen-editor.html',
    date: formatDate('2023-12-30'),
    tags: ['AI', 'Cursor', '编辑器'],
  },
  {
    title: 'Cursor AI 快捷键完全指南：提升开发效率的必备技巧',
    url: '/blog/posts/cursor-shortcuts.html',
    date: formatDate('2023-12-31'),
    tags: ['AI', 'Cursor', '快捷键'],
  },
  {
    title: 'Cursor 实战：一键生成专业的 Git Commit Message',
    url: '/blog/posts/cursor-git-commit.html',
    date: formatDate('2024-01-01'),
    tags: ['AI', 'Cursor', 'Git'],
  },
  {
    title: 'Cursor vs Windsurf vs Bolt.new-最适合你的AI编程助手？',
    url: '/blog/posts/Cursor-vs-Bolt.new-Windsurf.html',
    date: formatDate('2024-01-02'),
    tags: ['AI', 'Cursor', 'Bolt'],
  },
  {
    title: 'Cursor Composer：全栈开发者的 AI 助手',
    url: '/blog/posts/cursorcomposer.html',
    date: formatDate('2024-01-03'),
    tags: ['AI', 'Cursor', 'Composer'],
  },
  {
    title: '.clinerules 完全指南：掌握 Cline v3.0 项目配置的终极法则',
    url: '/blog/posts/cline-rules-ultimate-guide.html',
    date: formatDate('2024-01-04'),
    tags: ['AI', 'Cursor', 'Rules', 'Cline'],
  },
  {
    title: '我搭建了一个中文翻译的 Cursor 教程网站',
    url: '/blog/posts/cursor-chinese-docs.html',
    date: formatDate('2024-01-05'),
    tags: ['AI', 'Cursor', '文档', '中文'],
  },
  {
    title: 'Cursor 集成 DeepSeek：AI 编程助手的新选择',
    url: '/blog/posts/cursor-deepseek-guide.html',
    date: formatDate('2024-01-06'),
    tags: ['AI', 'Cursor', 'DeepSeek'],
  },
  {
    title: 'Cursor Rules：优化你的编程体验',
    url: '/blog/posts/cursor-rules.html',
    date: formatDate('2024-01-07'),
    tags: ['AI', 'Cursor', 'Rules'],
  },
]
