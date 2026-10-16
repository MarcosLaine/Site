import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
}

export const SectionHeading = ({ eyebrow, title, lead }: SectionHeadingProps) => (
  <motion.div
    className="text-center mb-8 sm:mb-12"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {eyebrow && (
      <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-200/70">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
      <span className="text-gradient">{title}</span>
    </h2>
    {lead && (
      <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto">{lead}</p>
    )}
  </motion.div>
)
