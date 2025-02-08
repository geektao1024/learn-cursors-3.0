<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { lang } = useData()

// 多语言文本配置
const i18n = {
  'zh-CN': {
    title: 'Cursor Rules',
    subtitle: '智能编码规则，提升开发效率',
    description: '使用 Cursor Rules 智能规则系统，让您的团队编写更优质、更一致的代码。通过自动化建议和实时反馈，提高开发效率，减少常见错误。',
    features: {
      smartPrompt: {
        title: '智能提示',
        description: '实时代码建议和自动补全',
      },
      autoFormat: {
        title: '自动格式化',
        description: '保持代码风格统一',
      },
      codeQuality: {
        title: '代码质量',
        description: '自动检测潜在问题',
      },
      teamwork: {
        title: '团队协作',
        description: '统一的开发标准',
      },
    },
    benefits: [
      '提供智能代码建议和自动补全',
      '确保团队代码风格统一',
      '自动执行最佳实践',
      '提高代码可维护性',
    ],
  },
  'en': {
    title: 'Cursor Rules',
    subtitle: 'Smart Coding Rules for Enhanced Development',
    description: 'Use Cursor Rules intelligent system to help your team write better, more consistent code. Improve development efficiency and reduce common errors through automated suggestions and real-time feedback.',
    features: {
      smartPrompt: {
        title: 'Smart Prompts',
        description: 'Real-time code suggestions and auto-completion',
      },
      autoFormat: {
        title: 'Auto Formatting',
        description: 'Maintain consistent code style',
      },
      codeQuality: {
        title: 'Code Quality',
        description: 'Automatic detection of potential issues',
      },
      teamwork: {
        title: 'Team Collaboration',
        description: 'Unified development standards',
      },
    },
    benefits: [
      'Provide intelligent code suggestions and auto-completion',
      'Ensure team code style consistency',
      'Automatically enforce best practices',
      'Improve code maintainability',
    ],
  },
  'ja': {
    title: 'Cursor Rules',
    subtitle: 'スマートコーディングルールで開発効率を向上',
    description: 'Cursor Rules インテリジェントシステムを使用して、チームがより良い、より一貫性のあるコードを書けるようにします。自動化された提案とリアルタイムフィードバックにより、開発効率を向上させ、一般的なエラーを削減します。',
    features: {
      smartPrompt: {
        title: 'スマートプロンプト',
        description: 'リアルタイムのコード提案と自動補完',
      },
      autoFormat: {
        title: '自動フォーマット',
        description: '一貫したコードスタイルを維持',
      },
      codeQuality: {
        title: 'コード品質',
        description: '潜在的な問題の自動検出',
      },
      teamwork: {
        title: 'チーム協業',
        description: '統一された開発基準',
      },
    },
    benefits: [
      'インテリジェントなコード提案と自動補完を提供',
      'チームのコードスタイルの一貫性を確保',
      'ベストプラクティスを自動的に実施',
      'コードの保守性を向上',
    ],
  },
}

// 规则类型的多语言配置
const ruleTypesI18n = {
  'zh-CN': {
    global: {
      title: '全局规则',
      description: '在 Cursor 设置中配置，适用于所有项目',
      examples: [
        '代码风格统一',
        '命名规范',
        '文件组织结构',
      ],
    },
    project: {
      title: '项目规则',
      description: '在项目的 .cursorrules 文件中定义，仅适用于特定项目',
      examples: [
        '项目特定的编码标准',
        '依赖管理规则',
        '测试覆盖率要求',
      ],
    },
  },
  'en': {
    global: {
      title: 'Global Rules',
      description: 'Configured in Cursor settings, applies to all projects',
      examples: [
        'Code style consistency',
        'Naming conventions',
        'File organization',
      ],
    },
    project: {
      title: 'Project Rules',
      description: 'Defined in project\'s .cursorrules file, applies to specific projects',
      examples: [
        'Project-specific coding standards',
        'Dependency management rules',
        'Test coverage requirements',
      ],
    },
  },
  'ja': {
    global: {
      title: 'グローバルルール',
      description: 'Cursor設定で構成され、すべてのプロジェクトに適用',
      examples: [
        'コードスタイルの一貫性',
        '命名規則',
        'ファイル構成',
      ],
    },
    project: {
      title: 'プロジェクトルール',
      description: 'プロジェクトの.cursorrules ファイルで定義され、特定のプロジェクトに適用',
      examples: [
        'プロジェクト固有のコーディング標準',
        '依存関係管理ルール',
        'テストカバレッジ要件',
      ],
    },
  },
}

