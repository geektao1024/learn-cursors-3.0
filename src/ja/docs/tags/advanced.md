# 高度な機能

### ピークビューでのTab

「定義へ移動」や「型定義へ移動」のピークビューでもCursor Tabを使用できます。例えば、関数呼び出しに新しいパラメータを追加する際に非常に便利です。

![ピークビューでのCPP](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/cpp/cpp-in-peek.png)

特にvimで`gd`コマンドと組み合わせて使用することをお勧めします。例えば、関数定義を修正し、その使用箇所をすべて一度に修正することができます。

### Cursorの予測

Cursorは、編集を受け入れた後にあなたが移動する位置も予測できます。予測位置が利用可能な場合、Tabキーを押して次の位置に移動できます。これにより、Tabキーを連続して押すことで一連の編集を素早く完了できます。

![CP](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/cpp/cp.png)

Cursorは次の位置を予測し、そこで編集の提案を提供します。

### 部分的な受け入れ

`Ctrl/⌘`と右矢印キーを押すことで、提案の次の単語を受け入れることができます（または`editor.action.inlineSuggest.acceptNextWord`を好みのショートカットに設定できます）。

部分的な受け入れ機能を有効にするには、`Cursor設定` > `機能` > `Cursor Tab`に移動してください。
