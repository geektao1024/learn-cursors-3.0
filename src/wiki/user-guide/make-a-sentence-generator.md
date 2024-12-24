---
title: 制作网页金句生成器
description: 使用 Cursor AI 开发一个智能金句生成器，可以根据主题和风格生成各种类型的金句。
---

# 制作网页金句生成器

![Generator Preview](./images/guide/sentence-generator.png)

## 项目概述

在这个教程中，我们将开发一个智能金句生成器，功能包括：

- 多种主题金句生成
- 风格化文本处理
- 一键复制分享
- 历史记录管理
- AI 智能优化

## 技术栈选择

我们将使用以下技术：

- Next.js 14
- TypeScript
- OpenAI API
- Tailwind CSS
- Prisma
- PostgreSQL
- Shadcn UI

## 开发步骤

### 1. 项目初始化

创建 Next.js 项目：

```bash
npx create-next-app@latest sentence-generator --typescript --tailwind --app
cd sentence-generator
npm install @prisma/client @radix-ui/react-icons openai
```

### 2. 项目结构

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

### 3. 数据库模型

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

### 4. OpenAI 集成

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
    生成一句关于${theme}的${style}风格的金句。
    ${context ? `上下文：${context}` : ''}
    要求：
    1. 简洁有力
    2. 富有哲理
    3. 符合主题
    4. 贴合风格
  `

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-4",
    temperature: 0.7,
    max_tokens: 100
  })

  return completion.choices[0].message.content
}
```

### 5. API 路由

```typescript
// src/app/api/generate/route.ts
import { NextResponse } from 'next/server'
import { generateSentence } from '@/lib/openai'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { theme, style, context } = await request.json()

    const sentence = await generateSentence({
      theme,
      style,
      context
    })

    // 保存到数据库
    const saved = await prisma.sentence.create({
      data: {
        content: sentence,
        theme,
        style
      }
    })

    return NextResponse.json({ sentence: saved })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate sentence' },
      { status: 500 }
    )
  }
}
```

### 6. 生成器组件

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
  const [style, setStyle] = useState('励志')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const handleGenerate = async () => {
    if (!theme) {
      toast({
        title: '请输入主题',
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
        title: '生成失败',
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
      title: '已复制到剪贴板'
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="输入主题"
          value={theme}
          onChange={e => setTheme(e.target.value)}
        />
        <Select
          value={style}
          onValueChange={setStyle}
          options={[
            { label: '励志', value: '励志' },
            { label: '伤感', value: '伤感' },
            { label: '幽默', value: '幽默' },
            { label: '文艺', value: '文艺' }
          ]}
        />
      </div>

      <Button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full"
      >
        {loading ? '生成中...' : '生成金句'}
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
            复制
          </Button>
        </div>
      )}
    </div>
  )
}
```

### 7. 历史记录组件

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
      <h2 className="text-xl font-bold">历史记录</h2>
      
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

## 部署说明

### 1. 环境变量配置

```env
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-..."
```

### 2. 数据库迁移

```bash
npx prisma migrate dev
```

### 3. 部署到 Vercel

1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署

## 功能扩展

### 1. AI 优化建议

```typescript
// src/lib/optimize.ts
export async function optimizeSentence(sentence: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `优化以下金句，使其更加简洁有力：\n${sentence}`
      }
    ],
    model: "gpt-4",
    temperature: 0.5
  })

  return completion.choices[0].message.content
}
```

### 2. 情感分析

```typescript
// src/lib/analyze.ts
export async function analyzeSentiment(sentence: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `分析以下金句的情感倾向：\n${sentence}`
      }
    ],
    model: "gpt-4"
  })

  return completion.choices[0].message.content
}
```

## 性能优化

### 1. 缓存管理

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

### 2. 批量生成优化

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

## 常见问题

### 1. 生成失败
- 检查 API 密钥
- 验证请求参数
- 查看错误日志

### 2. 数据库问题
- 检查连接字符串
- 验证模型定义
- 确认迁移状态

### 3. 性能问题
- 使用缓存
- 优化查询
- 实现分页

::: tip 提示
- 定期更新依赖
- 监控 API 使用
- 备份重要数据
:::

::: warning 注意
- 保护 API 密钥
- 控制生成频率
- 注意内容安全
::: 