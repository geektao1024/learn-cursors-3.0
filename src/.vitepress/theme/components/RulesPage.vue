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
      <div class="hero-content">
        <h1>Cursor Rules</h1>
        <p class="hero-subtitle">
          智能编码规则，提升开发效率
        </p>
        <p class="hero-description">
          使用 Cursor Rules 智能规则系统，让您的团队编写更优质、更一致的代码。
          通过自动化建议和实时反馈，提高开发效率，减少常见错误。
        </p>
        <div class="hero-features">
          <div class="feature-item">
            <div class="feature-icon">
              ⚡️
            </div>
            <div class="feature-text">
              <h3>智能提示</h3>
              <p>实时代码建议和自动补全</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              🔄
            </div>
            <div class="feature-text">
              <h3>自动格式化</h3>
              <p>保持代码风格统一</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              🛡️
            </div>
            <div class="feature-text">
              <h3>代码质量</h3>
              <p>自动检测潜在问题</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              🤝
            </div>
            <div class="feature-text">
              <h3>团队协作</h3>
              <p>统一的开发标准</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="rules-content">
      <div class="rules-categories">
        <!-- 了解 Cursor Rules -->
        <div class="intro-section">
          <div v-if="ruleCategories[0]" class="category-card">
            <h3>{{ ruleCategories[0].title }}</h3>
            <p>{{ ruleCategories[0].description }}</p>
            <template v-if="ruleCategories[0].benefits">
              <ul>
                <li v-for="benefit in ruleCategories[0].benefits" :key="benefit">
                  {{ benefit }}
                </li>
              </ul>
            </template>
          </div>
        </div>

        <!-- 规则类型和使用示例 -->
        <div class="two-column-grid">
          <!-- 规则类型 -->
          <div v-if="ruleCategories[1]" class="category-card">
            <h3>{{ ruleCategories[1].title }}</h3>
            <p>{{ ruleCategories[1].description }}</p>
            <template v-if="ruleCategories[1].types">
              <div v-for="type in ruleCategories[1].types" :key="type.title" class="rule-type">
                <h4>{{ type.title }}</h4>
                <p>{{ type.description }}</p>
                <ul>
                  <li v-for="example in type.examples" :key="example">
                    {{ example }}
                  </li>
                </ul>
              </div>
            </template>
          </div>

          <!-- 使用示例 -->
          <div v-if="ruleCategories[2]" class="category-card">
            <h3>{{ ruleCategories[2].title }}</h3>
            <p>{{ ruleCategories[2].description }}</p>
            <template v-if="ruleCategories[2].examples">
              <div v-for="example in ruleCategories[2].examples" :key="example.title" class="rule-example">
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
  --primary-color: #00dc82;
  --primary-dark: #00b368;
  --primary-light: #33e39c;
  --primary-gradient: linear-gradient(120deg, #818cf8, #7c3aed);

  --surface-1: #ffffff;
  --surface-2: #f8fafc;
  --surface-3: #f1f5f9;

  --text-1: #18181b;
  --text-2: #3f3f46;
  --text-3: #71717a;

  --border-color: #e4e4e7;

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
  --surface-1: #18181b;
  --surface-2: #27272a;
  --surface-3: #3f3f46;

  --text-1: #fafafa;
  --text-2: #e4e4e7;
  --text-3: #a1a1aa;

  --border-color: #3f3f46;
}
</style>

<style scoped>
.rules-page {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
}

.rules-hero {
  text-align: center;
  margin-bottom: 4rem;
  padding: 6rem 1rem 4rem;
  background: var(--surface-2);
  border-bottom: 1px solid var(--border-color);
  position: relative;
  overflow: visible;
}

.hero-content {
  max-width: var(--content-width);
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.rules-hero h1 {
  font-size: 4rem;
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
  position: relative;
}

.hero-subtitle {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-1);
  margin-bottom: 1.5rem;
  position: relative;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--text-2);
  max-width: 48rem;
  margin: 0 auto 3rem;
  line-height: 1.6;
  position: relative;
}

