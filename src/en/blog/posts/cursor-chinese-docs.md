---
title: I Built a Chinese Translation Website for Cursor Tutorials
description: Recording the complete process of building a Chinese tutorial website for Cursor from 0 to 1, sharing technology selection, translation experience, and project planning.
date: 2024-01-27
author: Claude
tags: ['Cursor', 'Documentation', 'Translation', 'VitePress', 'Technical Writing']
image: /blog/assets/cursor-docs-guide.png
---

[[toc]]

## Introduction

I still remember when I first encountered Cursor, I was amazed by its powerful AI-assisted programming capabilities. As a developer who frequently browses GitHub, I've noticed more and more fellow developers starting to use Cursor. However, like many excellent open-source tools, Cursor only has English documentation, which isn't very friendly for many Chinese developers.

So I thought, wouldn't it be great to have a Chinese version of the tutorial website? Thinking about it, I decided to make one myself! This article will share the story of this project with everyone.

## About This Project

To be honest, I didn't think too much at the beginning, I just wanted to translate the official documentation. But as I worked on it, I found there were quite a few interesting things to discuss:

### Translation Content

I divided the entire project into several parts:

- Translating Cursor's official documentation into Chinese (this is the foundation)
- Writing practical usage guides (since documentation can be too formal sometimes)
- Collecting real use cases (this is most practical)
- Organizing answers to common questions (learning from past mistakes)

### Where's the Code?

If you want to get involved, you can directly visit:

- Chinese documentation project: [cursor-docs-zh](https://github.com/wanghuihua/learn-cursors-3.0)
- Online documentation: [learn-cursor.com](https://learn-cursor.com)

## Thoughts on Technology Selection

Choosing the right technology stack is quite important, and I put a lot of thought into this. I ended up using some currently popular tools:

### Main Frameworks Used

- **VitePress**: This documentation tool developed by Evan You is very user-friendly
- **Vue 3**: Perfect for interactive components
- **TypeScript**: No need to worry about type issues when coding, awesome!

### Deployment

- **GitHub Pages**: Free, stable, and perfectly matches our workflow
- **GitHub Actions**: Automatic build and deployment after code submission, no worries
- **Cloudflare**: Much faster access speed in China

### Translation Tools

- Used OpenAI's API to help with initial drafts
- Built a small tool to manage technical terms, ensuring translation consistency

## Project Features

Let's talk about what makes this project special:

### 1. Localized Experience

- Strictly follows Chinese typography standards (a blessing for perfectionists)
- Organizes content according to Chinese developers' habits
- Localized code examples (no more awkward translations)

### 2. Maximum Interactivity

- Created an online editor (try while you read, super convenient)
- Recorded some demo videos (videos are more intuitive than text)
- Real-time effect preview (this is really important)

### 3. Community Atmosphere

- Added comment functionality (discuss issues anytime)
- Direct feedback for issues (quick fixes for bugs)
- Welcome improvement suggestions (let's make the documentation better together)

## Translation Matters

Translation work isn't exactly hard, but it's not simple either. Here's how I planned it:

1. **Planning First**

   - Which content to translate first (priorities first)
   - Organize technical term glossary (this is important)
   - Set translation rules (unified style)

2. **Start Translation**

   - First pass with AI translation (saves time and effort)
   - Manual optimization (machine translation isn't always perfect)
   - Pay special attention to technical terms (must be accurate)

3. **Strict Quality Control**
   - Get help with review (more eyes are better)
   - Check technical details (must be rigorous)
   - Language must flow naturally (comfortable to read)

## Challenges and Solutions

We encountered quite a few issues during this project, let me share them:

### 1. Inconsistent Terminology

Many new concepts don't have unified Chinese translations, which was quite troublesome. Later, I compiled a terminology glossary, referencing some mainstream translations, which finally solved this problem.

### 2. Documentation Updates Too Fast

Official documentation updates frequently, and our translations need to keep up. We specifically created an automatic detection tool for this, so we know immediately when there are updates.

### 3. Translation Quality Issues

Honestly, translation quality is really important. We established a multi-level review mechanism to ensure each translation meets our standards.

## Current Progress

### Completed

- [x] Basic framework is set up
- [x] Core documentation is translated
- [x] Basic features are working

### In Progress

- [ ] Translating some advanced feature documentation
- [ ] Localizing more code examples
- [ ] Collecting community feedback

## Future Plans

This project still has a lot of potential:

1. **Content Aspects**

   - Write more practical cases (practice makes perfect)
   - Prepare video tutorials (some things are easier to understand with videos)
   - Incorporate community experiences (collective wisdom)

2. **Feature Aspects**

   - Make search functionality smarter
   - Add online editing functionality (high demand for this)
   - Optimize mobile viewing experience

3. **Community Aspects**
   - Build a translator team
   - Organize regular online discussions
   - Listen more to community opinions

## Join Us

If you're interested in this project, welcome to join us:

1. **Participate in Translation**

   - Help translate documentation
   - Improve existing translations
   - Participate in review work

2. **Technical Support**

   - Help develop website features
   - Improve our tools
   - Write automation scripts

3. **Content Creation**
   - Write usage tutorials
   - Share your experiences
   - Provide practical code examples

## Final Words

To be honest, the initial purpose of this project was simple - to help more Chinese developers better use Cursor. Now it seems this isn't just a documentation translation project, but rather building a Chinese Cursor community. We hope through our efforts, more people can experience the charm of Cursor.

## Related Links

- [Cursor Official Website](https://cursor.sh) (Official website, new features are released here)
- [Cursor GitHub](https://github.com/getcursor/cursor) (Source code here, check it out if you're interested)
- [Chinese Documentation](https://learn-cursor.com) (Our work results)

## About Me

I'm just a tinkerer who loves to explore tools that improve development efficiency. If you're interested in these things too, feel free to connect:

- GitHub: [@wanghuihua](https://github.com/wanghuihua) (Code is here)
- Email: wanghuihua@example.com (Contact me anytime)
- Twitter: [@wanghuihua](https://twitter.com/wanghuihua) (Occasionally share some insights)
