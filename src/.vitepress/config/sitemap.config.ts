export const sitemap = {
  hostname: 'https://learn-cursor.com',
  xslUrl: '/sitemap.xsl',
  lastmodDateOnly: true,
  transformItems: (items: any[]) => {
    return items.map((item) => {
      // 移除 .html 后缀
      const url = item.url.replace(/\.html$/, '')

      // 设置优先级
      let priority = 0.7 // 默认优先级
      if (url === '/')
        priority = 1.0
      else if (url.startsWith('/blog/posts/'))
        priority = 0.8
      else if (url.startsWith('/docs-zh/') || url.startsWith('/en/docs/') || url.startsWith('/ja/docs/'))
        priority = 0.9
      else if (url.startsWith('/wiki/'))
        priority = 0.9

      // 设置更新频率
      let changefreq = 'monthly' // 默认更新频率
      if (url === '/')
        changefreq = 'daily'
      else if (url.startsWith('/blog/posts/'))
        changefreq = 'weekly'

      // 添加多语言链接
      const alternateLinks = []
      const pathWithoutLang = url.replace(/^\/(en|ja)\//, '/')
      if (!url.startsWith('/en/') && !url.startsWith('/ja/')) {
        alternateLinks.push(
          { lang: 'en', url: `/en${url}` },
          { lang: 'ja', url: `/ja${url}` },
        )
      }
      else if (url.startsWith('/en/')) {
        alternateLinks.push(
          { lang: 'zh-CN', url: pathWithoutLang },
          { lang: 'ja', url: `/ja${pathWithoutLang}` },
        )
      }
      else if (url.startsWith('/ja/')) {
        alternateLinks.push(
          { lang: 'zh-CN', url: pathWithoutLang },
          { lang: 'en', url: `/en${pathWithoutLang}` },
        )
      }

      return {
        ...item,
        url,
        priority,
        changefreq,
        alternateLinks,
      }
    })
  },
}
