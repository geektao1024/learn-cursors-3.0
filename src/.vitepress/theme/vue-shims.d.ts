declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}
