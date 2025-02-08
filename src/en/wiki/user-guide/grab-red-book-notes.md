---
title: Xiaohongshu Viral Notes Data Collection and Analysis
description: Develop a Xiaohongshu note scraping tool based on Node.js technology stack to analyze viral content characteristics and perform data mining.
---

# Xiaohongshu Viral Notes Data Collection and Analysis

## Project Overview

This tutorial will guide you through developing a professional Xiaohongshu data collection and analysis tool. The tool has the following core features:

- Automated viral note data collection
- Deep analysis of viral content characteristics
- Data export and visualization
- Automatic analysis report generation

## Technical Solution

To achieve efficient and stable data collection and analysis, we use the following technology stack:

Backend Technology:

- Node.js runtime environment
- TypeScript type system
- Puppeteer automation
- Express API service
- MongoDB data storage

Frontend Display:

- React component development
- Chart.js data visualization

## Development Process

### 1. Environment Setup

First, create the project and install dependencies:

```bash
mkdir redbook-scraper
cd redbook-scraper
npm init -y
npm install typescript ts-node @types/node puppeteer express mongodb
npm install -D nodemon @types/express
```

### 2. Directory Structure Design

Organize code using a modular directory structure:

```
redbook-scraper/
├── src/
│   ├── config/      # Configuration files
│   ├── models/      # Data models
│   ├── services/    # Core services
│   ├── utils/       # Utility functions
│   └── index.ts     # Entry file
├── data/            # Data storage
├── logs/            # Log files
└── tsconfig.json    # TS configuration
```

### 3. System Configuration

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

### 4. Data Modeling

Data model design adopts a modular approach, including models for notes, users, statistics, and more:

```typescript
// src/models/Note.ts
import { ObjectId } from 'mongodb'
import { z } from 'zod' // Use Zod for runtime type validation

// Note model validation schema
const NoteSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  noteId: z.string().min(1),
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  images: z.array(z.string().url()),
  likes: z.number().int().min(0),
  comments: z.number().int().min(0),
  shares: z.number().int().min(0),
  author: z.object({
    id: z.string(),
    name: z.string(),
    followers: z.number().int().min(0)
  }),
  tags: z.array(z.string()),
  createdAt: z.date(),
  scrapedAt: z.date(),
  // Additional fields
  location: z.string().optional(),
  device: z.string().optional(),
  topics: z.array(z.string()).optional(),
  mentions: z.array(z.string()).optional(),
  products: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number().optional()
  })).optional()
})

// Export type
export type Note = z.infer<typeof NoteSchema>

// Database index design
export const NoteIndexes = [
  { key: { noteId: 1 }, unique: true },
  { key: { createdAt: -1 } },
  { key: { 'author.id': 1 } },
  { key: { tags: 1 } },
  { key: { likes: -1 } }
] as const

// User model
export interface User {
  _id?: ObjectId
  userId: string
  nickname: string
  avatar: string
  followers: number
  following: number
  notes: number
  verified: boolean
  verifiedType?: string
  description?: string
  location?: string
  createdAt: Date
  updatedAt: Date
}

// Statistics model
export interface Stats {
  _id?: ObjectId
  date: Date
  totalNotes: number
  totalUsers: number
  avgLikes: number
  avgComments: number
  avgShares: number
  topTags: Array<{
    tag: string
    count: number
  }>
  topAuthors: Array<{
    userId: string
    noteCount: number
    totalEngagement: number
  }>
  updatedAt: Date
}
```

### 5. Data Collection Service

The collection service implements multiple advanced features:

