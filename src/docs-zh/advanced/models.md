# Cursor - 更快速地构建软件

使用 Cursor 聊天、Ctrl/⌘ K 和终端 Ctrl/⌘ K，你可以轻松切换到你选择的不同模型。

### 模型下拉菜单

在 AI 输入框下方，你会看到一个下拉菜单，允许你选择想要使用的模型。默认情况下，Cursor 已经准备好了以下模型供使用：

- `GPT-4o`
- `GPT-4`
- `Claude 3.5 Sonnet`
- `cursor-small`
  - `cursor-small` 是 Cursor 的定制模型，它没有 `GPT-4` 那么智能，但是速度更快，并且用户可以无限制地使用它。

![模型切换](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/advanced/model-toggle.png)

你可以在 `Cursor 设置` > `模型` > `模型名称` 下添加额外的模型。

### 仅限长上下文模型

在长上下文聊天中，模型选择仅限于支持长上下文的模型：

- `gpt-4o-128k`
- `gemini-1.5-flash-500k`
- `claude-3-haiku-200k`
- `claude-3-sonnet-200k`
- `claude-3-5-sonnet-200k`

### 模型 X 使用了哪个上下文窗口？

在聊天中，我们目前限制在大约 20,000 个 token（如果模型不支持那么多上下文，则更少）。对于 cmd-K，我们限制在大约 10,000 个 token，以平衡响应时间和质量。长上下文聊天使用模型的最大上下文窗口。

- 模型下拉菜单
- 仅限长上下文模型
- 模型 X 使用了哪个上下文窗口？
