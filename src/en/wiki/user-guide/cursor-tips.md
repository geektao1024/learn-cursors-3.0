---
title: Cursor Tips and Tricks
description: Master these practical tips to make your Cursor experience more efficient and enjoyable.
---

<style>
.custom-block {
  margin: 2rem 0;
}
.shortcut-group {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}
.shortcut-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
.shortcut-item:last-child {
  border-bottom: none;
}
</style>

# Cursor Tips and Tricks 🎯

Like a martial arts manual, mastering these shortcuts and techniques will make your programming flow like water, achieving more with less effort.

## ⌨️ Essential Shortcuts

::: tip 💡 Pro Tip
Learning these shortcuts is like learning martial arts moves - it may require deliberate practice at first, but with time, these actions will become muscle memory.
:::

### 🤖 AI Tools

<div class="shortcut-group">

| Shortcut               | Function               | Scenario                                            |
| ---------------------- | ---------------------- | --------------------------------------------------- |
| `Tab`                  | Accept Code Completion | When AI provides suggestions, accept with one key   |
| `Cmd/Ctrl + K`         | AI Code Generation     | When you need AI to write code                      |
| `Cmd/Ctrl + L`         | AI Chat                | When you want to discuss with AI                    |
| `Cmd/Ctrl + I`         | AI Editor              | When you need AI to improve your code               |
| `Cmd/Ctrl + Shift + A` | Agent Assistant        | When you need continuous dialogue to complete tasks |

</div>

### 🎮 Editor Tools

<div class="shortcut-group">

| Shortcut               | Function        | Scenario                           |
| ---------------------- | --------------- | ---------------------------------- |
| `Cmd/Ctrl + P`         | Quick Open File | Navigate through project files     |
| `Cmd/Ctrl + Shift + P` | Command Palette | Summon various powerful features   |
| `Cmd/Ctrl + B`         | Toggle Sidebar  | When you need more editing space   |
| `Cmd/Ctrl + J`         | Toggle Terminal | Execute command line operations    |
| `Cmd/Ctrl + \`         | Split Screen    | View multiple files simultaneously |

</div>

### ✨ Editing Techniques

<div class="shortcut-group">

| Shortcut               | Function               | Scenario                               |
| ---------------------- | ---------------------- | -------------------------------------- |
| `Cmd/Ctrl + D`         | Select Next Match      | Batch modify similar content           |
| `Cmd/Ctrl + Shift + L` | Select All Matches     | Modify all matches at once             |
| `Alt + Click`          | Add Cursor             | Edit in multiple places simultaneously |
| `Cmd/Ctrl + Alt + ↑/↓` | Add Cursor Above/Below | Multi-line vertical editing            |

</div>

## 🎯 Practical Techniques

### 1. Smart Completion Techniques

::: tip 🌟 Flexible Usage
The completion feature is like your personal assistant - understanding its habits helps it serve you better.
:::

```typescript
// 1️⃣ Trigger completion actively
function calc⇥
// → function calculateTotal(items: CartItem[]): number {
//      return items.reduce((sum, item) => sum + item.price, 0)
//    }

// 2️⃣ Type inference completion
const user: User = {
  na⇥  // Type property prefix for auto-completion
  // → name: string
}

