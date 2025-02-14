interface SitemapItem {
  url: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  alternateRefs?: Array<{
    href: string
    hreflang: string
  }>
}

interface SitemapConfig {
  hostname: string
  transformItems?: (items: SitemapItem[]) => SitemapItem[]
  xslUrl?: string
  lastmodDateOnly?: boolean
}

export const sitemap: SitemapConfig = {
  hostname: 'https://learn-cursor.com',
  transformItems: (items: SitemapItem[]) => {
    return items.map((item) => {
      // 确定页面类型和优先级
      const isHomePage = item.url === '/'
      const isMainSection = /^\/(?:docs-zh|blog|wiki|example|rules|shortcuts)\/?$/.test(item.url)
      const isArticle = item.url.split('/').length > 2 && !item.url.endsWith('/')

      // 设置更新频率
      let changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'monthly'
      if (isHomePage)
        changefreq = 'daily'
      else if (isMainSection)
        changefreq = 'weekly'
      else if (isArticle)
        changefreq = 'monthly'

      // 设置优先级
      let priority = 0.5
      if (isHomePage)
        priority = 1.0
      else if (isMainSection)
        priority = 0.8
      else if (isArticle)
        priority = 0.6

      // 构建语言版本URL
      const urlWithoutLang = item.url.replace(/^\/(?:en|ja)/, '')
      const urlWithHtml = isArticle ? `${item.url}.html` : item.url
      const alternateRefs = [
        { href: `https://learn-cursor.com${isArticle ? `${urlWithoutLang}.html` : urlWithoutLang}`, hreflang: 'zh-CN' },
        { href: `https://learn-cursor.com/en${isArticle ? `${urlWithoutLang}.html` : urlWithoutLang}`, hreflang: 'en' },
        { href: `https://learn-cursor.com/ja${isArticle ? `${urlWithoutLang}.html` : urlWithoutLang}`, hreflang: 'ja' },
        { href: `https://learn-cursor.com${isArticle ? `${urlWithoutLang}.html` : urlWithoutLang}`, hreflang: 'x-default' },
      ]

      return {
        ...item,
        url: urlWithHtml,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq,
        priority,
        alternateRefs,
      }
    })
  },
  xslUrl: '/sitemap.xsl',
  lastmodDateOnly: true,
}
