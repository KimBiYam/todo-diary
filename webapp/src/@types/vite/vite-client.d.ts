/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GOOGLE_CLIENT_ID: string;
  readonly GITHUB_CLIENT_ID: string;
  readonly TOKEN_PREFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
