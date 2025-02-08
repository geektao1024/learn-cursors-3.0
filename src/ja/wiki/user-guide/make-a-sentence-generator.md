---
title: ウェブ名言ジェネレーターの作成
description: Cursor AIを使用して、テーマやスタイルに基づいて様々な種類の名言を生成できるスマートジェネレーターを開発します。
---

# ウェブ名言ジェネレーターの作成

<!-- ![Generator Preview](./images/guide/sentence-generator.png) -->

## プロジェクト概要

このチュートリアルでは、以下の機能を備えたスマート名言ジェネレーターを開発します：

- 複数のテーマに基づく名言生成
- スタイル化されたテキスト処理
- ワンクリックでコピー＆シェア
- 履歴管理
- AI駆動の最適化

## 技術スタック

以下の技術を使用します：

- Next.js 14
- TypeScript
- OpenAI API
- Tailwind CSS
- Prisma
- PostgreSQL
- Shadcn UI

## 開発手順

### 1. プロジェクトの初期化

Next.jsプロジェクトを作成します：

```bash
npx create-next-app@latest sentence-generator --typescript --tailwind --app
cd sentence-generator
npm install @prisma/client @radix-ui/react-icons openai
```

### 2. プロジェクト構造

```
sentence-generator/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── Generator.tsx
│   │   └── History.tsx
│   ├── lib/
│   │   ├── openai.ts
│   │   └── db.ts
│   └── types/
│       └── index.ts
├── prisma/
│   └── schema.prisma
└── next.config.js
```

### 3. データベースモデル

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Sentence {
  id        String   @id @default(cuid())
  content   String
  theme     String
  style     String
  likes     Int      @default(0)
  shares    Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Theme {
  id          String   @id @default(cuid())
  name        String
  description String?
  sentences   String[]
}

model Style {
  id          String   @id @default(cuid())
  name        String
  description String?
  template    String
}
```

### 4. OpenAI 統合

```typescript
// src/lib/openai.ts
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateSentence({
  theme,
  style,
  context
}: {
  theme: string
  style: string
  context?: string
}) {
  const prompt = `
    ${theme}に関する${style}スタイルの名言を生成してください。
    ${context ? `コンテキスト：${context}` : ''}
    要件：
    1. 簡潔で力強い
    2. 哲学的な深み
    3. テーマに適合
    4. スタイルに合致
  `

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: prompt }],
    model: 'gpt-4',
    temperature: 0.7,
    max_tokens: 100
  })

  return completion.choices[0].message.content
}
```

### 5. APIルート

```typescript
import { prisma } from '@/lib/db'
import { generateSentence } from '@/lib/openai'
// src/app/api/generate/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { theme, style, context } = await request.json()

    const sentence = await generateSentence({
      theme,
      style,
      context
    })

    // データベースに保存
    const saved = await prisma.sentence.create({
      data: {
        content: sentence,
        theme,
        style
      }
    })

    return NextResponse.json({ sentence: saved })
  }
  catch (error) {
    return NextResponse.json(
      { error: '名言の生成に失敗しました' },
      { status: 500 }
    )
  }
}
```

### 6. ジェネレーターコンポーネント

```typescript
// src/components/Generator.tsx
'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select } from './ui/select'
import { toast } from './ui/toast'

export function Generator() {
  const [theme, setTheme] = useState('')
  const [style, setStyle] = useState('励ます')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const handleGenerate = async () => {
    if (!theme) {
      toast({
        title: 'テーマを入力してください',
        variant: 'destructive'
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ theme, style })
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)

      setResult(data.sentence.content)
      toast({
        title: '生成成功',
        variant: 'success'
      })
    } catch (error) {
      toast({
        title: '生成失敗',
        description: error.message,
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    toast({
      title: 'クリップボードにコピーしました'
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="テーマを入力"
          value={theme}
          onChange={e => setTheme(e.target.value)}
        />
        <Select
          value={style}
          onValueChange={setStyle}
          options={[
            { label: '励ます', value: '励ます' },
            { label: '感傷的', value: '感傷的' },
            { label: 'ユーモア', value: 'ユーモア' },
            { label: '文学的', value: '文学的' }
          ]}
        />
      </div>

      <Button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full"
      >
        {loading ? '生成中...' : '名言を生成'}
      </Button>

      {result && (
        <div className="relative p-4 bg-gray-100 rounded-lg">
          <p className="text-lg">{result}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="absolute top-2 right-2"
          >
            コピー
          </Button>
        </div>
      )}
    </div>
  )
}
```

### 7. 履歴コンポーネント

```typescript
// src/components/History.tsx
'use client'

import { useEffect, useState } from 'react'
import { prisma } from '@/lib/db'
import { Button } from './ui/button'

export function History() {
  const [sentences, setSentences] = useState([])

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    const response = await fetch('/api/history')
    const data = await response.json()
    setSentences(data.sentences)
  }

  const handleLike = async (id: string) => {
    await fetch(`/api/sentences/${id}/like`, {
      method: 'POST'
    })
    fetchHistory()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">履歴</h2>

      <div className="space-y-2">
        {sentences.map(sentence => (
          <div
            key={sentence.id}
            className="p-4 bg-white rounded-lg shadow"
          >
            <p>{sentence.content}</p>
            <div className="flex gap-2 mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(sentence.id)}
              >
                👍 {sentence.likes}
              </Button>
              <span className="text-sm text-gray-500">
                {sentence.theme} · {sentence.style}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## デプロイ手順

### 1. 環境変数の設定

```env
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-..."
```

### 2. データベースマイグレーション

```bash
npx prisma migrate dev
```

### 3. Vercelへのデプロイ

1. GitHubにコードをプッシュ
2. Vercelでプロジェクトをインポート
3. 環境変数を設定
4. デプロイ

## 機能拡張

### 1. AI最適化提案

```typescript
// src/lib/optimize.ts
export async function optimizeSentence(sentence: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `以下の名言をより簡潔で力強くなるように最適化してください：\n${sentence}`
      }
    ],
    model: 'gpt-4',
    temperature: 0.5
  })

  return completion.choices[0].message.content
}
```

### 2. 感情分析

```typescript
// src/lib/analyze.ts
export async function analyzeSentiment(sentence: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `以下の名言の感情傾向を分析してください：\n${sentence}`
      }
    ],
    model: 'gpt-4'
  })

  return completion.choices[0].message.content
}
```

## パフォーマンス最適化

### 1. キャッシュ管理

```typescript
// src/lib/cache.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN
})

export async function getCachedSentence(key: string) {
  return redis.get(key)
}

export async function cacheSentence(
  key: string,
  sentence: string,
  ttl = 3600
) {
  await redis.setex(key, ttl, sentence)
}
```

### 2. バッチ生成の最適化

```typescript
// src/lib/batch.ts
export async function generateBatch(
  themes: string[],
  style: string
) {
  const promises = themes.map(theme =>
    generateSentence({ theme, style })
  )

  return Promise.all(promises)
}
```

## よくある問題

### 1. 生成失敗

- APIキーの確認
- リクエストパラメータの検証
- エラーログの確認

### 2. データベースの問題

- 接続文字列の確認
- モデル定義の検証
- マイグレーション状態の確認

### 3. パフォーマンスの問題

- キャッシュの活用
- クエリの最適化
- ページネーションの実装

::: tip ヒント

- 依存関係を定期的に更新
- API使用状況を監視
- 重要なデータをバックアップ
  :::

::: warning 注意

- APIキーを保護
- 生成頻度を制御
- コンテンツの安全性に注意
  :::
