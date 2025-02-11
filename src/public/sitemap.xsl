<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Learn Cursor - XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            max-width: 90em;
            margin: 0 auto;
            padding: 2em;
            background: #f5f5f5;
          }
          .container {
            background: white;
            padding: 2em;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2em;
          }
          .language-switcher {
            display: flex;
            gap: 1em;
          }
          .language-btn {
            padding: 0.5em 1em;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: #fff;
            cursor: pointer;
            color: #666;
            text-decoration: none;
          }
          .language-btn:hover {
            background: #f8f9fa;
          }
          h1 {
            color: #2c3e50;
            margin: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 1em 0;
            background: white;
          }
          th, td {
            padding: 1em;
            text-align: left;
            border-bottom: 1px solid #eee;
          }
          th {
            background-color: #f8f9fa;
            font-weight: 600;
            color: #2c3e50;
          }
          tr:hover {
            background-color: #f8f9fa;
          }
          a {
            color: #3498db;
            text-decoration: none;
          }
          a:hover {
            color: #2980b9;
            text-decoration: underline;
          }
          .meta {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 2em;
          }
          .alternate-links {
            display: flex;
            gap: 0.5em;
            font-size: 0.9em;
          }
          .alternate-links a {
            padding: 0.2em 0.5em;
            border-radius: 3px;
            background: #f0f0f0;
            color: #666;
          }
          .alternate-links a:hover {
            background: #e0e0e0;
          }
          .priority-high { color: #27ae60; }
          .priority-medium { color: #f39c12; }
          .priority-low { color: #95a5a6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Learn Cursor - XML Sitemap</h1>
            <div class="language-switcher">
              <a href="/" class="language-btn">中文</a>
              <a href="/en" class="language-btn">English</a>
              <a href="/ja" class="language-btn">日本語</a>
            </div>
          </div>
          <div class="meta">
            <p>此站点地图包含 <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> 个 URL</p>
          </div>
          <table>
            <tr>
              <th>URL</th>
              <th>语言版本</th>
              <th>优先级</th>
              <th>更新频率</th>
              <th>最后修改</th>
            </tr>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                </td>
                <td>
                  <div class="alternate-links">
                    <xsl:for-each select="xhtml:link[@rel='alternate']">
                      <a href="{@href}">
                        <xsl:choose>
                          <xsl:when test="@hreflang='zh-CN'">中文</xsl:when>
                          <xsl:when test="@hreflang='en'">EN</xsl:when>
                          <xsl:when test="@hreflang='ja'">日本語</xsl:when>
                          <xsl:otherwise><xsl:value-of select="@hreflang"/></xsl:otherwise>
                        </xsl:choose>
                      </a>
                    </xsl:for-each>
                  </div>
                </td>
                <td>
                  <span>
                    <xsl:attribute name="class">
                      <xsl:choose>
                        <xsl:when test="sitemap:priority &gt;= 0.8">priority-high</xsl:when>
                        <xsl:when test="sitemap:priority &gt;= 0.6">priority-medium</xsl:when>
                        <xsl:otherwise>priority-low</xsl:otherwise>
                      </xsl:choose>
                    </xsl:attribute>
                    <xsl:value-of select="sitemap:priority"/>
                  </span>
                </td>
                <td><xsl:value-of select="sitemap:changefreq"/></td>
                <td><xsl:value-of select="sitemap:lastmod"/></td>
              </tr>
            </xsl:for-each>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet> 