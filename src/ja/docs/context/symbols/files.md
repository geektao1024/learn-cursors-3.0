# Cursor - より速いソフトウェア開発

### `@Files`

CursorチャットやCmd KなどのAI入力欄で、`@Files`を使用してファイル全体を参照できます。
また、`@`の後に入力を続けると、`@Code`戦略の後にファイル検索結果が表示されます。

![@file](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/context/@file.png)

参照しているファイルが正しいことを確認できるように、Cursorはファイルパスのプレビューを表示します。これは、異なるフォルダに同名のファイルが複数ある場合に特に便利です。

### チャットでの長いファイル参照

Cursorのチャットでは、ファイルの内容が長すぎる場合、Cursorはファイルを小さなチャンクに分割し、クエリとの関連性に基づいて並べ替えます。

![@file-long-file](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/context/@file-long-file.png)

### Cmd Kのチャンク戦略

Cmd Kでは、Cursorは内容の長さに応じて異なる方法でファイル参照を使用します。

![@file-cmdk](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/context/@file-cmdk.png)

- auto
  - ファイルサイズに基づいて3つの読み取り戦略の1つを自動選択
- full file
  - ファイル全体をコンテキストとして使用
- outline
  - Cursorがファイルの概要を解析し、その情報をコンテキストとして使用
- chunks
  - Cursorがファイルを小さなチャンクに分割し、最も関連性の高いものを選択

### ドラッグ＆ドロップ

メインサイドバーからファイルをチャットやCmd Kにドラッグ＆ドロップして、コンテキストとして追加することもできます。

- @Files
- チャットでの長いファイル参照
- Cmd Kのチャンク戦略
- ドラッグ＆ドロップ
