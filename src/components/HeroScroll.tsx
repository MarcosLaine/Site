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

function toProjectDetail(
  project: Project,
  t: (key: string) => string,
  language: string,
  categoryLabel?: string
): ProjectDetailData {
  return {
    id: project.id,
    name: project.name,
    description: getProjectDescription(project, t, language),
    imageUrls: parseMediaUrls(project.media_url),
    mediaType: project.media_type || 'image',
    technologies: parseTechnologies(project.technologies),
    testLink: project.test_link,
    githubLink: project.github_link,
    isGithubPrivate: Boolean(project.is_github_private),
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
    return sortProjects(projects).map((project) => {
      const category = project.category
        ? categoryNames[project.category] || project.category
        : undefined
      return toProjectDetail(project, t, language, category)
    })
  }, [projects, t, language, categoryNames])

  const skeletonCount = 12
  const projectsCount = loading ? skeletonCount : showcaseProjects.length

  return (
    <section id="projects" className="relative z-10 -mt-8 md:-mt-16">
      <ContainerScroll
        projectsCount={projectsCount}
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
            <ProjectsGridSkeleton count={skeletonCount} />
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
