---
title: RED（小紅書）トレンド投稿データの収集と分析
description: Node.jsテクノロジースタックを使用してRED（小紅書）の投稿データを収集し、トレンドコンテンツの特徴を分析するツールの開発ガイド。
---

# RED（小紅書）トレンド投稿データの収集と分析

## プロジェクト概要

このチュートリアルでは、REDのデータ収集・分析ツールの開発方法を説明します。このツールには以下の主要な機能が含まれています：

- トレンド投稿データの自動収集
- トレンドコンテンツの特徴分析
- データのエクスポートと可視化
- 分析レポートの自動生成

## 技術スタック

効率的で安定したデータ収集と分析を実現するため、以下の技術スタックを採用します：

バックエンド技術：

- Node.js 実行環境
- TypeScript 型システム
- Puppeteer 自動化
- Express APIサービス
- MongoDB データストレージ

フロントエンド技術：

- React コンポーネント開発
- Chart.js データ可視化

## 開発フロー

### 1. 環境構築

まず、プロジェクトを作成し、必要な依存関係をインストールします：

```bash
mkdir redbook-scraper
cd redbook-scraper
npm init -y
npm install typescript ts-node @types/node puppeteer express mongodb
npm install -D nodemon @types/express
```

### 2. ディレクトリ構造

モジュール化されたディレクトリ構造でコードを整理します：

```
redbook-scraper/
├── src/
│   ├── config/      # 設定ファイル
│   ├── models/      # データモデル
│   ├── services/    # コアサービス
│   ├── utils/       # ユーティリティ関数
│   └── index.ts     # エントリーポイント
├── data/            # データストレージ
├── logs/            # ログファイル
└── tsconfig.json    # TS設定
```

### 3. システム設定

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

### 4. データモデリング

データモデルは、投稿、ユーザー、統計など複数のモデルを含むモジュール化された設計を採用します：

```typescript
// src/models/Note.ts
import { ObjectId } from 'mongodb'
import { z } from 'zod' // ランタイム型検証にZodを使用

// 投稿モデル検証スキーマ
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
  // 追加フィールド
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

// 型のエクスポート
export type Note = z.infer<typeof NoteSchema>

// データベースインデックス設計
export const NoteIndexes = [
  { key: { noteId: 1 }, unique: true },
  { key: { createdAt: -1 } },
  { key: { 'author.id': 1 } },
  { key: { tags: 1 } },
  { key: { likes: -1 } }
] as const

// ユーザーモデル
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

// 統計モデル
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

### 5. データ収集サービス

収集サービスには複数の高度な機能が実装されています：

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
    // レート制限
    await this.rateLimiter.acquire()

    if (!this.browser)
      throw new Error('Browser not initialized')

    const page = await this.browser.newPage()

    try {
      // リクエストインターセプトの設定
      await page.setRequestInterception(true)
      page.on('request', (request) => {
        if (request.resourceType() === 'image') {
          request.abort()
        }
        else {
          request.continue()
        }
      })

      // User-Agentの設定
      await page.setUserAgent(this.uaManager.getRandomUA())

      // タイムアウトの設定
      await page.setDefaultNavigationTimeout(config.scraper.timeout)

      // ページアクセス
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: config.scraper.timeout
      })

      // コンテンツの読み込み待機
      await page.waitForSelector('.note-content', {
        timeout: config.scraper.timeout
      })

      // データの抽出
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

      // データのクリーニング
      const cleanData = sanitize(noteData)

      // データの検証
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

  // バッチ収集
  async scrapeNotes(urls: string[]): Promise<Note[]> {
    const concurrency = config.scraper.maxConcurrency
    const results: Note[] = []

    // 並行制御
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

      // バッチ間のディレイ
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

### 6. データ分析エンジン

データ分析エンジンは多次元のコンテンツ分析機能を提供します：

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

  // エンゲージメント分析
  async analyzeEngagement(note: Note) {
    try {
      const totalEngagement = note.likes + note.comments + note.shares
      const engagement = {
        total: totalEngagement,
        likeRatio: note.likes / totalEngagement,
        commentRatio: note.comments / totalEngagement,
        shareRatio: note.shares / totalEngagement,
        // エンゲージメント率の計算
        engagementRate: totalEngagement / note.author.followers,
        // 時間軸
        hourOfDay: new Date(note.createdAt).getHours(),
        dayOfWeek: new Date(note.createdAt).getDay(),
        // 分類
        isViral: totalEngagement > 10000,
        hasHighEngagement: totalEngagement > 5000,
        // エンゲージメント品質
        qualityScore: this.calculateQualityScore(note)
      }

      // 履歴データとの比較
      const historical = await this.statsService.getHistoricalStats(note.author.id)

      return {
        ...engagement,
        // 相対パフォーマンス
        performanceVsAvg: totalEngagement / historical.avgEngagement,
        trend: this.analyzeTrend(historical.engagements)
      }
    }
    catch (error) {
      this.logger.error('Engagement analysis failed:', error)
      throw error
    }
  }

  // コンテンツ分析
  async analyzeContent(note: Note) {
    try {
      // テキスト分析
      const textAnalysis = await this.nlp.analyze(note.content)

      // 画像分析
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

  // ユーザープロファイル分析
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
    // 品質スコア計算ロジックの実装
    return 0
  }

  private analyzeTrend(engagements: number[]): string {
    // トレンド分析ロジックの実装
    return 'up'
  }

  private categorizeTags(tags: string[]): Record<string, string[]> {
    // タグ分類ロジックの実装
    return {}
  }

  private categorizeProduct(product: any): string {
    // 商品分類ロジックの実装
    return ''
  }

  private getPriceRange(price?: number): string {
    // 価格帯分類ロジックの実装
    return ''
  }

  private calculateInfluenceScore(stats: any): number {
    // 影響力スコア計算ロジックの実装
    return 0
  }

  private calculateReach(stats: any): number {
    // リーチ計算ロジックの実装
    return 0
  }

  private identifyNiche(stats: any): string {
    // ニッチ特定ロジックの実装
    return ''
  }
}
```