```typescript
import type { Note } from '../../models/Note'
// src/services/scraper/index.ts
import puppeteer from 'puppeteer'
import { config } from '../../config/config'
import { Logger } from '../../utils/logger'
import { retry } from '../../utils/retry'
import { sanitize } from '../../utils/sanitizer'
import { validate } from '../../utils/validator'
import { ProxyManager } from '../proxy'
import { RateLimiter } from '../ratelimit'
import { UserAgentManager } from '../useragent'

export class Scraper {
  private browser: puppeteer.Browser | null = null
  private proxyManager: ProxyManager
  private uaManager: UserAgentManager
  private rateLimiter: RateLimiter
  private logger: Logger

  constructor() {
    this.proxyManager = new ProxyManager()
    this.uaManager = new UserAgentManager()
    this.rateLimiter = new RateLimiter({
      maxRequests: 100,
      perMinute: 1
    })
    this.logger = new Logger('scraper')
  }

  async initialize() {
    const proxy = await this.proxyManager.getProxy()

    this.browser = await puppeteer.launch({
      headless: config.scraper.headless,
      args: [
        '--no-sandbox',
        `--proxy-server=${proxy.host}:${proxy.port}`,
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ],
      defaultViewport: {
        width: 1920,
        height: 1080
      }
    })
  }

  async scrapeNote(url: string): Promise<Note> {
    // 限流控制
    await this.rateLimiter.acquire()

    if (!this.browser)
      throw new Error('Browser not initialized')

    const page = await this.browser.newPage()

    try {
      // 设置请求拦截
      await page.setRequestInterception(true)
      page.on('request', (request) => {
        if (request.resourceType() === 'image') {
          request.abort()
        }
        else {
          request.continue()
        }
      })

      // 设置User-Agent
      await page.setUserAgent(this.uaManager.getRandomUA())

      // 设置超时
      await page.setDefaultNavigationTimeout(config.scraper.timeout)

      // 访问页面
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: config.scraper.timeout
      })

      // 等待内容加载
      await page.waitForSelector('.note-content', {
        timeout: config.scraper.timeout
      })

      // 提取数据
      const noteData = await page.evaluate(() => {
        const title = document.querySelector('.title')?.textContent
        const content = document.querySelector('.content')?.textContent
        const likes = document.querySelector('.likes')?.textContent
        const comments = document.querySelector('.comments')?.textContent
        const shares = document.querySelector('.shares')?.textContent
        const author = {
          id: document.querySelector('.author-id')?.getAttribute('data-id'),
          name: document.querySelector('.author-name')?.textContent,
          followers: document.querySelector('.followers')?.textContent
        }
        const tags = Array.from(
          document.querySelectorAll('.tag')
        ).map(tag => tag.textContent)
        const images = Array.from(
          document.querySelectorAll('.note-image')
        ).map(img => img.getAttribute('src'))

        return {
          title,
          content,
          likes: Number.parseInt(likes || '0'),
          comments: Number.parseInt(comments || '0'),
          shares: Number.parseInt(shares || '0'),
          author: {
            id: author.id || '',
            name: author.name || '',
            followers: Number.parseInt(author.followers || '0')
          },
          tags: tags.filter(Boolean) as string[],
          images: images.filter(Boolean) as string[]
        }
      })

      // 数据清洗
      const cleanData = sanitize(noteData)

      // 数据验证
      const validData = validate(cleanData)

      return {
        noteId: url.split('/').pop() || '',
        ...validData,
        createdAt: new Date(),
        scrapedAt: new Date()
      }
    }
    catch (error) {
      this.logger.error('Scrape failed:', error)
      throw error
    }
    finally {
      await page.close()
    }
  }

  // 批量采集
  async scrapeNotes(urls: string[]): Promise<Note[]> {
    const concurrency = config.scraper.maxConcurrency
    const results: Note[] = []

    // 并发控制
    for (let i = 0; i < urls.length; i += concurrency) {
      const batch = urls.slice(i, i + concurrency)
      const promises = batch.map(url =>
        retry(() => this.scrapeNote(url), {
          retries: 3,
          minTimeout: 1000,
          maxTimeout: 5000
        })
      )

      const batchResults = await Promise.allSettled(promises)

      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.push(result.value)
        }
        else {
          this.logger.error(
            `Failed to scrape ${batch[index]}:`,
            result.reason
          )
        }
      })

      // 批次间延迟
      await new Promise(resolve =>
        setTimeout(resolve, Math.random() * 2000 + 1000)
      )
    }

    return results
  }

  async close() {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
    }
  }
}
```

### 6. Data Analysis Engine

The data analysis engine provides multi-dimensional content analysis capabilities:

