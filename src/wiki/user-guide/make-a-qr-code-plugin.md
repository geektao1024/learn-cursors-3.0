---
title: 制作网页二维码插件
description: 使用 Cursor AI 开发一个浏览器扩展，可以快速生成当前网页的二维码。
---

# 制作网页二维码插件

<!-- ![Plugin Preview](./images/guide/qr-plugin.png) -->

## 项目概述

在这个教程中，我们将开发一个浏览器扩展，功能包括：

- 一键生成当前页面二维码
- 自定义二维码样式
- 支持二维码下载
- 历史记录管理

## 技术栈选择

我们将使用以下技术：

- TypeScript
- React
- QR Code Generator
- Chrome Extension API
- Tailwind CSS
- Vite

## 开发步骤

### 1. 项目初始化

使用 Vite 创建项目：

```bash
npm create vite@latest qr-code-extension -- --template react-ts
cd qr-code-extension
npm install
```

### 2. 项目结构

```
qr-code-extension/
├── src/
│   ├── components/
│   │   ├── QRCode.tsx
│   │   ├── Settings.tsx
│   │   └── History.tsx
│   ├── background/
│   │   └── index.ts
│   ├── popup/
│   │   └── Popup.tsx
│   ├── utils/
│   │   └── qr.ts
│   └─�� manifest.json
├── public/
│   └── icons/
└── vite.config.ts
```

### 3. 配置清单文件

```json
// src/manifest.json
{
  "manifest_version": 3,
  "name": "网页二维码生成器",
  "version": "1.0.0",
  "description": "快速生成当前网页的二维码",
  "permissions": [
    "activeTab",
    "storage"
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "background": {
    "service_worker": "background.js"
  }
}
```

### 4. QR 码生成组件

```typescript
// src/components/QRCode.tsx
import { useEffect, useRef } from 'react'
import QRCodeGenerator from 'qrcode'

interface Props {
  url: string
  size?: number
  color?: string
  backgroundColor?: string
}

export function QRCode({
  url,
  size = 200,
  color = '#000000',
  backgroundColor = '#ffffff'
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    QRCodeGenerator.toCanvas(
      canvasRef.current,
      url,
      {
        width: size,
        margin: 2,
        color: {
          dark: color,
          light: backgroundColor
        }
      }
    )
  }, [url, size, color, backgroundColor])

  return <canvas ref={canvasRef} />
}
```

### 5. 弹出窗口界面

```typescript
// src/popup/Popup.tsx
import { useState, useEffect } from 'react'
import { QRCode } from '../components/QRCode'
import { Settings } from '../components/Settings'
import { History } from '../components/History'

export function Popup() {
  const [currentUrl, setCurrentUrl] = useState('')
  const [settings, setSettings] = useState({
    size: 200,
    color: '#000000',
    backgroundColor: '#ffffff'
  })

  useEffect(() => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      tabs => {
        if (tabs[0]?.url) {
          setCurrentUrl(tabs[0].url)
        }
      }
    )
  }, [])

  const handleDownload = () => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return

    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="w-80 p-4">
      <h1 className="text-xl font-bold mb-4">
        网页二维码生成器
      </h1>
      
      <div className="mb-4">
        <QRCode
          url={currentUrl}
          {...settings}
        />
      </div>

      <button
        onClick={handleDownload}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        下载二维码
      </button>

      <Settings
        settings={settings}
        onSettingsChange={setSettings}
      />

      <History />
    </div>
  )
}
```

### 6. 设置组件

