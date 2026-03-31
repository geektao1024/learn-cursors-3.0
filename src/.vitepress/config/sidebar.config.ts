import type { DefaultTheme } from 'vitepress'

// 中文侧边栏配置
const zhSidebar: DefaultTheme.Sidebar = {
  '/wiki/user-guide/': [
    {
      text: '了解Cursor AI工具',
      collapsed: false,
      items: [
        { text: '零基础编程入门指南', link: '/wiki/user-guide/programming-basics-for-beginners' },
        { text: 'Cursor AI的介绍', link: '/wiki/user-guide/cursor-introduction' },
        { text: 'Cursor 安装和配置', link: '/wiki/user-guide/install' },
        { text: '用"说"来做个小产品', link: '/wiki/user-guide/quick-start' },
      ],
    },
    {
      text: '进阶理解-核心功能',
      collapsed: false,
      items: [
        {
          text: '智能代码补全 (Tab)',
          link: '/wiki/user-guide/code-completion',
        },
        {
          text: 'AI代码生成 (Cmd+K)',
          link: '/wiki/user-guide/code-generation',
        },
        {
          text: 'AI对话助手 (Chat)',
          link: '/wiki/user-guide/ai-chat',
        },
        {
          text: '代码编辑器 (Cmd+I)',
          link: '/wiki/user-guide/composer',
        },
        {
          text: 'Agent智能助手',
          link: '/wiki/user-guide/agent',
        },
      ],
    },
    {
      text: '使用小技巧',
      collapsed: false,
      items: [
        { text: '用AI编程的心态', link: '/wiki/user-guide/ai-programming-guide' },
        { text: '操作的小技巧', link: '/wiki/user-guide/cursor-tips' },
      ],
    },
    {
      text: '实战案例分享',
      collapsed: false,
      items: [
        { text: '做一个自己的介绍网页', link: '/wiki/user-guide/make-a-website' },
        { text: '爆款小红书笔记抓取', link: '/wiki/user-guide/grab-red-book-notes' },
        { text: '做一个网页二维码插件', link: '/wiki/user-guide/make-a-qr-code-plugin' },
        { text: '做一个网页金句生成器', link: '/wiki/user-guide/make-a-sentence-generator' },
      ],
    },
  ],
  '/blog/': [
    {
      text: '🚀 入门指南',
      collapsed: false,
      items: [
        {
          text: '10分钟快速入门 Cursor ⭐️',
          link: '/blog/posts/cursor-quick-start',
        },
        {
          text: '为什么选择 Cursor？📊',
          link: '/blog/posts/why-choose-cursor',
        },
      ],
    },
    {
      text: '⚙️ Rules 配置指南',
      collapsed: false,
      items: [
        {
          text: 'Rules 基础配置教程 ⚡️',
          link: '/blog/posts/cursor-rules-guide',
        },
        {
          text: 'Rules 进阶使用技巧 🔥',
          link: '/blog/posts/cursor-rules-advanced',
        },
        {
          text: 'Cline v3.0 配置完全指南 🌟',
          link: '/blog/posts/cline-rules-ultimate-guide',
        },
      ],
    },
    {
      text: '💻 实战教程',
      collapsed: false,
      items: [
        {
          text: '上线素材工作流：demo、配乐与发布内容',
          link: '/blog/posts/product-launch-assets-guide',
        },
        {
          text: 'Cursor + V0 + Reweb 实战 🛠️',
          link: '/blog/posts/cursor-v0-reweb-guide',
        },
        {
          text: '智能生成 Git Commit 💡',
          link: '/blog/posts/cursor-git-commit',
        },
      ],
    },
    {
      text: '🔍 深度探索',
      collapsed: false,
      items: [
        {
          text: 'Cursor：新一代 AI 编辑器 📚',
          link: '/blog/posts/cursor-next-gen-editor',
        },
        {
          text: 'AI 编辑器横向对比 🔍',
          link: '/blog/posts/Cursor-vs-Bolt.new-Windsurf',
        },
        {
          text: 'DeepSeek 模型集成详解 🎯',
          link: '/blog/posts/cursor-deepseek-guide',
        },
      ],
    },
    {
      text: '🛠️ 工具指南',
      collapsed: false,
      items: [
        {
          text: 'Cursor 快捷键完全指南 ⌨️',
          link: '/blog/posts/cursor-shortcuts',
        },
        {
          text: 'Composer 全栈开发助手 🎼',
          link: '/blog/posts/cursorcomposer',
        },
      ],
    },
  ],
  '/docs-zh': [
    {
      text: '快速开始',
      collapsed: false,
      items: [
        { text: '官方介绍', link: '/docs-zh/' },
        { text: '从 VS Code 迁移', link: '/docs-zh/migrate-from-vs-code' },
        { text: '套餐选择', link: '/docs-zh/pricing' },
      ],
    },
    {
      text: 'Tags',
      collapsed: false,
      items: [
        { text: '概览', link: '/docs-zh/tags/overview' },
        { text: '从 GitHub Copilot 迁移', link: '/docs-zh/tags/migrate' },
        { text: '高级选项', link: '/docs-zh/tags/advanced' },
      ],
    },
    {
      text: 'Composer',
      collapsed: false,
      items: [
        { text: '概述', link: '/docs-zh/composer' },
      ],
    },
    {
      text: '聊天',
      collapsed: false,
      items: [
        { text: '概述', link: '/docs-zh/chat/overview' },
        { text: '自定义', link: '/docs-zh/chat/customize' },
        { text: '与代码库集成', link: '/docs-zh/chat/with-codebase' },
        { text: '应用', link: '/docs-zh/chat/apply' },
      ],
    },
    {
      text: 'CMD K',
      collapsed: false,
      items: [
        { text: '概述', link: '/docs-zh/cmd-k/overview' },
        { text: '终端命令', link: '/docs-zh/cmd-k/terminal-cmd-k' },
      ],
    },
    {
      text: '上下文',
      collapsed: false,
      items: [
        { text: '代码库索引', link: '/docs-zh/context/codebase-indexing' },
        { text: 'AI 规则', link: '/docs-zh/context/rules-for-ai' },
        { text: '忽略文件', link: '/docs-zh/context/ignore-files' },
      ],
    },
    {
      text: '高级',
      collapsed: false,
      items: [
        { text: '模型', link: '/docs-zh/advanced/models' },
        { text: '自定义 API 密钥', link: '/docs-zh/advanced/custom-api-keys' },
        { text: 'AI 审查 (Beta)', link: '/docs-zh/advanced/ai-review' },
        { text: '影子工作区', link: '/docs-zh/advanced/shadow-workspace' },
      ],
    },
    {
      text: '隐私保护',
      collapsed: false,
      items: [
        { text: '隐私常见问题', link: '/docs-zh/privacy/privacy-faq' },
      ],
    },
    {
      text: '故障排除',
      collapsed: false,
      items: [
        { text: '常见问题', link: '/docs-zh/troubleshooting/common-issues' },
        { text: '故障排除指南', link: '/docs-zh/troubleshooting/troubleshooting-guide' },
      ],
    },
  ],
  '/example/': [
    {
      text: 'AI编程案例',
      collapsed: false,
      items: [
        { text: '案例概述', link: '/example/' },
        { text: 'AI辅助开发实战', link: '/example/ai-development' },
        { text: '智能代码重构', link: '/example/code-refactoring' },
        { text: '自动化测试生成', link: '/example/test-generation' },
      ],
    },
    {
      text: '实用工具开发',
      collapsed: false,
      items: [
        { text: '命令行工具开发', link: '/example/cli-tool' },
        { text: 'Web应用开发', link: '/example/web-app' },
        { text: '插件开发教程', link: '/example/plugin-development' },
      ],
    },
  ],
}

