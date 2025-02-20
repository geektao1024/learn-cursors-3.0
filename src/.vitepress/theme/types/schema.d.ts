// 基础类型
interface ImageObject {
  '@type': 'ImageObject'
  'url': string
}

interface Organization {
  '@type': 'Organization'
  'name': string
  'logo': ImageObject
  'contactPoint'?: {
    '@type': 'ContactPoint'
    'contactType': string
    'url': string
  }
  'foundingDate'?: string
  'sameAs'?: string[]
}

interface Person {
  '@type': 'Person'
  'name': string | any
}

interface WebPage {
  '@type': 'WebPage'
  '@id': string
}

// Schema基础接口
interface SchemaBase {
  '@context': 'https://schema.org'
  'description'?: string | any
  'image'?: string | any
}

// 具体Schema类型
interface WebSiteSchema extends SchemaBase {
  '@type': 'WebSite'
  'url': string
  'name': string
  'potentialAction': {
    '@type': 'SearchAction'
    'target': {
      '@type': 'EntryPoint'
      'urlTemplate': string
    }
    'query-input': string
  }
  'publisher': Organization
}

interface BreadcrumbListSchema extends SchemaBase {
  '@type': 'BreadcrumbList'
  'itemListElement': Array<{
    '@type': 'ListItem'
    'position': number
    'item': {
      '@id': string
      'name': string
    }
  }>
}

interface ArticleSchema extends SchemaBase {
  '@type': 'Article'
  'headline': string | any
  'datePublished'?: string | any
  'dateModified'?: string | any
  'author': Person
  'publisher': Organization
  'mainEntityOfPage'?: WebPage
  'articleSection'?: string
}

interface CourseSchema extends SchemaBase {
  '@type': 'Course'
  'name': string | any
  'provider': {
    '@type': 'Organization'
    'name': string
    'sameAs': string
  }
  'educationalLevel': string
  'inLanguage': string | any
  'coursePrerequisites': string
  'learningResourceType': string
  'offers': {
    '@type': 'Offer'
    'price': string
    'priceCurrency': string
    'availability': string
  }
}

interface TechArticleSchema extends SchemaBase {
  '@type': 'TechArticle'
  'headline': string | any
  'dateModified'?: string | any
  'author': Organization
  'publisher': Organization
  'about': {
    '@type': 'SoftwareApplication'
    'name': string
    'applicationCategory': string
  }
}

interface HowToSchema extends SchemaBase {
  '@type': 'HowTo'
  'name': string | any
  'tool': {
    '@type': 'SoftwareApplication'
    'name': string
    'applicationCategory': string
  }
  'step': Array<{
    '@type': 'HowToStep'
    'name': string
    'text': string
  }>
}

type SchemaType = WebSiteSchema | BreadcrumbListSchema | ArticleSchema | CourseSchema | TechArticleSchema | HowToSchema

export type { ArticleSchema, BreadcrumbListSchema, CourseSchema, HowToSchema, SchemaType, TechArticleSchema, WebSiteSchema }
