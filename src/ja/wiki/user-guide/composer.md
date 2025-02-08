---
title: コードエディタ (Cmd+I)
description: Cursor Composerの強力な機能を深く理解し、AI支援型コードエディタを使用して開発効率を向上させる方法を学びましょう。
---

# コードエディタ (Cmd+I)

Cursor Composerは革新的なAI支援コードエディタで、プログラミング意図を理解し、機能の迅速な実現、コードリファクタリング、インテリジェントな編集提案を提供します。`Cmd+I`（Mac）または`Ctrl+I`（Windows/Linux）ショートカットで、いつでもこの強力なツールを呼び出せます。

## コア機能

### 1. インテリジェント編集

- **コード生成**：説明に基づくコード生成
- **コードリファクタリング**：既存コードのインテリジェントな再構築
- **コード最適化**：コード品質とパフォーマンスの改善
- **マルチファイル編集**：複数関連ファイルの同時処理

### 2. コンテキスト理解

- **プロジェクト認識**：プロジェクト全体の構造を理解
- **依存関係分析**：コード依存関係の識別と処理
- **タイプ推論**：インテリジェントタイプシステムのサポート
- **インテリジェントインポート**：インポート文の自動管理

### 3. 編集モード

- **インライン編集**：コード内直接編集
- **対話型編集**：対話による編集ガイダンス
- **バッチ編集**：複数箇所の類似修正処理
- **リファクタリングモード**：大規模コードリファクタリング

## 使用方法

### 1. 基本操作

1. **Composer起動**

   - `Cmd/Ctrl + I`で開く
   - コマンドパレットから選択
   - エディタツールバーアイコンをクリック

2. **編集モード**

   - ダイレクト編集モード
   - 対話型編集モード
   - マルチファイル編集モード

3. **操作フロー**
   - 編集対象コードの選択
   - 編集意図の説明
   - 生成コードの確認または調整

### 2. 編集コマンド例

#### コード生成

```typescript
TypeScriptタイプセーフなAPIリクエスト関数を作成し、エラー処理とリクエストキャンセルをサポート
```

#### コードリファクタリング

```typescript
このクラスコンポーネントを関数コンポーネントにリファクタリングし、ライフサイクルメソッドをフックで置換
```

#### パフォーマンス最適化

```typescript
このコンポーネントのレンダリングパフォーマンスを最適化し、memoとuseCallbackでコールバック関数を処理
```

## 高度な機能

### 1. マルチファイル編集

1. **関連ファイル処理**

```typescript
// 複数ファイルに新しいインターフェース定義を追加
interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
}

// Composerが自動的に：
// 1. 関連ファイルにインターフェースインポートを追加
// 2. インターフェースを使用するコードを更新
// 3. 必要なタイプチェックを追加
```

2. **バッチ更新**

```typescript
// 旧APIを使用している全ての箇所を更新
// 旧コード：
const data = await api.get('/users')

// 新コード：
const { data, error } = await api.users.list()
```

3. **依存管理**

```typescript
import { useQuery } from '@tanstack/react-query'
// 新機能時に自動的に依存を処理
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
```

### 2. インテリジェントリファクタリング

1. **コードモード変換**

```typescript
// コールバックモードをPromiseに変換
// 変換前：
function processData(data, callback) {
  // データ処理
  callback(null, result)
}

// 変換後：
async function processData(data) {
  // データ処理
  return result
}
```

2. **アーキテクチャ改善**

```typescript
// MVCアーキテクチャを領域駆動設計に変換
// 変換前：
class UserController {
  async createUser(req, res) {
    const user = await User.create(req.body)
    res.json(user)
  }
}

// 変換後：
class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: CreateUserDTO): Promise<User> {
    const user = User.create(userData)
    return this.userRepository.save(user)
  }
}
```

### 3. コード生成

1. **完全機能実装**

```typescript
// 完全な認証ミドルウェアを生成
export function authMiddleware(
  options: AuthOptions = {}
): MiddlewareFunction {
  return async (req, res, next) => {
    try {
      const token = extractToken(req)
      if (!token) {
        throw new UnauthorizedError('No token provided')
      }

      const decoded = verifyToken(token)
      req.user = await getUserById(decoded.userId)
      next()
    }
    catch (error) {
      next(new UnauthorizedError(error.message))
    }
  }
}
```

2. **テストケース生成**

