---
title: 制作个人介绍网页
description: 使用 Cursor AI 快速构建一个现代化的个人介绍网站，包含响应式设计和精美动画效果。
---

# 制作个人介绍网页

<!-- ![Website Preview](./images/guide/website-preview.png) -->

## 2.1 前期准备

### 2.1.1 新建文件夹

首先，让我们创建一个新的项目文件夹并初始化项目：

```bash
# 创建项目文件夹
mkdir my-portfolio
cd my-portfolio

# 初始化 Next.js 项目
npx create-next-app@latest . --typescript --tailwind --app --src-dir
```

推荐的最小项目结构如下：

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # 布局文件
│   │   ├── page.tsx        # 主页面
│   │   └── globals.css     # 全局样式
│   ├── components/         # 组件目录
│   │   ├── ui/            # UI 组件
│   │   ├── layout/        # 布局组件
│   │   └── sections/      # 页面区块
│   ├── lib/               # 工具函数
│   └── styles/            # 样式文件
├── public/                # 静态资源
│   └── images/           # 图片资源
├── content/              # 内容文件
└── package.json          # 项目配置
```

### 2.1.2 准备 .cursorrules 文件

创建 `.cursorrules` 文件来定义项目的编码规范：

```yaml
# .cursorrules
version: 1.0

# 代码风格
style:
  typescript:
    semi: false              # 不使用分号
    singleQuote: true       # 使用单引号
    trailingComma: 'es5'    # ES5 风格的尾逗号
    tabWidth: 2             # 缩进宽度
    printWidth: 80          # 每行最大长度

# 组件规范
components:
  - 使用函数式组件
  - 使用 TypeScript
  - 使用 CSS Modules 或 Tailwind
  - 组件文件使用 PascalCase 命名

# 文件组织
structure:
  - 相关组件放在同一目录
  - 共享组件放在 components/ui
  - 页面组件放在 app 目录
  - 工具函数放在 lib 目录
```

## 2.2 网页开发

### 2.2.1 实现功能需求

1. **创建布局组件**

```typescript
// src/components/layout/Layout.tsx
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
```

2. **实现导航栏**

```typescript
// src/components/layout/Header.tsx
export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 
                      dark:bg-gray-900/80">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <Navigation />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
```

3. **创建主页面区块**

```typescript
// src/components/sections/Hero.tsx
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold">
          你好，我是
          <span className="text-primary-500">开发者</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          专注于创建美观、实用的网页应用
        </p>
      </motion.div>
    </section>
  )
}
```

### 2.2.2 测试与适配

1. **响应式测试**

```typescript
// src/components/ui/ResponsiveWrapper.tsx
export function ResponsiveWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      w-full
      px-4 sm:px-6 md:px-8
      max-w-7xl
      mx-auto
    ">
      {children}
    </div>
  )
}
```

2. **深色模式支持**

```typescript
// src/components/ui/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
      aria-label="切换主题"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  )
}
```

3. **性能优化**

```typescript
// src/components/ui/Image.tsx
import NextImage from 'next/image'

export function Image({ src, alt, ...props }: ImageProps) {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <NextImage
        src={src}
        alt={alt}
        quality={90}
        placeholder="blur"
        {...props}
      />
    </div>
  )
}
```

### 2.2.3 发布上线

当你把官网和页面交互做好以后，通常还会继续补一层展示素材，比如产品 demo 视频、首页动效配乐和社媒短片里要用到的音频内容。如果你正在整理这类素材，可以顺手看一下我们的[开发者资源推荐页](/resources/)。其中提到的 [Musikalis](https://musikalis.com/) 更偏向 AI 音乐生成和可商用音轨，和独立开发者常见的 landing page、演示视频、品牌内容制作场景是能接上的。

1. **构建项目**

```bash
# 构建生产版本
npm run build

# 本地预览生产版本
npm run start
```

2. **部署到 Vercel**

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署项目
vercel
```

3. **配置自定义域名**

- 在 Vercel 控制台添加域名
- 配置 DNS 记录
- 等待 SSL 证书生成

## 常见问题

### 1. 样式问题
- 检查 Tailwind 配置
- 确保类名正确
- 验证响应式断点

### 2. 构建问题
- 清理缓存
- 更新依赖
- 检查控制台错误

### 3. 部署问题
- 验证环境变量
- 检查构建日志
- 确认域名配置

::: tip 提示
- 使用 Cursor AI 加速开发
- 保持代码整洁
- 定���更新依赖
:::

::: warning 注意
- 备份重要数据
- 测试跨浏览器兼容性
- 注意性能优化
::: 
