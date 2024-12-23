### 忽略文件

要在 Cursor 的功能（如代码库索引）中忽略某些文件，你可以在项目的根目录下使用 `.cursorignore` 文件。它的工作原理与 `.gitignore` 对 git 的工作方式相同。

`.cursorignore` 会尊重 `.gitignore`。如果你已经设置了 `.gitignore`，那么文件将默认被忽略。
如果你想忽略额外的文件，可以将它们添加到 `.cursorignore` 文件中。

案例忽略 dist 目录下的所有文件

# Ignore all files in the `dist` directory

dist/

# Ignore all `.log` files

\*.log

# Ignore specific file `config.json`

config.json
