import { resolve } from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vitepress'
import { i18nConfig } from './config/i18n'
import { sidebar } from './config/sidebar.config'
import { sitemap } from './config/sitemap.config'
import { MarkdownTransform } from './utils/markdown/index'

const ogDescription = '提供最全面的Cursor AI中文教程，包括下载安装、使用教程、Rules规则配置等专业指南。全面指导你使用Cursor AI助手从0到1搭建互联网产品，涵盖项目实战、代码生成、Git集成等核心功能。无论你是想了解Cursor怎么用，还是寻求官方相关教程，都能在这里找到详细图文攻略和实战案例，让AI编程助力你的产品开发之旅。'
const ogImage = '/logo.png'
const ogTitle = 'Cursor中文教程 | AI编程助手入门与实战指南'
const ogUrl = 'https://learn-cursor.com'

export default defineConfig({
  title: 'Learn Cursor',
  description: 'The most comprehensive Cursor AI tutorial, including installation, usage guides, and Rules configuration.',
  locales: i18nConfig,
  lang: 'zh-CN',
  base: '/',
  cleanUrls: true,
  srcExclude: ['wiki/index.md', '**/README.md', '**/_template.md'],
  outDir: '../dist',
  cacheDir: '.vitepress/cache',
  appearance: true,
  lastUpdated: true,

  head: [
    ['meta', { charset: 'utf-8' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['link', { rel: 'canonical', href: 'https://learn-cursor.com' }],
    ['meta', { name: 'author', content: 'Learn Cursor Team' }],
    ['meta', { name: 'keywords', content: 'Cursor,AI Programming,Cursor Tutorial,Cursor Guide,Cursor Download,AI Programming Assistant,Rules Configuration' }],
    ['script', {
      async: '',
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6152848695010247',
      crossorigin: 'anonymous',
    }],
    ['script', {
      async: '',
      src: 'https://www.googletagmanager.com/gtag/js?id=G-XHJEPSKT4G',
    }],
    ['script', {}, `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XHJEPSKT4G');`],
    ['script', {}, `var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?15f47d5cafd63c84ff842289217863a5";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();`],
  ],

  themeConfig: {
    nav: i18nConfig.root?.themeConfig?.nav || [],
    sidebar,

    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
          en: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search documentation',
              },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear query',
                footer: {
                  selectText: 'Select',
                  navigateText: 'Navigate',
                },
              },
            },
          },
          ja: {
            translations: {
              button: {
                buttonText: '検索',
                buttonAriaLabel: 'ドキュメントを検索',
              },
              modal: {
                noResultsText: '結果が見つかりません',
                resetButtonTitle: 'クエリをクリア',
                footer: {
                  selectText: '選択',
                  navigateText: '移動',
                },
              },
            },
          },
        },
      },
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '页面导航',
      level: [2, 3],
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '切换主题',
    notFound: {
      title: '页面未找到',
      quote: '从前有座山，山上有座庙，庙里有个页面，现在找不到...',
      linkText: '返回首页',
    },
  },

  markdown: {
    lineNumbers: true,
    headers: {
      level: [2, 3],
    },
  },

  vite: {
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
    resolve: {
      alias: {
        '@': resolve('src/'),
        '@wiki': resolve('src/wiki/'),
        '@docs': resolve('src/docs-zh/'),
        '@blog': resolve('src/blog/'),
        '@example': resolve('src/example/'),
        '@rules': resolve('src/rules/'),
        '@shortcuts': resolve('src/shortcuts/'),
      },
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dirs: ['src/.vitepress/theme/components'],
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({ prefix: 'i' }),
        ],
      }),
      Icons(),
      MarkdownTransform(),
    ],
    ssr: {
      noExternal: ['element-plus'],
    },
    optimizeDeps: {
      exclude: ['vue-demi'],
    },
  },

  sitemap,

  async transformPageData(pageData) {
    const path = pageData.relativePath || ''
    const firstSegment = path.split('/')[0]

    type SectionKey = 'docs-zh' | 'blog' | 'wiki' | 'example' | 'rules' | 'shortcuts'
    type Lang = 'zh-CN' | 'en' | 'ja'

    interface LangConfig {
      titles: Record<SectionKey, string>
      descriptions: Record<SectionKey, string>
      defaultTitle: string
      defaultDescription: string
    }

    const langConfigs: Record<Lang, LangConfig> = {
      'zh-CN': {
        titles: {
          'docs-zh': '文档中心-API参考-开发指南-Cursor AI中文网',
          'blog': '博客专栏-技术分享-使用技巧-Cursor AI中文网',
          'wiki': '教程中心-入门指南-实战教程-Cursor AI中文网',
          'example': '案例分享-最佳实践-项目示例-Cursor AI中文网',
          'rules': '规则配置-自定义设置-配置指南-Cursor AI中文网',
          'shortcuts': '快捷键-效率指南-操作技巧-Cursor AI中文网',
        },
        descriptions: {
          'docs-zh': 'Cursor AI中文网文档中心提供全面的API参考文档、详细的开发指南、接口说明等技术资源，帮助开发者更好地使用Cursor AI编程助手。',
          'blog': 'Cursor AI中文网博客专栏分享最新的AI编程技术、使用技巧、案例分析，助你掌握AI辅助编程的精髓。',
          'wiki': 'Cursor AI中文网教程中心为你提供从入门到精通的AI编程指南，包括基础教程、进阶技巧、实战案例等全方位学习资源。',
          'example': 'Cursor AI中文网案例分享板块展示真实的项目实践、最佳实践方案、成功案例，让你学习如何在实际项目中应用AI编程。',
          'rules': 'Cursor AI中文网规则配置指南详细介绍如何自定义和优化AI编程助手，包括提示词配置、编程模板定制、个性化设置等。',
          'shortcuts': 'Cursor AI中文网快捷键指南帮助你掌握所有效率操作技巧，提升编程速度，实现更高效的AI辅助开发。',
        },
        defaultTitle: 'Cursor AI教程 | AI编程助手使用指南与技巧教程 | AI驱动的智能编程工具',
        defaultDescription: 'Learn Cursor提供最全面的Cursor AI编程助手教程，从安装设置到高级应用，深入讲解AI编程助手的所有功能与使用技巧。无论你是新手入门还是寻求进阶，都能在这里找到专业的AI编程指南。',
      },
      'en': {
        titles: {
          'docs-zh': 'Documentation-API Reference-Developer Guide-Cursor AI Tutorial',
          'blog': 'Blog-Tech Insights-Tips & Tricks-Cursor AI Tutorial',
          'wiki': 'Tutorials-Getting Started-Practical Guide-Cursor AI Tutorial',
          'example': 'Case Studies-Best Practices-Project Examples-Cursor AI Tutorial',
          'rules': 'Rules Config-Custom Settings-Configuration Guide-Cursor AI Tutorial',
          'shortcuts': 'Shortcuts-Efficiency Guide-Operation Tips-Cursor AI Tutorial',
        },
        descriptions: {
          'docs-zh': 'Cursor AI Tutorial Documentation provides comprehensive API references, detailed development guides, and technical resources to help developers better use the Cursor AI programming assistant.',
          'blog': 'Cursor AI Tutorial Blog shares the latest AI programming technology, usage tips, and case analysis to help you master AI-assisted programming.',
          'wiki': 'Cursor AI Tutorial Center offers a complete AI programming guide from basics to advanced, including fundamental tutorials, advanced techniques, and practical cases.',
          'example': 'Cursor AI Tutorial Case Studies showcase real project implementations, best practice solutions, and success stories to help you learn how to apply AI programming.',
          'rules': 'Cursor AI Tutorial Rules Configuration Guide details how to customize and optimize your AI programming assistant, including prompt configuration and programming templates.',
          'shortcuts': 'Cursor AI Tutorial Shortcuts Guide helps you master all efficiency operations to enhance programming speed and achieve more efficient AI-assisted development.',
        },
        defaultTitle: 'Cursor AI Tutorial | AI Programming Assistant Guide & Tips | AI-Powered Smart Coding Tool',
        defaultDescription: 'Learn Cursor offers the most comprehensive Cursor AI programming assistant tutorials, covering everything from setup to advanced applications. Master AI-assisted programming with in-depth guides and professional tips for both beginners and advanced users.',
      },
      'ja': {
        titles: {
          'docs-zh': 'ドキュメント-API参照-開発ガイド-Cursor AIチュートリアル',
          'blog': 'ブログ-技術洞察-使用技巧-Cursor AIチュートリアル',
          'wiki': 'チュートリアル-入門ガイド-実践ガイド-Cursor AIチュートリアル',
          'example': 'ケーススタディ-ベストプラクティス-プロジェクト例-Cursor AIチュートリアル',
          'rules': 'ルール設定-カスタム設定-設定ガイド-Cursor AIチュートリアル',
          'shortcuts': 'ショートカット-効率化ガイド-操作のコツ-Cursor AIチュートリアル',
        },
        descriptions: {
          'docs-zh': 'Cursor AIチュートリアルのドキュメントセンターでは、包括的なAPI参照、詳細な開発ガイド、技術リソースを提供し、開発者がCursor AIプログラミングアシスタントをより効果的に使用できるようサポートします。',
          'blog': 'Cursor AIチュートリアルのブログでは、最新のAIプログラミング技術、使用のヒント、ケース分析を共有し、AIアシストプログラミングの習得を支援します。',
          'wiki': 'Cursor AIチュートリアルセンターでは、基礎から応用まで、AIプログラミングの完全なガイドを提供します。基本チュートリアル、高度なテクニック、実践的なケースを含みます。',
          'example': 'Cursor AIチュートリアルのケーススタディでは、実際のプロジェクト実装、ベストプラクティスソリューション、成功事例を紹介し、AIプログラミングの実践的な適用方法を学べます。',
          'rules': 'Cursor AIチュートリアルのルール設定ガイドでは、AIプログラミングアシスタントのカスタマイズと最適化方法を詳しく説明します。',
          'shortcuts': 'Cursor AIチュートリアルのショートカットガイドは、すべての効率的な操作の習得を支援し、プログラミング速度を向上させ、より効率的なAI支援開発を実現します。',
        },
        defaultTitle: 'Cursor AIチュートリアル | AIプログラミングアシスタントの使い方とコツ | AI駆動型スマートコーディングツール',
        defaultDescription: 'Learn Cursorは、最も包括的なCursor AIプログラミングアシスタントのチュートリアルを提供し、セットアップから高度な応用まで、すべての機能と使用テクニックを詳しく解説します。初心者から上級者まで、プロフェッショナルなAIプログラミングガイダンスを見つけることができます。',
      },
    }

    const currentLang = (['en', 'ja'].includes(firstSegment) ? firstSegment : 'zh-CN') as Lang
    const langConfig = langConfigs[currentLang]

    if (!['en', 'ja'].includes(firstSegment)) {
      const validPaths = ['docs-zh', 'blog', 'wiki', 'example', 'rules', 'shortcuts']
      if (validPaths.includes(firstSegment)) {
        return {
          ...pageData,
          frontmatter: {
            ...pageData.frontmatter,
            lang: 'zh-CN',
          },
        }
      }
    }

    if (!pageData.frontmatter.title) {
      pageData.frontmatter.title = pageData.title
        ? `${pageData.title} | ${langConfig.titles[firstSegment as SectionKey]}`
        : langConfig.titles[firstSegment as SectionKey]
    }

    if (!pageData.frontmatter.description) {
      pageData.frontmatter.description = langConfig.descriptions[firstSegment as SectionKey]
    }

    pageData.frontmatter.head = [
      ['meta', { property: 'og:title', content: pageData.frontmatter.title }],
      ['meta', { property: 'og:description', content: pageData.frontmatter.description }],
      ['meta', { property: 'og:url', content: `https://www.learn-cursor.com${pageData.relativePath}` }],
      ['meta', { property: 'og:type', content: 'article' }],
      ['meta', { property: 'og:image', content: 'https://www.learn-cursor.com/logo.png' }],
      ...(pageData.frontmatter.head || []),
    ]

    return pageData
  },
})
