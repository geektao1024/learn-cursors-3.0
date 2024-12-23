// Env Variables and Modes | Vite
// https://vitejs.dev/guide/env-and-mode#intellisense-for-typescript

/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

declare module 'vue-router' {
  import type { Router } from 'vue-router'

  export function createRouter(options: any): Router
  export function createWebHistory(base?: string): any
  export function createMemoryHistory(base?: string): any
}

interface ImportMetaEnv {
  readonly VUE_PROD_HYDRATION_MISMATCH_DETAILS_FLAG?: '1'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'nprogress' {
  export function configure(options: { showSpinner: boolean }): void
  export function start(): void
  export function done(): void
}

declare module '@vue/server-renderer' {
  export function renderToString(app: any, context?: any): Promise<string>
}
