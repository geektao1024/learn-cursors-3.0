# Composer Overview

Developer's Guide to Using Composer

## Welcome to Composer

Composer is an AI programming assistant integrated into the editor. It helps you explore code, write new features, and modify existing code without leaving your workflow. Open it with `⌘I`, create a new Composer with `⌘N`.

<img src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/composer/empty-composer.png" style="max-width: 100%; border-radius: 8px;" alt="Composer Interface Overview" />

## Agent Mode

Enable Agent Mode with `⌘.` to get a programming partner that actively handles your codebase:

- Automatically retrieves relevant context (try `@Recommended`)
- Runs terminal commands
- Creates and modifies files
- Performs semantic code search
- Executes file operations

[Image placeholder: Agent Mode interface]

> Agent will stop after 25 tool calls. If you need more, please email hi@cursor.com!
>
> Currently, Agent only supports Claude models.
>
> Each tool operation counts towards your quota.

## Normal Mode

Normal mode provides core functionality for code exploration and generation:

- Search codebase and documentation
- Use web search
- Create and write files
- Access extended `@` symbol commands

<img src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/context/@-symbols-basics.png" style="max-width: 100%; border-radius: 8px;" alt="Normal Mode Interface" />

## Using Context

Type `@` to see context options based on your current work. Navigate with arrow keys, select with Enter, filter by typing after `@`. Use `Ctrl/⌘ M` to toggle file reading method. In Agent mode, `@Recommended` automatically fetches relevant context.

**`#` File Selection**
Use `#` followed by a filename to focus on specific files. Can be combined with `@` symbols for precise context control.

**Context Tags**
Tags at the top of the chat show active context. Add or remove tags to adjust what Composer can see. Files appear as tags after selecting them with `#`.

[Image placeholder: Context Tags Example]

## Generating and Applying Changes

When Composer suggests changes:

- View changes in the diff view
- Accept or reject changes using provided buttons
- Use checkpoints for undoing when needed

<img src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/composer/checkpoints.png" style="max-width: 100%; border-radius: 8px;" alt="Diff View Example" />

## Checkpoints

Composer creates a checkpoint each time code is generated. You can return to any previous version by clicking `checkout` next to the checkpoint. This is useful if you don't like current changes and want to revert to a previous state.

## History

Access previous Composer sessions and chats through History. Open from the history icon on the right side of the Cursor Tab. You can see a list of past composers and chats, revisit, rename, or delete them.

Open with `⌘+⌥+L` or `Ctrl+Alt+L` when Composer is focused.

## Layout

Composer offers two layout modes:

- Panel: Chat sidebar on the left, code editor on the right.
- Editor: Single editor window, similar to normal code viewing. You can move it, split it, or even place it in a separate window.

<img src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/composer/iterate-on-lint.png" style="max-width: 100%; border-radius: 8px;" alt="Layout Modes Example" />

## Beta Features

### Iterative Lint Fix

Composer attempts to fix lint issues in generated code for most programming languages. When enabled, if Composer detects lint errors, it will try to fix them automatically. Currently supports only one iteration.

Some languages (like Rust) require saving the file before showing lint errors, which may limit this feature's effectiveness across all languages.

## FAQ

### What's the difference between Chat and Composer?

Cursor Chat helps you search and understand code. Use it to explore the codebase, ask questions, and get explanations. You can use `⌘⏎` to search code.

Composer helps you write and edit code. It provides a workspace where you can generate new code and apply changes directly to files.
