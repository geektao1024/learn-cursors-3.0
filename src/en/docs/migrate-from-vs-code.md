# Migrating from VS Code

<style>
.screenshot {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin: 1rem 0;
}
</style>

Cursor is a fork of VS Code. This allows us to focus on creating the best AI programming experience while maintaining the familiar text editing experience.

### Importing Extensions, Themes, Settings, and Shortcuts

You can import your VS Code configuration into Cursor with a single click. Navigate to `Cursor Settings` > `General` > `Account` to do this.

<img src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/get-started/vscode-import.png" alt="vscode-import" class="screenshot" />

### Staying Updated

We regularly sync Cursor with the latest version of VS Code.

### Why Not Make It an Extension?

As a standalone application, Cursor can better control the editor's interface and achieve deeper AI integration. Some of our features, like Cursor Tab and CMD-K, are impossible to implement as plugins in existing coding environments.

### Settings

You can open the Cursor-specific settings panel through:

- Click the gear icon in the top right
- Press `Ctrl/⌘ + Shift + J`
- Use `Ctrl/⌘ + Shift + P` and type `Cursor Settings`

To open VS Code-related settings:

- Use `Ctrl/⌘ + Shift + P`, then type `VS Code Settings`

### Why Is Cursor's Activity Bar Horizontal?

<img src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/get-started/activity-bar.png" alt="activity-bar" class="screenshot" />

The activity bar is set to horizontal by default to make room for the chat window. If you prefer the traditional vertical activity bar, you can set `workbench.activityBar.orientation` to `vertical` in VS Code settings and restart Cursor.
