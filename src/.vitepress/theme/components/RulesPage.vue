<script setup lang="ts">
interface RuleCategory {
  id: number
  title: string
  description: string
  benefits?: string[]
  types?: {
    title: string
    description: string
    examples: string[]
  }[]
  examples?: {
    title: string
    content: string
  }[]
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
    description: 'Cursor Rules 是一套智能编码规则系统，它能帮助您：',
    benefits: [
      '提供智能代码建议和自动补全',
      '确保团队代码风格统一',
      '自动执行最佳实践',
      '提高代码可维护性',
    ],
  },
  {
    id: 2,
    title: '规则类型',
    description: 'Cursor Rules 分为两种类型：',
    types: [
      {
        title: '全局规则',
        description: '在 Cursor 设置中配置，适用于所有项目',
        examples: [
          '代码风格统一',
          '命名规范',
          '文件组织结构',
        ],
      },
      {
        title: '项目规则',
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
    answer: '是的，您可以通过版本控制系统（如 Git）与团队成员共享 .cursorrules 文件。这样可以确保团队中的每个成员都使用相同的编码规则和最佳实践。',
  },
  {
    question: 'Cursor Rules 是否特定于某种编程语言?',
    answer: 'Cursor Rules 支持多种编程语言，并且可以根据不同语言的特点定制规则。您可以为每种语言设置特定的规则，以满足不同项目的需求。',
  },
]
</script>

<template>
  <div class="rules-page">
    <div class="rules-hero">
      <h1>Cursor Rules</h1>
      <p>智能编码规则，提升开发效率</p>
    </div>

    <div class="rules-content">
      <div class="rules-categories">
        <h2>规则类别</h2>
        <div class="categories-grid">
          <div v-for="category in ruleCategories" :key="category.id" class="category-card">
            <h3>{{ category.title }}</h3>
            <p>{{ category.description }}</p>

            <template v-if="category.benefits">
              <h4>优势</h4>
              <ul>
                <li v-for="benefit in category.benefits" :key="benefit">
                  {{ benefit }}
                </li>
              </ul>
            </template>

            <template v-if="category.types">
              <div v-for="type in category.types" :key="type.title" class="rule-type">
                <h4>{{ type.title }}</h4>
                <p>{{ type.description }}</p>
                <ul>
                  <li v-for="example in type.examples" :key="example">
                    {{ example }}
                  </li>
                </ul>
              </div>
            </template>

            <template v-if="category.examples">
              <div v-for="example in category.examples" :key="example.title" class="rule-example">
                <h4>{{ example.title }}</h4>
                <pre><code>{{ example.content }}</code></pre>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="rules-steps">
        <h2>开始使用</h2>
        <div class="steps-list">
          <div v-for="step in steps" :key="step.number" class="step-card">
            <div class="step-number">
              {{ step.number }}
            </div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>

      <div class="rules-faq">
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

<style>
:root {
  --primary-color: #3eaf7c;
  --primary-dark: #2c855f;
  --primary-light: #4fc08c;

  --surface-1: #ffffff;
  --surface-2: #f8fafc;
  --surface-3: #f1f5f9;

  --text-1: #1e293b;
  --text-2: #475569;
  --text-3: #64748b;

  --border-color: #e2e8f0;

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;

  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;

  --max-width: 80rem;
  --content-width: 64rem;
}

.dark {
  --surface-1: #0f172a;
  --surface-2: #1e293b;
  --surface-3: #334155;

  --text-1: #f8fafc;
  --text-2: #e2e8f0;
  --text-3: #cbd5e1;

  --border-color: #334155;
}
</style>

<style scoped>
/* Base Styles */
.rules-container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  font-family: var(--font-sans);
  color: var(--text-1);
  background: var(--surface-1);
}

/* Hero Section - More Compact */
.hero {
  padding: 2rem 1rem;
  text-align: center;
  background: var(--surface-2);
  border-bottom: 1px solid var(--border-color);
}

.hero__content {
  max-width: var(--content-width);
  margin: 0 auto;
}

.hero__title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  color: var(--text-1);
}

.hero__description {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-2);
  max-width: 42rem;
  margin: 0 auto;
}

/* Main Content */
.main {
  padding: 1.5rem 1rem;
}

/* Section Common */
.section {
  margin-bottom: 2.5rem;
  max-width: var(--content-width);
  margin-left: auto;
  margin-right: auto;
}

.section__title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--text-1);
}

/* Horizontal Categories */
.categories-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-card {
  background: var(--surface-2);
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--border-color);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.category-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  color: white;
}

.category-card__icon :deep(svg) {
  width: 1.25rem;
  height: 1.25rem;
}

.category-card__title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.category-card__content {
  padding: 1rem;
  flex: 1;
}

.category-card__description {
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--text-2);
  margin-bottom: 0.75rem;
}

.category-card__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-card__list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.4;
  margin-bottom: 0.375rem;
  color: var(--text-2);
}

.check-icon {
  color: var(--primary-color);
  font-weight: 700;
}

/* Types */
.category-card__types {
  margin-top: 0.75rem;
}

.type-item {
  background: var(--surface-1);
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  margin-bottom: 0.75rem;
}

.type-item__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.type-item__icon :deep(svg) {
  width: 1rem;
  height: 1rem;
  color: var(--primary-color);
}

.type-item h3 {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-1);
}

.type-item p {
  font-size: 0.8125rem;
  line-height: 1.4;
  color: var(--text-2);
  margin-bottom: 0.5rem;
}

.type-item__examples {
  list-style: none;
  padding: 0;
  margin: 0;
}

