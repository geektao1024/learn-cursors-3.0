---
title: Cursor 操作テクニック
description: これらの実用的なテクニックを習得して、Cursorをより効率的に使いこなしましょう。
---

<style>
.custom-block {
  margin: 2rem 0;
}
.shortcut-group {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}
.shortcut-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
.shortcut-item:last-child {
  border-bottom: none;
}
</style>

# Cursor 操作テクニック 🎯

武術の秘伝書のように、これらのショートカットキーとテクニックを習得することで、プログラミングがよりスムーズになり、効率が大幅に向上します。

## ⌨️ ショートカットキーの基本

::: tip 💡 ヒント
ショートカットキーの習得は武術の型を覚えるようなものです。最初は意識的な練習が必要ですが、練習を重ねることで自然と体が覚えていきます。
:::

### 🤖 AI ツール

<div class="shortcut-group">

| ショートカット         | 機能                   | 使用シーン                             |
| ---------------------- | ---------------------- | -------------------------------------- |
| `Tab`                  | コード補完を受け入れる | AIが提案を出したとき                   |
| `Cmd/Ctrl + K`         | AIコード生成           | AIにコードを書いてもらいたいとき       |
| `Cmd/Ctrl + L`         | AIチャット             | AIと問題について議論したいとき         |
| `Cmd/Ctrl + I`         | AIエディター           | AIにコードの改善を依頼したいとき       |
| `Cmd/Ctrl + Shift + A` | Agentアシスタント      | 継続的な対話でタスクを完了させたいとき |

</div>

### 🎮 エディターツール

<div class="shortcut-group">

| ショートカット         | 機能                     | 使用シーン                         |
| ---------------------- | ------------------------ | ---------------------------------- |
| `Cmd/Ctrl + P`         | クイックファイルオープン | プロジェクトファイル間を移動       |
| `Cmd/Ctrl + Shift + P` | コマンドパレット         | 様々な強力な機能を呼び出す         |
| `Cmd/Ctrl + B`         | サイドバーの切り替え     | より多くの編集スペースが必要なとき |
| `Cmd/Ctrl + J`         | ターミナルの切り替え     | コマンドライン操作を実行           |
| `Cmd/Ctrl + \`         | 画面分割                 | 複数のファイルを同時に表示         |

</div>

### ✨ 編集テクニック

<div class="shortcut-group">

| ショートカット         | 機能                   | 使用シーン               |
| ---------------------- | ---------------------- | ------------------------ |
| `Cmd/Ctrl + D`         | 次の一致項目を選択     | 同じ内容を一括修正       |
| `Cmd/Ctrl + Shift + L` | すべての一致項目を選択 | すべての一致を一度に修正 |
| `Alt + Click`          | カーソルを追加         | 複数箇所を同時に編集     |
| `Cmd/Ctrl + Alt + ↑/↓` | 上/下にカーソルを追加  | 垂直方向の複数箇所を編集 |

</div>

## 🎯 実践テクニック

### 1. インテリジェント補完の活用

::: tip 🌟 柔軟な活用
補完機能はあなたの個人アシスタントのようなものです。その特性を理解することで、より効果的に活用できます。
:::

```typescript
// 1️⃣ 補完を手動で起動
function calc⇥
// → function calculateTotal(items: CartItem[]): number {
//      return items.reduce((sum, item) => sum + item.price, 0)
//    }

// 2️⃣ 型推論による補完
const user: User = {
  na⇥  // プロパティのプレフィックスを入力すると自動補完
  // → name: string
}

