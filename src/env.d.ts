/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly CSS_PREFIX: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