// English sidebar configuration
const enSidebar: DefaultTheme.Sidebar = {
  '/en/docs/': [
    {
      text: 'Getting Started',
      collapsed: false,
      items: [
        { text: 'Introduction', link: '/en/docs/' },
        { text: 'Migrate from VS Code', link: '/en/docs/migrate-from-vs-code' },
        { text: 'Pricing', link: '/en/docs/pricing' },
      ],
    },
    {
      text: 'Tags',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/en/docs/tags/overview' },
        { text: 'Migrate from GitHub Copilot', link: '/en/docs/tags/migrate' },
        { text: 'Advanced Options', link: '/en/docs/tags/advanced' },
      ],
    },
    {
      text: 'Composer',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/en/docs/composer' },
      ],
    },
    {
      text: 'Chat',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/en/docs/chat/overview' },
        { text: 'Customize', link: '/en/docs/chat/customize' },
        { text: 'With Codebase', link: '/en/docs/chat/with-codebase' },
        { text: 'Apply', link: '/en/docs/chat/apply' },
      ],
    },
    {
      text: 'CMD K',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/en/docs/cmd-k/overview' },
        { text: 'Terminal Commands', link: '/en/docs/cmd-k/terminal-cmd-k' },
      ],
    },
    {
      text: 'Context',
      collapsed: false,
      items: [
        { text: 'Codebase Indexing', link: '/en/docs/context/codebase-indexing' },
        { text: 'Rules for AI', link: '/en/docs/context/rules-for-ai' },
        {
          text: 'Symbols',
          collapsed: true,
          items: [
            { text: 'Basic Usage', link: '/en/docs/context/symbols/basic-usage' },
            { text: 'Chat', link: '/en/docs/context/symbols/chat' },
            { text: 'Code', link: '/en/docs/context/symbols/code' },
            { text: 'Codebase', link: '/en/docs/context/symbols/codebase' },
            { text: 'Definitions', link: '/en/docs/context/symbols/definitions' },
            { text: 'Docs', link: '/en/docs/context/symbols/docs' },
            { text: 'Files', link: '/en/docs/context/symbols/files' },
            { text: 'Folders', link: '/en/docs/context/symbols/folders' },
            { text: 'Git', link: '/en/docs/context/symbols/git' },
            { text: 'Web', link: '/en/docs/context/symbols/web' },
            { text: 'Paste Links', link: '/en/docs/context/symbols/paste-links' },
          ],
        },
      ],
    },
  ],
  '/en/blog/': [
    {
      text: '🚀 Getting Started',
      collapsed: false,
      items: [
        {
          text: 'Quick Start Guide to Cursor ⭐️',
          link: '/en/blog/posts/cursor-quick-start',
        },
        {
          text: 'Why Choose Cursor? 📊',
          link: '/en/blog/posts/why-choose-cursor',
        },
      ],
    },
    {
      text: '⚙️ Rules Configuration',
      collapsed: false,
      items: [
        {
          text: 'Basic Rules Configuration ⚡️',
          link: '/en/blog/posts/cursor-rules-guide',
        },
        {
          text: 'Advanced Rules Tips 🔥',
          link: '/en/blog/posts/cursor-rules-advanced',
        },
        {
          text: 'Complete Guide to Cline v3.0 🌟',
          link: '/en/blog/posts/cline-rules-ultimate-guide',
        },
      ],
    },
    {
      text: '💻 Practical Tutorials',
      collapsed: false,
      items: [
        {
          text: 'Launch Assets Workflow',
          link: '/en/blog/posts/product-launch-assets-guide',
        },
        {
          text: 'Cursor + V0 + Reweb in Action 🛠️',
          link: '/en/blog/posts/cursor-v0-reweb-guide',
        },
        {
          text: 'Smart Git Commit Generation 💡',
          link: '/en/blog/posts/cursor-git-commit',
        },
      ],
    },
    {
      text: '🔍 Deep Dive',
      collapsed: false,
      items: [
        {
          text: 'Cursor: Next-Gen AI Editor 📚',
          link: '/en/blog/posts/cursor-next-gen-editor',
        },
        {
          text: 'AI Editor Comparison 🔍',
          link: '/en/blog/posts/Cursor-vs-Bolt.new-Windsurf',
        },
        {
          text: 'Cursor Composer Guide 🎯',
          link: '/en/blog/posts/cursorcomposer',
        },
        {
          text: 'Cursor + DeepSeek Integration 🤖',
          link: '/en/blog/posts/cursor-deepseek-guide',
        },
      ],
    },
  ],
  '/en/wiki/user-guide/': [
    {
      text: 'Understanding Cursor AI',
      collapsed: false,
      items: [
        { text: 'Programming Basics for Beginners', link: '/en/wiki/user-guide/programming-basics-for-beginners' },
        { text: 'Introduction to Cursor AI', link: '/en/wiki/user-guide/cursor-introduction' },
        { text: 'Installation & Configuration', link: '/en/wiki/user-guide/install' },
        { text: 'Quick Start Guide', link: '/en/wiki/user-guide/quick-start' },
      ],
    },
    {
      text: 'Core Features',
      collapsed: false,
      items: [
        {
          text: 'Smart Code Completion (Tab)',
          link: '/en/wiki/user-guide/code-completion',
        },
        {
          text: 'AI Code Generation (Cmd+K)',
          link: '/en/wiki/user-guide/code-generation',
        },
        {
          text: 'AI Chat Assistant (Chat)',
          link: '/en/wiki/user-guide/ai-chat',
        },
        {
          text: 'Code Editor (Cmd+I)',
          link: '/en/wiki/user-guide/composer',
        },
        {
          text: 'AI Agent Assistant',
          link: '/en/wiki/user-guide/agent',
        },
      ],
    },
    {
      text: 'Tips & Tricks',
      collapsed: false,
      items: [
        { text: 'AI Programming Mindset', link: '/en/wiki/user-guide/ai-programming-guide' },
        { text: 'Cursor Tips', link: '/en/wiki/user-guide/cursor-tips' },
      ],
    },
    {
      text: 'Case Studies',
      collapsed: false,
      items: [
        { text: 'Build Your Personal Website', link: '/en/wiki/user-guide/make-a-website' },
        { text: 'Web Content Extractor', link: '/en/wiki/user-guide/grab-red-book-notes' },
        { text: 'QR Code Browser Extension', link: '/en/wiki/user-guide/make-a-qr-code-plugin' },
        { text: 'Quote Generator Web App', link: '/en/wiki/user-guide/make-a-sentence-generator' },
      ],
    },
  ],
}

