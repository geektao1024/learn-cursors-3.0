---
title: Creating a Quote Generator Website
description: Use Cursor AI to develop an intelligent quote generator that can generate various types of quotes based on themes and styles.
---

# Creating a Quote Generator Website

<!-- ![Generator Preview](./images/guide/sentence-generator.png) -->

## Project Overview

In this tutorial, we will develop an intelligent quote generator with features including:

- Multi-theme quote generation
- Stylized text processing
- One-click copy and share
- History management
- AI-powered optimization

## Technology Stack

We will use the following technologies:

- Next.js 14
- TypeScript
- OpenAI API
- Tailwind CSS
- Prisma
- PostgreSQL
- Shadcn UI

## Development Steps

### 1. Project Initialization

Create a Next.js project:

```bash
npx create-next-app@latest sentence-generator --typescript --tailwind --app
cd sentence-generator
npm install @prisma/client @radix-ui/react-icons openai
```

### 2. Project Structure

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

### 3. Database Models

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Quote {
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
  quotes      String[]
}

model Style {
  id          String   @id @default(cuid())
  name        String
  description String?
  template    String
}
```

### 4. OpenAI Integration

```typescript
// src/lib/openai.ts
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateQuote({
  theme,
  style,
  context
}: {
  theme: string
  style: string
  context?: string
}) {
  const prompt = `
    Generate a ${style}-style quote about ${theme}.
    ${context ? `Context: ${context}` : ''}
    Requirements:
    1. Concise and powerful
    2. Philosophical
    3. On theme
    4. Match style
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

### 5. API Routes

```typescript
import { prisma } from '@/lib/db'
import { generateQuote } from '@/lib/openai'
// src/app/api/generate/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { theme, style, context } = await request.json()

    const quote = await generateQuote({
      theme,
      style,
      context
    })

    // Save to database
    const saved = await prisma.quote.create({
      data: {
        content: quote,
        theme,
        style
      }
    })

    return NextResponse.json({ quote: saved })
  }
  catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate quote' },
      { status: 500 }
    )
  }
}
```

### 6. Generator Component

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
  const [style, setStyle] = useState('inspirational')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const handleGenerate = async () => {
    if (!theme) {
      toast({
        title: 'Please enter a theme',
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

      setResult(data.quote.content)
      toast({
        title: 'Generated successfully',
        variant: 'success'
      })
    } catch (error) {
      toast({
        title: 'Generation failed',
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
      title: 'Copied to clipboard'
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Enter theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />
        <Select
          value={style}
          onValueChange={setStyle}
          options={[
            { value: 'inspirational', label: 'Inspirational' },
            { value: 'philosophical', label: 'Philosophical' },
            { value: 'humorous', label: 'Humorous' },
            { value: 'poetic', label: 'Poetic' }
          ]}
        />
        <Button
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </Button>
      </div>
      {result && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-lg">{result}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
          >
            Copy
          </Button>
        </div>
      )}
    </div>
  )
}
```

### 7. History Component

```typescript
// src/components/History.tsx
'use client'

import { useEffect, useState } from 'react'
import { prisma } from '@/lib/db'
import { Button } from './ui/button'

export function History() {
  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    const response = await fetch('/api/history')
    const data = await response.json()
    setQuotes(data.quotes)
  }

  const handleLike = async (id: string) => {
    await fetch(`/api/quotes/${id}/like`, {
      method: 'POST'
    })
    fetchHistory()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">History</h2>

      <div className="space-y-2">
        {quotes.map(quote => (
          <div
            key={quote.id}
            className="p-4 bg-white rounded-lg shadow"
          >
            <p>{quote.content}</p>
            <div className="flex gap-2 mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(quote.id)}
              >
                👍 {quote.likes}
              </Button>
              <span className="text-sm text-gray-500">
                {quote.theme} · {quote.style}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Deployment Instructions

### 1. Environment Variable Configuration

```env
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-..."
```

### 2. Database Migration

```bash
npx prisma migrate dev
```

### 3. Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

## Feature Extensions

### 1. AI Optimization Suggestions

```typescript
// src/lib/optimize.ts
export async function optimizeQuote(quote: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Optimize the following quote, making it more concise and powerful: \n${quote}`
      }
    ],
    model: 'gpt-4',
    temperature: 0.5
  })

  return completion.choices[0].message.content
}
```

### 2. Sentiment Analysis

```typescript
// src/lib/analyze.ts
export async function analyzeSentiment(quote: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Analyze the sentiment of the following quote: \n${quote}`
      }
    ],
    model: 'gpt-4'
  })

  return completion.choices[0].message.content
}
```

## Performance Optimization

### 1. Cache Management

```typescript
// src/lib/cache.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN
})

export async function getCachedQuote(key: string) {
  return redis.get(key)
}

export async function cacheQuote(
  key: string,
  quote: string,
  ttl = 3600
) {
  await redis.setex(key, ttl, quote)
}
```

### 2. Batch Generation Optimization

```typescript
// src/lib/batch.ts
export async function generateBatch(
  themes: string[],
  style: string
) {
  const promises = themes.map(theme =>
    generateQuote({ theme, style })
  )

  return Promise.all(promises)
}
```

## Common Issues

### 1. Generation Failure

- Check API key
- Verify request parameters
- Check error logs

### 2. Database Issues

- Check connection string
- Verify model definition
- Confirm migration status

### 3. Performance Issues

- Use cache
- Optimize queries
- Implement pagination

::: tip Hint

- Regularly update dependencies
- Monitor API usage
- Backup important data
  :::

::: warning Note

- Protect API key
- Control generation frequency
- Pay attention to content safety
  :::
