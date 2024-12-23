/// <reference types="vite/client" />
/// <reference types="vitepress/client" />
/// <reference types="element-plus/global" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

declare module '@theme/index' {
  import type { Theme } from 'vitepress'

  const theme: Theme
  export default theme
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_GISCUS_REPO: string
  readonly VITE_GISCUS_REPO_ID: string
  readonly VITE_GISCUS_CATEGORY: string
  readonly VITE_GISCUS_CATEGORY_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
