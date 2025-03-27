# Cursor AI 教程社区

[![CI](https://github.com/geektao1024/learn-cursors-3.0/actions/workflows/ci.yml/badge.svg)](https://github.com/geektao1024/learn-cursors-3.0/actions/workflows/ci.yml)

Cursor AI 教程社区是一个开源的多语言学习平台，致力于帮助开发者掌握和精通 Cursor AI 编辑器。我们提供全面的教程、最佳实践指南和活跃的社区讨论环境，助力开发者提升开发效率和代码质量。

## 🌐 在线访问

- 官方网站：<https://learn-cursor.com>
- 在线文档：<https://docs.learn-cursor.com>
- 社区论坛：<https://community.learn-cursor.com>

## 🌍 多语言支持

网站支持以下三种语言：

- **中文**：根目录（`/`）- 默认语言
- **英文**：`/en/` 目录
- **日文**：`/ja/` 目录

## 📚 主要内容

- **用户指南**：`/wiki/user-guide/` - 从入门到精通的系统学习路径
- **文档中心**：`/docs-zh/`（中文）, `/en/docs/`（英文）, `/ja/docs/`（日文）
- **博客文章**：`/blog/` - 分享 Cursor AI 相关经验与技巧
- **案例分享**：`/example/` - 实战案例与使用心得
- **规则配置**：`/rules/` - Cursor 自定义规则指南
- **快捷键**：`/shortcuts/` - 提升效率的键盘快捷键速查表

## 🛠️ 技术架构

- **前端框架**：VitePress + Vue 3 + TypeScript
- **UI 组件**：Element Plus + Tailwind CSS
- **多语言**：使用 VitePress 内置的国际化系统
- **部署**：使用 GitHub Actions 自动构建与部署
- **分析工具**：Google Analytics + 百度统计
- **SEO 优化**：完整的 meta 标签配置和结构化数据

## 📦 本地开发

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
```

## 📁 项目结构

```
learn-cursors-3.0/
├── src/                  # 源代码目录
│   ├── .vitepress/      # VitePress 配置
│   │   ├── config/      # 配置文件
│   │   ├── theme/       # 主题配置
│   │   ├── i18n/        # 国际化配置
│   │   └── config.ts    # 主配置文件
│   ├── blog/            # 博客文章
│   ├── docs-zh/         # 中文文档
│   ├── en/              # 英文内容
│   ├── ja/              # 日文内容
│   ├── public/          # 静态资源
│   ├── rules/           # 规则文档
│   ├── shortcuts/       # 快捷键文档
│   ├── wiki/            # Wiki 用户指南
│   └── index.md         # 首页内容(中文)
├── dist/                # 构建输出目录
├── .github/            # GitHub 配置
├── package.json        # 项目配置
└── tsconfig.json       # TypeScript 配置
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
