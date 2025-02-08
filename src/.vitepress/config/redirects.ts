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

  // 处理文档路径的语言切换
  '/en/docs-zh/(.*)': '/en/docs/$1',
  '/ja/docs-zh/(.*)': '/ja/docs/$1',

  // 保持其他语言的URL结构
  '/en/(.*)': '/en/$1',
  '/ja/(.*)': '/ja/$1',
}
