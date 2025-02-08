# Cursor - Build Software Faster

### `@Files`

In Cursor's AI input fields like chat and Cmd K, you can use `@Files` to reference entire files.
Additionally, if you continue typing after `@`, you'll see file search results after the `@Code` strategy.

![@file](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/context/@file.png)

To ensure you're referencing the correct file, Cursor shows a preview of the file path. This is particularly useful when you have multiple files with the same name in different folders.

### Chat Long File References

In Cursor's chat, if the file content is too long, Cursor will split the file into smaller chunks and reorder them based on relevance to the query.

![@file-long-file](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/context/@file-long-file.png)

### Cmd K Chunking Strategies

For Cmd K, Cursor uses file references differently based on content length.

![@file-cmdk](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/context/@file-cmdk.png)

- auto
  - Automatically selects one of the three reading strategies based on file size
- full file
  - Uses the entire file as context
- outline
  - Cursor parses the file's outline and uses the information as context
- chunks
  - Cursor splits the file into smaller chunks and selects the most relevant one

### Drag and Drop

You can also drag and drop files from the main sidebar into chat or Cmd K to add them as context.

- @Files
- Chat Long File References
- Cmd K Chunking Strategies
- Drag and Drop
