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

declare module "@euroland/ci-shadcn-styleguide" {
  export const Button: any;
  export const Dialog: any;
  export const DialogContent: any;
  export const DialogHeader: any;
  export const DialogTitle: any;
  export const DialogFooter: any;
  export const Input: any;
  export const Checkbox: any;
  export const Badge: any;
  export const X: any;
  export const Search: any;
  export const ChevronLeft: any;
  export const ChevronRight: any;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