.type-item__examples li {
  font-size: 0.8125rem;
  line-height: 1.4;
  color: var(--text-2);
  padding-left: 0.5rem;
  border-left: 2px solid var(--primary-color);
  margin-bottom: 0.25rem;
}

/* Examples */
.category-card__examples {
  margin-top: 0.75rem;
}

.category-card__examples h3 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-1);
}

.category-card__examples pre {
  background: var(--surface-1);
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  overflow-x: auto;
  border: 1px solid var(--border-color);
  font-size: 0.75rem;
  line-height: 1.4;
  margin: 0;
}

/* Advantages Grid */
.advantages__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.advantage-card {
  background: var(--surface-2);
  padding: 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  text-align: center;
}

.advantage-card__icon :deep(svg) {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 0.75rem;
}

.advantage-card h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-1);
}

.advantage-card p {
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--text-2);
}

/* Steps Grid */
.steps__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.step-card {
  background: var(--surface-2);
  padding: 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  text-align: center;
}

.step-card__number {
  width: 2rem;
  height: 2rem;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.75rem;
  font-weight: 600;
  font-size: 1rem;
}

.step-card h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-1);
}

.step-card p {
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--text-2);
}

/* FAQ Grid */
.faq__grid {
  display: grid;
  gap: 1rem;
}

.faq-card {
  background: var(--surface-2);
  padding: 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
}

.faq-card h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.faq-card p {
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--text-2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .categories-row {
    grid-template-columns: 1fr;
  }

  .hero {
    padding: 1.5rem 1rem;
  }

  .hero__title {
    font-size: 1.5rem;
  }

  .main {
    padding: 1rem;
  }

  .section__title {
    font-size: 1.25rem;
  }
}

/* Print Styles */
@media print {
  .rules-container {
    max-width: none;
  }

  .hero {
    padding: 1rem 0;
  }

  .categories-row {
    gap: 0.5rem;
  }

  .category-card,
  .advantage-card,
  .step-card,
  .faq-card {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}

/* New Introduction Section Styles */
.intro-section {
  margin: 2rem auto;
  position: relative;
  z-index: 1;
}

.intro-wrapper {
  background: var(--surface-1);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  max-width: 64rem;
  margin: 0 auto;
}

.intro-header {
  padding: 2.5rem 2rem;
  color: white;
  position: relative;
  overflow: hidden;
  background: var(--primary-color);
}

.intro-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  z-index: 1;
}

.intro-header__content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 48rem;
  margin: 0 auto;
}

.intro-header__icon {
  margin-bottom: 1.25rem;
}

.intro-header__icon :deep(svg) {
  width: 2.5rem;
  height: 2.5rem;
  stroke-width: 1.5;
}

.intro-header__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
  line-height: 1.2;
}

.intro-header__description {
  font-size: 1rem;
  line-height: 1.5;
  max-width: 36rem;
  margin: 0 auto;
  opacity: 0.9;
}

.intro-benefits {
  padding: 1.75rem;
  background: var(--surface-1);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
  max-width: 56rem;
  margin: 0 auto;
}

.benefit-card {
  position: relative;
  background: var(--surface-2);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  transition: transform 0.2s ease;
}

.benefit-card:hover {
  transform: translateY(-2px);
}

.benefit-card__number {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-3);
  opacity: 0.5;
}

.benefit-card__content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.benefit-card__check {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--primary-color);
  color: white;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
}

.benefit-card__text {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--text-1);
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .intro-section {
    margin: 1.5rem auto;
  }

  .intro-header {
    padding: 2rem 1.5rem;
  }

  .intro-header__icon :deep(svg) {
    width: 2rem;
    height: 2rem;
  }

  .intro-header__title {
    font-size: 1.5rem;
  }

  .intro-benefits {
    padding: 1.25rem;
  }

  .benefits-grid {
    gap: 1rem;
  }

  .benefit-card {
    padding: 1rem;
  }
}

/* Dark mode adjustments */
.dark .benefit-card {
  background: var(--surface-3);
}

.dark .benefit-card:hover {
  background: var(--surface-2);
}

/* Introduction Card */
.intro-card {
  background: var(--surface-2);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.intro-card__header {
  background: var(--primary-color);
  padding: 2rem;
  color: white;
  text-align: center;
}

.intro-card__title {
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 1rem;
}

.intro-card__description {
  font-size: 1.125rem;
  opacity: 0.9;
  margin: 0;
  max-width: 36rem;
  margin: 0 auto;
}

.intro-card__content {
  padding: 2rem;
}

.benefits-list {
  display: grid;
  gap: 1rem;
  max-width: 48rem;
  margin: 0 auto;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--surface-1);
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.benefit-item__number {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-color);
  background: var(--surface-2);
  padding: 0.5rem;
  border-radius: var(--radius-sm);
  min-width: 2.5rem;
  text-align: center;
}

.benefit-item__text {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-1);
}

/* Content Cards */
.content-card {
  background: var(--surface-2);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-color);
  height: 100%;
}

.content-card__header {
  background: var(--primary-color);
  padding: 1.5rem;
  color: white;
}

.content-card__title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.content-card__description {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
}

.content-card__content {
  padding: 1.5rem;
}

/* Two Column Grid */
.two-column-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

/* Advantages Grid */
.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.advantage-card {
  background: var(--surface-2);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
}

.advantage-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: var(--primary-color);
}

.advantage-card__description {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-2);
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .two-column-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .intro-card__header {
    padding: 1.5rem;
  }

  .intro-card__title {
    font-size: 1.5rem;
  }

  .intro-card__content {
    padding: 1.5rem;
  }

  .benefit-item {
    padding: 0.875rem;
  }
}
</style>
