import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
  '/wiki/user-guide/': [
    {
      text: '了解Cursor AI工具',
      collapsed: false,
      items: [
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
      text: '全部文章',
      items: [
        { text: 'Cursor 快速入门：10 分钟掌握 AI 编程助手', link: '/blog/posts/cursor-quick-start' },
        { text: '为什么选择 Cursor？探索 AI 编程的未来', link: '/blog/posts/why-choose-cursor' },
        { text: 'Cursor Rules：打造个性化的 AI 编程助手', link: '/blog/posts/cursor-rules-guide' },
        { text: 'Cursor Rules 进阶指南', link: '/blog/posts/cursor-rules-advanced' },
        { text: 'Cursor + V0 + Reweb：全栈开发新范式', link: '/blog/posts/cursor-v0-reweb-guide' },
        { text: 'Cursor：引领 AI 编辑器新时代的革命性工具', link: '/blog/posts/cursor-next-gen-editor' },
        { text: 'Cursor AI 快捷键完全指南', link: '/blog/posts/cursor-shortcuts' },
        { text: 'Cursor 实战：一键生成专业的 Git Commit Message', link: '/blog/posts/cursor-git-commit' },
        { text: 'Cursor vs Bolt', link: '/blog/posts/Cursor-vs-Bolt.new-Windsurf' },
        { text: 'Cursor Composer', link: '/blog/posts/cursorcomposer' },
      ],
    },
  ],
  '/docs-zh/': [
    {
      text: '快速开始',
      collapsed: false,
      items: [
        { text: '介绍', link: '/docs-zh/' },
        { text: '从 VS Code 迁移', link: '/docs-zh/migrate-from-vs-code' },
      ],
    },
    {
      text: 'Tags',
      collapsed: false,
      items: [
        { text: '概览', link: '/docs-zh/tags/overview' },
        { text: '迁移', link: '/docs-zh/tags/migrate' },
        { text: '高级选项', link: '/docs-zh/tags/advanced' },
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
}
