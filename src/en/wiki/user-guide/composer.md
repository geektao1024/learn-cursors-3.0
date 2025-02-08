---
title: Code Editor (Cmd+I)
description: Dive deep into the powerful features of Cursor Composer and master how to use AI-assisted code editor to improve development efficiency.
---

# Code Editor (Cmd+I)

Cursor Composer is a revolutionary AI-assisted code editor that understands your programming intentions, helps you quickly implement features, refactor code, and provides intelligent editing suggestions. You can invoke this powerful tool at any time using the `Cmd+I` (Mac) or `Ctrl+I` (Windows/Linux) shortcut.

## Core Features

### 1. Intelligent Editing

- **Code Generation**: Generate code based on descriptions
- **Code Refactoring**: Intelligently refactor existing code
- **Code Optimization**: Improve code quality and performance
- **Multi-file Editing**: Handle multiple related files simultaneously

### 2. Context Understanding

- **Project Awareness**: Understand entire project structure
- **Dependency Analysis**: Identify and handle code dependencies
- **Type Inference**: Intelligent type system support
- **Smart Imports**: Automatically manage import statements

### 3. Editing Modes

- **Inline Editing**: Edit directly in the code
- **Dialogue Editing**: Guide editing through conversation
- **Batch Editing**: Handle multiple similar modifications
- **Refactoring Mode**: Large-scale code refactoring

## Usage Guide

### 1. Basic Operations

1. **Launch Composer**

   - Press `Cmd/Ctrl + I` to open
   - Select from command palette
   - Click the editor toolbar icon

2. **Editing Modes**

   - Direct editing mode
   - Dialogue editing mode
   - Multi-file editing mode

3. **Operation Flow**
   - Select code to edit
   - Describe editing intention
   - Confirm or adjust generated code

### 2. Editing Command Examples

#### Code Generation

```
Create a TypeScript type-safe API request function with error handling and request cancellation
```

#### Code Refactoring

```
Refactor this class component into a function component, replacing lifecycle methods with hooks
```

#### Performance Optimization

```
Optimize this component's rendering performance using memo and useCallback for callback functions
```

## Advanced Features

### 1. Multi-file Editing

1. **Related File Processing**

```typescript
// Add new interface definition across multiple files
interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
}

// Composer will automatically:
// 1. Add interface imports in related files
// 2. Update code using this interface
// 3. Add necessary type checks
```

2. **Batch Updates**

```typescript
// Update all places using the old API
// Old code:
const data = await api.get('/users')

// New code:
const { data, error } = await api.users.list()
```

3. **Dependency Management**

```typescript
import { useQuery } from '@tanstack/react-query'
// Automatically handle dependencies when adding new features
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
```

### 2. Intelligent Refactoring

1. **Code Pattern Conversion**

```typescript
// Convert callback pattern to Promise
// Before conversion:
function processData(data, callback) {
  // Process data
  callback(null, result)
}

// After conversion:
async function processData(data) {
  // Process data
  return result
}
```

2. **Architecture Improvement**

```typescript
// Convert MVC architecture to Domain-Driven Design
// Before:
class UserController {
  async createUser(req, res) {
    const user = await User.create(req.body)
    res.json(user)
  }
}

// After:
class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: CreateUserDTO): Promise<User> {
    const user = User.create(userData)
    return this.userRepository.save(user)
  }
}
```

### 3. Code Generation

1. **Complete Feature Implementation**

```typescript
// Generate a complete authentication middleware
export function authMiddleware(
  options: AuthOptions = {}
): MiddlewareFunction {
  return async (req, res, next) => {
    try {
      const token = extractToken(req)
      if (!token) {
        throw new UnauthorizedError('No token provided')
      }

      const decoded = verifyToken(token)
      req.user = await getUserById(decoded.userId)
      next()
    }
    catch (error) {
      next(new UnauthorizedError(error.message))
    }
  }
}
```

2. **Test Case Generation**

