---
title: AI Code Generation (Cmd+K)
description: Learn how to use Cursor AI's code generation feature to quickly generate high-quality code through natural language descriptions.
---

# AI Code Generation (Cmd+K)

Cursor AI's code generation feature allows you to generate code using natural language descriptions, a revolutionary capability that can significantly boost development efficiency. With a simple `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) shortcut, you can activate this powerful feature.

## Basic Concepts

### 1. How It Works

- **Natural Language Processing**: Converts your descriptions into code
- **Context Understanding**: Considers current file and project context
- **Smart Code Generation**: Generates code following best practices

### 2. Use Cases

- **New Feature Development**: Quickly implement new features
- **Code Refactoring**: Optimize existing code
- **Bug Fixing**: Solve code issues
- **Test Generation**: Automatically generate test cases

## Usage

### 1. Basic Operations

1. **Initiate Code Generation**

   - Press `Cmd/Ctrl + K`
   - Select code in editor and press `Cmd/Ctrl + K`
   - Choose "AI Code Generation" from command palette

2. **Input Prompt**

   - Use clear natural language descriptions
   - Provide necessary context information
   - Specify specific requirements and constraints

3. **Handle Results**
   - Review generated code
   - Modify as needed
   - Integrate into project

### 2. Prompt Techniques

#### Feature Implementation

```
Create a React component to display user profile, including avatar, name and bio, with edit support
```

#### Code Conversion

```
Convert this JavaScript code to TypeScript, add appropriate type definitions
```

#### Bug Fixing

```
This code has performance issues, please help optimize it, focusing on loops and data structures
```

## Advanced Features

### 1. Context Awareness

1. **Project Structure**

   - Understands project architecture
   - Follows project conventions
   - Maintains code consistency

2. **Dependencies**

   - Automatically handles imports
   - Resolves dependency conflicts
   - Recommends best practices

3. **Code Style**
   - Matches existing style
   - Follows coding standards
   - Maintains consistency

### 2. Multi-file Operations

1. **Cross-file Generation**

```
Create a complete CRUD feature, including API routes, data models and frontend components
```

2. **Related File Updates**

```
Add new data field, update all related models, APIs and components
```

### 3. Smart Refactoring

1. **Code Optimization**

```
Refactor this function using modern JavaScript features, improve readability and performance
```

2. **Pattern Application**

```
Refactor this code to use observer pattern, while maintaining existing functionality
```

## Best Practices

### 1. Prompt Writing

#### Clear Objectives

```
Create a data table component with pagination and search functionality, using TypeScript and React
```

#### Detailed Constraints

```
Implement a form validation function supporting required fields, email, phone number formats, returning detailed error messages
```

#### Performance Requirements

```
Implement a high-performance data processing function capable of handling millions of records, focusing on memory usage
```

### 2. Code Review

1. **Function Verification**

   - Test generated code
   - Verify edge cases
   - Ensure error handling

2. **Code Quality**

   - Check code style
   - Verify type definitions
   - Evaluate performance impact

3. **Security**
   - Check for security vulnerabilities
   - Verify data handling
   - Prevent common vulnerabilities

## Common Scenarios Examples

### 1. API Development

```typescript
// Prompt: Create a RESTful API endpoint for user registration
export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    // Data validation
    if (!email || !password || !name) {
      return new Response('Missing required fields', { status: 400 })
    }

    // Create user
    const user = await db.user.create({
      data: {
        email,
        password: await hashPassword(password),
        name,
      },
    })

    return new Response(JSON.stringify(user), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  catch (error) {
    return new Response('Error creating user', { status: 500 })
  }
}
```

### 2. UI Component

```typescript
// Prompt: Create a reusable modal component supporting custom title, content and action buttons
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <span className="sr-only">Close</span>
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-6">{children}</div>
        {actions && (
          <div className="flex justify-end gap-4">{actions}</div>
        )}
      </div>
    </div>
  )
}
```

### 3. Utility Function

```typescript
// Prompt: Create a data processing utility function supporting sorting, filtering and pagination
interface PaginationOptions {
  page: number
  pageSize: number
}

interface SortOptions {
  field: string
  order: 'asc' | 'desc'
}

interface FilterOptions {
  field: string
  value: any
}

export function processData<T>(
  data: T[],
  pagination?: PaginationOptions,
  sort?: SortOptions,
  filters?: FilterOptions[]
): {
    items: T[]
    total: number
  } {
  let result = [...data]

  // Apply filters
  if (filters?.length) {
    result = result.filter(item =>
      filters.every(filter => item[filter.field] === filter.value)
    )
  }

  // Apply sorting
  if (sort) {
    result.sort((a, b) => {
      const compareResult = a[sort.field] > b[sort.field] ? 1 : -1
      return sort.order === 'asc' ? compareResult : -compareResult
    })
  }

  // Apply pagination
  const total = result.length
  if (pagination) {
    const { page, pageSize } = pagination
    const start = (page - 1) * pageSize
    result = result.slice(start, start + pageSize)
  }

  return { items: result, total }
}
```

## Troubleshooting

### 1. Common Issues

- **Generated code doesn't meet expectations**: Optimize prompts
- **Inaccurate context understanding**: Provide more relevant information
- **Performance issues**: Simplify generation requests

### 2. Optimization Suggestions

- **Regularly update Cursor**
- **Optimize project structure**
- **Improve prompt quality**

::: tip Tip

- Use clear, specific natural language descriptions
- Provide sufficient context information
- Carefully review and test generated code
  :::

::: warning Note

- Generated code requires manual review
- Be cautious with sensitive information
- Maintain code quality standards
  :::
