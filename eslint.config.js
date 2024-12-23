import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  formatters: true,
  stylistic: true,
  // stylistic: {
  //   semi: true,
  //   quotes: "double",
  // },
  ignores: [
    '**/node_modules/**',
    '**/src/wiki/**',
    '**/src/styles/detail/**',
    '**/src/blog/**',
    'scripts/**',
    '**/build/**',
    '**/dist/**',
  ],
})
