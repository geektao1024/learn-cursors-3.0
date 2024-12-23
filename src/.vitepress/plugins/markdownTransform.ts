import type { Plugin } from 'vite'

export function MarkdownTransform(): Plugin {
  return {
    name: 'markdown-transform',
    async transform(code, id) {
      if (!id.match(/\.md\b/))
        return null

      // convert links to relative
      code = code.replaceAll(
        /\]\(https?:\/\/zotero-chinese\.com\/user-guide\//g,
        '](/user-guide/',
      )
      code = code.replaceAll(
        /\]\(https?:\/\/zotero-chinese\.com\//g,
        '](/',
      )

      return code
    },
  }
}

function _replaceAsync(
  str: string,
  match: RegExp,
  replacer: (substring: string, ...args: any[]) => Promise<string>,
) {
  const promises: Promise<string>[] = []
  str.replace(match, (...args) => {
    promises.push(replacer(...args))
    return ''
  })
  return Promise.all(promises).then(replacements =>
    str.replace(match, () => replacements.shift()!),
  )
}
