/**
 * The `page-flip` package (StPageFlip) ships its TypeScript source but no compiled .d.ts, so
 * consuming it from a type-checked SFC needs this ambient shim. Only the surface this project
 * actually calls is declared - see node_modules/page-flip/src/PageFlip.ts for the full API.
 */
declare module 'page-flip' {
  export type FlipCorner = 'top' | 'bottom'
  export type Orientation = 'portrait' | 'landscape'
  export type FlippingState = 'user_fold' | 'fold_corner' | 'flipping' | 'read'

  export interface FlipSetting {
    startPage: number
    size: 'fixed' | 'stretch'
    width: number
    height: number
    minWidth: number
    maxWidth: number
    minHeight: number
    maxHeight: number
    drawShadow: boolean
    flippingTime: number
    usePortrait: boolean
    startZIndex: number
    autoSize: boolean
    maxShadowOpacity: number
    showCover: boolean
    mobileScrollSupport: boolean
    swipeDistance: number
    clickEventForward: boolean
    useMouseEvents: boolean
    showPageCorners: boolean
    disableFlipByClick: boolean
  }

  export interface FlipEvent {
    data: unknown
    object: PageFlip
  }

  export class PageFlip {
    constructor(inBlock: HTMLElement, setting: Partial<FlipSetting>)
    destroy(): void
    update(): void
    loadFromImages(imagesHref: string[]): void
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void
    updateFromImages(imagesHref: string[]): void
    updateFromHtml(items: NodeListOf<HTMLElement> | HTMLElement[]): void
    clear(): void
    turnToPrevPage(): void
    turnToNextPage(): void
    turnToPage(page: number): void
    flipNext(corner?: FlipCorner): void
    flipPrev(corner?: FlipCorner): void
    flip(page: number, corner?: FlipCorner): void
    getPageCount(): number
    getCurrentPageIndex(): number
    getOrientation(): Orientation
    getState(): FlippingState
    on(event: 'flip', handler: (e: FlipEvent & { data: number }) => void): PageFlip
    on(event: 'changeOrientation', handler: (e: FlipEvent & { data: Orientation }) => void): PageFlip
    on(event: 'changeState', handler: (e: FlipEvent & { data: FlippingState }) => void): PageFlip
    on(event: 'init' | 'update', handler: (e: FlipEvent & { data: { page: number; mode: Orientation } }) => void): PageFlip
    off(event: string): void
  }
}
