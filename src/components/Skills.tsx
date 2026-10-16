import { motion } from 'framer-motion'
import { ImageWithSkeleton } from './ui/ImageWithSkeleton'
import { SectionHeading } from './ui/section-heading'
import { useLanguage } from '../context/LanguageContext'
import { skillGroups, tools } from '../data/profile'

const Skills = () => {
  const { t, language } = useLanguage()
  const groups = skillGroups[language]

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading eyebrow={t('skills.eyebrow')} title={t('skills.title')} />

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              className="glass-light dark:glass p-5 sm:p-6 rounded-2xl shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-neutral-100 mb-4">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-amber-100/70 text-amber-950 border border-amber-800/10 dark:bg-amber-200/[0.07] dark:text-amber-50/90 dark:border-amber-200/10"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.h3
          className="text-lg sm:text-xl font-semibold mb-5 sm:mb-6 text-center text-slate-800 dark:text-neutral-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('skills.tools')}
        </motion.h3>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              {tool.icon ? (
                <ImageWithSkeleton
                  src={tool.icon}
                  alt=""
                  wrapperClassName="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                />
              ) : (
                <span
                  className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 rounded-full bg-slate-900 text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center"
                  aria-hidden
                >
                  {tool.name[0]}
                </span>
              )}
              <span className="text-xs sm:text-sm font-medium text-slate-900">{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
