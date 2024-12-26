# Tab 功能概述

Cursor Tab 是我们的原生代码补全功能。它比 Copilot 更强大,能够提供完整的代码差异建议,并且具有出色的上下文记忆能力。

<video autoplay loop muted playsinline style="max-width: 100%; border-radius: 8px;">
  <source src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/cpp/cpp-full-video.mp4" type="video/mp4">
</video>

由定制模型提供支持,Cursor Tab 可以:

- 不仅能插入新代码,还能对光标周围的现有代码进行编辑
- 同时修改多行代码
- 根据你最近的改动和代码检查(linter)的错误提供建议

免费用户可以获得 2000 次免费建议额度。Pro 和 Business 计划用户享有无限次建议。

### 使用界面

当 Cursor 只是添加新的代码时,补全内容会以灰色文本显示。如果建议修改现有代码,则会在当前行右侧以差异对比(diff)的形式弹出显示。

![alt text](https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/cpp/preview-box-example.png)

你可以通过以下方式处理建议:

- 按 `Tab` 键接受整个建议
- 按 `Ctrl/⌘ →` 逐字接受建议
- 按 `Esc` 键或继续输入来拒绝建议

每次按键或移动光标时,Cursor 都会根据你最近的改动尝试给出建议。但 Cursor 不会总是显示建议 - 有时模型会判断当前不需要做任何更改。

Cursor 可以对当前行上方一行到下方两行范围内的代码进行更改。

### 开关功能

要开启或关闭此功能,只需将鼠标悬停在应用程序右下角状态栏上的 "Cursor Tab" 图标上。

### 常见问题

#### 写注释时 Tab 补全会干扰输入,该怎么办?

你可以通过以下步骤禁用注释中的 Tab 补全:

1. 打开 `Cursor 设置`
2. 进入 `Tab Completion`
3. 取消勾选 "Trigger in comments" 选项
