/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
// .env文件里内容的类型声明
interface ImportMetaEnv {
  readonly VITE_APP_URL: string
  // 在这里添加新的
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
