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
    string: date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}

// Export blog data
export const data: Post[] = [
  {
    title: 'Cursor クイックスタート：10分でAIプログラミングアシスタントをマスター',
    url: '/ja/blog/posts/cursor-quick-start.html',
    date: formatDate('2023-12-25'),
    tags: ['AI', 'Cursor', '開発ツール', '生産性'],
  },
  {
    title: 'なぜCursorを選ぶのか？AIプログラミングの未来を探る',
    url: '/ja/blog/posts/why-choose-cursor.html',
    date: formatDate('2023-12-26'),
    tags: ['AI', 'Cursor', '開発ツール'],
  },
  {
    title: 'Cursor Rules：パーソナライズされたAIプログラミングアシスタントの作成',
    url: '/ja/blog/posts/cursor-rules-guide.html',
    date: formatDate('2023-12-27'),
    tags: ['AI', 'Cursor', 'Rules'],
  },
  {
    title: 'Cursor Rulesの高度なガイド',
    url: '/ja/blog/posts/cursor-rules-advanced.html',
    date: formatDate('2023-12-28'),
    tags: ['AI', 'Cursor', 'Rules'],
  },
  {
    title: 'Cursor + V0 + Reweb：フルスタック開発の新パラダイム',
    url: '/ja/blog/posts/cursor-v0-reweb-guide.html',
    date: formatDate('2023-12-29'),
    tags: ['AI', 'Cursor', 'V0', 'Reweb'],
  },
  {
    title: 'Cursor：新時代のAIエディタをリードする革新的ツール',
    url: '/ja/blog/posts/cursor-next-gen-editor.html',
    date: formatDate('2023-12-30'),
    tags: ['AI', 'Cursor', 'エディタ'],
  },
  {
    title: 'Cursor AIショートカット完全ガイド：開発効率を向上させる必須テクニック',
    url: '/ja/blog/posts/cursor-shortcuts.html',
    date: formatDate('2023-12-31'),
    tags: ['AI', 'Cursor', 'ショートカット'],
  },
  {
    title: 'Cursor実践：ワンクリックでプロフェッショナルなGit Commitメッセージを生成',
    url: '/ja/blog/posts/cursor-git-commit.html',
    date: formatDate('2024-01-01'),
    tags: ['AI', 'Cursor', 'Git'],
  },
  {
    title: 'Cursor vs Windsurf vs Bolt.new - あなたに最適なAIプログラミングアシスタントは？',
    url: '/ja/blog/posts/Cursor-vs-Bolt.new-Windsurf.html',
    date: formatDate('2024-01-02'),
    tags: ['AI', 'Cursor', 'Bolt'],
  },
  {
    title: 'Cursor Composer：フルスタック開発者のためのAIアシスタント',
    url: '/ja/blog/posts/cursorcomposer.html',
    date: formatDate('2024-01-03'),
    tags: ['AI', 'Cursor', 'Composer'],
  },
  {
    title: '.clinerules完全ガイド：Cline v3.0プロジェクト設定のマスター',
    url: '/ja/blog/posts/cline-rules-ultimate-guide.html',
    date: formatDate('2024-01-04'),
    tags: ['AI', 'Cursor', 'Rules', 'Cline'],
  },
  {
    title: 'Cursor中国語チュートリアルウェブサイトの構築',
    url: '/ja/blog/posts/cursor-chinese-docs.html',
    date: formatDate('2024-01-05'),
    tags: ['AI', 'Cursor', 'ドキュメント', '中国語'],
  },
  {
    title: 'CursorにDeepSeekを統合：AIプログラミングアシスタントの新選択',
    url: '/ja/blog/posts/cursor-deepseek-guide.html',
    date: formatDate('2024-01-06'),
    tags: ['AI', 'Cursor', 'DeepSeek'],
  },
  {
    title: 'Cursor Rules：プログラミング体験を最適化',
    url: '/ja/blog/posts/cursor-rules.html',
    date: formatDate('2024-01-07'),
    tags: ['AI', 'Cursor', 'Rules'],
  },
]
