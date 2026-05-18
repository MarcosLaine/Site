import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import About from './components/About'
import PageSkeleton from './components/skeletons/PageSkeleton'
import { usePageReady } from './hooks/usePageReady'
import { DottedSurface } from '@/components/ui/dotted-surface'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import HeroScroll from './components/HeroScroll'
import Navbar from './components/Navbar'
import Skills from './components/Skills'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  const pageReady = usePageReady()
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme')
    return (saved as 'dark' | 'light') || 'dark'  // Padrão: dark
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.body.classList.remove('dark', 'light')
    document.body.classList.add(theme)
    localStorage.setItem('theme', theme)
    
    // Garantir que inicie sempre no dark se não houver preferência salva
    if (!localStorage.getItem('theme')) {
      document.body.classList.add('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen relative overflow-hidden">
        <DottedSurface theme={theme} />
        {pageReady && <Navbar theme={theme} toggleTheme={toggleTheme} />}
        
        <AnimatePresence mode="wait">
          {!pageReady ? (
            <div className="relative z-10">
              <PageSkeleton key="skeleton" />
            </div>
          ) : (
            <motion.main
              key="content"
              className="relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Hero />
              <HeroScroll />
              <About />
              <Skills />
              <Contact />
            </motion.main>
          )}
        </AnimatePresence>
        
        {pageReady && <Footer />}
      </div>
    </LanguageProvider>
  )
}

export default App