// 步骤的多语言配置
const stepsI18n = {
  'zh-CN': [
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
  ],
  'en': [
    {
      number: 1,
      title: 'Create .cursorrules File',
      description: 'Create a file named .cursorrules in your project root directory.',
    },
    {
      number: 2,
      title: 'Define Your Rules',
      description: 'Write your Cursor rules using the appropriate syntax.',
    },
    {
      number: 3,
      title: 'Start Coding',
      description: 'Cursor will automatically apply your rules as you write code.',
    },
  ],
  'ja': [
    {
      number: 1,
      title: '.cursorrules ファイルの作成',
      description: 'プロジェクトのルートディレクトリに .cursorrules という名前のファイルを作成します。',
    },
    {
      number: 2,
      title: 'ルールの定義',
      description: '適切な構文を使用して Cursor ルールを記述します。',
    },
    {
      number: 3,
      title: 'コーディング開始',
      description: 'コードを書くと、Cursor が自動的にルールを適用します。',
    },
  ],
}

// FAQ的多语言配置
const faqsI18n = {
  'zh-CN': [
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
  ],
  'en': [
    {
      question: 'What are Cursor Rules?',
      answer: 'Cursor Rules is a rule system for customizing and standardizing the development process. It helps teams maintain consistent code style, improve code quality, and enhance development efficiency through automated suggestions.',
    },
    {
      question: 'How do I create and use Cursor Rules?',
      answer: 'Creating and using Cursor Rules is simple: first create a .cursorrules file in your project root directory, then define your rules using specific syntax. Once set up, Cursor will automatically apply these rules to assist your development.',
    },
    {
      question: 'Can I share Cursor Rules with my team?',
      answer: 'Yes, you can share the .cursorrules file with team members through version control systems (like Git). This ensures everyone in the team uses the same coding rules and best practices.',
    },
    {
      question: 'Are Cursor Rules specific to certain programming languages?',
      answer: 'Cursor Rules supports multiple programming languages and can be customized based on different language characteristics. You can set specific rules for each language to meet different project needs.',
    },
  ],
  'ja': [
    {
      question: 'Cursor Rules とは何ですか？',
      answer: 'Cursor Rules は、開発プロセスをカスタマイズおよび標準化するためのルールシステムです。チームが一貫したコードスタイルを維持し、コード品質を向上させ、自動化された提案を通じて開発効率を高めるのに役立ちます。',
    },
    {
      question: 'Cursor Rules の作成と使用方法は？',
      answer: 'Cursor Rules の作成と使用は簡単です：まずプロジェクトのルートディレクトリに .cursorrules ファイルを作成し、特定の構文を使用してルールを定義します。設定が完了すると、Cursor は自動的にこれらのルールを適用して開発をサポートします。',
    },
    {
      question: 'Cursor Rules をチームと共有できますか？',
      answer: 'はい、バージョン管理システム（Git など）を通じて .cursorrules ファイルをチームメンバーと共有できます。これにより、チーム全員が同じコーディングルールとベストプラクティスを使用できます。',
    },
    {
      question: 'Cursor Rules は特定のプログラミング言語に限定されていますか？',
      answer: 'Cursor Rules は複数のプログラミング言語をサポートし、異なる言語の特性に基づいてカスタマイズできます。各言語に特有のルールを設定して、異なるプロジェクトのニーズに対応できます。',
    },
  ],
}

