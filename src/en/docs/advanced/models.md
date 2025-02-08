# Cursor - Build Software Faster

Using Cursor chat, Ctrl/⌘ K, and terminal Ctrl/⌘ K, you can easily switch between different models of your choice.

### Model Dropdown

Below the AI input box, you'll see a dropdown menu that allows you to select which model you want to use. By default, Cursor has the following models ready to use:

- `GPT-4o`
- `GPT-4`
- `Claude 3.5 Sonnet`
- `cursor-small`
  - `cursor-small` is Cursor's custom model that's not as smart as `GPT-4` but is faster and available for unlimited use.

![Model Toggle](https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/advanced/model-toggle.png)

You can add additional models under `Cursor Settings` > `Models` > `Model Names`.

### Long Context Models Only

In long context chats, model selection is limited to models that support long context:

- `gpt-4o-128k`
- `gemini-1.5-flash-500k`
- `claude-3-haiku-200k`
- `claude-3-sonnet-200k`
- `claude-3-5-sonnet-200k`

### What Context Window Does Model X Use?

In chat, we currently limit to about 20,000 tokens (or less if the model doesn't support that much context). For cmd-K, we limit to about 10,000 tokens to balance response time and quality. Long context chats use the model's maximum context window.

- Model Dropdown
- Long Context Models Only
- What Context Window Does Model X Use?
