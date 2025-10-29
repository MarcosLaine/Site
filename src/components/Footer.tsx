import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="py-8 border-t border-white/10 dark:border-white/10 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-slate-400 dark:text-slate-400">
            {t('footer.copyright')}
          </p>
          <motion.div
            className="mt-4 flex justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

