import { motion } from 'framer-motion'
import { HoverButton } from '@/components/ui/hover-button'
import SkyToggle from '@/components/ui/sky-toggle'
import { useLanguage } from '../context/LanguageContext'

interface NavbarProps {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt')
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        theme === 'dark' ? 'glass' : 'glass-light'
      } shadow-lg`}
    >
      <nav className="container mx-auto px-3 sm:px-6 lg:px-8 py-3">
        <motion.div className="flex items-center justify-between gap-4">
          <motion.a
            href="#top"
            className="text-xl sm:text-2xl font-bold shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
              Marcos
            </span>
            <span className="text-gradient">Laine</span>
          </motion.a>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5">
              {['about', 'projects', 'skills', 'contact'].map((item) => (
                <HoverButton key={item} href={`#${item}`} variant="nav">
                  {t(`nav.${item}`)}
                </HoverButton>
              ))}
            </div>

            <HoverButton
              type="button"
              variant="compact"
              onClick={toggleLanguage}
              aria-label="Toggle language"
            >
              <span className="hidden xs:inline">🌐 </span>
              {language.toUpperCase()}
            </HoverButton>

            <SkyToggle
              size="sm"
              checked={theme === 'dark'}
              onCheckedChange={() => toggleTheme()}
              aria-label="Toggle theme"
            />

            <HoverButton
              href={`/docs/Marcos_Laine_QA_${language.toUpperCase()}.pdf`}
              download
              variant="navbar"
              className="hidden xs:inline-flex"
            >
              📄 <span className="hidden sm:inline ml-1">{t('nav.downloadCV')}</span>
            </HoverButton>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}

export default Navbar