// 3️⃣ インテリジェントインポート補完
useState⇥
// → import { useState } from 'react'
```

### 2. AIとの協働テクニック

::: info 🤝 連携のポイント
AIとの協働はペアダンスのようなものです。AIをうまく導き、あなたのリズムに合わせて動かすことが大切です。
:::

1. **的確な質問**

   - 具体的な状況とニーズを説明
   - 技術的な制約と好みを伝える
   - サンプルコードを提供

2. **段階的な改善**

   - 基本フレームワークを構築
   - 詳細を徐々に改善
   - 適時検証と調整

3. **コード品質**
   - コード規約のチェック
   - 型安全性の確保
   - パフォーマンスの最適化

### 3. ファイル管理のコツ 📂

::: tip 🗂️ ファイル管理の要点
ファイル管理は作業台の整理整頓のようなものです。すべてを整然と配置し、必要なものをすぐに取り出せるようにします。
:::

<div class="shortcut-group">

1. **クイックナビゲーション**

```bash
# Cmd/Ctrl + P でファイルをクイック検索
file⇥     # ファイル名の一部を入力
@symbol⇥  # シンボルにジャンプ
:123⇥     # 指定行にジャンプ
```

2. **ワークスペース管理**

- 複数ワークスペースの切り替えで効率的に作業
- プロジェクト構造を明確に整理
- ワークスペース設定を活用して生産性向上

3. **ファイル操作**

- クイック作成：`Cmd/Ctrl + N`
- 一括移動：ドラッグ + `Alt`
- スマートリネーム：`F2`

</div>

## 🎨 エディターのカスタマイズ

### 1. インターフェースのカスタマイズ

::: info 🎪 個人作業環境の構築
自分の部屋を装飾するように、エディターを最も快適な作業環境に整えましょう。
:::

<div class="shortcut-group">

1. **レイアウトの最適化**

- サイドバーの位置：左右自由に
- エディターの分割：複数の視点で
- ターミナルの位置：上下お好みで

2. **テーマのカスタマイズ**

- カラースキーム：目に優しく
- フォント設定：視認性重視
- アイコンテーマ：見た目も大切に

3. **インターフェース要素**

- ステータスバー：重要情報を一目で
- パンくずリスト：ファイル階層を明確に
- ミニマップ：コード全体を俯瞰

</div>

### 2. 機能設定のテクニック

::: tip ⚙️ 個性化設定
エディターを調教するように、その心を理解することが大切です。
:::

<div class="shortcut-group">

1. **ショートカットのカスタマイズ**

- カスタマイズ：手のひらを王に
- 衝突処理：複雑を簡単に
- 習慣の移行：迅速な適応

2. **コードスニペット**

- 一般的なテンプレート：一撃で生成
- 動的パラメータ：柔軟な置き換え
- 分類管理：条理的に

3. **シンクロナイゼーション**

- 設定のシンクロナイゼーション：どこでも同じ
- プラグインのシンクロナイゼーション：どこでも利用可能
- スニペットのシンクロナイゼーション：経験を共有

</div>

## 🔍 デバッグテクニック

::: tip �� デバッグの心法
デバッグは事件解決のようなものです。耐性、細心と知恵を持ってこれらのテクニックを習得することで、コードの迷宮を楽しいものにしましょう。
:::

### 1. ブレークポイントの配置法 🎯

<div class="shortcut-group">

1. **トラップの設置**

```typescript
// 1️⃣ 一般的なブレークポイント：重要な位置に設置
function process() {
  // ここで F9 を押す
  const result = complexCalculation()
}

// 2️⃣ 条件ブレークポイント：特定の条件でのみトリガー
for (const item of items) {
  // 右クリック → 条件ブレークポイント → item.value > 100
  process(item)
}