```typescript
// src/services/analyzer/index.ts
import { Note } from '../../models/Note'
import { Logger } from '../../utils/logger'
import { ImageAnalyzer } from '../image'
import { NLPService } from '../nlp'
import { StatisticsService } from '../statistics'

export class Analyzer {
  private nlp: NLPService
  private imageAnalyzer: ImageAnalyzer
  private statsService: StatisticsService
  private logger: Logger

  constructor() {
    this.nlp = new NLPService()
    this.imageAnalyzer = new ImageAnalyzer()
    this.statsService = new StatisticsService()
    this.logger = new Logger('analyzer')
  }

  // 互动数据分析
  async analyzeEngagement(note: Note) {
    try {
      const totalEngagement = note.likes + note.comments + note.shares
      const engagement = {
        total: totalEngagement,
        likeRatio: note.likes / totalEngagement,
        commentRatio: note.comments / totalEngagement,
        shareRatio: note.shares / totalEngagement,
        // 互动率计算
        engagementRate: totalEngagement / note.author.followers,
        // 时间维度
        hourOfDay: new Date(note.createdAt).getHours(),
        dayOfWeek: new Date(note.createdAt).getDay(),
        // 分类
        isViral: totalEngagement > 10000,
        hasHighEngagement: totalEngagement > 5000,
        // 互动质量
        qualityScore: this.calculateQualityScore(note)
      }

      // 历史数据对比
      const historical = await this.statsService.getHistoricalStats(note.author.id)

      return {
        ...engagement,
        // 相对表现
        performanceVsAvg: totalEngagement / historical.avgEngagement,
        trend: this.analyzeTrend(historical.engagements)
      }
    }
    catch (error) {
      this.logger.error('Engagement analysis failed:', error)
      throw error
    }
  }

  // 内容分析
  async analyzeContent(note: Note) {
    try {
      // 文本分析
      const textAnalysis = await this.nlp.analyze(note.content)

      // 图片分析
      const imageAnalysis = await Promise.all(
        note.images.map(img => this.imageAnalyzer.analyze(img))
      )

      return {
        text: {
          length: note.content.length,
          sentiment: textAnalysis.sentiment,
          keywords: textAnalysis.keywords,
          topics: textAnalysis.topics,
          readability: textAnalysis.readability,
          emoticons: textAnalysis.emoticons,
          language: textAnalysis.language
        },
        images: {
          count: note.images.length,
          types: imageAnalysis.map(img => img.type),
          colors: imageAnalysis.map(img => img.dominantColors),
          objects: imageAnalysis.map(img => img.detectedObjects),
          quality: imageAnalysis.map(img => img.qualityScore)
        },
        tags: {
          count: note.tags.length,
          categories: this.categorizeTags(note.tags),
          popularity: await this.statsService.getTagsPopularity(note.tags)
        },
        products: note.products?.map(product => ({
          ...product,
          category: this.categorizeProduct(product),
          priceRange: this.getPriceRange(product.price)
        }))
      }
    }
    catch (error) {
      this.logger.error('Content analysis failed:', error)
      throw error
    }
  }

  // 用户画像分析
  async analyzeAuthor(note: Note) {
    try {
      const authorStats = await this.statsService.getAuthorStats(note.author.id)

      return {
        profile: {
          followers: note.author.followers,
          followersGrowth: authorStats.followersGrowth,
          engagementRate: authorStats.avgEngagement / note.author.followers,
          postFrequency: authorStats.postFrequency,
          activeTime: authorStats.activeTimeDistribution
        },
        content: {
          topCategories: authorStats.topCategories,
          commonTags: authorStats.commonTags,
          writingStyle: await this.nlp.analyzeStyle(authorStats.recentPosts),
          imageStyle: await this.imageAnalyzer.analyzeStyle(authorStats.recentImages)
        },
        influence: {
          score: this.calculateInfluenceScore(authorStats),
          reach: this.calculateReach(authorStats),
          niche: this.identifyNiche(authorStats)
        }
      }
    }
    catch (error) {
      this.logger.error('Author analysis failed:', error)
      throw error
    }
  }

  private calculateQualityScore(note: Note): number {
    // 实现质量分数计算逻辑
    return 0
  }

  private analyzeTrend(engagements: number[]): string {
    // 实现趋势分析逻辑
    return 'up'
  }

  private categorizeTags(tags: string[]): Record<string, string[]> {
    // 实现标签分类逻辑
    return {}
  }

  private categorizeProduct(product: any): string {
    // 实现商品分类逻辑
    return ''
  }

  private getPriceRange(price?: number): string {
    // 实现价格区间划分逻辑
    return ''
  }

  private calculateInfluenceScore(stats: any): number {
    // 实现影响力分数计算逻辑
    return 0
  }

  private calculateReach(stats: any): number {
    // 实现触达范围计算逻辑
    return 0
  }

  private identifyNiche(stats: any): string {
    // 实现领域识别逻辑
    return ''
  }
}
```

### 7. Monitoring and Alert System

Implement comprehensive system monitoring:

