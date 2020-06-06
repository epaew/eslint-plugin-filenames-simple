/// <reference types="estree" />

declare module 'espree' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function parse(code: string, options?: any): Node;
}