// 3️⃣ ログブレークポイント：一時停止なし、直接出力
function calculate() {
  // 右クリック → ログブレークポイント → "Current value: {value}"
  return value * 2
}
```

2. **ブレークポイントのナビゲーション**

- �� `F8` - ブレークポイント間をスムーズに移動
- 🎚️ `Ctrl + F9` - 有効/無効の切り替え、自由自在
- 📋 ブレークポイントリスト - すべての山を見渡す

3. **高度なトレース**

- 📊 データブレークポイント：変数の変化を監視
- 🎯 関数ブレークポイント：関数の呼び出しをキャプチャ
- ⚠️ 例外ブレークポイント：エラーの発生を防止

</div>

### 2. デバッグツール 🛠️

<div class="shortcut-group">

1. **変数の監視**

- 👀 監視ウィンドウ：変数の変化をリアルタイムで確認
- 🔍 ホバーのヒント：変数の値を迅速に確認
- ⚡ 即時評価：式を随時計算

2. **呼び出しチェーンのトレース**

- 🗺️ 呼び出しスタック：コードの実行パスを明確に
- ⬆️ 上に向かってトレース：問題の原因を探る
- 🔄 フレームスイッチ：異なる呼び出しレベル間を移動

3. **コンソールの活用**

- 🔍 スマートフィルタリング：`console.log` が雑然としない
- ⌨️ 即時実行：テストコードスニペットを実行
- �� オブジェクトインスペクション：データ構造を深く調べる

</div>

::: warning 💡 デバッグのヒント

- 日志ブレークポイントを適切に使用して、コードの繰り返しを避ける
- 条件ブレークポイントを活用して、デバッグ効率を向上
- ショートカットを習得して、デバッグプロセスをスムーズに
  :::

## ⚡ パフォーマンスの最適化

::: tip 🚀 パフォーマンスを優先
エディターを調教するように、各詳細の最適化がパフォーマンスの向上につながります。一緒にエディターを最高の状態に整えましょう。
:::

### 1. エディターの最適化法 🎯

<div class="shortcut-group">

1. **ファイル管理術**

- 📂 ファイルオープン制限：適切な閾値を設定
- �� ワークスペースフォーカス：必要なファイルのみをロード
- 🔌 プラグインの簡素化：使用しない機能を無効化

2. **検索の加速法**

- 🔍 正確な検索：ファイルタイプでフィルタリング
- 📍 範囲限定：検索範囲を指定
- ⚡ インデックスの最適化：ファイル構造を維持

3. **リソースの節約術**

- 🧹 定期的なクリーンアップ：一時ファイルの削除
- 📊 パフォーマンスの監視：メモリ使用量に注意
- ⚖️ バランスの取り方：機能とパフォーマンスのバランス

</div>

### 2. AIの加速法 🤖

<div class="shortcut-group">

1. **応答の最適化**

- ⚡ 正確な指示：明確なガイドが早く結果を得る
- 🎯 範囲の制御：生成されるコンテンツの規模を限定
- 📝 インクリメンタル生成：大タスクを段階的に完了

2. **リソースの節約**

- 💡 必要に応じて使用：AIに過度に依存しない
- 🔄 キャッシュの再利用：一般的なコードスニペットを保存
- 📦 ローカル優先：ローカルリソースを優先的に使用

3. **品質のコントロール**

- ✅ コードチェック：生成されたコードの品質を確保
- 🛠️ エラー処理：異常状況を優雅に処理
- 📈 継続的な最適化：継続的に改善生成戦略

</div>

::: warning 💡 最適化のヒント

- 定期的にワークスペースをクリーンアップして、プロジェクトを軽くする
- AI機能を適切に使用して、消費を避ける
- コードの整理を行い、検索効率を向上させる
  :::

## 🤝 協働テクニック

::: tip 🌟 チーム協働の道
優れたコードは一人の独奏ではありません。それはチームのコンセンサスのようなものです。これらの協働テクニックを習得することで、チーム開発がより調和してスムーズになります。
:::

### 1. コードレビューの術 👀

<div class="shortcut-group">

1. **差分比較法**

```diff
// Alt + Click を使用して差分ビューをナビゲート
+ function newFeature() {
+   // 新機能の実装
+ }
- function oldFeature() {
-   // 削除された旧実装
- }
```

- �� インライン比較：各行の変更を直接確認
- 🔄 並列比較：新旧コードを一目で
- 📜 履歴追跡：コードの進化プロセスを理解

2. **フィードバックの芸術**

- 💬 正確なコメント：具体的なコード行を直接評価
- 📝 建設的な提案：改善方向を提供
- ✅ フィードバックの追跡：問題が解決されることを確認

3. **バージョンのコントロール**

- 🌳 ブランチ管理：コードフローを明確に
- 🔀 コンフリクトの処理：コードコンフリクトを優雅に解決
- 🔄 マージ戦略：コードの安全な統合を確保

</div>

### 2. チームシンクロナイゼーションの法 🤲

<div class="shortcut-group">

1. **知識の共有**

- 📚 コードスニペットライブラリ：チームの最高の実践を沈殿
- ⚙️ 設定のシンクロナイゼーション：開発環境を統一
- 📖 チームドキュメント：知識ベースを構築

2. **規約の統一**

- 📏 コードスタイル：チームの約束に従う
- 🎨 命名規約：コードの読みやすさを向上
- �� レビュー基準：コードの品質を確保

3. **経験の伝承**

- 📝 テクニックの共有：定期的な学習と交流
- �� 初心者への案内：チームの成長を支援
- 🔄 継続的な改善：プロセスを継続的に最適化

</div>

::: warning 💡 協働のヒント

- 前向きなコミュニケーションの態度を維持
- チームの開発規約に従う
- 経験と知識を積極的に共有
  :::

::: tip 📚 最後の言葉

- これらのテクニックを習得するには時間が必要
- 継続的な学習と実践が重要
- チームとの共有を忘れないでください
  :::
