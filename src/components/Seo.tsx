import { useEffect } from 'react'

type SeoProps = {
  title: string
  description: string
  type?: 'website' | 'article'
  image?: string
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function Seo({ title, description, type = 'website', image }: SeoProps) {
  useEffect(() => {
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`
    upsertMeta('property', 'og:url', canonicalUrl)
    if (image) upsertMeta('property', 'og:image', new URL(image, window.location.origin).href)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl
  }, [description, image, title, type])

  return null
}

export default Seo
