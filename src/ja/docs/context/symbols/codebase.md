# Cursor - より速いソフトウェア開発

### `@Codebase`

`@Codebase`を使用すると、Cursorチャットは以下のステップを経て、使用する最も重要なコードスニペットを見つけ出します。

- **収集**：重要なファイル/コードブロックを探してコードベースをスキャン
- **並べ替え**：クエリとの関連性に基づいてコンテキスト項目を並べ替え
- **推論**：コンテキストの使用計画を考える
- **生成**：応答を提案

![推論プロセス](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/chat/@codebase.png)

高度なコードベースクエリを送信するもう1つの方法は、`Ctrl/⌘ + Enter`ボタンの横にあるドロップダウンメニューをクリックし、検索動作として`reranker`を選択することです。
これは`@Codebase`を使用していない場合にのみ利用可能で、`@Codebase`が使用されている場合は`@Codebase`が優先されます。

- `@Codebase`

![コードベースドロップダウン](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/chat/codebase-dropdown.png)
