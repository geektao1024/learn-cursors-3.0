import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cursor教程博客",
  description: "Learn Cursor提供最全面的Cursor教程，从安装设置到高级应用，深入讲解AI编程助手的所有功能与使用技巧。",
  
  head: [
    ['link', { rel: 'canonical', href: 'https://learn-cursor.com/blog/' }]
  ],

  themeConfig: {
    nav: [{ text: "首页", link: "/" }],

    socialLinks: [
      { icon: "github", link: "https://github.com/wanghuihua" },
    ],

    footer: {
      message: "用 AI 智能编程，写出更好的代码",
      copyright: "Copyright © 2024 Cursor AI 教程社区"
    },
  },

  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPHome\.vue$/,
          replacement: fileURLToPath(
            new URL("./components/Home.vue", import.meta.url)
          ),
        },
      ],
    },
  },
});
