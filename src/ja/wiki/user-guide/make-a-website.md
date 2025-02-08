---
title: 自己紹介ウェブサイトの作成
description: Cursor AIを使用して、レスポンシブデザインと美しいアニメーション効果を備えたモダンな自己紹介ウェブサイトを迅速に構築します。
---

# 自己紹介ウェブサイトの作成

<!-- ![Website Preview](./images/guide/website-preview.png) -->

## 2.1 事前準備

### 2.1.1 新規フォルダの作成

まず、新しいプロジェクトフォルダを作成し、プロジェクトを初期化しましょう：

```bash
# プロジェクトフォルダの作成
mkdir my-portfolio
cd my-portfolio

# Next.jsプロジェクトの初期化
npx create-next-app@latest . --typescript --tailwind --app --src-dir
```

推奨されるプロジェクト構造は以下の通りです：

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # レイアウトファイル
│   │   ├── page.tsx        # メインページ
│   │   └── globals.css     # グローバルスタイル
│   ├── components/         # コンポーネントディレクトリ
│   │   ├── ui/            # UIコンポーネント
│   │   ├── layout/        # レイアウトコンポーネント
│   │   └── sections/      # ページセクション
│   ├── lib/               # ユーティリティ関数
│   └── styles/            # スタイルファイル
├── public/                # 静的アセット
│   └── images/           # 画像アセット
├── content/              # コンテンツファイル
└── package.json          # プロジェクト設定
```

### 2.1.2 .cursorrules ファイルの準備

`.cursorrules`ファイルを作成してプロジェクトのコーディング規約を定義します：

```yaml
# .cursorrules
version: 1.0

# コードスタイル
style:
  typescript:
    semi: false # セミコロンを使用しない
    singleQuote: true # シングルクォートを使用
    trailingComma: es5 # ES5スタイルのトレイリングカンマ
    tabWidth: 2 # インデント幅
    printWidth: 80 # 1行の最大長

# コンポーネント規約
components:
  - 関数コンポーネントを使用
  - TypeScriptを使用
  - CSS ModulesまたはTailwindを使用
  - コンポーネントファイルはPascalCaseで命名

# ファイル構成
structure:
  - 関連コンポーネントは同じディレクトリに配置
  - 共有コンポーネントはcomponents/uiに配置
  - ページコンポーネントはappディレクトリに配置
  - ユーティリティ関数はlibディレクトリに配置
```

## 2.2 ウェブサイト開発

### 2.2.1 機能要件の実装

1. **レイアウトコンポーネントの作成**

```typescript
// src/components/layout/Layout.tsx
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
```

2. **ナビゲーションバーの実装**

```typescript
// src/components/layout/Header.tsx
export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50
                      dark:bg-gray-900/80">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <Navigation />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
```

3. **メインページセクションの作成**

```typescript
// src/components/sections/Hero.tsx
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold">
          こんにちは、私は
          <span className="text-primary-500">開発者</span>です
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          美しく実用的なウェブアプリケーションの作成に注力しています
        </p>
      </motion.div>
    </section>
  )
}
```

### 2.2.2 テストと適応

1. **レスポンシブテスト**

```typescript
// src/components/ui/ResponsiveWrapper.tsx
export function ResponsiveWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      w-full
      px-4 sm:px-6 md:px-8
      max-w-7xl
      mx-auto
    ">
      {children}
    </div>
  )
}
```

2. **ダークモードサポート**

```typescript
// src/components/ui/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
      aria-label="テーマ切り替え"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  )
}
```

3. **パフォーマンス最適化**

```typescript
// src/components/ui/Image.tsx
import NextImage from 'next/image'

export function Image({ src, alt, ...props }: ImageProps) {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <NextImage
        src={src}
        alt={alt}
        quality={90}
        placeholder="blur"
        {...props}
      />
    </div>
  )
}
```

### 2.2.3 公開とデプロイ

1. **プロジェクトのビルド**

```bash
# 本番用ビルド
npm run build

# 本番版のローカルプレビュー
npm run start
```

2. **Vercelへのデプロイ**

```bash
# Vercel CLIのインストール
npm i -g vercel

# プロジェクトのデプロイ
vercel
```

3. **カスタムドメインの設定**

- Vercelダッシュボードでドメインを追加
- DNSレコードを設定
- SSL証明書の生成を待機

## よくある問題

### 1. スタイルの問題

- Tailwind設定の確認
- クラス名の正確性の確認
- レスポンシブブレークポイントの検証

### 2. ビルドの問題

- キャッシュのクリア
- 依存関係の更新
- コンソールエラーの確認

### 3. デプロイの問題

- 環境変数の検証
- ビルドログの確認
- ドメイン設定の確認

::: tip ヒント

- Cursor AIを活用して開発を加速
- コードを整理整頓
- 定期的に依存関係を更新
  :::

::: warning 注意

- 重要なデータのバックアップ
- クロスブラウザ互換性のテスト
- パフォーマンス最適化に注意
  :::
