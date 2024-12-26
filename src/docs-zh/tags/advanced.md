# 高级功能

### Peek 视图中的 Tab

你也可以在"转到定义"或"转到类型定义"的 Peek 视图中使用 Cursor Tab。例如，在给函数调用添加新参数时，这非常有用。

![Peek 视图中的 CPP](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/cpp/cpp-in-peek.png)

我们特别喜欢在 vim 中结合使用 `gd` 命令，例如，修改函数定义，然后一次性修复其所有用法。

### Cursor 预测

Cursor 还可以预测你在接受编辑后将前往的位置。如果有可用的预测位置，你可以通过按 Tab 键跳转到下一个位置，让你能够通过连续按 Tab 键快速完成一系列编辑。

![CP](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/cpp/cp.png)

Cursor 预测了下一个位置，并在那里提供了编辑建议。

### 部分接受

你可以通过按 `Ctrl/⌘` 和右箭头来接受建议中的下一个单词（或者通过将 `editor.action.inlineSuggest.acceptNextWord` 设置为你喜欢的快捷键）。

要启用部分接受功能，请导航至 `Cursor 设置` > `Features` > `Cursor Tab`。
