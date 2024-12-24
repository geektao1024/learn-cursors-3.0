<script setup lang="ts">
interface RuleCategory {
  id: number
  title: string
  icon: string
  color: string
  description: string
  benefits?: string[]
  types?: {
    title: string
    icon: string
    description: string
    examples: string[]
  }[]
  examples?: {
    title: string
    content: string
  }[]
}

interface Advantage {
  icon: string
  title: string
  description: string
}

interface Step {
  number: number
  title: string
  description: string
}

interface FAQ {
  question: string
  answer: string
}

const ruleCategories: RuleCategory[] = [
  {
    id: 1,
    title: '了解 Cursor Rules',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 8v4M12 16h.01"/>
    </svg>`,
    color: 'var(--vp-c-brand)',
    description: 'Cursor Rules 是一套智能编码规则系统，它能帮助您：',
    benefits: [
      '提供智能代码建议和自动补全',
      '确保团队代码风格统一',
      '自动执行最佳实践',
      '提高代码量和可维护性',
    ],
  },
  {
    id: 2,
    title: '规则类型',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 6h16M4 12h16M4 18h16"/>
    </svg>`,
    color: '#10B981',
    description: 'Cursor Rules 分为两种类型：',
    types: [
      {
        title: '全局规则',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>`,
        description: '在 Cursor 设置中配置，适用于所有项目',
        examples: [
          '代码风格统一',
          '命名规范',
          '文件组织结构',
        ],
      },
      {
        title: '项目规则',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
          <polyline points="13 2 13 9 20 9"/>
        </svg>`,
        description: '在项目的 .cursorrules 文件中定义，仅适用于特定项目',
        examples: [
          '项目特定的编码标准',
          '依赖管理规则',
          '测试覆盖率要求',
        ],
      },
    ],
  },
  {
    id: 3,
    title: '使用示例',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
    </svg>`,
    color: '#8B5CF6',
    description: '以下是一个典型的 Cursor Rules 配置示例：',
    examples: [
      {
        title: 'TypeScript 项目规则',
        content: `# TypeScript Project Rules

## 代码规范
- 使用 TypeScript 严格模式
- 显式声明所有类型
- 避免使用 any 类型

## 组件开发
- 使用函数式组件
- Props 必须定义类型
- 使用 CSS Modules

## 状态管理
- 优先使用 React Context
- 大型应用使用 Redux
- 遵循不可变性原则

## 性能优化
- 实现代码分割
- 使用 React.memo()
- 优化重渲染逻辑

## 测试规范
- 单元测试覆盖率 > 80%
- 使用 React Testing Library
- 编写集成测试`,
      },
    ],
  },
]

const advantages: Advantage[] = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>`,
    title: '提升生产力',
    description: 'Cursor Rules 自动化重复性任务，让您专注于编写高质量代码。',
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
    </svg>`,
    title: '统一代码风格',
    description: '在团队中执行编码标准，确保代码库的一致性和可读性。',
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
    </svg>`,
    title: '减少错误',
    description: '在开发过程早期发现常见错误，节省调试时间。',
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9"/>
      <line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>`,
    title: '加快入职流程',
    description: '新团队成员可以快速适应项目的编码风格和最佳实践。',
  },
]

const steps: Step[] = [
  {
    number: 1,
    title: '创建 .cursorrules 文件',
    description: '在项目根目录中创建一个名为 .cursorrules 的文件。',
  },
  {
    number: 2,
    title: '定义您的规则',
    description: '使用适当的语法编写您的 Cursor 规则。',
  },
  {
    number: 3,
    title: '开始编码',
    description: 'Cursor 将在您编写代码时自动应用您的规则。',
  },
]

const faqs: FAQ[] = [
  {
    question: '什么是 Cursor Rules?',
    answer: 'Cursor Rules 是一套用于定制和规范化开发流程的规则系统。它可以帮助团队保持一致的代码风格，提高代码质量，并通过自动化建议提升开发效率。',
  },
  {
    question: '如何创建和使用 Cursor Rules?',
    answer: '创建和使用 Cursor Rules 非常简单：首先在项目根目录创建 .cursorrules 文件，然后使用特定语法定义您的规则。一旦设置完成，Cursor 将自动应用这些规则来辅助您的开发。',
  },
  {
    question: '我可以与团队共享 Cursor Rules 吗?',
    answer: '是的，您可以通过版本控制系统（如 Git）与团队成员共享 .cursorrules 文件。这样可以确保团队中的每个成员都使用相同的编码规范和最佳实践。',
  },
  {
    question: 'Cursor Rules 是否特定于某种编程语言?',
    answer: 'Cursor Rules 支持多种编程语言，并且可以根据不同语言的特点定制规则。您可以为每种语言设置特定的规则，以满足不同项目的需求。',
  },
]
</script>

<template>
  <article class="rules-page">
    <!-- Hero Section -->
    <header class="rules-header">
      <h1>Cursor Rules 规则指南</h1>
      <p>了解如何使用 Cursor Rules 提升您的开发效率，规范团队协作，编写更好的代码。</p>
    </header>

    <!-- Rule Categories -->
    <section class="rules-categories">
      <div
        v-for="category in ruleCategories"
        :key="category.id"
        class="category-card"
      >
        <div class="category-header" :style="{ backgroundColor: category.color }">
          <span class="category-icon" v-html="category.icon" />
          <span class="category-number">{{ category.id }}</span>
          <h2>{{ category.title }}</h2>
        </div>

        <div class="category-content">
          <p>{{ category.description }}</p>

          <!-- Benefits List -->
          <ul v-if="category.benefits" class="benefits-list">
            <li v-for="benefit in category.benefits" :key="benefit">
              <span class="benefit-check">✓</span>
              {{ benefit }}
            </li>
          </ul>

          <!-- Rule Types -->
          <div v-if="category.types" class="rule-types">
            <div v-for="type in category.types" :key="type.title" class="rule-type">
              <div class="type-title">
                <span v-html="type.icon" />
                <h3>{{ type.title }}</h3>
              </div>
              <p>{{ type.description }}</p>
              <ul>
                <li v-for="example in type.examples" :key="example">
                  {{ example }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Examples -->
          <div v-if="category.examples" class="examples">
            <div v-for="example in category.examples" :key="example.title">
              <h3>{{ example.title }}</h3>
              <pre><code>{{ example.content }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Advantages -->
    <section class="advantages">
      <h2>为什么选择 Cursor Rules?</h2>
      <div class="advantages-grid">
        <div v-for="advantage in advantages" :key="advantage.title" class="advantage-card">
          <span class="advantage-icon" v-html="advantage.icon" />
          <h3>{{ advantage.title }}</h3>
          <p>{{ advantage.description }}</p>
        </div>
      </div>
    </section>

    <!-- Getting Started -->
    <section class="getting-started">
      <h2>开始使用</h2>
      <div class="steps-grid">
        <div v-for="step in steps" :key="step.number" class="step-card">
          <div class="step-number">
            {{ step.number }}
          </div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="faq">
      <h2>常见问题</h2>
      <div class="faq-list">
        <div v-for="faq in faqs" :key="faq.question" class="faq-item">
          <h3>{{ faq.question }}</h3>
          <p>{{ faq.answer }}</p>
        </div>
      </div>
    </section>
  </article>
</template>

<style>
.rules-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: var(--vp-c-text-1);
}

.rules-page svg {
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
}

/* Header */
.rules-header {
  text-align: center;
  margin-bottom: 4rem;
}

.rules-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.rules-header p {
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  color: var(--vp-c-text-2);
}

/* Categories */
.rules-categories {
  display: grid;
  gap: 2rem;
  margin-bottom: 4rem;
}

.category-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.category-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  color: white;
  gap: 1rem;
}

.category-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.category-content {
  padding: 1.5rem;
}

/* Benefits */
.benefits-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.benefits-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.benefit-check {
  color: var(--vp-c-brand);
  font-weight: bold;
}

/* Rule Types */
.rule-types {
  display: grid;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.rule-type {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.type-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.rule-type ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.rule-type li {
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid var(--vp-c-brand);
}

/* Examples */
.examples pre {
  background: var(--vp-c-bg);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  margin: 1rem 0;
}

/* Advantages */
.advantages {
  margin: 4rem 0;
  text-align: center;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.advantage-card {
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.advantage-icon {
  display: inline-flex;
  margin-bottom: 1rem;
}

.advantage-icon svg {
  width: 32px;
  height: 32px;
  stroke: var(--vp-c-brand);
}

/* Getting Started */
.getting-started {
  margin: 4rem 0;
  text-align: center;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.step-card {
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.step-number {
  width: 40px;
  height: 40px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-weight: bold;
}

/* FAQ */
.faq {
  margin: 4rem 0;
  text-align: center;
}

.faq-list {
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
  text-align: left;
}

.faq-item {
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.faq-item h3 {
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .rules-header h1 {
    font-size: 2rem;
  }

  .rules-page {
    padding: 1rem;
  }

  .category-header {
    padding: 1rem;
  }

  .category-content {
    padding: 1rem;
  }

  .advantage-icon svg,
  .category-icon svg {
    width: 20px;
    height: 20px;
  }
}
</style>
