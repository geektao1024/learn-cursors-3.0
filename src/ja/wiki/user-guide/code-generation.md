---
title: AIコード生成 (Cmd+K)
description: Cursor AIのコード生成機能を使用して、自然言語の説明から高品質なコードを迅速に生成する方法を学びましょう。
---

# AIコード生成 (Cmd+K)

Cursor AIのコード生成機能は、自然言語による説明からコードを生成する革新的な機能で、開発効率を大幅に向上させます。`Cmd+K`（Mac）または`Ctrl+K`（Windows/Linux）ショートカットで、この強力な機能をすぐに起動できます。

## 基本概念

### 1. 動作原理

- **自然言語処理**：説明をコードに変換
- **コンテキスト理解**：現在のファイルとプロジェクトの状況を考慮
- **インテリジェント生成**：ベストプラクティスに準拠したコードを生成

### 2. 使用シナリオ

- **新機能開発**：新機能を迅速に実装
- **コードリファクタリング**：既存コードの最適化
- **問題修正**：コードの問題を解決
- **テスト生成**：テストケースを自動生成

## 使用方法

### 1. 基本操作

1. **コード生成の開始**

   - `Cmd/Ctrl + K`を押下
   - エディタでコードを選択後`Cmd/Ctrl + K`
   - コマンドパレットから「AI コード生成」を選択

2. **プロンプト入力**

   - 明確な自然言語で説明
   - 必要なコンテキスト情報を提供
   - 具体的な要件と制約を指定

3. **結果処理**
   - 生成コードを確認
   - 必要に応じて修正
   - プロジェクトに統合

### 2. プロンプト作成テクニック

#### 機能実装

```
Reactコンポーネントを作成：ユーザープロフィール表示（アバター、名前、自己紹介）、編集機能付き
```

#### コード変換

```
このJavaScriptコードをTypeScriptに変換し、適切な型定義を追加
```

#### 問題修正

```
このコードにパフォーマンス問題があります。ループとデータ構造に注目して最適化してください
```

## 高度な機能

### 1. コンテキスト認識

1. **プロジェクト構造**

   - プロジェクトアーキテクチャを理解
   - プロジェクトの規約に従う
   - コードの一貫性を維持

2. **依存関係**

   - インポートを自動処理
   - 依存関係の競合を解決
   - ベストプラクティスを推奨

3. **コードスタイル**
   - 既存スタイルに合わせる
   - コーディング規約に準拠
   - 一貫性を維持

### 2. マルチファイル操作

1. **クロスファイル生成**

```
完全なCRUD機能を作成：APIルート、データモデル、フロントエンドコンポーネントを含む
```

2. **関連ファイル更新**

```
新しいデータフィールドを追加し、関連する全てのモデル、API、コンポーネントを更新
```

### 3. インテリジェントリファクタリング

1. **コード最適化**

```
この関数をモダンなJavaScript機能を使用してリファクタリングし、可読性とパフォーマンスを向上
```

2. **パターン適用**

```
このコードをオブザーバーパターンを使用してリファクタリングし、既存機能を維持
```

## ベストプラクティス

### 1. プロンプト作成

#### 明確な目標

```
TypeScriptとReactを使用した、ページネーションと検索機能付きデータテーブルコンポーネントを作成
```

#### 詳細な制約

```
...(約180行省略)...
```

::: tip ヒント

- 生成コードは必ず検証してください
- 段階的な生成が大規模プロジェクトに適しています
- コンテキスト情報を積極的に提供
  :::

::: warning 注意

- 機密情報を入力しないでください
- 生成コードのセキュリティを確認
- パフォーマンス要件を明確に指定
  :::

## よくあるシナリオ例

### 1. API開発

```typescript
// ヒント：RESTful APIエンドポイントを作成し、ユーザー登録機能を処理
export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    // データ検証
    if (!email || !password || !name) {
      return new Response('Missing required fields', { status: 400 })
    }

    // ユーザー作成
    const user = await db.user.create({
      data: {
        email,
        password: await hashPassword(password),
        name,
      },
    })

    return new Response(JSON.stringify(user), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  catch (error) {
    return new Response('Error creating user', { status: 500 })
  }
}
```

### 2. UIコンポーネント

```typescript
// ヒント：再利用可能なモーダルコンポーネントを作成：カスタマイズ可能なタイトル、コンテンツ、アクションボタンをサポート
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <span className="sr-only">閉じる</span>
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-6">{children}</div>
        {actions && (
          <div className="flex justify-end gap-4">{actions}</div>
        )}
      </div>
    </div>
  )
}
```

### 3. ツール関数

```typescript
// ヒント：データ処理関数を作成：ソート、フィルタリング、ページネーションをサポート
interface PaginationOptions {
  page: number
  pageSize: number
}

interface SortOptions {
  field: string
  order: 'asc' | 'desc'
}

interface FilterOptions {
  field: string
  value: any
}

export function processData<T>(
  data: T[],
  pagination?: PaginationOptions,
  sort?: SortOptions,
  filters?: FilterOptions[]
): {
    items: T[]
    total: number
  } {
  let result = [...data]

  // フィルタリング適用
  if (filters?.length) {
    result = result.filter(item =>
      filters.every(filter => item[filter.field] === filter.value)
    )
  }

  // ソート適用
  if (sort) {
    result.sort((a, b) => {
      const compareResult = a[sort.field] > b[sort.field] ? 1 : -1
      return sort.order === 'asc' ? compareResult : -compareResult
    })
  }

  // ページネーション適用
  const total = result.length
  if (pagination) {
    const { page, pageSize } = pagination
    const start = (page - 1) * pageSize
    result = result.slice(start, start + pageSize)
  }

  return { items: result, total }
}
```

## トラブルシューティング

### 1. よくある問題

- **生成コードが期待と異なる**：プロンプトの最適化
- **コンテキスト理解が不正確**：より関連情報を提供
- **パフォーマンス問題**：生成リクエストの簡素化

### 2. 最適化の提案

- **定期的なCursor更新**
- **プロジェクト構造の最適化**
- **プロンプトの質の向上**

::: tip ヒント

- 明確で具体的な自然言語の説明を使用
- 十分なコンテキスト情報を提供
- 生成コード後に注意して確認とテスト
  :::

::: warning 注意

- 生成コードは必ず検証
- 機密情報を入力しない
- コードの品質を維持
  :::
