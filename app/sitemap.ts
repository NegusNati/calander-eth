import type { MetadataRoute } from 'next'

const BASE_URL = 'https://ethiopian-calendar.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date()
  const routes = [''].map((path) => ({
    url: path ? `${BASE_URL}/${path}` : BASE_URL,
    lastModified: today,
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

  return routes
}
