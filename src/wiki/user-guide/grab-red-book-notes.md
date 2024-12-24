---
title: 爆款小红书笔记抓取
description: 使用 Cursor AI 开发一个小红书笔记抓取工具，帮助分析爆款内容特征。
---

# 爆款小红书笔记抓取

<!-- ![Scraper Preview](./images/guide/redbook-scraper.png) -->

## 项目概述

在这个教程中，我们将开发一个小红书笔记抓取工具，用于：

- 抓取爆款笔记内容
- 分析爆款特征
- 导出数据分析
- 生成报告

## 技术栈选择

我们将使用以下技术：

- Node.js
- TypeScript
- Puppeteer
- Express
- MongoDB
- React (前端展示)

## 开发步骤

### 1. 项目初始化

创建项目并安装依赖：

```bash
mkdir redbook-scraper
cd redbook-scraper
npm init -y
npm install typescript ts-node @types/node puppeteer express mongodb
npm install -D nodemon @types/express
```

### 2. 项目结构

```
redbook-scraper/
├── src/
│   ├── config/
│   │   └── config.ts
│   ├── models/
│   │   └── Note.ts
│   ├── services/
│   │   ├── scraper.ts
│   │   └── analyzer.ts
│   ├── utils/
│   │   └── helpers.ts
│   └── index.ts
├── data/
├── logs/
└── tsconfig.json
```

### 3. 配置文件

```typescript
// src/config/config.ts
export const config = {
  mongodb: {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/redbook',
    dbName: 'redbook'
  },
  scraper: {
    headless: true,
    timeout: 30000,
    userAgent: 'Mozilla/5.0 ...'
  },
  api: {
    port: process.env.PORT || 3000
  }
}
```

### 4. 数据模型

```typescript
// src/models/Note.ts
import { ObjectId } from 'mongodb'

export interface Note {
  _id?: ObjectId
  noteId: string
  title: string
  content: string
  images: string[]
  likes: number
  comments: number
  shares: number
  author: {
    id: string
    name: string
    followers: number
  }
  tags: string[]
  createdAt: Date
  scrapedAt: Date
}
```

### 5. 爬虫服务

```typescript
// src/services/scraper.ts
import puppeteer from 'puppeteer'
import { config } from '../config/config'

export class Scraper {
  private browser: puppeteer.Browser | null = null

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: config.scraper.headless,
      args: ['--no-sandbox']
    })
  }

  async scrapeNote(url: string): Promise<Note> {
    if (!this.browser) throw new Error('Browser not initialized')

    const page = await this.browser.newPage()
    await page.setUserAgent(config.scraper.userAgent)

    try {
      await page.goto(url, { waitUntil: 'networkidle0' })

      // 等待内容加载
      await page.waitForSelector('.note-content')

      // 提取数据
      const noteData = await page.evaluate(() => {
        const title = document.querySelector('.title')?.textContent
        const content = document.querySelector('.content')?.textContent
        const likes = document.querySelector('.likes')?.textContent
        // ... 提取其他数据

        return {
          title,
          content,
          likes: parseInt(likes || '0'),
          // ... 其他数据
        }
      })

      return {
        noteId: url.split('/').pop() || '',
        ...noteData,
        scrapedAt: new Date()
      }
    } finally {
      await page.close()
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
    }
  }
}
```

### 6. 数据分析服务

```typescript
// src/services/analyzer.ts
export class Analyzer {
  analyzeEngagement(note: Note) {
    const engagement = {
      total: note.likes + note.comments + note.shares,
      likeRatio: note.likes / (note.likes + note.comments + note.shares),
      commentRatio: note.comments / (note.likes + note.comments + note.shares),
      shareRatio: note.shares / (note.likes + note.comments + note.shares)
    }

    return {
      ...engagement,
      isViral: engagement.total > 10000,
      hasHighEngagement: engagement.total > 5000
    }
  }

  analyzeContent(note: Note) {
    return {
      length: note.content.length,
      hasImages: note.images.length > 0,
      imageCount: note.images.length,
      topTags: note.tags.slice(0, 5),
      // ... 其他内容分析
    }
  }
}
```

### 7. API 实现

```typescript
// src/index.ts
import express from 'express'
import { Scraper } from './services/scraper'
import { Analyzer } from './services/analyzer'
import { config } from './config/config'

const app = express()
const scraper = new Scraper()
const analyzer = new Analyzer()

app.use(express.json())

app.post('/api/scrape', async (req, res) => {
  try {
    const { url } = req.body
    const note = await scraper.scrapeNote(url)
    const analysis = {
      engagement: analyzer.analyzeEngagement(note),
      content: analyzer.analyzeContent(note)
    }
    
    res.json({ note, analysis })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(config.api.port, () => {
  console.log(`Server running on port ${config.api.port}`)
})
```

## 使用说明

### 1. 启动服务

```bash
npm run dev
```

### 2. 调用 API

```bash
curl -X POST http://localhost:3000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.xiaohongshu.com/note/..."}'
```

## 注意事项

### 1. 反爬虫处理

- 添加随机延迟
- 轮换 User Agent
- 使用代理 IP
- 处理验证码

```typescript
// 添加随机延迟
async function randomDelay() {
  const delay = Math.floor(Math.random() * 2000) + 1000
  await new Promise(resolve => setTimeout(resolve, delay))
}
```

### 2. 数据存储

定期备份数据：

```typescript
// src/utils/backup.ts
import { MongoClient } from 'mongodb'
import fs from 'fs'

export async function backupData() {
  const client = await MongoClient.connect(config.mongodb.url)
  const db = client.db(config.mongodb.dbName)
  
  const notes = await db.collection('notes').find().toArray()
  
  fs.writeFileSync(
    `./data/backup-${Date.now()}.json`,
    JSON.stringify(notes, null, 2)
  )
  
  await client.close()
}
```

### 3. 错误处理

实现重试机制：

```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (retries > 0) {
      await randomDelay()
      return withRetry(fn, retries - 1)
    }
    throw error
  }
}
```

## 进阶功能

### 1. 数据可视化

使用 React 和 Chart.js 创建数据仪表板：

```typescript
// frontend/src/components/Dashboard.tsx
import { Line } from 'react-chartjs-2'

export function Dashboard({ data }) {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [{
      label: '互动量趋势',
      data: data.map(d => d.engagement.total)
    }]
  }

  return (
    <div className="dashboard">
      <Line data={chartData} />
      {/* 其他图表和统计 */}
    </div>
  )
}
```

### 2. 自动化任务

使用 cron 定时抓取：

```typescript
import cron from 'node-cron'

// 每天凌晨 2 点运行
cron.schedule('0 2 * * *', async () => {
  try {
    await scraper.initialize()
    // 执行抓取任务
    await scraper.close()
  } catch (error) {
    console.error('Cron job failed:', error)
  }
})
```

## 常见问题

### 1. 抓取失败
- 检查网络连接
- 验证 URL 格式
- 检查反爬虫措施

### 2. 数据不完整
- 增加等待时间
- 检查选择器
- 验证页面结构

### 3. 性能问题
- 使用连接池
- 实现缓存
- 优化查询

::: tip 提示
- 遵守网站规则
- 合理控制频率
- 定期更新代码
:::

::: warning 注意
- 保护用户隐私
- 遵守法律法规
- 防止 IP 封禁
::: 