.hero-features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 64rem;
  margin: 0 auto;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  text-align: left;
  padding: 1.5rem;
  background: var(--surface-1);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.feature-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.feature-icon {
  font-size: 1.5rem;
  line-height: 1;
  padding: 0.75rem;
  background: var(--surface-2);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.feature-text h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-1);
  margin: 0 0 0.5rem;
}

.feature-text p {
  font-size: 0.875rem;
  color: var(--text-2);
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .hero-features {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .rules-hero {
    padding: 5rem 1rem 3rem;
  }

  .rules-hero h1 {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-features {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .feature-item {
    padding: 1.25rem;
  }
}

.rules-content {
  max-width: var(--content-width);
  margin: 0 auto;
}

.rules-categories {
  margin-bottom: 4rem;
}

.rules-categories h2,
.rules-steps h2,
.rules-faq h2 {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-1);
  margin-bottom: 2rem;
  text-align: center;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.category-card {
  background: var(--surface-2);
  border-radius: var(--radius-lg);
  padding: 2rem;
  border: 1px solid var(--border-color);
}

.category-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-1);
  margin-bottom: 1rem;
}

.category-card p {
  font-size: 1rem;
  color: var(--text-2);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.category-card h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-1);
  margin-bottom: 1rem;
}

.category-card ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
}

.category-card li {
  font-size: 1rem;
  color: var(--text-2);
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.category-card li::before {
  content: '•';
  color: var(--primary-color);
  position: absolute;
  left: 0.5rem;
}

.rule-type {
  margin-bottom: 2rem;
}

.rule-example {
  margin-top: 1.5rem;
}

.rule-example pre {
  background: var(--surface-1);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-1);
  border: 1px solid var(--border-color);
}

.steps-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.step-card {
  background: var(--surface-2);
  border-radius: var(--radius-lg);
  padding: 2rem;
  border: 1px solid var(--border-color);
  text-align: center;
}

.step-number {
  width: 3rem;
  height: 3rem;
  background: var(--primary-gradient);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 auto 1.5rem;
}

.step-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-1);
  margin-bottom: 1rem;
}

.step-card p {
  font-size: 1rem;
  color: var(--text-2);
  line-height: 1.6;
}

.faq-list {
  display: grid;
  gap: 1.5rem;
}

.faq-item {
  background: var(--surface-2);
  border-radius: var(--radius-lg);
  padding: 2rem;
  border: 1px solid var(--border-color);
}

.faq-item h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-1);
  margin-bottom: 1rem;
}

.faq-item p {
  font-size: 1rem;
  color: var(--text-2);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .rules-page {
    padding: 1rem;
  }

  .rules-hero h1 {
    font-size: 2rem;
  }

  .rules-hero p {
    font-size: 1.125rem;
  }

  .rules-categories h2,
  .rules-steps h2,
  .rules-faq h2 {
    font-size: 1.75rem;
  }

  .category-card,
  .step-card,
  .faq-item {
    padding: 1.5rem;
  }
}

.intro-section {
  margin-bottom: 3rem;
  max-width: 100%;
}

.intro-section .category-card {
  max-width: 100%;
  background: var(--surface-2);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
}

.two-column-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

@media (max-width: 768px) {
  .rules-page {
    padding: 1rem;
  }

  .rules-hero h1 {
    font-size: 2rem;
  }

  .rules-hero p {
    font-size: 1.125rem;
  }

  .two-column-grid {
    grid-template-columns: 1fr;
  }

  .intro-section {
    margin-bottom: 2rem;
  }

  .rules-categories h2,
  .rules-steps h2,
  .rules-faq h2 {
    font-size: 1.75rem;
  }

  .category-card,
  .step-card,
  .faq-item {
    padding: 1.5rem;
  }
}
</style>
