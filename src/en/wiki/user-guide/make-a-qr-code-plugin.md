---
title: Creating a QR Code Browser Extension
description: Use Cursor AI to develop a browser extension that can quickly generate QR codes for the current webpage.
---

# Creating a QR Code Browser Extension

<!-- ![Plugin Preview](./images/guide/qr-plugin.png) -->

## Project Overview

In this tutorial, we will develop a browser extension with features including:

- One-click QR code generation for current page
- Custom QR code styling
- QR code download support
- History management

## Technology Stack

We will use the following technologies:

- TypeScript
- React
- QR Code Generator
- Chrome Extension API
- Tailwind CSS
- Vite

## Development Steps

### 1. Project Initialization

Create project using Vite:

```bash
npm create vite@latest qr-code-extension -- --template react-ts
cd qr-code-extension
npm install
```

### 2. Project Structure

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

### 3. Configure Manifest File

```json
// src/manifest.json
{
  "manifest_version": 3,
  "name": "Webpage QR Code Generator",
  "version": "1.0.0",
  "description": "Quickly generate QR codes for current webpage",
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

### 4. QR Code Generation Component

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

### 5. Popup Window Interface

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
        QR Code Generator
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
        Download QR Code
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

### 6. Settings Component

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
      <h2 className="text-lg font-semibold mb-2">Settings</h2>

      <div className="space-y-2">
        <div>
          <label className="block text-sm">Size</label>
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
          <label className="block text-sm">Color</label>
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
          <label className="block text-sm">Background Color</label>
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

### 7. History Component

```typescript
// src/components/History.tsx
import { useState, useEffect } from 'react'

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

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">History</h2>

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

## Build and Deploy

### 1. Build Configuration

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

### 2. Build Extension

```bash
npm run build
```

### 3. Load Extension

1. Open Chrome Extensions page
2. Enable Developer mode
3. Click "Load unpacked"
4. Select the dist directory

## Common Issues

### 1. Development Issues

- Check manifest configuration
- Verify permissions
- Debug with Chrome DevTools

### 2. Build Issues

- Clear cache
- Update dependencies
- Check build configuration

### 3. Performance Issues

- Optimize image processing
- Implement caching
- Minimize bundle size

::: tip Tips

- Test on different websites
- Monitor storage usage
- Keep dependencies updated
  :::

::: warning Notes

- Handle large URLs properly
- Consider error cases
- Follow security best practices
  :::
