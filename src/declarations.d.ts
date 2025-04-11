declare module "*.html" {
  const rawHtmlFile: string;
  export = rawHtmlFile;
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "@euroland/ci-api" {
  export const httpClient: any;
}

declare module "@euroland/ci-utils" {
  export const createI18n: any;
  export const urlJoin: (...args: string[]) => string;
  export const appDataContext: any;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
