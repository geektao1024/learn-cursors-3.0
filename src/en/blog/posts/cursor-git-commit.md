---
title: Cursor in Action:One-Click Generation of Professional Git Commit Messages
date: 2023-12-25
author: Huihua Wang
description: Say goodbye to tedious Git commit message writing - leverage Cursor's AI capabilities to generate standardized commit messages with just one click
tag:
  - AI
  - Cursor
  - Git
  - Productivity Tools
---

# Cursor in Action: One-Click Generation of Professional Git Commit Messages

In daily development, writing standardized Git commit messages can often be a headache. This article will introduce how to use Cursor's AI capabilities to generate professional Git commit messages with one click, making your code commits more standardized and efficient.

## Why Do We Need Standardized Commit Messages?

Standardized Git commit messages offer the following benefits:

1. **Improved Readability**: Clearly describe code changes
2. **Easy Tracking**: Quickly locate code change history
3. **Automatic Support**: Support automatic CHANGELOG generation
4. **Team Collaboration**: Unify team commit standards

## Cursor's Commit Message Generation Feature

### 1. Basic Usage

In Cursor, you can use the `@Commit (Diff Of Working State)` command to get current code changes and generate corresponding commit messages.

```bash
# Open command palette using shortcut
Command + Shift + P (Mac)
Ctrl + Shift + P (Windows)

# Enter command
@Commit (Diff Of Working State)
```

### 2. Commit Message Template

To generate more professional commit messages, we can use the following template:

```markdown
<type>(<scope>): <subject>

<body>

<footer>
```

#### Commit Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation updates
- **style**: Code formatting (changes that don't affect code execution)
- **refactor**: Refactoring (code changes that are neither new features nor bug fixes)
- **test**: Adding tests
- **chore**: Changes to build process or auxiliary tools

### 3. Practical Examples

#### Example 1: Adding New Feature

```typescript
// Code change: Adding user registration feature
export async function registerUser(data: RegisterDTO) {
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: await hashPassword(data.password),
      name: data.name
    }
  })
  return user
}

// Generated Commit Message
feat(auth): add user registration functionality

Implemented core user registration features:
- Added user registration API endpoint
- Added password encryption handling
- Implemented email verification logic

Related to: #123
```

#### Example 2: Fixing a Bug

```typescript
// Code before fix
function calculateTotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price, 0)
}

// Code after fix
function calculateTotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

// Generated Commit Message
fix(cart): fix shopping cart total calculation error

Fixed the issue where cart total calculation didn't consider item quantity:
- Added item quantity factor in total calculation
- Updated related unit test cases

Fixes: #456
```

## Best Practices

### 1. Commit Message Standards

- **Subject Line Limit**: No more than 72 characters
- **Use Imperative Mood**: Start with verbs like "fix", "add", "update"
- **Clear Subject**: Clearly describe the main changes in this commit
- **Detailed Body**: Provide detailed change description when necessary

### 2. AI Prompt Template

```markdown
Please generate a standardized Git commit message following:

1. Template:
   <type>(<scope>): <subject>

<body>

<footer>

2. Notes:

- Each line should not exceed 72 characters
- Header is required, Body and Footer are optional
- Start with clear verbs
- Provide necessary context information

3. Types include:

- feat: New feature
- fix: Bug fix
- docs: Documentation updates
- style: Formatting adjustments
- refactor: Refactoring
- test: Test-related
- chore: Build/tool-related
```

### 3. Useful Tips

1. **Save Common Templates**: Save frequently used commit templates as code snippets
2. **Integrate with CI/CD**: Automatically trigger CI/CD processes based on commit messages
3. **Link Issues**: Reference related Issues or PRs in commit messages
4. **Organize by Type**: Organize commit messages by different change types

## Automated Workflow

### 1. Configure Git Hooks

```bash
#!/bin/sh
# .git/hooks/commit-msg

# Use Cursor to generate commit message
cursor commit-msg $1
```

### 2. Integration into Development Process

```bash
# Example workflow
git add .
cursor generate-commit  # Use Cursor to generate commit message
git commit -F .git/COMMIT_EDITMSG
```

## Common Issues and Solutions

1. **Commit Message Too Long**

   - Use concise descriptions
   - Put detailed information in the body
   - Use list format appropriately

2. **Scope Determination Difficulties**
   - Divide by functional modules
   - Use clear business terminology
   - Maintain consistent naming conventions

## Conclusion

By using Cursor's AI capabilities, we can:

- Save time writing commit messages
- Maintain consistency and standardization in commit messages
- Improve codebase maintainability
- Enhance team collaboration efficiency

Through proper use of Cursor's Commit Message generation feature, you can significantly improve the efficiency and quality of your code commits. Start trying out this powerful feature today!

## Related Articles

- [Why Choose Cursor? Exploring the Future of AI Programming](./why-choose-cursor) - Understand Cursor's core advantages
- [Cursor Rules: Creating a Personalized AI Programming Assistant](./cursor-rules-guide) - Learn how to customize AI behavior
- [Cursor Quick Start: Master AI Programming Assistant in 10 Minutes](./cursor-quick-start) - Quick guide to getting started with Cursor
- [Complete Guide to Cursor AI Shortcuts](./cursor-shortcuts) - Master all shortcuts
