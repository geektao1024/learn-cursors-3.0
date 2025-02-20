export const redirectRules = {
  // 处理根路径
  '/index.md': '/',
  '/index.html': '/',

  // 处理主要内容路径
  '/wiki/(.*)': '/wiki/$1',
  '/docs-zh/(.*)': '/docs-zh/$1',
  '/blog/(.*)': '/blog/$1',
  '/example/(.*)': '/example/$1',
  '/rules/(.*)': '/rules/$1',
  '/shortcuts/(.*)': '/shortcuts/$1',

  // 处理博客文章路径
  '/blog/posts/([^.]+)$': '/blog/posts/$1.html',
  '/blog/posts/([^.]+).new$': '/blog/posts/$1.html',
  '/en/blog/posts/([^.]+)$': '/en/blog/posts/$1.html',
  '/en/blog/posts/([^.]+).new$': '/en/blog/posts/$1.html',
  '/ja/blog/posts/([^.]+)$': '/ja/blog/posts/$1.html',
  '/ja/blog/posts/([^.]+).new$': '/ja/blog/posts/$1.html',

  // 处理文档路径
  '/docs-zh/([^/]+)/([^.]+)$': '/docs-zh/$1/$2.html',
  '/en/docs/([^/]+)/([^.]+)$': '/en/docs/$1/$2.html',
  '/ja/docs/([^/]+)/([^.]+)$': '/ja/docs/$1/$2.html',

  // 处理教程路径
  '/wiki/user-guide/([^.]+)$': '/wiki/user-guide/$1.html',
  '/en/wiki/user-guide/([^.]+)$': '/en/wiki/user-guide/$1.html',
  '/ja/wiki/user-guide/([^.]+)$': '/ja/wiki/user-guide/$1.html',

  // 处理案例分享路径
  '/example/([^.]+)$': '/example/$1.html',
  '/en/example/([^.]+)$': '/en/example/$1.html',
  '/ja/example/([^.]+)$': '/ja/example/$1.html',

  // 处理规则配置路径
  '/rules/([^.]+)$': '/rules/$1.html',
  '/en/rules/([^.]+)$': '/en/rules/$1.html',
  '/ja/rules/([^.]+)$': '/ja/rules/$1.html',

  // 处理快捷键路径
  '/shortcuts/([^.]+)$': '/shortcuts/$1.html',
  '/en/shortcuts/([^.]+)$': '/en/shortcuts/$1.html',
  '/ja/shortcuts/([^.]+)$': '/ja/shortcuts/$1.html',

  // 处理文档路径的语言切换
  '/en/docs-zh/(.*)': '/en/docs/$1',
  '/ja/docs-zh/(.*)': '/ja/docs/$1',

  // 保持其他语言的URL结构
  '/en/(.*)': '/en/$1',
  '/ja/(.*)': '/ja/$1',
}
