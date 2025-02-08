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
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}

// Export blog data
export const data: Post[] = [
  {
    title: 'Cursor Quick Start: Master AI Programming Assistant in 10 Minutes',
    url: '/en/blog/posts/cursor-quick-start.html',
    date: formatDate('2023-12-25'),
    tags: ['AI', 'Cursor', 'Development Tools', 'Productivity'],
  },
  {
    title: 'Why Choose Cursor? Exploring the Future of AI Programming',
    url: '/en/blog/posts/why-choose-cursor.html',
    date: formatDate('2023-12-26'),
    tags: ['AI', 'Cursor', 'Development Tools'],
  },
  {
    title: 'Cursor Rules: Creating Your Personalized AI Programming Assistant',
    url: '/en/blog/posts/cursor-rules-guide.html',
    date: formatDate('2023-12-27'),
    tags: ['AI', 'Cursor', 'Rules'],
  },
  {
    title: 'Advanced Guide to Cursor Rules',
    url: '/en/blog/posts/cursor-rules-advanced.html',
    date: formatDate('2023-12-28'),
    tags: ['AI', 'Cursor', 'Rules'],
  },
  {
    title: 'Cursor + V0 + Reweb: New Paradigm for Full-Stack Development',
    url: '/en/blog/posts/cursor-v0-reweb-guide.html',
    date: formatDate('2023-12-29'),
    tags: ['AI', 'Cursor', 'V0', 'Reweb'],
  },
  {
    title: 'Cursor: Revolutionary Tool Leading the New Era of AI Editors',
    url: '/en/blog/posts/cursor-next-gen-editor.html',
    date: formatDate('2023-12-30'),
    tags: ['AI', 'Cursor', 'Editor'],
  },
  {
    title: 'Complete Guide to Cursor AI Shortcuts: Essential Tips for Boosting Development Efficiency',
    url: '/en/blog/posts/cursor-shortcuts.html',
    date: formatDate('2023-12-31'),
    tags: ['AI', 'Cursor', 'Shortcuts'],
  },
  {
    title: 'Cursor in Action: One-Click Professional Git Commit Messages',
    url: '/en/blog/posts/cursor-git-commit.html',
    date: formatDate('2024-01-01'),
    tags: ['AI', 'Cursor', 'Git'],
  },
  {
    title: 'Cursor vs Windsurf vs Bolt.new - Which AI Programming Assistant is Right for You?',
    url: '/en/blog/posts/Cursor-vs-Bolt.new-Windsurf.html',
    date: formatDate('2024-01-02'),
    tags: ['AI', 'Cursor', 'Bolt'],
  },
  {
    title: 'Cursor Composer: AI Assistant for Full-Stack Developers',
    url: '/en/blog/posts/cursorcomposer.html',
    date: formatDate('2024-01-03'),
    tags: ['AI', 'Cursor', 'Composer'],
  },
  {
    title: 'Complete Guide to .clinerules: Master Cline v3.0 Project Configuration',
    url: '/en/blog/posts/cline-rules-ultimate-guide.html',
    date: formatDate('2024-01-04'),
    tags: ['AI', 'Cursor', 'Rules', 'Cline'],
  },
  {
    title: 'Building a Chinese Translation Tutorial Website for Cursor',
    url: '/en/blog/posts/cursor-chinese-docs.html',
    date: formatDate('2024-01-05'),
    tags: ['AI', 'Cursor', 'Documentation', 'Chinese'],
  },
  {
    title: 'Cursor Integrates DeepSeek: New Choice for AI Programming Assistant',
    url: '/en/blog/posts/cursor-deepseek-guide.html',
    date: formatDate('2024-01-06'),
    tags: ['AI', 'Cursor', 'DeepSeek'],
  },
  {
    title: 'Cursor Rules: Optimize Your Programming Experience',
    url: '/en/blog/posts/cursor-rules.html',
    date: formatDate('2024-01-07'),
    tags: ['AI', 'Cursor', 'Rules'],
  },
]
