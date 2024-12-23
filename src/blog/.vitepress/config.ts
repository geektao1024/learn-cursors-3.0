import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Cursor教程博客',
  description: 'Learn Cursor提供最全面的Cursor教程，从安装设置到高级应用，深入讲解AI编程助手的所有功能与使用技巧。',
  base: '/blog/',
  srcDir: '.',
  outDir: '../../dist/blog',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' }
    ]
  }
}) 