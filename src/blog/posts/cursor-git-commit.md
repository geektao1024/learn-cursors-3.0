---
title: Cursor 实战：一键生成专业的 Git Commit Message
date: 2023-12-25
author: Huihua Wang
description: 告别繁琐的 Git 提交信息编写，利用 Cursor 的 AI 能力，一键生成规范的 Commit Message
tag:
  - AI
  - Cursor
  - Git
  - 效率工具
---

# Cursor 实战：一键生成专业的 Git Commit Message

在日常开发中，编写规范的 Git Commit Message 常常是一件令人头疼的事情。本文将介绍如何利用 Cursor 的 AI 能力，一键生成专业的 Git Commit Message，让你的代码提交更加规范和高效。

## 为什么需要规范的 Commit Message？

规范的 Git Commit Message 有以下好处：

1. **提高可读性**：清晰描述代码变更内容
2. **便于追踪**：快速定位代码变更历史
3. **自动支持**：支持自动生成 CHANGELOG
4. **团队协作**：统一团队提交规范

## Cursor 的 Commit Message 生成功能

### 1. 基本使用

在 Cursor 中，你可以使用 `@Commit (Diff Of Working State)` 命令来获取当前的代码变更，并生成相应的 Commit Message。

```bash
# 使用快捷键打开命令面板
Command + Shift + P (Mac)
Ctrl + Shift + P (Windows)

# 输入命令
@Commit (Diff Of Working State)
```

### 2. Commit Message 模板

为了生成更专业的 Commit Message，我们可以使用以下模板：

```markdown
<type>(<scope>): <subject>

<body>

<footer>
```

#### 提交类型（Type）

- **feat**: 新功能
- **fix**: 修复 bug
- **docs**: 文档更新
- **style**: 代码格式（不影响代码运行的变动）
- **refactor**: 重构（既不是新增功能，也不是修改 bug 的代码变动）
- **test**: 增加测试
- **chore**: 构建过程或辅助工具的变动

### 3. 实战示例

#### 示例 1：添加新功能

```typescript
// 代码变更：添加用户注册功能
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

// 生成的 Commit Message
feat(auth): 添加用户注册功能

实现了用户注册的核心功能：
- 新增用户注册 API 接口
- 添加密码加密处理
- 实现邮箱验证逻辑

Related to: #123
```

#### 示例 2：修复 Bug

```typescript
// 修复前的代码
function calculateTotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price, 0)
}

// 修复后的代码
function calculateTotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

// 生成的 Commit Message
fix(cart): 修复购物车总价计算错误

修复了购物车总价计算时未考虑商品数量的问题：
- 在计算总价时加入商品数量因素
- 更新相关的单元测试用例

Fixes: #456
```

## 最佳实践

### 1. 提交信息规范

- **主题行限制**：不超过 72 个字符
- **使用祈使句**：以动词开头，如"修复"、"添加"、"更新"等
- **主题简明**：清晰描述本次提交的主要变更
- **正文详细**：必要时提供详细的变更说明

### 2. AI 提示词模板

```markdown
请生成一个符合规范的中文 Git Commit Message，要求：

1. 遵循以下模板：
<type>(<scope>): <subject>

<body>

<footer>

2. 注意事项：
- 每行不超过 72 个字符
- Header 必填，Body 和 Footer 可选
- 使用清晰的动词开头
- 提供必要的上下文信息

3. type 类型包括：
- feat: 新功能
- fix: 修复 bug
- docs: 文档更新
- style: 格式调整
- refactor: 重构
- test: 测试相关
- chore: 构建/工具相关
```

### 3. 实用技巧

1. **保存常用模板**：将常用的提交模板保存为代码片段
2. **结合 CI/CD**：用提交信息自动触发相应的 CI/CD 流程
3. **关联议题**：在提交信息中关联相关的 Issue 或 PR
4. **分类整理**：按照不同的变更类型组织提交信息

## 自动化工作流

### 1. 配置 Git Hooks

```bash
#!/bin/sh
# .git/hooks/commit-msg

# 使用 Cursor 生成提交信息
cursor commit-msg $1
```

### 2. 集成到开发流程

```bash
# 示例工作流
git add .
cursor generate-commit  # 使用 Cursor 生成提交信息
git commit -F .git/COMMIT_EDITMSG
```

## 常见问题解决

1. **提交信息过长**
   - 使用简洁的描述
   - 将详细信息放在正文部分
   - 适当使用列表格式

2. **范围确定困难**
   - 按功能模块划分
   - 使用明确的业务术语
   - 保持一致的命名规范

## 结论

通过使用 Cursor 的 AI 能力，我们可以：

- 节省编写提交信息的时间
- 保持提交信息的一致性和规范性
- 提高代码库的可维护性
- 改善团队协作效率

通过合理使用 Cursor 的 Commit Message 生成功能，你可以显著提升代码提交的效率和质量。开始尝试使用这个强大的功能吧！


## 相关文章

- [为什么选择 Cursor？探索 AI 编程的未来](./why-choose-cursor) - 了解 Cursor 的核心优势
- [Cursor Rules：打造个性化的 AI 编程助手](./cursor-rules-guide) - 学习如何自定义 AI 行为
- [Cursor 快速入门：10 分钟掌握 AI 编程助手](./cursor-quick-start) - 快速上手 Cursor
- [Cursor AI 快捷键完全指南](./cursor-shortcuts) - 掌握所有快捷键 