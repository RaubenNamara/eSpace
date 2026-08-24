// html2canvas ships no TypeScript declarations and there is no widely-used @types package for
// it - this is a minimal ambient declaration covering the one call shape used in this project
// (EquationDialog.vue/SignaturePad.vue rasterizing a detached DOM node to a canvas).
declare module 'html2canvas' {
  interface Html2CanvasOptions {
    backgroundColor?: string | null
    scale?: number
    logging?: boolean
    [key: string]: any
  }

  export default function html2canvas(element: HTMLElement, options?: Html2CanvasOptions): Promise<HTMLCanvasElement>
}
