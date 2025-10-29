import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const Contact = () => {
  const { t } = useLanguage()

  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/marcoslaine',
      icon: 'img/contact/GitHub.png',
      handle: '@marcoslaine'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/marcos-laine',
      icon: 'img/contact/Linkedin.png',
      handle: '/in/marcos-laine'
    },
    {
      name: 'Email',
      url: 'mailto:marcospslaine@gmail.com',
      icon: 'img/contact/Gmail.png',
      handle: 'marcospslaine@gmail.com'
    }
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30 dark:bg-slate-900/30 relative z-10">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
            <span className="text-gradient">{t('contact.title')}</span>
          </h2>
          <p className="text-center text-slate-400 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            {t('contact.lead')}
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {socials.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass dark:glass p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex flex-col items-center gap-4 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 p-0.5"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full h-full rounded-full bg-slate-900 dark:bg-slate-900 flex items-center justify-center">
                    <img src={social.icon} alt={social.name} className="w-8 h-8" />
                  </div>
                </motion.div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-100 dark:text-slate-100 mb-1">
                    {social.name}
                  </h3>
                  <p className="text-sm text-slate-400 dark:text-slate-400 group-hover:text-primary-400 transition-colors">
                    {social.handle}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact

