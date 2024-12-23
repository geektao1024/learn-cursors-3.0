import type { Plugin } from 'vite'
import type { MarkdownRenderer } from 'vitepress'

export function MarkdownTransform(): Plugin {
  return {
    name: 'cursor-markdown-transform',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.md'))
        return

      // Transform cursor tutorial links
      const cursorLinkRegex = /\[([^\]]+)\]\(\/cursor-tutorial\/([^)]+)\)/g
      code = code.replace(cursorLinkRegex, (_, text, path) => {
        return `[${text}](/wiki/user-guide/${path})`
      })

      // Transform API reference links
      const apiLinkRegex = /\[([^\]]+)\]\(\/api\/([^)]+)\)/g
      code = code.replace(apiLinkRegex, (_, text, path) => {
        return `[${text}](/wiki/api-reference/${path})`
      })

      return code
    },
  }
}

export function configureMarkdown(md: MarkdownRenderer) {
  // Add custom markdown extensions here if needed
  md.use((md) => {
    const defaultRender = md.renderer.rules.link_open || ((tokens, idx, options, env, self) => {
      return self.renderToken(tokens, idx, options)
    })

    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      const token = tokens[idx]
      const href = token.attrGet('href')

      if (href && href.startsWith('http')) {
        token.attrSet('target', '_blank')
        token.attrSet('rel', 'noopener noreferrer')
      }

      return defaultRender(tokens, idx, options, env, self)
    }
  })
}
