import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { Feed } from 'feed'
import { createContentLoader } from 'vitepress'

const baseUrl = 'https://learn-cursor.com'

export async function generateFeed(config: any) {
  const feed = new Feed({
    title: 'Cursor AI 教程',
    description: 'Cursor AI 中文教程社区',
    id: baseUrl,
    link: baseUrl,
    language: 'zh-CN',
    image: `${baseUrl}/logo.png`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `Copyright © ${new Date().getFullYear()} Cursor AI 中文教程社区`,
  })

  const posts = await createContentLoader('blog/posts/*.md', {
    excerpt: true,
    render: true,
  }).load()

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string)
      - +new Date(a.frontmatter.date as string),
  )

  for (const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl}${url}`,
      link: `${baseUrl}${url}`,
      description: excerpt,
      content: html,
      author: [
        {
          name: frontmatter.author,
          link: frontmatter.twitter
            ? `https://twitter.com/${frontmatter.twitter}`
            : undefined,
        },
      ],
      date: frontmatter.date,
    })
  }

  writeFileSync(resolve(config.outDir, 'feed.rss'), feed.rss2())
}
