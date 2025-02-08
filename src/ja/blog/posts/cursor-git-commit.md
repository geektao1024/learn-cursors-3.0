---
title: Cursor 実践：ワンクリックでプロフェッショナルな Git Commit Message を生成
date: 2023-12-25
author: Huihua Wang
description: 面倒な Git コミットメッセージの作成に別れを告げ、Cursor の AI 機能を活用して、規範的な Commit Message をワンクリックで生成
tag:
  - AI
  - Cursor
  - Git
  - 生産性ツール
---

# Cursor 実践：ワンクリックでプロフェッショナルな Git Commit Message を生成

日々の開発において、規範的な Git Commit Message を書くことは、しばしば頭を悩ませる作業です。本記事では、Cursor の AI 機能を活用して、プロフェッショナルな Git Commit Message をワンクリックで生成し、コードのコミットをより規範的で効率的にする方法をご紹介します。

## なぜ規範的な Commit Message が必要なのか？

規範的な Git Commit Message には以下のような利点があります：

1. **可読性の向上**：コードの変更内容を明確に説明
2. **追跡の容易さ**：コード変更履歴の迅速な特定
3. **自動化サポート**：CHANGELOG の自動生成をサポート
4. **チーム協業**：チームのコミット規約の統一

## Cursor の Commit Message 生成機能

### 1. 基本的な使用方法

Cursor では、`@Commit (Diff Of Working State)` コマンドを使用して、現在のコード変更を取得し、対応する Commit Message を生成することができます。

```bash
# コマンドパレットを開くショートカット
Command + Shift + P (Mac)
Ctrl + Shift + P (Windows)

# コマンドを入力
@Commit (Diff Of Working State)
```

### 2. Commit Message テンプレート

より専門的な Commit Message を生成するために、以下のテンプレートを使用できます：

```markdown
<type>(<scope>): <subject>

<body>

<footer>
```

#### コミットタイプ（Type）

- **feat**: 新機能
- **fix**: バグ修正
- **docs**: ドキュメント更新
- **style**: コードフォーマット（コードの動作に影響しない変更）
- **refactor**: リファクタリング（新機能でもバグ修正でもない変更）
- **test**: テストの追加
- **chore**: ビルドプロセスやツールの変更

### 3. 実践例

#### 例1：新機能の追加

```typescript
// コード変更：ユーザー登録機能の追加
export async function registerUser(data: RegisterDTO) {
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: await hashPassword(data.password),
      name: data.name
    }
  })
  return user
}

// 生成された Commit Message
feat(auth): ユーザー登録機能の追加

ユーザー登録の核となる機能を実装：
- ユーザー登録 API エンドポイントの追加
- パスワード暗号化処理の実装
- メール検証ロジックの実装

Related to: #123
```

#### 例2：バグ修正

```typescript
// 修正前のコード
function calculateTotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price, 0)
}

// 修正後のコード
function calculateTotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

// 生成された Commit Message
fix(cart): ショッピングカートの合計金額計算の修正

商品数量が考慮されていなかったショッピングカートの合計金額計算の問題を修正：
- 合計金額計算に商品数量を反映
- 関連する単体テストケースの更新

Fixes: #456
```

## ベストプラクティス

### 1. コミットメッセージの規約

- **件名行の制限**：72文字を超えない
- **命令形を使用**：「修正」「追加」「更新」などの動詞で開始
- **件名は簡潔に**：今回のコミットの主な変更を明確に説明
- **本文は詳細に**：必要に応じて変更の詳細な説明を提供

### 2. AI プロンプトテンプレート

```markdown
以下の要件に従った規範的な Git Commit Message を生成してください：

1. 以下のテンプレートに従う：
   <type>(<scope>): <subject>

<body>

<footer>

2. 注意事項：

- 各行は72文字を超えない
- ヘッダーは必須、本文とフッターは任意
- 明確な動詞で開始
- 必要なコンテキスト情報を提供

3. typeの種類：

- feat: 新機能
- fix: バグ修正
- docs: ドキュメント更新
- style: フォーマット調整
- refactor: リファクタリング
- test: テスト関連
- chore: ビルド/ツール関連
```

### 3. 実用的なテクニック

1. **頻用テンプレートの保存**：よく使うコミットテンプレートをコードスニペットとして保存
2. **CI/CD との連携**：コミットメッセージで対応する CI/CD プロセスを自動的にトリガー
3. **課題との関連付け**：コミットメッセージで関連する Issue や PR を参照
4. **分類整理**：異なる変更タイプごとにコミットメッセージを整理

## 自動化ワークフロー

### 1. Git Hooks の設定

```bash
#!/bin/sh
# .git/hooks/commit-msg

# Cursor を使用してコミットメッセージを生成
cursor commit-msg $1
```

### 2. 開発プロセスへの統合

```bash
# ワークフロー例
git add .
cursor generate-commit  # Cursor を使用してコミットメッセージを生成
git commit -F .git/COMMIT_EDITMSG
```

## よくある問題と解決策

1. **コミットメッセージが長すぎる**

   - 簡潔な説明を使用
   - 詳細情報は本文に記載
   - リスト形式を適切に使用

2. **スコープの決定が難しい**
   - 機能モジュールごとに分類
   - 明確なビジネス用語を使用
   - 一貫した命名規則を維持

## 結論

Cursor の AI 機能を活用することで、以下のことが可能になります：

- コミットメッセージ作成時間の節約
- コミットメッセージの一貫性と規範性の維持
- コードベースの保守性の向上
- チーム協業の効率化

Cursor の Commit Message 生成機能を適切に活用することで、コードコミットの効率と品質を大幅に向上させることができます。この強力な機能を使い始めてみましょう！

## 関連記事

- [なぜ Cursor を選ぶのか？AI プログラミングの未来を探る](./why-choose-cursor) - Cursor の主要な利点について
- [Cursor Rules：パーソナライズされた AI プログラミングアシスタントの構築](./cursor-rules-guide) - AI の動作をカスタマイズする方法
- [Cursor クイックスタート：10分で AI プログラミングアシスタントをマスター](./cursor-quick-start) - Cursor の基本を素早く習得
- [Cursor AI ショートカット完全ガイド](./cursor-shortcuts) - すべてのショートカットをマスター