// 3️⃣ Smart import completion
useState⇥
// → import { useState } from 'react'
```

### 2. AI Collaboration Techniques

::: info 🤝 Key Points
Working with AI is like a dance duet - you need to learn to guide it and make it move according to your rhythm.
:::

1. **Precise Questions**

   - Describe specific scenarios and requirements
   - Explain technical constraints and preferences
   - Provide example code for reference

2. **Progressive Improvement**

   - First build the basic framework
   - Gradually refine details
   - Validate and adjust promptly

3. **Code Quality**
   - Check code standards
   - Ensure type safety
   - Optimize performance

### 3. File Management Techniques 📂

::: tip 🗂️ File Management Essentials
Managing your files is like organizing your workbench - keep everything in order and within reach.
:::

<div class="shortcut-group">

1. **Quick Navigation**

```bash
# Use Cmd/Ctrl + P to quickly open files
file⇥     # Type file name fragment
@symbol⇥  # Jump to symbol
:123⇥     # Jump to specific line
```

2. **Workspace Management**

- Switch between multiple workspaces, each with its purpose
- Clear project structure, well-organized hierarchy
- Make good use of workspace configuration for efficiency

3. **File Operations**

- Quick Create: `Cmd/Ctrl + N`
- Batch Move: Drag + `Alt`
- Smart Rename: `F2`

</div>

## 🎨 Editor Customization

### 1. Interface Beautification

::: info 🎪 Create Your Personal Space
Like decorating your room, make the editor your most comfortable working environment.
:::

<div class="shortcut-group">

1. **Layout Optimization**

- Sidebar Position: Left or right as you prefer
- Editor Split Screen: Multi-view flexibility
- Terminal Position: Top or bottom as needed

2. **Theme Customization**

- Color Scheme: Eye protection first
- Font Adjustment: Clarity is key
- Icon Theme: Pleasing to the eye

3. **Interface Elements**

- Status Bar: Key information at a glance
- Breadcrumbs: Clear file hierarchy
- Minimap: Global code overview

</div>

### 2. Feature Configuration

::: tip ⚙️ Personalization
Configuring your editor is like training a horse - make it understand your intentions better.
:::

<div class="shortcut-group">

1. **Shortcut Customization**

- Custom Combinations: Efficiency is king
- Conflict Resolution: Simplify complexity
- Habit Migration: Quick adaptation

2. **Code Snippets**

- Common Templates: One-click generation
- Dynamic Parameters: Flexible replacement
- Category Management: Well-organized

3. **Synchronization Solutions**

- Settings Sync: Consistency everywhere
- Plugin Sync: Available anywhere
- Snippet Sync: Share experiences

</div>

## 🔍 Debugging Techniques

::: tip 🎯 Debugging Philosophy
Debugging is like solving a mystery - it requires patience, attention to detail, and wisdom. Master these techniques to navigate the code maze with ease.
:::

### 1. Breakpoint Strategy 🎯

<div class="shortcut-group">

1. **Setting Traps**

```typescript
// 1️⃣ Regular breakpoint: Set at key positions
function process() {
  // Press F9 here
  const result = complexCalculation()
}

// 2️⃣ Conditional breakpoint: Triggers only under specific conditions
for (const item of items) {
  // Right-click → Conditional breakpoint → item.value > 100
  process(item)
}

