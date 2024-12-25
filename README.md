# Cursor AI 教程社区

[![CI](https://github.com/geektao1024/learn-cursors-3.0/actions/workflows/ci.yml/badge.svg)](https://github.com/geektao1024/learn-cursors-3.0/actions/workflows/ci.yml)

Cursor AI 教程社区是一个开源的学习平台，致力于帮助开发者掌握和精通 Cursor AI 编辑器。我们提供全面的教程、最佳实践指南和活跃的社区讨论环境，助力开发者提升开发效率和代码质量。

## 🌐 在线访问

- 官方网站：<https://learn-cursor.com>
- 在线文档：<https://docs.learn-cursor.com>
- 社区论坛：<https://community.learn-cursor.com>

## ✨ 核心功能

### 1. 教程系统

- **入门指南**

  - 环境搭建和配置
  - 界面功能详解
  - 基础操作教程
  - 快捷键速查表

- **AI 编程指南**

  - AI 代码生成最佳实践
  - 提示词工程技巧
  - 代码优化建议
  - 自然语言转代码

- **高级特性**
  - 项目重构指南
  - 代码审查技巧
  - 性能优化方案
  - 团队协作实践

### 2. 实战项目

- **Web 开发**

  - React/Vue 项目实战
  - 全栈应用开发
  - 微服务架构设计

- **工具开发**
  - Cursor 插件开发
  - 自动化工具开发
  - CI/CD 流程搭建

### 3. 社区互动

- **知识分享**

  - 技术博客
  - 视频教程
  - 案例分析

- **问答系统**
  - 技术问答
  - 经验交流
  - 问题诊断

## 🛠 技术架构

### 前端技术

- **核心框架**

  - VitePress ^1.0.0 - 静态站点生成
  - Vue 3.4 - 响应式 UI 框架
  - TypeScript 5.3 - 类型系统

- **UI 框架**
  - Element Plus ^2.5.0 - 组件库
  - Tailwind CSS ^3.4.0 - 原子化 CSS
  - Iconify - 图标系统

### 后端服务

- **API 服务**

  - Node.js 18 LTS
  - Express.js 4.18
  - MongoDB 7.0

- **部署环境**
  - Docker
  - Nginx
  - GitHub Actions

## 📦 快速开始

### 环境要求

```bash
Node.js >= 18
pnpm >= 8.0
Git >= 2.0
```

### 开发流程

```bash
# 克隆项目
git clone https://github.com/geektao1024/learn-cursors-3.0.git

# 进入目录
cd learn-cursors-3.0

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 代码检查
pnpm lint

# 运行测试
pnpm test
```

## 📁 项目结构

```
learn-cursors-3.0/
├── src/                   # 源代码目录
│   ├── .vitepress/       # VitePress 配置
│   ├── blog/             # 博客文章
│   ├── docs-zh/          # 中文文档
│   ├── public/           # 静态资源
│   ├── rules/            # 规则文档
│   ├── shortcuts/        # 快捷键文档
│   ├── types/            # TypeScript 类型定义
│   ├── vitepress/        # VitePress 自定义组件
│   ├── wiki/             # Wiki 文档
│   └── index.md         # 首页内容
├── dist/                 # 构建输出目录
├── node_modules/         # 依赖包
├── .github/             # GitHub 配置
├── .husky/              # Git Hooks
├── .vscode/             # VS Code 配置
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript 配置
├── vite.config.ts       # Vite 配置
└── vercel.json          # Vercel 部署配置
```

## 🤝 贡献指南

我们欢迎各种形式的贡献，包括但不限于：

### 内容贡献

- 撰写/优化教程
- 分享使用经验
- 翻译文档
- 报告问题

### 代码贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add: some amazing feature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 提交规范

- feat: 新功能
- fix: 修复问题
- docs: 文档更新
- style: 代码格式
- refactor: 代码重构
- test: 测试相关
- chore: 构建过程或辅助工具的变动

## 📄 开源协议

本项目采用 [MIT 许可证](LICENSE)。

## 🤖 问题反馈

如果你在使用过程中遇到任何问题，请通过以下方式反馈：

- [GitHub Issues](https://github.com/geektao1024/learn-cursors-3.0/issues)
- [Discord 社区](https://discord.gg/cursor-tutorial)
- [邮件联系](mailto:support@learn-cursor.com)

## 🌟 致谢

感谢所有为本项目做出贡献的开发者！

[贡献者列表](https://github.com/geektao1024/learn-cursors-3.0/graphs/contributors)
