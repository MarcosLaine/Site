import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { projectsAPI } from '../services/api'

interface Project {
  id: number
  name: string
  description: string
  media_url: string
  media_type: 'image' | 'video'
  test_link?: string
  github_link?: string
  is_github_private: boolean
  category: string
}

const Projects = () => {
  const { t } = useLanguage()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const data = await projectsAPI.getAll()
        setProjects(data)
        setError(null)
      } catch (err) {
        setError('Erro ao carregar projetos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Agrupar projetos por categoria automaticamente
  const projectsByCategory = projects.reduce((acc, project) => {
    const category = project.category || 'geral'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(project)
    return acc
  }, {} as Record<string, Project[]>)

  // Mapear nomes das categorias
  const categoryNames: Record<string, string> = {
    'frontend': t('projects.carousel1.title'),
    'mercado': t('projects.carousel2.title'),
    'mobile': 'Mobile / Apps',
    'backend': 'Backend / APIs',
    'fullstack': 'Full Stack',
    'geral': 'Outros Projetos'
  }

  if (loading) {
    return (
      <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-slate-900/30 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Carregando projetos...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-slate-900/30 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-red-500 dark:text-red-400">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-slate-900/30 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-center">
            <span className="text-gradient">{t('projects.title')}</span>
          </h2>
          <p className="text-center text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            {t('projects.lead')}
          </p>

          {/* Carrosséis dinâmicos - aparecem automaticamente conforme categorias no banco */}
          {Object.entries(projectsByCategory).map(([category, categoryProjects], index) => (
            <Carousel 
              key={category}
              title={categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1)}
              projects={categoryProjects}
              delay={index * 0.2}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

interface CarouselProps {
  title: string
  projects: Project[]
  delay: number
}

const Carousel = ({ title, projects, delay }: CarouselProps) => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`carousel-${title}`)
    if (container) {
      const scrollAmount = 320
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount)
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' })
      setScrollPosition(newPosition)
    }
  }

  return (
    <motion.div
      className="mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
        <div className="flex gap-1 sm:gap-2">
          <motion.button
            onClick={() => handleScroll('left')}
            className="p-1.5 sm:p-2 text-lg sm:text-xl rounded-lg glass-light dark:glass hover:bg-slate-200/50 dark:hover:bg-white/20 transition-colors text-slate-800 dark:text-slate-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous"
          >
            ‹
          </motion.button>
          <motion.button
            onClick={() => handleScroll('right')}
            className="p-1.5 sm:p-2 text-lg sm:text-xl rounded-lg glass-light dark:glass hover:bg-slate-200/50 dark:hover:bg-white/20 transition-colors text-slate-800 dark:text-slate-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next"
          >
            ›
          </motion.button>
        </div>
      </div>

      <div
        id={`carousel-${title}`}
        className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      className="min-w-[240px] xs:min-w-[260px] sm:min-w-[300px] md:min-w-[320px] glass-light dark:glass rounded-xl sm:rounded-2xl overflow-hidden shadow-xl flex flex-col"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
    >
      <div className="relative h-36 sm:h-44 md:h-48 overflow-hidden bg-slate-200 dark:bg-slate-800/50">
        {project.media_type === 'video' ? (
          <video
            src={project.media_url}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
            onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
          />
        ) : (
          <motion.img
            src={project.media_url}
            alt={project.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
      <div className="p-4 sm:p-5 space-y-2 flex-1 flex flex-col">
        <h4 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100">
          {project.name}
        </h4>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 flex-1">
          {project.description}
        </p>
        
        {/* Links */}
        {(project.test_link || (project.github_link && !project.is_github_private)) && (
          <div className="flex gap-2 pt-2">
            {project.test_link && (
              <motion.a
                href={project.test_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs sm:text-sm rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors flex-1 text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 Demo
              </motion.a>
            )}
            {project.github_link && !project.is_github_private && (
              <motion.a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs sm:text-sm rounded-lg border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium transition-colors flex-1 text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                💻 GitHub
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Projects

