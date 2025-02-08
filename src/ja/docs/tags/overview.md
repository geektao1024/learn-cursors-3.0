# Tab機能概要

Cursor Tabは、私たちのネイティブコード補完機能です。Copilotよりも強力で、完全なコード差分の提案が可能で、優れたコンテキストメモリを持っています。

<video autoplay loop muted playsinline style="max-width: 100%; border-radius: 8px;">
  <source src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/cpp/cpp-full-video.mp4" type="video/mp4">
</video>

カスタムモデルによって支援されるCursor Tabは以下のことができます：

- 新しいコードの挿入だけでなく、カーソル周辺の既存コードの編集
- 複数行のコードを同時に修正
- 最近の変更やコード検査（linter）のエラーに基づいた提案

無料ユーザーは2000回の無料提案を利用できます。ProとBusinessプランのユーザーは無制限の提案を利用できます。

### インターフェースの使用

Cursorが新しいコードを追加するだけの場合、補完内容はグレーのテキストで表示されます。既存のコードの修正を提案する場合は、現在の行の右側に差分比較（diff）形式でポップアップ表示されます。

![alt text](https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/cpp/preview-box-example.png)

提案は以下の方法で処理できます：

- `Tab`キーを押して提案全体を受け入れる
- `Ctrl/⌘ →`を押して提案を1文字ずつ受け入れる
- `Esc`キーを押すか入力を続けて提案を拒否する

キー入力やカーソル移動のたびに、Cursorは最近の変更に基づいて提案を試みます。ただし、Cursorは常に提案を表示するわけではありません - モデルが現時点で変更が必要ないと判断することもあります。

Cursorは現在の行の上1行から下2行の範囲内のコードを変更することができます。

### 機能のオン/オフ

この機能を有効または無効にするには、アプリケーションの右下のステータスバーにある「Cursor Tab」アイコンにマウスを合わせるだけです。

### よくある質問

#### コメントを書く際にTab補完が入力を妨げる場合はどうすればよいですか？

以下の手順でコメント内のTab補完を無効にすることができます：

1. `Cursor設定`を開く
2. `Tab Completion`に移動
3. 「コメント内でトリガー」オプションのチェックを外す
