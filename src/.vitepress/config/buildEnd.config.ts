import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { Feed } from 'feed'
import { SitemapStream, streamToPromise } from 'sitemap'
import { createContentLoader } from 'vitepress'
import { sitemap as sitemapConfig } from './sitemap.config'

const baseUrl = 'https://learn-cursor.com'

export async function generateFeed(config: any) {
  try {
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

    const posts = await createContentLoader('zh-CN/blog/posts/*.md', {
      excerpt: true,
      render: true,
    }).load()

    posts.sort(
      (a, b) =>
        +new Date(b.frontmatter.date as string)
        - +new Date(a.frontmatter.date as string),
    )

    for (const { url, excerpt, frontmatter, html } of posts) {
      if (!frontmatter.date) {
        console.warn(`Warning: Post ${url} is missing date in frontmatter`)
        continue
      }

      const postDate = new Date(frontmatter.date)
      if (Number.isNaN(postDate.getTime())) {
        console.warn(`Warning: Post ${url} has invalid date format: ${frontmatter.date}`)
        continue
      }

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
        date: postDate,
      })
    }

    const outputPath = resolve(config.outDir, 'feed.xml')
    writeFileSync(outputPath, feed.rss2())
    console.log(`RSS feed generated at ${outputPath}`)
  }
  catch (error) {
    console.error('Error generating RSS feed:', error)
  }
}

export async function generateSitemap(config: any) {
  try {
    const smStream = new SitemapStream({ hostname: sitemapConfig.hostname })
    const pages = await createContentLoader('**/*.md', {
      excerpt: false,
      render: false,
    }).load()

    const transformedItems = sitemapConfig.transformItems(pages.map(page => ({
      url: page.url,
      lastmod: new Date().toISOString(),
    })))

    for (const item of transformedItems) {
      smStream.write(item)
    }

    smStream.end()
    const sitemap = await streamToPromise(smStream)
    const outputPath = resolve(config.outDir, 'sitemap.xml')
    writeFileSync(outputPath, sitemap.toString())
    console.log(`Sitemap generated at ${outputPath}`)
  }
  catch (error) {
    console.error('Error generating sitemap:', error)
  }
}

export async function buildEnd(config: any) {
  await Promise.all([
    generateFeed(config),
    generateSitemap(config),
  ])
}
