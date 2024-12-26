# Composer 功能概述

开发者的 Composer 使用指南

## 欢迎使用 Composer

Composer 是一个集成在编辑器中的 AI 编程助手。它可以帮助你探索代码、编写新功能、修改现有代码，而无需离开你的工作流程。使用 `⌘I` 打开它，使用 `⌘N` 创建新的 Composer。

<img src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/composer/empty-composer.png" style="max-width: 100%; border-radius: 8px;" alt="Composer 界面概览" />

## Agent 模式

通过 `⌘.` 启用 Agent 模式，获得一个能主动处理代码库的编程伙伴：

- 自动获取相关上下文（试试 `@Recommended`）
- 运行终端命令
- 创建和修改文件
- 语义化搜索代码
- 执行文件操作

[预览图片占位符: Agent 模式界面]

> Agent 最多可以进行 25 次工具调用后停止。如果你需要更多，请发邮件至 hi@cursor.com！
>
> 目前，Agent 仅支持 Claude 模型。
>
> 每次工具操作都会计入你的配额。

## 普通模式

普通模式提供代码探索和生成的核心功能：

- 搜索代码库和文档
- 使用网络搜索
- 创建和编写文件
- 访问扩展的 `@` 符号命令

<img src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/context/@-symbols-basics.png" style="max-width: 100%; border-radius: 8px;" alt="普通模式界面" />

## 使用上下文

输入 `@` 可以查看基于当前工作的上下文选项。使用箭头键导航，Enter 键选择，在 `@` 后输入进行过滤。使用 `Ctrl/⌘ M` 切换文件读取方法。在 Agent 模式下，`@Recommended` 会自动获取相关上下文。

**`#` 文件选择**
使用 `#` 后跟文件名来关注特定文件。可以将其与 `@` 符号组合使用，实现精确的上下文控制。

**上下文标签**
聊天顶部的标签显示活动的上下文。添加或删除标签来调整 Composer 可见的内容。使用 `#` 选择文件后，文件会显示为标签。

[预览图片占位符: 上下文标签示例]

## 生成和应用更改

当 Composer 建议更改时：

- 在差异视图中查看更改
- 使用提供的按钮接受或拒绝更改
- 需要时使用检查点进行撤销

<img src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/composer/checkpoints.png" style="max-width: 100%; border-radius: 8px;" alt="差异视图示例" />

## 检查点

每次生成代码时，Composer 都会创建一个检查点。你可以通过点击检查点旁边的 `checkout` 返回任何之前的版本。如果你不喜欢当前的更改想要恢复到之前的状态，这个功能很有用。

## 历史记录

通过历史记录访问之前的 Composer 会话和聊天。从 Cursor Tab 右侧的历史图标打开。你可以看到过去的 composer 和聊天列表，可以重新访问、重命名或删除它们。

当 Composer 处于焦点状态时，使用 `⌘+⌥+L` 或 `Ctrl+Alt+L` 打开。

## 布局

Composer 提供两种布局模式：

- 面板：左侧是聊天的侧边栏，右侧是代码编辑器。
- 编辑器：单个编辑器窗口，类似于正常查看代码。你可以移动它、拆分它，甚至将它放在单独的窗口中。

<img src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/composer/iterate-on-lint.png" style="max-width: 100%; border-radius: 8px;" alt="布局模式示例" />

## Beta 功能

### 迭代修复 lint 问题

Composer 会尝试修复大多数编程语言生成的代码中的 lint 问题。当启用此功能时，如果 Composer 检测到 lint 错误，它会尝试自动修复。目前仅支持一次迭代。

某些语言（如 Rust）需要保存文件后才会显示 lint 错误，这可能会限制此功能在所有语言中的有效性。

## 常见问题

### Chat 和 Composer 有什么区别？

Cursor Chat 帮助你搜索和理解代码。使用它来探索代码库、提问和获取解释。你可以使用 `⌘⏎` 搜索代码。

Composer 帮助你编写和编辑代码。它提供了一个工作区，你可以在其中生成新代码并直接将更改应用到文件中。
