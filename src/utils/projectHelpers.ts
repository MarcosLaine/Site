import type { Project } from '../services/api'

export function normalizeImageUrl(url: string): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return url
  }
  return `/${url.replace(/^\.?\//, '')}`
}

export function parseMediaUrls(media_url: string | string[]): string[] {
  if (typeof media_url === 'string') {
    try {
      const parsed = JSON.parse(media_url)
      return Array.isArray(parsed) ? parsed.map(normalizeImageUrl) : [normalizeImageUrl(media_url)]
    } catch {
      return [normalizeImageUrl(media_url)]
    }
  }
  return media_url.map(normalizeImageUrl)
}

export function parseTechnologies(technologies?: string | string[]): string[] {
  if (!technologies) return []

  if (Array.isArray(technologies)) {
    return technologies
  }

  try {
    const parsed = JSON.parse(technologies)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return technologies ? [technologies] : []
  }
}

export function getProjectDescription(
  project: Pick<Project, 'description' | 'description_key' | 'description_en'>,
  t: (key: string) => string,
  language: string
): string {
  if (language === 'en') {
    if (project.description_key) {
      const translated = t(project.description_key)
      if (translated !== project.description_key) return translated
      if (project.description_en) return project.description_en
    }
    if (project.description_en) return project.description_en
  }

  if (project.description_key) {
    const translated = t(project.description_key)
    if (translated !== project.description_key) return translated
  }

  return project.description
}
