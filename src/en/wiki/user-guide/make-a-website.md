---
title: Creating a Personal Portfolio Website
description: Use Cursor AI to quickly build a modern personal portfolio website with responsive design and beautiful animation effects.
---

# Creating a Personal Portfolio Website

<!-- ![Website Preview](./images/guide/website-preview.png) -->

## 2.1 Preparation

### 2.1.1 Create New Project

First, let's create a new project folder and initialize the project:

```bash
# Create project folder
mkdir my-portfolio
cd my-portfolio

# Initialize Next.js project
npx create-next-app@latest . --typescript --tailwind --app --src-dir
```

Recommended project structure:

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Layout file
│   │   ├── page.tsx        # Main page
│   │   └── globals.css     # Global styles
│   ├── components/         # Components directory
│   │   ├── ui/            # UI components
│   │   ├── layout/        # Layout components
│   │   └── sections/      # Page sections
│   ├── lib/               # Utility functions
│   └── styles/            # Style files
├── public/                # Static assets
│   └── images/           # Image assets
├── content/              # Content files
└── package.json          # Project configuration
```

### 2.1.2 Prepare .cursorrules File

Create a `.cursorrules` file to define project coding standards:

```yaml
# .cursorrules
version: 1.0

# Code style
style:
  typescript:
    semi: false # No semicolons
    singleQuote: true # Use single quotes
    trailingComma: es5 # ES5 style trailing commas
    tabWidth: 2 # Indentation width
    printWidth: 80 # Maximum line length

# Component standards
components:
  - Use functional components
  - Use TypeScript
  - Use CSS Modules or Tailwind
  - Use PascalCase for component files

# File organization
structure:
  - Related components in same directory
  - Shared components in components/ui
  - Page components in app directory
  - Utility functions in lib directory
```

## 2.2 Website Development

### 2.2.1 Implementing Features

1. **Create Layout Component**

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

2. **Implement Navigation Bar**

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

3. **Create Main Page Sections**

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
          Hi, I'm a
          <span className="text-primary-500">Developer</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Focused on creating beautiful and functional web applications
        </p>
      </motion.div>
    </section>
  )
}
```

### 2.2.2 Testing and Adaptation

1. **Responsive Testing**

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

2. **Dark Mode Support**

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
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  )
}
```

3. **Performance Optimization**

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

### 2.2.3 Deployment

1. **Build Project**

```bash
# Build production version
npm run build

# Preview production version locally
npm run start
```

2. **Deploy to Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy project
vercel
```

3. **Configure Custom Domain**

- Add domain in Vercel dashboard
- Configure DNS records
- Wait for SSL certificate generation

## Common Issues

### 1. Style Issues

- Check Tailwind configuration
- Ensure class names are correct
- Verify responsive breakpoints

### 2. Build Issues

- Clear cache
- Update dependencies
- Check console errors

### 3. Deployment Issues

- Verify environment variables
- Check build logs
- Confirm domain settings

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