```typescript
// コンポーネントのテストケースを生成
describe('UserProfile', () => {
  it('should render user information correctly', () => {
    const user = {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/avatar.jpg'
    }

    const { getByText, getByAltText } = render(
      <UserProfile user={user} />
    )

    expect(getByText(user.name)).toBeInTheDocument()
    expect(getByText(user.email)).toBeInTheDocument()
    expect(getByAltText(user.name)).toHaveAttribute(
      'src',
      user.avatar
    )
  })

  it('should handle loading state', () => {
    const { getByTestId } = render(<UserProfile loading />)
    expect(getByTestId('loading-spinner')).toBeInTheDocument()
  })
})
```

## ベストプラクティス

### 1. 編集戦略

1. **段階的編集**

   - 小さな変更から始める
   - 変更範囲を段階的に拡大
   - リアルタイムで検証とテストを実施

2. **コードレビュー**

   - 生成されたコードを確認
   - タイプセーフを確認
   - コード品質を確保

3. **パフォーマンスの考慮**
   - 編集範囲を制限
   - 生成されたコードを最適化
   - リソース使用に注意

### 2. 作業フロー

1. **準備段階**

   - 編集の目的を明確に
   - 関連情報を収集
   - 編集ステップを計画

2. **実行段階**

   - 段階的編集
   - リアルタイムで結果を検証
   - 例外状況を処理

3. **完了段階**
   - コードレビュー
   - テストの実行
   - 変更の提出

### 3. 注意点

1. **コード品質**

   - コードスタイルの一貫性を維持
   - 必要なコメントを追加
   - ベストプラクティスに従う

2. **パフォーマンスの最適化**

   - 生成されたコードを最適化
   - 不要な依存を減らす
   - メモリ使用に注意

3. **セキュリティの考慮**
   - セキュリティの脆弱性を確認
   - 機密情報を保護
   - 入力と出力を検証

## 一般的なシナリオ

### 1. 機能開発

#### 新機能の追加

```typescript
// ユーザー認証機能を追加
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setUser(user)
        setLoading(false)
      },
      (error) => {
        console.error('Auth error:', error)
        setLoading(false)
      }
    )

    return unsubscribe
  }, [])

  return { user, loading }
}
```

#### 機能の拡張

```typescript
// 既存コンポーネントに新機能を追加
interface DataTableProps<T> extends TableProps<T> {
  onSort?: (field: keyof T, order: 'asc' | 'desc') => void
  onFilter?: (filters: Record<keyof T, any>) => void
  onPaginate?: (page: number, pageSize: number) => void
}
```

### 2. コードの最適化

#### パフォーマンスの最適化

```typescript
// レンダリングパフォーマンスを最適化
const MemoizedComponent = memo(function Component({
  items,
  onItemClick
}: Props) {
  const handleClick = useCallback((id: string) => {
    onItemClick(id)
  }, [onItemClick])

  return (
    <div>
      {items.map(item => (
        <Item
          key={item.id}
          {...item}
          onClick={() => handleClick(item.id)}
        />
      ))}
    </div>
  )
})
```

#### コードリファクタリング

```typescript
// カスタムフックにリファクタリング
function useDataFetching<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function fetchData() {
      try {
        const response = await fetch(url)
        const json = await response.json()

        if (mounted) {
          setData(json)
          setError(null)
        }
      }
      catch (error) {
        if (mounted) {
          setError(error as Error)
          setData(null)
        }
      }
      finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, [url])

  return { data, error, loading }
}
```

## 設定オプション

### 1. エディタ設定

- **自動保存**：自動保存オプションを設定
- **フォーマットルール**：コードフォーマットルールを設定
- **ショートカットマッピング**：カスタムショートカットをバインド

### 2. AI設定

- **モデル選択**：使用するAIモデルを選択
- **コンテキスト範囲**：コンテキストを含む範囲を設定
- **生成オプション**：コード生成パラメータを調整

### 3. プロジェクト設定

- **言語サポート**：言語特定オプションを設定
- **コードスタイル**：プロジェクトコード規範を設定
- **無視ファイル**：処理不要のファイルを設定

::: tip ヒント

- マルチファイル編集機能を活用
- コードの変更を原子性に保つ
- 定期的にコードレビューとテストを実施
  :::

::: warning 注意

- 大規模な変更は慎重に処理
- 生成されたコードを常に検証
- コードリポジトリの一貫性を保つ
  :::