```typescript
// src/components/Settings.tsx
interface Props {
  settings: {
    size: number
    color: string
    backgroundColor: string
  }
  onSettingsChange: (settings: Props['settings']) => void
}

export function Settings({ settings, onSettingsChange }: Props) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">设置</h2>
      
      <div className="space-y-2">
        <div>
          <label className="block text-sm">大小</label>
          <input
            type="range"
            min="100"
            max="300"
            value={settings.size}
            onChange={e => onSettingsChange({
              ...settings,
              size: Number(e.target.value)
            })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm">颜色</label>
          <input
            type="color"
            value={settings.color}
            onChange={e => onSettingsChange({
              ...settings,
              color: e.target.value
            })}
          />
        </div>

        <div>
          <label className="block text-sm">背景色</label>
          <input
            type="color"
            value={settings.backgroundColor}
            onChange={e => onSettingsChange({
              ...settings,
              backgroundColor: e.target.value
            })}
          />
        </div>
      </div>
    </div>
  )
}
```

### 7. 历史记录组件

```typescript
// src/components/History.tsx
import { useEffect, useState } from 'react'

interface HistoryItem {
  url: string
  timestamp: number
}

export function History() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    chrome.storage.local.get(['qrHistory'], result => {
      if (result.qrHistory) {
        setHistory(result.qrHistory)
      }
    })
  }, [])

  const clearHistory = () => {
    chrome.storage.local.set({ qrHistory: [] })
    setHistory([])
  }

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">历史记录</h2>
        <button
          onClick={clearHistory}
          className="text-sm text-red-500"
        >
          清除
        </button>
      </div>

      <div className="space-y-2">
        {history.map(item => (
          <div
            key={item.timestamp}
            className="text-sm truncate"
          >
            {item.url}
          </div>
        ))}
      </div>
    </div>
  )
}
```

### 8. 构建配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        background: resolve(__dirname, 'src/background/index.ts')
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
})
```

## 使用说明

### 1. 开发模式

```bash
npm run dev
```

### 2. 构建插件

```bash
npm run build
```

### 3. 安装插件

1. 打开 Chrome 扩展管理页面
2. 开启开发者模式
3. 加载已解压的扩展程序
4. 选择构建目录

## 功能扩展

### 1. 批量生成

```typescript
// src/utils/batch.ts
export async function generateBatchQRCodes(urls: string[]) {
  const results = await Promise.all(
    urls.map(url => generateQRCode(url))
  )
  
  // 打包下载
  const zip = new JSZip()
  results.forEach((dataUrl, index) => {
    zip.file(`qrcode-${index}.png`, dataUrl.split(',')[1], {
      base64: true
    })
  })
  
  const content = await zip.generateAsync({ type: 'blob' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(content)
  link.download = 'qrcodes.zip'
  link.click()
}
```

### 2. 样式模板

```typescript
// src/utils/templates.ts
export const qrTemplates = {
  classic: {
    color: '#000000',
    backgroundColor: '#ffffff'
  },
  modern: {
    color: '#2563eb',
    backgroundColor: '#f8fafc'
  },
  dark: {
    color: '#ffffff',
    backgroundColor: '#1e293b'
  }
}
```

## 性能优化

### 1. 缓存管理

```typescript
// src/utils/cache.ts
export class QRCodeCache {
  private cache = new Map<string, string>()
  
  async get(url: string, options: QROptions) {
    const key = this.getCacheKey(url, options)
    return this.cache.get(key)
  }
  
  async set(url: string, options: QROptions, dataUrl: string) {
    const key = this.getCacheKey(url, options)
    this.cache.set(key, dataUrl)
  }
  
  private getCacheKey(url: string, options: QROptions) {
    return `${url}-${JSON.stringify(options)}`
  }
}
```

### 2. 防抖处理

```typescript
// src/utils/debounce.ts
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
```

## 常见问题

### 1. 二维码生成失败
- 检查 URL 格式
- 验证网络连接
- 确认权限设置

### 2. 样式问题
- 检查 Tailwind 配置
- 验证 CSS 引入
- 测试不同主题

### 3. 兼容性问题
- 测试不同浏览器
- 验证 manifest 版本
- 检查 API 支持

::: tip 提示
- 定期更新依赖
- 保持代码整洁
- 注意性能优化
:::

::: warning 注意
- 遵守浏览器扩展规范
- 保护用户隐私
- 合理使用存储空间
::: 