---
title: 我搭建了一个中文翻译的 Cursor 教程网站
description: 记录从 0 到 1 搭建 Cursor 中文教程网站的全过程，分享技术选型、翻译经验和项目规划。
date: 2024-01-27
author: Claude
tags: ['Cursor', 'Documentation', 'Translation', 'VitePress', 'Technical Writing']
image: /blog/assets/cursor-docs-guide.png
---

[[toc]]

## 写在前面

还记得我第一次接触 Cursor 的时候，被它强大的 AI 辅助编程功能惊艳到了。作为一个经常在 GitHub 上逛逛的开发者，我发现越来越多的小伙伴也开始尝试使用 Cursor。但是呢，和很多优秀的开源工具一样，Cursor 只有英文文档，这对于很多中文开发者来说多少有点不太友好。

于是我就在想，要是能有一个中文版的教程网站就好了。想着想着，干脆自己动手做一个吧！这篇文章就来和大家分享一下这个项目的故事。

## 聊聊这个项目

说实话，刚开始的时候我也没想太多，就是想把官方文档翻译一下。但是做着做着，发现这里面有不少有意思的东西可以聊：

### 翻译的内容
我把整个项目分成了几个部分：
- 把 Cursor 的官方文档翻译成中文（这是基础）
- 写一些实用的使用指南（毕竟文档有时候太官方了）
- 收集一些实际使用案例（这个最实用）
- 整理常见问题的解答（踩过的坑不能白踩）

### 代码在哪里？
如果你也想参与进来，可以直接访问：
- 中文文档项目：[cursor-docs-zh](https://github.com/wanghuihua/learn-cursors-3.0)
- 在线文档：[learn-cursor.com](https://learn-cursor.com)

## 技术选型的一些思考

选择合适的技术栈其实挺重要的，我在这块儿花了不少心思。最后用的都是些现在比较流行的工具：

### 主要用到的框架
- **VitePress**：这个是尤大大开发的文档工具，用起来特别顺手
- **Vue 3**：需要做一些交互的地方，Vue 最合适不过了
- **TypeScript**：写代码的时候不用担心类型问题，爽！

### 部署这块儿
- **GitHub Pages**：免费、稳定，而且和我们的工作流特别配
- **GitHub Actions**：提交代码后自动构建部署，不用操心
- **Cloudflare**：国内访问速度快了不少

### 翻译工具
- 用了 OpenAI 的 API 帮忙翻译初稿
- 自己搭了个小工具管理专业术语，确保翻译的一致性

## 项目的一些特色

说说这个项目有什么特别的地方：

### 1. 本土化的体验
- 严格遵循中文排版规范（强迫症福音）
- 按照国内开发者的习惯组织内容
- 代码示例也都本地化了（再也不用看蹩脚的翻译）

### 2. 互动性拉满
- 做了个在线编辑器（边看边试，不要太爽）
- 录了一些演示视频（看视频比看文字直观多了）
- 可以实时看到效果（这个真的很重要）

### 3. 社区氛围
- 加了评论功能（有问题随时讨论）
- 可以直接反馈问题（发现bug秒修）
- 欢迎提出改进建议（一起把文档做得更好）

## 翻译的那些事儿

翻译工作说难不难，说简单也不简单。我是这么规划的：

1. **先做规划**
   - 哪些内容先翻译（重要的先来）
   - 整理专业术语表（这个很重要）
   - 定好翻译的规则（统一风格）

2. **开始翻译**
   - 先用 AI 翻译一遍（省时省力）
   - 人工优化一下（机器翻译总有不太对的地方）
   - 专业术语要特别注意（这个必须准确）

3. **严格把关**
   - 找人帮忙审核（多个人看看总是好的）
   - 检查技术细节（这个必须严谨）
   - 语言要通顺（读起来要舒服）

## 遇到的坑和解决办法

做这个项目的过程中也遇到了不少问题，和大家分享一下：

### 1. 术语不统一的问题
很多新概念在中文里没有统一的说法，这个挺头疼的。后来我整理了一个术语表，参考了一些主流的翻译，总算解决了这个问题。

### 2. 文档更新太快
官方文档经常更新，我们的翻译要跟上节奏。为此专门写了个自动检测的工具，有更新立马就知道。

### 3. 翻译质量的问题
说实话，翻译的质量真的很重要。我们建立了一个多层次的审核机制，确保每一篇翻译都达到标准。

## 目前的进度

### 已经完成的
- [x] 基础框架已经搭好了
- [x] 核心文档都翻译完了
- [x] 基本功能都能用了

### 正在进行中
- [ ] 一些高级特性的文档还在翻译
- [ ] 正在本地化更多的代码示例
- [ ] 收集社区的反馈意见

## 未来的计划

这个项目还有很多可以做的事情：

1. **内容方面**
   - 多写一些实战案例（实践出真知）
   - 准备一些视频教程（有些东西看视频更容易理解）
   - 把社区的经验也整理进来（集思广益）

2. **功能方面**
   - 搜索功能要做得更智能
   - 加个在线编辑的功能（这个呼声很高）
   - 手机上看的体验要优化一下

3. **社区方面**
   - 组建一个翻译者团队
   - 定期组织线上交流
   - 多听听大家的意见

## 一起来贡献

如果你也对这个项目感兴趣，欢迎加入我们：

1. **参与翻译**
   - 帮忙翻译文档
   - 改进现有的翻译
   - 参与审核工作

2. **技术支持**
   - 帮忙开发网站功能
   - 改进我们的工具
   - 写一些自动化脚本

3. **内容创作**
   - 写一些使用教程
   - 分享你的使用经验
   - 提供实用的代码示例

## 写在最后

说实话，做这个项目的初衷很简单，就是想让更多中文开发者能更好地使用 Cursor。现在看来，这不仅仅是一个文档翻译项目，更是在打造一个 Cursor 的中文社区。希望通过我们的努力，能让更多人感受到 Cursor 的魅力。

## 相关链接

- [Cursor 官网](https://cursor.sh)（官方网站，新功能都在这里发布）
- [Cursor GitHub](https://github.com/getcursor/cursor)（源码在这里，感兴趣的可以研究研究）
- [中文文档](https://learn-cursor.com)（我们的劳动成果）

## 关于我

平时就是个爱折腾的程序员，特别喜欢研究提高开发效率的工具。如果你也对这些感兴趣，欢迎交流：

- GitHub：[@wanghuihua](https://github.com/wanghuihua)（代码都在这里）
- Email：wanghuihua@example.com（有问题随时联系）
- Twitter：[@wanghuihua](https://twitter.com/wanghuihua)（偶尔会分享一些心得） 