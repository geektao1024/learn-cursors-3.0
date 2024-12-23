import type { UserConfig } from 'vitepress'
import { footnote } from '@mdit/plugin-footnote'
import { mark } from '@mdit/plugin-mark'

type MarkdownPlugin = any

export const markdown: UserConfig['markdown'] = {
  lineNumbers: true,
  config: (md) => {
    md.use(footnote as MarkdownPlugin)
    md.use(mark as MarkdownPlugin)
  },
}
