---
title: ウェブQRコードプラグインの作成
description: Cursor AIを使用して、現在のウェブページのQRコードを素早く生成できるブラウザ拡張機能を開発します。
---

# ウェブQRコードプラグインの作成

<!-- ![Plugin Preview](./images/guide/qr-plugin.png) -->

## プロジェクト概要

このチュートリアルでは、以下の機能を備えたブラウザ拡張機能を開発します：

- 現在のページのQRコードをワンクリックで生成
- QRコードのカスタマイズスタイル
- QRコードのダウンロード対応
- 履歴管理

## 技術スタック

以下の技術を使用します：

- TypeScript
- React
- QR Code Generator
- Chrome Extension API
- Tailwind CSS
- Vite

## 開発手順

### 1. プロジェクトの初期化

Viteを使用してプロジェクトを作成します：

```bash
npm create vite@latest qr-code-extension -- --template react-ts
cd qr-code-extension
npm install
```

### 2. プロジェクト構造

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
│   └── manifest.json
├── public/
│   └── icons/
└── vite.config.ts
```

### 3. マニフェストファイルの設定

```json
// src/manifest.json
{
  "manifest_version": 3,
  "name": "ウェブQRコードジェネレーター",
  "version": "1.0.0",
  "description": "現在のウェブページのQRコードを素早く生成",
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

### 4. QRコード生成コンポーネント

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

### 5. ポップアップインターフェース

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
        ウェブQRコードジェネレーター
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
        QRコードをダウンロード
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

### 6. 設定コンポーネント

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
      <h2 className="text-lg font-semibold mb-2">設定</h2>

      <div className="space-y-2">
        <div>
          <label className="block text-sm">サイズ</label>
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
          <label className="block text-sm">色</label>
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

### 7. 履歴コンポーネント

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
        <h2 className="text-lg font-semibold">履歴</h2>
        <button
          onClick={clearHistory}
          className="text-sm text-red-500"
        >
          クリア
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

### 8. ビルド設定

```typescript
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
// vite.config.ts
import { defineConfig } from 'vite'

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

## 使用方法

### 1. 開発モード

```bash
npm run dev
```

### 2. プラグインのビルド

```bash
npm run build
```

### 3. プラグインのインストール

1. Chrome拡張機能の管理ページを開く
2. デベロッパーモードを有効にする
3. パッケージ化されていない拡張機能を読み込む
4. ビルドディレクトリを選択

## 機能拡張

### 1. バッチ生成

```typescript
// src/utils/batch.ts
export async function generateBatchQRCodes(urls: string[]) {
  const results = await Promise.all(
    urls.map(url => generateQRCode(url))
  )

  // 一括ダウンロード
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

### 2. スタイルテンプレート

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

## パフォーマンス最適化

### 1. キャッシュ管理

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

### 2. デバウンス処理

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

## よくある問題

### 1. QRコード生成失敗

- URLフォーマットの確認
- ネットワーク接続の確認
- 権限設定の確認

### 2. スタイルの問題

- Tailwind設定の確認
- CSSの読み込み確認
- 異なるテーマのテスト

### 3. 互換性の問題

- 異なるブラウザでのテスト
- マニフェストバージョンの確認
- APIサポートの確認

::: tip ヒント

- 依存関係を定期的に更新
- コードを整理整頓
- パフォーマンス最適化に注意
  :::

::: warning 注意

- ブラウザ拡張機能の規約を遵守
- ユーザーのプライバシーを保護
- ストレージ容量を適切に使用
  :::
