# VS Codeからの移行

<style>
.screenshot {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin: 1rem 0;
}
</style>

CursorはVS Codeのフォークです。これにより、使い慣れたテキスト編集体験を維持しながら、最高のAIプログラミング体験の構築に注力することができます。

### 拡張機能、テーマ、設定、ショートカットのインポート

VS Codeの設定をワンクリックでCursorにインポートすることができます。`Cursor設定` > `一般` > `アカウント`から操作できます。

<img src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/get-started/vscode-import.png" alt="vscode-import" class="screenshot" />

### 最新の状態を維持

私たちは定期的にCursorを最新バージョンのVS Codeと同期更新しています。

### なぜ拡張機能ではないのか？

独立したアプリケーションとして、Cursorはエディターのインターフェースをより良くコントロールし、より深いAI統合を実現することができます。CursorタブやCMD-Kなどの機能は、既存のコーディング環境では拡張機能として実現することができません。

### 設定

以下の方法でCursor専用の設定パネルを開くことができます：

- 右上の歯車ボタンをクリック
- `Ctrl/⌘ + Shift + J`を押す
- `Ctrl/⌘ + Shift + P`を使用して`Cursor Settings`と入力

VS Code関連の設定を開くには：

- `Ctrl/⌘ + Shift + P`を使用し、`VS Code Settings`と入力

### なぜCursorのアクティビティバーは水平なのか？

<img src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/get-started/activity-bar.png" alt="activity-bar" class="screenshot" />

アクティビティバーがデフォルトで水平に設定されているのは、チャットウィンドウのスペースを確保するためです。従来の垂直アクティビティバーを好む場合は、VS Code設定で`workbench.activityBar.orientation`を`vertical`に設定し、Cursorを再起動してください。
