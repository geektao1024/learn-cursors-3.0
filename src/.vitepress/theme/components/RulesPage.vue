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
      '提高代码��量和可维护性',
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
  <div class="container">
    <div class="hero-section">
      <h1>Cursor Rules 规则指南</h1>
      <p class="hero-description">
        了解如何使用 Cursor Rules 提升您的开发效率，规范团队协作，编写更好的代码。
      </p>
    </div>

    <div class="content-section">
      <div class="steps-container">
        <div v-for="category in ruleCategories" :key="category.id" class="step-block">
          <div class="step-header" :style="{ '--step-color': category.color }">
            <div class="step-icon" v-html="category.icon" />
            <div class="step-number">
              {{ category.id }}
            </div>
            <h2>{{ category.title }}</h2>
          </div>

          <div class="step-content">
            <p class="step-description">
              {{ category.description }}
            </p>

            <!-- 显示好处列表 -->
            <ul v-if="category.benefits" class="benefits-list">
              <li v-for="benefit in category.benefits" :key="benefit">
                <span class="check-icon">✓</span>
                {{ benefit }}
              </li>
            </ul>

            <!-- 显示规则类型 -->
            <div v-if="category.types" class="rule-types">
              <div v-for="type in category.types" :key="type.title" class="rule-type">
                <div class="type-header">
                  <div class="type-icon" v-html="type.icon" />
                  <h3>{{ type.title }}</h3>
                </div>
                <p>{{ type.description }}</p>
                <ul class="type-examples">
                  <li v-for="example in type.examples" :key="example">
                    {{ example }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- 显示示例代码 -->
            <div v-if="category.examples" class="examples">
              <div v-for="example in category.examples" :key="example.title" class="example">
                <h3>{{ example.title }}</h3>
                <pre class="example-code"><code>{{ example.content }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 优势部分 -->
      <div class="advantages-section">
        <h2>为什么选择 Cursor Rules?</h2>
        <div class="advantages-grid">
          <div v-for="advantage in advantages" :key="advantage.title" class="advantage-card">
            <div class="advantage-icon" v-html="advantage.icon" />
            <h3>{{ advantage.title }}</h3>
            <p>{{ advantage.description }}</p>
          </div>
        </div>
      </div>

      <!-- 开始使用步骤 -->
      <div class="getting-started-section">
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
      </div>

      <!-- FAQ 部分 -->
      <div class="faq-section">
        <h2>常见问题</h2>
        <div class="faq-list">
          <div v-for="faq in faqs" :key="faq.question" class="faq-item">
            <h3>{{ faq.question }}</h3>
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* 修复 SVG 图标大小控制 */
:deep(svg) {
  width: 24px !important;
  height: 24px !important;
  stroke: currentColor;
  flex-shrink: 0;
  display: inline-block;
  vertical-align: middle;
}

.hero-section {
  text-align: center;
  margin-bottom: 4rem;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.hero-description {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  max-width: 800px;
  margin: 0 auto;
}

.content-section {
  margin-top: 2rem;
}

.steps-container {
  display: grid;
  gap: 2rem;
  margin-bottom: 4rem;
}

.step-block {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.step-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: var(--step-color, var(--vp-c-brand));
  color: white;
}

.step-icon {
  width: 24px;
  height: 24px;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-number {
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 1rem;
}

.step-content {
  padding: 1.5rem;
}

.step-description {
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefits-list li {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.check-icon {
  color: var(--vp-c-brand);
  margin-right: 0.5rem;
  font-weight: bold;
}

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

.type-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.type-icon {
  width: 24px;
  height: 24px;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.type-icon :deep(svg) {
  stroke: var(--vp-c-brand);
}

.type-examples {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
}

.type-examples li {
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid var(--vp-c-brand);
  color: var(--vp-c-text-1);
}

.examples {
  margin-top: 1.5rem;
}

.example {
  margin-bottom: 1.5rem;
}

.example-code {
  background: var(--vp-c-bg);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  white-space: pre-wrap;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.advantages-section {
  margin: 4rem 0;
}

.advantages-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--vp-c-text-1);
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.advantage-card {
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.advantage-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.advantage-icon :deep(svg) {
  width: 32px !important;
  height: 32px !important;
  stroke: var(--vp-c-brand);
}

.advantage-card h3 {
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.advantage-card p {
  color: var(--vp-c-text-2);
}

.getting-started-section {
  margin: 4rem 0;
}

.getting-started-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--vp-c-text-1);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.step-card {
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.step-card .step-number {
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

.step-card h3 {
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.step-card p {
  color: var(--vp-c-text-2);
}

.faq-section {
  margin: 4rem 0;
}

.faq-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--vp-c-text-1);
}

.faq-list {
  display: grid;
  gap: 1.5rem;
}

.faq-item {
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.faq-item h3 {
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.faq-item p {
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .advantages-grid,
  .steps-grid {
    grid-template-columns: 1fr;
  }

  :deep(svg) {
    width: 20px !important;
    height: 20px !important;
  }

  .advantage-icon :deep(svg) {
    width: 28px !important;
    height: 28px !important;
  }
}
</style>