// 添加示例的多语言配置
const examplesI18n = {
  'zh-CN': {
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
  'en': {
    title: 'Usage Examples',
    description: 'Here is a typical Cursor Rules configuration example:',
    examples: [
      {
        title: 'TypeScript Project Rules',
        content: `# TypeScript Project Rules

## Code Standards
- Use TypeScript strict mode
- Explicitly declare all types
- Avoid using any type

## Component Development
- Use functional components
- Props must have type definitions
- Use CSS Modules

## State Management
- Prefer React Context
- Use Redux for large applications
- Follow immutability principles

## Performance Optimization
- Implement code splitting
- Use React.memo()
- Optimize re-rendering logic

## Testing Standards
- Unit test coverage > 80%
- Use React Testing Library
- Write integration tests`,
      },
    ],
  },
  'ja': {
    title: '使用例',
    description: '以下は典型的な Cursor Rules の設定例です：',
    examples: [
      {
        title: 'TypeScript プロジェクトルール',
        content: `# TypeScript Project Rules

## コード規約
- TypeScript 厳格モードを使用
- すべての型を明示的に宣言
- any型の使用を避ける

## コンポーネント開発
- 関数コンポーネントを使用
- Propsに型定義が必須
- CSS Modulesを使用

## 状態管理
- React Contextを優先
- 大規模アプリケーションではReduxを使用
- 不変性の原則に従う

## パフォーマンス最適化
- コード分割の実装
- React.memo()の使用
- 再レンダリングの最適化

## テスト規約
- ユニットテストカバレッジ > 80%
- React Testing Libraryを使用
- 統合テストの作成`,
      },
    ],
  },
}

// 添加标题的多语言配置
const sectionTitlesI18n = {
  'zh-CN': {
    gettingStarted: '开始使用',
    faq: '常见问题',
  },
  'en': {
    gettingStarted: 'Getting Started',
    faq: 'Frequently Asked Questions',
  },
  'ja': {
    gettingStarted: '使い方',
    faq: 'よくある質問',
  },
}

// 计算属性
const currentLang = computed(() => lang.value || 'en')
const t = computed(() => i18n[currentLang.value])
const currentRuleTypes = computed(() => ruleTypesI18n[currentLang.value])
const currentSteps = computed(() => stepsI18n[currentLang.value])
const currentFaqs = computed(() => faqsI18n[currentLang.value])
const sectionTitles = computed(() => sectionTitlesI18n[currentLang.value])

const ruleCategories = computed(() => [
  {
    id: 1,
    title: t.value.title,
    description: t.value.description,
    benefits: t.value.benefits,
  },
  {
    id: 2,
    title: currentRuleTypes.value.global.title,
    description: currentRuleTypes.value.global.description,
    types: [
      {
        title: currentRuleTypes.value.global.title,
        description: currentRuleTypes.value.global.description,
        examples: currentRuleTypes.value.global.examples,
      },
      {
        title: currentRuleTypes.value.project.title,
        description: currentRuleTypes.value.project.description,
        examples: currentRuleTypes.value.project.examples,
      },
    ],
  },
  {
    id: 3,
    title: examplesI18n[currentLang.value].title,
    description: examplesI18n[currentLang.value].description,
    examples: examplesI18n[currentLang.value].examples,
  },
])

const steps = computed(() => currentSteps.value)
const faqs = computed(() => currentFaqs.value)
</script>

<template>
  <div class="rules-page">
    <div class="rules-hero">
      <div class="hero-content">
        <h1>{{ t.title }}</h1>
        <p class="hero-subtitle">
          {{ t.subtitle }}
        </p>
        <p class="hero-description">
          {{ t.description }}
        </p>
        <div class="hero-features">
          <div class="feature-item">
            <div class="feature-icon">
              ⚡️
            </div>
            <div class="feature-text">
              <h3>{{ t.features.smartPrompt.title }}</h3>
              <p>{{ t.features.smartPrompt.description }}</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              🔄
            </div>
            <div class="feature-text">
              <h3>{{ t.features.autoFormat.title }}</h3>
              <p>{{ t.features.autoFormat.description }}</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              🛡️
            </div>
            <div class="feature-text">
              <h3>{{ t.features.codeQuality.title }}</h3>
              <p>{{ t.features.codeQuality.description }}</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              🤝
            </div>
            <div class="feature-text">
              <h3>{{ t.features.teamwork.title }}</h3>
              <p>{{ t.features.teamwork.description }}</p>
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
        <h2>{{ sectionTitles.gettingStarted }}</h2>
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
        <h2>{{ sectionTitles.faq }}</h2>
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