### 7. モニタリングシステム

システム全体のモニタリングを実装：

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
    // パフォーマンスモニタリング
    this.on('request', this.handleRequest.bind(this))
    this.on('error', this.handleError.bind(this))
    this.on('scrapeComplete', this.handleScrapeComplete.bind(this))

    // リソースモニタリング
    this.on('cpuUsage', this.handleCPUUsage.bind(this))
    this.on('memoryUsage', this.handleMemoryUsage.bind(this))
    this.on('diskUsage', this.handleDiskUsage.bind(this))

    // ビジネスモニタリング
    this.on('dataQuality', this.handleDataQuality.bind(this))
    this.on('scrapeFail', this.handleScrapeFail.bind(this))
    this.on('proxyFail', this.handleProxyFail.bind(this))
  }

  // リクエストイベントの処理
  private async handleRequest(data: any) {
    try {
      await this.metrics.recordRequest(data)

      if (data.duration > 5000) {
        await this.alertManager.sendAlert({
          level: 'warning',
          title: 'リクエスト応答時間が長すぎます',
          message: `リクエスト ${data.url} の応答時間は ${data.duration}ms です`
        })
      }
    }
    catch (error) {
      this.logger.error('Failed to handle request event:', error)
    }
  }

  // エラーイベントの処理
  private async handleError(error: any) {
    try {
      await this.metrics.recordError(error)

      await this.alertManager.sendAlert({
        level: 'error',
        title: 'システムエラー',
        message: error.message,
        stack: error.stack
      })
    }
    catch (err) {
      this.logger.error('Failed to handle error event:', err)
    }
  }

  // スクレイピング完了イベントの処理
  private async handleScrapeComplete(data: any) {
    try {
      await this.metrics.recordScrape(data)

      if (data.failureRate > 0.1) {
        await this.alertManager.sendAlert({
          level: 'warning',
          title: 'スクレイピング失敗率が高すぎます',
          message: `現在の失敗率は ${data.failureRate} です`
        })
      }
    }
    catch (error) {
      this.logger.error('Failed to handle scrape complete event:', error)
    }
  }

  // ... その他のイベントハンドラー
}
```

## 使用方法

### 1. サービスの起動

```bash
npm run dev
```

### 2. APIの呼び出し

```bash
curl -X POST http://localhost:3000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.xiaohongshu.com/note/..."}'
```

## システム最適化

### 1. アンチスクレイピング対策

データ収集の安定性を確保するため、以下の最適化を実装：

- 動的遅延制御
- User Agent ローテーション
- IPプロキシプール
- キャプチャの自動処理

```typescript
// インテリジェント遅延制御
async function randomDelay() {
  const delay = Math.floor(Math.random() * 2000) + 1000
  await new Promise(resolve => setTimeout(resolve, delay))
}
```

### 2. データバックアップ

自動データバックアップメカニズムの実装：

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

### 3. エラー処理メカニズム

インテリジェントなリトライ戦略の実装：

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

## 高度な機能

### 1. データ可視化

ReactとChart.jsを使用した分析ダッシュボードの構築：

```typescript
// frontend/src/components/Dashboard.tsx
import { Line } from 'react-chartjs-2'

export function Dashboard({ data }) {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [{
      label: 'エンゲージメントトレンド',
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

### 2. 定期タスク

自動収集タスクの統合：

```typescript
import cron from 'node-cron'

// 毎日午前2時に実行
cron.schedule('0 2 * * *', async () => {
  try {
    await scraper.initialize()
    // 収集タスクの実行
    await scraper.close()
  }
  catch (error) {
    console.error('Cron job failed:', error)
  }
})
```

## よくある問題と解決方法

### 1. 収集の異常

- ネットワーク接続の確認
- URL形式の検証
- アンチスクレイピング対策

### 2. データの完全性

- 読み込みタイムアウトの最適化
- セレクターのメンテナンス
- ページ構造の検証

### 3. パフォーマンスチューニング

- データベース接続プール
- キャッシュ戦略
- クエリ最適化

::: tip ベストプラクティス

- プラットフォームのルールを遵守
- 適切な頻度制御
- 定期的なメンテナンス
  :::

::: warning 重要な注意事項

- データセキュリティの保護
- コンプライアンス要件
- リスク管理戦略
  :::