```typescript
// src/services/monitor/index.ts
import { EventEmitter } from 'node:events'
import { Logger } from '../../utils/logger'
import { AlertManager } from './alert'
import { Metrics } from './metrics'

export class MonitoringSystem extends EventEmitter {
  private metrics: Metrics
  private alertManager: AlertManager
  private logger: Logger

  constructor() {
    super()
    this.metrics = new Metrics()
    this.alertManager = new AlertManager()
    this.logger = new Logger('monitor')

    this.setupEventHandlers()
  }

  private setupEventHandlers() {
    // 性能监控
    this.on('request', this.handleRequest.bind(this))
    this.on('error', this.handleError.bind(this))
    this.on('scrapeComplete', this.handleScrapeComplete.bind(this))

    // 资源监控
    this.on('cpuUsage', this.handleCPUUsage.bind(this))
    this.on('memoryUsage', this.handleMemoryUsage.bind(this))
    this.on('diskUsage', this.handleDiskUsage.bind(this))

    // 业务监控
    this.on('dataQuality', this.handleDataQuality.bind(this))
    this.on('scrapeFail', this.handleScrapeFail.bind(this))
    this.on('proxyFail', this.handleProxyFail.bind(this))
  }

  // 处理请求事件
  private async handleRequest(data: any) {
    try {
      await this.metrics.recordRequest(data)

      if (data.duration > 5000) {
        await this.alertManager.sendAlert({
          level: 'warning',
          title: '请求响应时间过长',
          message: `请求 ${data.url} 响应时间为 ${data.duration}ms`
        })
      }
    }
    catch (error) {
      this.logger.error('Failed to handle request event:', error)
    }
  }

  // 处理错误事件
  private async handleError(error: any) {
    try {
      await this.metrics.recordError(error)

      await this.alertManager.sendAlert({
        level: 'error',
        title: '系统错误',
        message: error.message,
        stack: error.stack
      })
    }
    catch (err) {
      this.logger.error('Failed to handle error event:', err)
    }
  }

  // 处理采集完成事件
  private async handleScrapeComplete(data: any) {
    try {
      await this.metrics.recordScrape(data)

      if (data.failureRate > 0.1) {
        await this.alertManager.sendAlert({
          level: 'warning',
          title: '采集失败率过高',
          message: `当前采集失败率为 ${data.failureRate}`
        })
      }
    }
    catch (error) {
      this.logger.error('Failed to handle scrape complete event:', error)
    }
  }

  // ... 其他事件处理方法
}
```

## Usage Guide

### 1. Start Service

```bash
npm run dev
```

### 2. API Call

```bash
curl -X POST http://localhost:3000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.xiaohongshu.com/note/..."}'
```

## System Optimization

### 1. Anti-Scraping Strategy

To ensure data collection stability, implement the following optimizations:

- Dynamic delay control
- User Agent rotation
- IP proxy pool
- Intelligent CAPTCHA handling

```typescript
// Intelligent delay control
async function randomDelay() {
  const delay = Math.floor(Math.random() * 2000) + 1000
  await new Promise(resolve => setTimeout(resolve, delay))
}
```

### 2. Data Backup

Implement automated data backup mechanism:

```typescript
import { readFileSync, writeFileSync } from 'node:fs'
// src/utils/backup.ts
import { MongoClient } from 'mongodb'

export async function backupData() {
  const client = await MongoClient.connect(config.mongodb.url)
  const db = client.db(config.mongodb.dbName)

  const notes = await db.collection('notes').find().toArray()

  writeFileSync(
    `./data/backup-${Date.now()}.json`,
    JSON.stringify(notes, null, 2)
  )

  await client.close()
}
```

### 3. Fault Tolerance

Implement intelligent retry strategy:

```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3
): Promise<T> {
  try {
    return await fn()
  }
  catch (error) {
    if (retries > 0) {
      await randomDelay()
      return withRetry(fn, retries - 1)
    }
    throw error
  }
}
```

## Advanced Features

### 1. Data Visualization

Build analysis dashboard based on React and Chart.js:

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
    </div>
  )
}
```

### 2. Scheduled Tasks

Integrate automated collection tasks:

```typescript
import cron from 'node-cron'

// Execute at 2 AM daily
cron.schedule('0 2 * * *', async () => {
  try {
    await scraper.initialize()
    // Execute collection task
    await scraper.close()
  }
  catch (error) {
    console.error('Cron job failed:', error)
  }
})
```

## Common Issues and Solutions

### 1. Collection Exceptions

- Network connection check
- URL format validation
- Anti-scraping measures handling

### 2. Data Integrity

- Load timeout optimization
- Selector maintenance
- Page structure validation

### 3. Performance Tuning

- Database connection pool
- Caching strategy
- Query optimization

::: tip Best Practices

- Follow platform rules
- Control request frequency reasonably
- Maintain and update regularly
  :::

::: warning Important Reminders

- Data security protection
- Compliance requirements
- Risk control strategy handling
  :::