// Japanese sidebar configuration
const jaSidebar: DefaultTheme.Sidebar = {
  '/ja/wiki/user-guide/': [
    {
      text: 'Cursor AIツールについて',
      collapsed: false,
      items: [
        { text: 'プログラミング入門ガイド', link: '/ja/wiki/user-guide/programming-basics-for-beginners' },
        { text: 'Cursor AIの紹介', link: '/ja/wiki/user-guide/cursor-introduction' },
        { text: 'Cursorのインストールと設定', link: '/ja/wiki/user-guide/install' },
        { text: '「話す」で小さな製品を作る', link: '/ja/wiki/user-guide/quick-start' },
      ],
    },
    {
      text: '上級理解 - コア機能',
      collapsed: false,
      items: [
        {
          text: 'スマートコード補完 (Tab)',
          link: '/ja/wiki/user-guide/code-completion',
        },
        {
          text: 'AIコード生成 (Cmd+K)',
          link: '/ja/wiki/user-guide/code-generation',
        },
        {
          text: 'AIチャットアシスタント (Chat)',
          link: '/ja/wiki/user-guide/ai-chat',
        },
        {
          text: 'コードエディタ (Cmd+I)',
          link: '/ja/wiki/user-guide/composer',
        },
        {
          text: 'Agentインテリジェントアシスタント',
          link: '/ja/wiki/user-guide/agent',
        },
      ],
    },
    {
      text: '使用のヒント',
      collapsed: false,
      items: [
        { text: 'AIプログラミングの心構え', link: '/ja/wiki/user-guide/ai-programming-guide' },
        { text: '操作のコツ', link: '/ja/wiki/user-guide/cursor-tips' },
      ],
    },
    {
      text: '実践事例紹介',
      collapsed: false,
      items: [
        { text: '自己紹介ウェブページの作成', link: '/ja/wiki/user-guide/make-a-website' },
        { text: '人気の小紅書ノート取得', link: '/ja/wiki/user-guide/grab-red-book-notes' },
        { text: 'ウェブQRコードプラグインの作成', link: '/ja/wiki/user-guide/make-a-qr-code-plugin' },
        { text: 'ウェブ名言ジェネレータの作成', link: '/ja/wiki/user-guide/make-a-sentence-generator' },
      ],
    },
  ],
  '/ja/blog/': [
    {
      text: '🚀 入門ガイド',
      collapsed: false,
      items: [
        {
          text: '10分で始めるCursor ⭐️',
          link: '/ja/blog/posts/cursor-quick-start',
        },
        {
          text: 'なぜCursorを選ぶのか？📊',
          link: '/ja/blog/posts/why-choose-cursor',
        },
      ],
    },
    {
      text: '⚙️ Rules 設定ガイド',
      collapsed: false,
      items: [
        {
          text: 'Rules 基本設定チュートリアル ⚡️',
          link: '/ja/blog/posts/cursor-rules-guide',
        },
        {
          text: 'Rules 上級使用テクニック 🔥',
          link: '/ja/blog/posts/cursor-rules-advanced',
        },
        {
          text: 'Cline v3.0 設定完全ガイド 🌟',
          link: '/ja/blog/posts/cline-rules-ultimate-guide',
        },
      ],
    },
    {
      text: '💻 実践チュートリアル',
      collapsed: false,
      items: [
        {
          text: '公開素材ワークフロー',
          link: '/ja/blog/posts/product-launch-assets-guide',
        },
        {
          text: 'Cursor + V0 + Reweb 実践 🛠️',
          link: '/ja/blog/posts/cursor-v0-reweb-guide',
        },
        {
          text: 'スマートGit Commit生成 💡',
          link: '/ja/blog/posts/cursor-git-commit',
        },
      ],
    },
    {
      text: '🔍 深く探る',
      collapsed: false,
      items: [
        {
          text: 'Cursor：次世代AIエディタ 📚',
          link: '/ja/blog/posts/cursor-next-gen-editor',
        },
        {
          text: 'AIエディタ比較 🔍',
          link: '/ja/blog/posts/Cursor-vs-Bolt.new-Windsurf',
        },
        {
          text: 'DeepSeekモデル統合の詳細 🎯',
          link: '/ja/blog/posts/cursor-deepseek-guide',
        },
      ],
    },
    {
      text: '🛠️ ツールガイド',
      collapsed: false,
      items: [
        {
          text: 'Cursor ショートカット完全ガイド ⌨️',
          link: '/ja/blog/posts/cursor-shortcuts',
        },
        {
          text: 'Composer フルスタック開発アシスタント 🎼',
          link: '/ja/blog/posts/cursorcomposer',
        },
      ],
    },
  ],
  '/ja/docs': [
    {
      text: 'クイックスタート',
      collapsed: false,
      items: [
        { text: '公式紹介', link: '/ja/docs/' },
        { text: 'VS Codeからの移行', link: '/ja/docs/migrate-from-vs-code' },
        { text: 'プラン選択', link: '/ja/docs/pricing' },
      ],
    },
    {
      text: 'Tags',
      collapsed: false,
      items: [
        { text: '概要', link: '/ja/docs/tags/overview' },
        { text: 'GitHub Copilotからの移行', link: '/ja/docs/tags/migrate' },
        { text: '高度なオプション', link: '/ja/docs/tags/advanced' },
      ],
    },
    {
      text: 'Composer',
      collapsed: false,
      items: [
        { text: '概要', link: '/ja/docs/composer' },
      ],
    },
    {
      text: 'チャット',
      collapsed: false,
      items: [
        { text: '概要', link: '/ja/docs/chat/overview' },
        { text: 'カスタマイズ', link: '/ja/docs/chat/customize' },
        { text: 'コードベースとの統合', link: '/ja/docs/chat/with-codebase' },
        { text: '適用', link: '/ja/docs/chat/apply' },
      ],
    },
    {
      text: 'CMD K',
      collapsed: false,
      items: [
        { text: '概要', link: '/ja/docs/cmd-k/overview' },
        { text: 'ターミナルコマンド', link: '/ja/docs/cmd-k/terminal-cmd-k' },
      ],
    },
    {
      text: 'コンテキスト',
      collapsed: false,
      items: [
        { text: 'コードベースインデックス', link: '/ja/docs/context/codebase-indexing' },
        { text: 'AIルール', link: '/ja/docs/context/rules-for-ai' },
        { text: '無視ファイル', link: '/ja/docs/context/ignore-files' },
      ],
    },
    {
      text: '高度な設定',
      collapsed: false,
      items: [
        { text: 'モデル', link: '/ja/docs/advanced/models' },
        { text: 'カスタムAPIキー', link: '/ja/docs/advanced/custom-api-keys' },
        { text: 'AIレビュー (Beta)', link: '/ja/docs/advanced/ai-review' },
        { text: 'シャドウワークスペース', link: '/ja/docs/advanced/shadow-workspace' },
      ],
    },
    {
      text: 'プライバシー保護',
      collapsed: false,
      items: [
        { text: 'プライバシーFAQ', link: '/ja/docs/privacy/privacy-faq' },
      ],
    },
    {
      text: 'トラブルシューティング',
      collapsed: false,
      items: [
        { text: 'よくある質問', link: '/ja/docs/troubleshooting/common-issues' },
        { text: 'トラブルシューティングガイド', link: '/ja/docs/troubleshooting/troubleshooting-guide' },
      ],
    },
  ],
  '/ja/example/': [
    {
      text: 'AIプログラミング事例',
      collapsed: false,
      items: [
        { text: '事例概要', link: '/ja/example/' },
        { text: 'AI支援開発実践', link: '/ja/example/ai-development' },
        { text: 'スマートコードリファクタリング', link: '/ja/example/code-refactoring' },
        { text: '自動テスト生成', link: '/ja/example/test-generation' },
      ],
    },
    {
      text: '実用ツール開発',
      collapsed: false,
      items: [
        { text: 'コマンドラインツール開発', link: '/ja/example/cli-tool' },
        { text: 'Webアプリケーション開発', link: '/ja/example/web-app' },
        { text: 'プラグイン開発チュートリアル', link: '/ja/example/plugin-development' },
      ],
    },
  ],
}

// Export configurations for different locales
export const sidebar: DefaultTheme.Sidebar = {
  ...zhSidebar,
  ...enSidebar,
  ...jaSidebar,
}
