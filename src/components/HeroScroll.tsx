import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { useLanguage } from '../context/LanguageContext'
import ProjectDetailModal, { type ProjectDetailData } from './ProjectDetailModal'
import { projectsAPI, type Project } from '../services/api'
import { ImageWithSkeleton } from './ui/ImageWithSkeleton'
import { ProjectsGridSkeleton } from './skeletons/ProjectCardSkeleton'
import {
  getProjectDescription,
  parseMediaUrls,
  parseTechnologies,
} from '../utils/projectHelpers'

type FallbackProject = Pick<
  Project,
  'id' | 'name' | 'media_url' | 'description_key' | 'description' | 'description_en'
> & {
  technologies?: string[]
  test_link?: string
  github_link?: string
  is_github_private?: boolean
  category?: string
  media_type?: 'image' | 'video'
  index?: number
  order_index?: number
}

const FALLBACK_PROJECTS: FallbackProject[] = [
  {
    id: 1,
    name: 'Lembretes',
    description: '',
    media_url: JSON.stringify(['/img/carousel1/Lembretes1.png', '/img/carousel1/Lembretes2.png']),
    description_key: 'projects.lembretes.description',
    github_link: 'https://github.com/marcoslaine/lembretes',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    category: 'frontend',
    index: 1,
  },
  {
    id: 2,
    name: 'Prob. Poker',
    description: '',
    media_url: '/img/carousel1/Poker.png',
    description_key: 'projects.poker.description',
    category: 'frontend',
    index: 2,
  },
  {
    id: 3,
    name: 'Financiart',
    description: '',
    media_url: '/img/carousel1/financiart.png',
    description_key: 'projects.financiart.description',
    category: 'frontend',
    index: 3,
  },
  {
    id: 4,
    name: 'Memória',
    description: '',
    media_url: '/img/carousel1/memoria.png',
    description_key: 'projects.memoria.description',
    category: 'frontend',
    index: 4,
  },
  {
    id: 5,
    name: 'Tic-Tac-Toe',
    description: '',
    media_url: '/img/carousel1/tictactoe.png',
    description_key: 'projects.tictactoe.description',
    category: 'frontend',
    index: 5,
  },
  {
    id: 6,
    name: 'Controle SE',
    description: '',
    media_url: JSON.stringify([
      '/img/carousel1/controle-se1.png',
      '/img/carousel1/controle-se2.png',
      '/img/carousel1/controle-se3.png',
    ]),
    category: 'frontend',
    index: 6,
  },
  {
    id: 7,
    name: 'Habitus',
    description: '',
    media_url: JSON.stringify([
      '/img/carousel1/Habitus1.jpeg',
      '/img/carousel1/Habitus2.jpeg',
      '/img/carousel1/Habitus3.jpeg',
      '/img/carousel1/Habitus4.jpeg',
      '/img/carousel1/Habitus5.jpeg',
      '/img/carousel1/Habitus6.jpeg',
    ]),
    category: 'mobile',
    index: 7,
  },
  {
    id: 8,
    name: 'Advofind',
    description: '',
    media_url: JSON.stringify([
      '/img/carousel1/Advofind1.jpeg',
      '/img/carousel1/Advofind2.jpeg',
      '/img/carousel1/Advofind3.jpeg',
    ]),
    category: 'mobile',
    index: 8,
  },
  {
    id: 9,
    name: 'Quanto deu a conta?',
    description: '',
    media_url: JSON.stringify([
      '/img/carousel1/Quanto-deu-a-conta1.jpeg',
      '/img/carousel1/Quanto-deu-a-conta2.jpeg',
      '/img/carousel1/Quanto-deu-a-conta3.jpeg',
      '/img/carousel1/Quanto-deu-a-conta4.jpeg',
      '/img/carousel1/Quanto-deu-a-conta5.jpeg',
      '/img/carousel1/Quanto-deu-a-conta6.jpeg',
    ]),
    category: 'mobile',
    index: 9,
  },
  {
    id: 10,
    name: 'Crypto Bot',
    description: '',
    media_url: '/img/carousel1/cryptobot.png',
    category: 'mercado',
    index: 10,
  },
  {
    id: 11,
    name: 'Backtesting',
    description: '',
    media_url: '/img/carousel2/Backtesting.png',
    description_key: 'projects.backtesting.description',
    category: 'mercado',
    index: 11,
  },
  {
    id: 12,
    name: 'Relatório de Mercado',
    description: '',
    media_url: '/img/carousel2/Relatório_mercado.png',
    description_key: 'projects.market.description',
    category: 'mercado',
    index: 12,
  },
]