```typescript
// Generate test cases for components
describe('UserProfile', () => {
  it('should render user information correctly', () => {
    const user = {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/avatar.jpg'
    }

    const { getByText, getByAltText } = render(
      <UserProfile user={user} />
    )

    expect(getByText(user.name)).toBeInTheDocument()
    expect(getByText(user.email)).toBeInTheDocument()
    expect(getByAltText(user.name)).toHaveAttribute(
      'src',
      user.avatar
    )
  })

  it('should handle loading state', () => {
    const { getByTestId } = render(<UserProfile loading />)
    expect(getByTestId('loading-spinner')).toBeInTheDocument()
  })
})
```

## Best Practices

### 1. Editing Strategies

1. **Progressive Editing**

   - Start with small changes
   - Gradually expand the scope
   - Validate and test frequently

2. **Code Review**

   - Check generated code
   - Verify type safety
   - Ensure code quality

3. **Performance Considerations**
   - Control editing scope
   - Optimize generated code
   - Monitor resource usage

### 2. Workflow

1. **Preparation Phase**

   - Define editing goals
   - Gather relevant information
   - Plan editing steps

2. **Execution Phase**

   - Edit step by step
   - Validate results in real-time
   - Handle exceptions

3. **Completion Phase**
   - Code review
   - Run tests
   - Commit changes

### 3. Important Notes

1. **Code Quality**

   - Maintain consistent code style
   - Add necessary comments
   - Follow best practices

2. **Performance Optimization**

   - Optimize generated code
   - Reduce unnecessary dependencies
   - Monitor memory usage

3. **Security Considerations**
   - Check for security vulnerabilities
   - Protect sensitive information
   - Validate input and output

## Common Scenarios

### 1. Feature Development

#### Adding New Features

```typescript
// Add user authentication functionality
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setUser(user)
        setLoading(false)
      },
      (error) => {
        console.error('Auth error:', error)
        setLoading(false)
      }
    )

    return unsubscribe
  }, [])

  return { user, loading }
}
```

#### Feature Extension

```typescript
// Extend existing component with new functionality
interface DataTableProps<T> extends TableProps<T> {
  onSort?: (field: keyof T, order: 'asc' | 'desc') => void
  onFilter?: (filters: Record<keyof T, any>) => void
  onPaginate?: (page: number, pageSize: number) => void
}
```

### 2. Code Optimization

#### Performance Optimization

```typescript
// Optimize rendering performance
const MemoizedComponent = memo(function Component({
  items,
  onItemClick
}: Props) {
  const handleClick = useCallback((id: string) => {
    onItemClick(id)
  }, [onItemClick])

  return (
    <div>
      {items.map(item => (
        <Item
          key={item.id}
          {...item}
          onClick={() => handleClick(item.id)}
        />
      ))}
    </div>
  )
})
```

#### Code Refactoring

```typescript
// Refactor into custom Hook
function useDataFetching<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function fetchData() {
      try {
        const response = await fetch(url)
        const json = await response.json()

        if (mounted) {
          setData(json)
          setError(null)
        }
      }
      catch (error) {
        if (mounted) {
          setError(error as Error)
          setData(null)
        }
      }
      finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, [url])

  return { data, error, loading }
}
```

## Configuration Options

### 1. Editor Settings

- **Auto Save**: Configure auto-save options
- **Formatting Rules**: Set code formatting rules
- **Shortcut Mapping**: Customize keyboard shortcuts

### 2. AI Settings

- **Model Selection**: Choose AI model to use
- **Context Range**: Configure context inclusion range
- **Generation Options**: Adjust code generation parameters

### 3. Project Settings

- **Language Support**: Configure language-specific options
- **Code Style**: Set project code standards
- **Ignore Files**: Configure files to exclude from processing

::: tip Tips

- Make good use of multi-file editing
- Keep code changes atomic
- Perform code review and testing frequently
  :::

::: warning Note

- Handle large changes with caution
- Always validate generated code
- Maintain codebase consistency
  :::
