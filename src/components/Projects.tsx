import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useState } from 'react'

interface Project {
  title: string
  description: string
  image: string
}

const Projects = () => {
  const { t } = useLanguage()

  const carousel1: Project[] = [
    {
      title: t('projects.lembretes.title'),
      description: t('projects.lembretes.description'),
      image: 'img/carousel1/Lembretes.png'
    },
    {
      title: t('projects.poker.title'),
      description: t('projects.poker.description'),
      image: 'img/carousel1/Poker.png'
    },
    {
      title: t('projects.financiart.title'),
      description: t('projects.financiart.description'),
      image: 'img/carousel1/financiart.png'
    },
    {
      title: t('projects.memoria.title'),
      description: t('projects.memoria.description'),
      image: 'img/carousel1/memoria.png'
    },
    {
      title: t('projects.tictactoe.title'),
      description: t('projects.tictactoe.description'),
      image: 'img/carousel1/tictactoe.png'
    }
  ]

  const carousel2: Project[] = [
    {
      title: t('projects.backtesting.title'),
      description: t('projects.backtesting.description'),
      image: 'img/carousel2/Backtesting.png'
    },
    {
      title: t('projects.market.title'),
      description: t('projects.market.description'),
      image: 'img/carousel2/Relatório_mercado.png'
    }
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30 dark:bg-slate-900/30 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
            <span className="text-gradient">{t('projects.title')}</span>
          </h2>
          <p className="text-center text-slate-400 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            {t('projects.lead')}
          </p>

          {/* Carousel 1 */}
          <Carousel title={t('projects.carousel1.title')} projects={carousel1} delay={0} />

          {/* Carousel 2 */}
          <Carousel title={t('projects.carousel2.title')} projects={carousel2} delay={0.2} />
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
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-slate-200 dark:text-slate-200">{title}</h3>
        <div className="flex gap-2">
          <motion.button
            onClick={() => handleScroll('left')}
            className="p-2 rounded-lg glass dark:glass hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous"
          >
            ‹
          </motion.button>
          <motion.button
            onClick={() => handleScroll('right')}
            className="p-2 rounded-lg glass dark:glass hover:bg-white/20 transition-colors"
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
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
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
      className="min-w-[280px] sm:min-w-[320px] glass dark:glass rounded-2xl overflow-hidden shadow-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
    >
      <div className="relative h-48 overflow-hidden bg-slate-800/50">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-5 space-y-2">
        <h4 className="text-xl font-semibold text-slate-100 dark:text-slate-100">
          {project.title}
        </h4>
        <p className="text-slate-400 dark:text-slate-400">
          {project.description}
        </p>
      </div>
    </motion.div>
  )
}

export default Projects

