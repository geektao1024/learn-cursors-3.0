# Cursor - 更快速地构建软件

### `@Files`

在 Cursor 聊天和 Cmd K 等 AI 输入框中，你可以使用 `@Files` 引用整个文件。
此外，如果你在 `@` 之后继续键入，你将在 `@Code` 策略之后看到文件搜索结果。

![@file](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/context/@file.png)

为了确保你引用的文件是正确的文件，Cursor 会显示文件路径的预览。当你在不同文件夹中有多个同名文件时，这特别有用。

### 聊天长文件引用

在 Cursor 的聊天中，如果文件内容太长，Cursor 会将文件分割成较小的块，并根据与查询的相关性重新排序。

![@file-long-file](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/context/@file-long-file.png)

### Cmd K 分块策略

对于 Cmd K，Cursor 会根据内容长度以不同的方式使用文件引用。

![@file-cmdk](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/context/@file-cmdk.png)

- auto
  - 根据文件大小自动选择三种阅读策略中的一种
- full file
  - 使用整个文件作为上下文。
- outline
  - Cursor 解析文件的大纲，并将信息用作上下文。
- chunks
  - Cursor 将文件分割成较小的块，并选择最相关的一个。

### 拖放

你也可以将文件从主侧边栏拖放到聊天或 Cmd K 中，将其作为上下文添加。

- @Files
- 聊天长文件引用
- Cmd K 分块策略
- 拖放
