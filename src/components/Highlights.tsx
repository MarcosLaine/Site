import { motion } from 'framer-motion'
import { SectionHeading } from './ui/section-heading'
import { useLanguage } from '../context/LanguageContext'
import { highlights, recommendations } from '../data/profile'

const Highlights = () => {
  const { t, language } = useLanguage()
  const items = highlights[language]

  return (
    <section id="highlights" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading eyebrow={t('highlights.eyebrow')} title={t('highlights.title')} />

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              className="glass-light dark:glass p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-200/70">
                {item.kind}
              </p>
              <h3 className="mt-2 text-base sm:text-lg font-semibold leading-snug text-slate-900 dark:text-neutral-100">
                {item.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-neutral-400">{item.meta}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-neutral-300 flex-1">
                {item.description}
              </p>
              {item.link && (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-800 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-100 transition-colors"
                >
                  {item.link.label}
                  <span aria-hidden>→</span>
                </a>
              )}
            </motion.article>
          ))}
        </div>

        <motion.h3
          className="text-xl sm:text-2xl font-semibold mt-12 sm:mt-16 mb-6 text-center text-slate-800 dark:text-neutral-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('highlights.recommendations')}
        </motion.h3>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {recommendations.map((rec, index) => (
            <motion.figure
              key={rec.author}
              className="glass-light dark:glass p-5 sm:p-7 rounded-2xl shadow-xl flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-4xl leading-none text-amber-600/70 dark:text-amber-200/40 font-serif" aria-hidden>
                “
              </span>
              <blockquote lang="en" className="mt-1 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-neutral-200 flex-1">
                {rec.quote}
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-slate-900 dark:text-neutral-100">{rec.author}</span>
                <span className="text-slate-500 dark:text-neutral-400"> · {t('highlights.recommendationSource')}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Highlights
