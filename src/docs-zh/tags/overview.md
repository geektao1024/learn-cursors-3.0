# Cursor - 更快速地构建软件

### Cursor Tab 功能概述

Cursor Tab 是我们的原生自动补全特性。它是一个更强大的 Copilot，能够建议整个差异，并具有特别好的记忆力。

![Ghost Text Example](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/cpp/ghost-text-example.png)

由定制模型提供支持，Cursor Tab 可以：

- 在光标周围建议编辑，不仅仅是插入额外的代码。
- 一次性修改多行。
- 根据你最近的更改和 linter 错误提出建议。

免费用户可以免费获得 2000 次建议。专业和商业计划提供无限次建议。

### 用户界面

当 Cursor 仅添加额外文本时，补全将以灰色文本显示。如果建议修改现有代码，
它将作为当前行右侧的 diff 弹窗显示。

你可以通过按 `Tab` 接受建议，或按 `Esc` 拒绝。要逐字部分接受建议，按 `Ctrl/⌘ →`。
要拒绝建议，只需继续键入，或使用 `Escape` 取消/隐藏建议。

每次击键或光标移动，Cursor 都会尝试根据你最近的更改提出建议。然而，Cursor 不会总是显示建议；有时模型预测没有要进行的更改。

Cursor 可以在当前行上方一行到下方两行之间进行更改。

![Preview Box Example](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/cpp/preview-box-example.png)

### 开关

要开启或关闭此功能，请将鼠标悬停在应用程序右下角状态栏上的 “Cursor Tab” 图标上。

- 用户界面
- 开关
