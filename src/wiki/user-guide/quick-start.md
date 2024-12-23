---
title: 用"说"来做个小产品
description: 通过一个实际的例子，展示如何使用 Cursor AI 的自然语言功能快速开发一个简单的产品。
---

# 用"说"来做个小产品

在这篇教程中，我们将通过一个实际的例子，展示如何使用 Cursor AI 的自然语言功能来快速开发一个简单的待办事项（Todo）应用。你将学习到如何用"说"的方式来编程，体验 AI 辅助开发的魔力。

## 准备工作

### 1. 环境准备
- 安装并配置好 Cursor
- 确保 API 密钥正常工作
- 创建一个新的空项目文件夹

### 2. 技术栈选择
我们将使用以下技术栈：
- Next.js 14（App Router）
- TypeScript
- Tailwind CSS
- Shadcn UI
- SQLite（通过 Prisma）

## 开始开发

### 1. 创建项目

1. 打开 Cursor，按 `Cmd/Ctrl + I` 打开 AI 编辑器
2. 输入以下指令：
   ```
   帮我创建一个使用 Next.js 14 (App Router)、TypeScript、Tailwind CSS 和 Shadcn UI 的新项目，项目名称是 todo-app
   ```
3. AI 将生成项目初始化命令，你只需确认执行

### 2. 设置数据库

1. 在 AI 编辑器中输���：
   ```
   帮我设置 Prisma 和 SQLite 数据库，创建一个 Todo 模型，包含 id、title、completed 和 createdAt 字段
   ```
2. AI 将帮你：
   - 安装必要的依赖
   - 创建 Prisma schema
   - 初始化数据库
   - 生成 Prisma Client

### 3. 创建用户界面

1. 设计主页面：
   ```
   创建一个简洁的待办事项主页面，包含一个输入框用于添加新任务，以及一个任务列表来显示所有任务
   ```

2. 添加组件：
   ```
   创建一个 TodoItem 组件，用于显示单个待办事项，包含标题、完成状态复选框和删除按钮
   ```

### 4. 实现功能

1. 添加新任务：
   ```
   实现添加新待办事项的功能，使用 Server Actions 处理表单提交
   ```

2. 切换任务状态：
   ```
   添加切换任务完成状态的功能，点击复选框时更新数据库
   ```

3. 删除任务：
   ```
   实现删除任务的功能，添加确认对话框避免误删
   ```

## 示例代码

### 1. 数据模型 (schema.prisma)
```prisma
model Todo {
  id        String   @id @default(cuid())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

### 2. 主页面 (app/page.tsx)
```tsx
import { TodoList } from '@/components/todo-list'
import { AddTodoForm } from '@/components/add-todo-form'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">待办事项</h1>
      <AddTodoForm />
      <TodoList />
    </main>
  )
}
```

### 3. 添加任务表单
```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { addTodo } from '@/app/actions'

export function AddTodoForm() {
  const [title, setTitle] = useState('')

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await addTodo(title)
        setTitle('')
      }}
      className="flex gap-2 mb-4"
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="添加新任务..."
        required
      />
      <Button type="submit">添加</Button>
    </form>
  )
}
```

## 关键步骤解析

### 1. 使用自然语言描述

在使用 Cursor AI 开发时，关键是要学会用清晰的自然语言描述你的需求：

- **具体明确**：说明具体要实现什么功能
- **分步骤**：将复杂任务拆分成小步骤
- **提供上下文**：说明相关的技术栈和依赖

### 2. 理解 AI 响应

AI 会提供多种选项和建议：

- 仔细阅读 AI 的解释和建议
- 理解生成代码的工作原理
- 根据需要调整和优化代码

### 3. 迭代改进

开发过程是迭代的：

1. 提出需求
2. 查看 AI 生成的代码
3. 测试功能
4. 提出改进建议
5. 重复这个过程

## 进阶技巧

### 1. 提示词优化

- 使用专业术语
- 提供具体示例
- 说明性能要求
- 指定代码风格

### 2. 代码优化

- 请求 AI 重构代码
- 添加错误处理
- 优化性能
- 改进用户体验

### 3. 调试技巧

- 描述错误现象
- 提供错误信息
- 请求调试建议
- 验证解决方案

## 最佳实践

1. **循序渐进**
   - 从简单功能开始
   - 逐步添加复杂特性
   - 及时测试和验证

2. **代码质量**
   - 请求添加注释
   - 使用 TypeScript 类型
   - 遵循最佳实践

3. **用户体验**
   - 添加加载状态
   - 优化错误提示
   - 改进交互设计

::: tip 提示
- 使用清晰的自然语言描述需求
- 保持代码的简洁和可维护性
- 注重用户体验和错误处理
:::

::: warning 注意
- AI 生成的代码需要人工审查
- 复杂功能可能需要多次迭代
- 始终进行充分的测试
::: 