function toProjectDetail(
  project: Project | FallbackProject,
  t: (key: string) => string,
  language: string,
  categoryLabel?: string
): ProjectDetailData {
  return {
    id: project.id,
    name: project.name,
    description: getProjectDescription(project, t, language),
    imageUrls: parseMediaUrls(project.media_url as string),
    mediaType: ('media_type' in project && project.media_type) || 'image',
    technologies: parseTechnologies(
      'technologies' in project ? project.technologies : undefined
    ),
    testLink: 'test_link' in project ? project.test_link : undefined,
    githubLink: 'github_link' in project ? project.github_link : undefined,
    isGithubPrivate: 'is_github_private' in project ? project.is_github_private : false,
    category: categoryLabel,
  }
}

function getDisplayIndex(item: { index?: number; order_index?: number; id: number }): number {
  if (item.index !== undefined && item.index !== null) return item.index
  if (item.order_index !== undefined && item.order_index !== null) return item.order_index
  return item.id
}

function sortProjects<T extends { index?: number; order_index?: number; id: number }>(
  list: T[]
): T[] {
  return [...list].sort((a, b) => getDisplayIndex(a) - getDisplayIndex(b))
}

function mergeWithFallback(apiProjects: Project[], fallback: FallbackProject[]): (Project | FallbackProject)[] {
  if (apiProjects.length === 0) return fallback

  const apiByName = new Map(apiProjects.map((p) => [p.name.toLowerCase(), p]))
  const merged: (Project | FallbackProject)[] = fallback.map((fb) => {
    const fromApi = apiByName.get(fb.name.toLowerCase())
    if (fromApi) {
      apiByName.delete(fb.name.toLowerCase())
      return fromApi
    }
    return fb
  })

  merged.push(...apiByName.values())
  return merged
}

/** Repassa o scroll da roda/touch para a página ao chegar no topo ou fim do grid. */
function useScrollChain(scrollRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (el.scrollHeight <= el.clientHeight + 1) return

      const atTop = el.scrollTop <= 0
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        return
      }

      e.stopPropagation()
    }

    el.addEventListener('wheel', onWheel, { passive: true })
    return () => el.removeEventListener('wheel', onWheel)
  }, [scrollRef])
}

const HeroScroll = () => {
  const { t, language } = useLanguage()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<ProjectDetailData | null>(null)
  const gridScrollRef = useRef<HTMLDivElement>(null)

  useScrollChain(gridScrollRef)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsAPI.getAll()
        setProjects(data)
      } catch {
        setProjects([])
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const categoryNames: Record<string, string> = useMemo(
    () => ({
      frontend: t('projects.carousel1.title'),
      mercado: t('projects.carousel2.title'),
      mobile: 'Mobile / Apps',
      backend: 'Backend / APIs',
      fullstack: 'Full Stack',
      geral: 'Outros Projetos',
    }),
    [t]
  )

  const showcaseProjects = useMemo((): ProjectDetailData[] => {
    const source = sortProjects(mergeWithFallback(projects, FALLBACK_PROJECTS))

    return source.map((project) => {
      const category =
        'category' in project && project.category
          ? categoryNames[project.category] || project.category
          : undefined
      return toProjectDetail(project, t, language, category)
    })
  }, [projects, t, language, categoryNames])

  return (
    <section id="projects" className="relative z-10 -mt-8 md:-mt-16">
      <ContainerScroll
        titleComponent={
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-neutral-50">
            <span className="text-gradient">{t('projects.title')}</span>
          </h2>
        }
        subtitleComponent={
          <p className="text-sm md:text-base text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto">
            {t('projects.lead')}
          </p>
        }
      >
        <motion.div className="h-full min-h-0 flex flex-col">
          <motion.div
            ref={gridScrollRef}
            className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-y-auto pr-1 scrollbar-thin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
          {loading ? (
            <ProjectsGridSkeleton count={12} />
          ) : (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 pb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {showcaseProjects.map((project, index) => (
                <motion.button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`${project.name}`}
                  className="group relative rounded-2xl overflow-hidden border-2 border-slate-300/70 dark:border-white/10 bg-white dark:bg-neutral-950/90 shadow-md hover:shadow-xl hover:border-primary-500/60 dark:hover:border-amber-500/35 h-[10.5rem] sm:h-[11.5rem] md:h-[12.5rem] flex flex-col text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black transition-shadow"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.03, 0.4) }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative flex-[1.35] min-h-[6.5rem] sm:min-h-[7rem] bg-slate-50 dark:bg-black overflow-hidden">
                    <ImageWithSkeleton
                      src={project.imageUrls[0]}
                      alt={project.name}
                      loading={index < 8 ? 'eager' : 'lazy'}
                      wrapperClassName="w-full h-full"
                      className="w-full h-full object-contain p-1.5 sm:p-2 transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="shrink-0 px-3 py-2 sm:py-2.5 bg-white dark:bg-neutral-950 border-t border-slate-200 dark:border-white/10">
                    <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 dark:text-neutral-50 line-clamp-1">
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mt-1 leading-snug">
                        {project.description}
                      </p>
                    )}
                  </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </ContainerScroll>

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}

export default HeroScroll
