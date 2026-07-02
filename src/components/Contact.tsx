import { motion } from 'framer-motion'
import { ImageWithSkeleton } from './ui/ImageWithSkeleton'
import { useLanguage } from '../context/LanguageContext'

const Contact = () => {
  const { t } = useLanguage()

  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/marcoslaine',
      icon: '/img/contact/GitHub.png',
      handle: '@marcoslaine',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/marcos-laine',
      icon: '/img/contact/Linkedin.png',
      handle: '/in/marcos-laine',
    },
    {
      name: 'Email',
      url: 'mailto:contato@marcoslaine.com',
      icon: '/img/contact/Gmail.svg',
      handle: 'contato@marcoslaine.com',
    },
  ]

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-100/50 dark:bg-black/40 relative z-10">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-center">
            <span className="text-gradient">{t('contact.title')}</span>
          </h2>
          <p className="text-center text-sm sm:text-base text-slate-600 dark:text-neutral-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            {t('contact.lead')}
          </p>

          <motion.div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {socials.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-light dark:glass p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex flex-col items-center gap-3 sm:gap-4 group isolate"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 p-0.5 shrink-0"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-2">
                    <ImageWithSkeleton
                      src={social.icon}
                      alt={social.name}
                      wrapperClassName="relative z-10 w-full h-full flex items-center justify-center"
                      className={`max-w-full max-h-full w-auto h-auto object-contain ${social.name === 'Email' ? 'scale-125' : ''}`}
                    />
                  </div>
                </motion.div>
                <div className="relative z-10 text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-neutral-100 mb-1">
                    {social.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors break-all">
                    {social.handle}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
