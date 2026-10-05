import { onBeforeUnmount, watchEffect } from 'vue'

const SITE = 'https://espace.stmark.sc.ug'

const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = value
}

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

/**
 * Public pages: the tab title, description, canonical link and share-card tags for this page.
 * index.html holds the landing page's own values; leaving a page puts those back.
 */
export function usePageMeta(get: () => { title: string; description: string; path: string }) {
  const original = {
    title: document.title,
    description: document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? ''
  }
  watchEffect(() => {
    const { title, description, path } = get()
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', SITE + path)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setCanonical(SITE + path)
  })
  onBeforeUnmount(() => {
    document.title = original.title
    setMeta('name', 'description', original.description)
  })
}