// 3️⃣ Logpoint: Print without pausing
function calculate() {
  // Right-click → Logpoint → "Current value: {value}"
  return value * 2
}
```

2. **Breakpoint Navigation**

- 🔄 `F8` - Move between breakpoints smoothly
- 🎚️ `Ctrl + F9` - Enable/Disable at will
- 📋 Breakpoint List - Overview all breakpoints

3. **Advanced Tracking**

- 📊 Data Breakpoints: Monitor variable changes
- 🎯 Function Breakpoints: Capture function calls
- ⚠️ Exception Breakpoints: Intercept errors

</div>

### 2. Debugging Tools 🛠️

<div class="shortcut-group">

1. **Variable Tracking**

- 👀 Watch Window: Real-time variable monitoring
- 🔍 Hover Tips: Quick value inspection
- ⚡ Immediate Evaluation: Calculate expressions anytime

2. **Call Stack Tracking**

- 🗺️ Call Stack: Clear view of code execution path
- ⬆️ Trace Upward: Find problem source
- 🔄 Frame Switching: Navigate between different call levels

3. **Console Usage**

- 🔍 Smart Filtering: Keep `console.log` organized
- ⌨️ Immediate Execution: Test code snippets
- 🔬 Object Inspection: Deep data structure analysis

</div>

::: warning 💡 Debugging Tips

- Use logpoints wisely to avoid repeated code modifications
- Make good use of conditional breakpoints for efficient debugging
- Master shortcuts to make debugging process smooth
  :::

## ⚡ Performance Optimization

::: tip 🚀 Performance First
Like tuning a race car, every detail optimization can bring performance improvements. Let's tune the editor to its optimal state.
:::

### 1. Editor Optimization 🎯

<div class="shortcut-group">

1. **File Management**

- 📂 Open File Limit: Set reasonable thresholds
- 🎯 Workspace Focus: Load only necessary files
- 🔌 Plugin Optimization: Disable unused features

2. **Search Acceleration**

- 🔍 Precise Search: Use file type filters
- 📍 Scope Limitation: Specify search directories
- ⚡ Index Optimization: Maintain clear file structure

3. **Resource Management**

- 🧹 Regular Cleanup: Remove temporary files
- 📊 Performance Monitoring: Watch memory usage
- ⚖️ Balance: Features vs. Performance

</div>

### 2. AI Acceleration 🤖

<div class="shortcut-group">

1. **Response Optimization**

- ⚡ Precise Prompts: Clear instructions for faster results
- 🎯 Scope Control: Limit generation content size
- 📝 Incremental Generation: Complete large tasks in steps

2. **Resource Conservation**

- 💡 Use as Needed: Avoid over-reliance on AI
- 🔄 Cache Reuse: Save common code snippets
- 📦 Local Priority: Prioritize local resources

3. **Quality Control**

- ✅ Code Check: Ensure generated code quality
- 🛠️ Error Handling: Handle exceptions gracefully
- 📈 Continuous Improvement: Keep improving generation strategies

</div>

::: warning 💡 Optimization Tips

- Regular workspace cleanup to keep projects lean
- Reasonable AI feature usage to avoid excessive consumption
- Maintain good code organization for efficient retrieval
  :::

## 🤝 Collaboration Techniques

::: tip 🌟 Team Collaboration Philosophy
Great code isn't a solo performance but a team symphony. Master these collaboration techniques for more harmonious team development.
:::

### 1. Code Review Techniques 👀

<div class="shortcut-group">

1. **Diff Comparison**

```diff
// Use Alt + Click to navigate in diff view
+ function newFeature() {
+   // New feature implementation
+ }
- function oldFeature() {
-   // Removed old implementation
- }
```

- 📊 Inline Comparison: Clear view of line changes
- 🔄 Side-by-Side: Clear old vs new code
- 📜 History Tracking: Understand code evolution

2. **Feedback Art**

- 💬 Precise Comments: Direct feedback on specific lines
- 📝 Constructive Suggestions: Provide improvement directions
- ✅ Follow-up: Ensure issues are resolved

3. **Version Control**

- 🌳 Branch Management: Keep code flow clear
- 🔀 Conflict Resolution: Elegantly resolve code conflicts
- 🔄 Merge Strategy: Ensure safe code integration

</div>

### 2. Team Coordination 🤲

<div class="shortcut-group">

1. **Knowledge Sharing**

- 📚 Code Snippet Library: Accumulate team best practices
- ⚙️ Configuration Sync: Unified development environment
- 📖 Team Documentation: Build knowledge base

2. **Standards Unification**

- 📏 Code Style: Follow team conventions
- 🎨 Naming Conventions: Improve code readability
- 🔍 Review Standards: Ensure code quality

3. **Experience Transfer**

- 📝 Skill Sharing: Regular learning exchange
- 🎓 Newcomer Guide: Help team growth
- 🔄 Continuous Improvement: Keep optimizing processes

</div>

::: warning 💡 Collaboration Tips

- Maintain positive communication attitude
- Follow team development standards
- Actively share experience and knowledge
  :::

::: tip 📚 Final Words

- Mastering these techniques takes time
- Continuous learning and practice are important
- Remember to share your insights with the team
  :::
