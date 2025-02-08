# Tab Feature Overview

Cursor Tab is our native code completion feature. It's more powerful than Copilot, capable of providing complete code diff suggestions and has excellent context memory.

<video autoplay loop muted playsinline style="max-width: 100%; border-radius: 8px;">
  <source src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/cpp/cpp-full-video.mp4" type="video/mp4">
</video>

Powered by custom models, Cursor Tab can:

- Not only insert new code but also edit existing code around the cursor
- Modify multiple lines of code simultaneously
- Provide suggestions based on your recent changes and linter errors

Free users get 2000 free suggestion credits. Pro and Business plan users enjoy unlimited suggestions.

### User Interface

When Cursor is only adding new code, completions appear as gray text. If the suggestion modifies existing code, it appears as a diff popup on the right side of the current line.

![alt text](https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/cpp/preview-box-example.png)

You can handle suggestions in the following ways:

- Press `Tab` to accept the entire suggestion
- Press `Ctrl/⌘ →` to accept suggestions word by word
- Press `Esc` or continue typing to reject the suggestion

Cursor attempts to provide suggestions with each keystroke or cursor movement based on your recent changes. However, Cursor won't always show suggestions - sometimes the model determines that no changes are needed at the moment.

Cursor can modify code within a range of one line above to two lines below the current line.

### Toggling the Feature

To turn this feature on or off, simply hover over the "Cursor Tab" icon in the status bar at the bottom right of the application.

### Common Questions

#### What if Tab completion interferes with typing in comments?

You can disable Tab completion in comments by following these steps:

1. Open `Cursor Settings`
2. Go to `Tab Completion`
3. Uncheck the "Trigger in comments" option
