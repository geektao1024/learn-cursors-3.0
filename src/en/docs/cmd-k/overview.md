### Cmd K 概览

Cmd K（在 Windows/Linux 上也称为 “Ctrl K”）允许你在编辑器窗口中生成新代码或编辑现有代码。

![常规](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/cmdk/regular.png)

### 提示栏

在 Cursor 中，当你按下 `Ctrl/Cmd K` 时出现的栏称为“提示栏”。它的工作方式类似于聊天的 AI 输入框，你可以正常键入，或者使用 @ 符号引用其他上下文。

### 内联生成

如果在按下 `Ctrl/Cmd K` 时没有选择代码，Cursor 将根据你在提示栏中键入的提示生成新代码。

![生成](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/cmdk/generate.png)

### 内联编辑

对于原地编辑，你只需选择要编辑的代码，并在提示栏中键入。

![编辑](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/cmdk/edit.png)

### 后续指令

每次生成后，你可以通过向提示栏添加更多指令来进一步完善提示，并按 `Enter` 键，使 AI 根据你的后续指令重新生成。

### 默认上下文

默认情况下，除了你手动包含的 @ 符号之外，Cursor 会尝试找到不同类型的有用信息来改善代码生成。

附加上下文可能包括相关文件、最近查看的文件等。收集后，Cursor 会根据与你编辑/生成的相关性对上下文项进行排名，并为大型语言模型保留排名靠前的项目。

### 快速提问

如果你在提示栏中按下 `Option/Alt Enter`，Cursor 将回答你对选择的任何问题，以及你附加的上下文。

这次对话的内容可以进一步用于后续生成，所以你可以在 Cursor 提出一个回答后简单地键入“do it”来生成代码。
