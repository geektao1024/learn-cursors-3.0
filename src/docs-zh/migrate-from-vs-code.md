# 从 VS Code 迁移

<style>
.screenshot {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin: 1rem 0;
}
</style>

Cursor 是 VS Code 的一个分支。这使我们能够专注于打造最佳的 AI 编程体验，同时保持熟悉的文本编辑体验。

### 导入扩展、主题、设置和快捷键

你可以一键将 VS Code 的配置导入到 Cursor 中。导航到 `Cursor 设置` > `通用` > `账户` 即可操作。

<img src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/get-started/vscode-import.png" alt="vscode-import" class="screenshot" />

### 保持更新

我们会定期将 Cursor 与最新版本的 VS Code 进行同步更新。

### 为什么不做成扩展？

作为一个独立的应用程序，Cursor 可以更好地控制编辑器的界面，实现更深度的 AI 集成。我们的一些功能，比如 Cursor Tab 和 CMD-K，在现有的编码环境中作为插件是无法实现的。

### 设置

你可以通过以下方式打开 Cursor 专属设置面板：

- 点击右上角的齿轮按钮
- 按下 `Ctrl/⌘ + Shift + J`
- 使用 `Ctrl/⌘ + Shift + P` 并输入 `Cursor Settings`

要打开 VS Code 相关设置，可以：

- 使用 `Ctrl/⌘ + Shift + P`，然后输入 `VS Code Settings`

### 为什么 Cursor 的活动栏是水平的？

<img src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/get-started/activity-bar.png" alt="activity-bar" class="screenshot" />

活动栏默认设置为水平是为了给聊天窗口留出空间。如果你更喜欢传统的垂直活动栏，可以在 VS Code 设置中将 `workbench.activityBar.orientation` 设置为 `vertical`，然后重启 Cursor。
