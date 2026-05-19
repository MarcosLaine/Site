import React, { useRef } from 'react'
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'

type Layout = {
  isMobile: boolean
  cols: number
  rowRem: number
  gapRem: number
  maxCardRem: number
  minCardRem: number
  outerExtraRem: number
}

const computeLayout = (width: number): Layout => {
  const isMobile = width <= 768
  const isSmall = width < 640
  const cols = isSmall ? 2 : 3
  let rowRem: number
  let gapRem: number
  if (isSmall) {
    rowRem = 10.5
    gapRem = 0.75
  } else if (width < 768) {
    rowRem = 11.5
    gapRem = 0.75
  } else {
    rowRem = 12.5
    gapRem = 1
  }
  return {
    isMobile,
    cols,
    rowRem,
    gapRem,
    maxCardRem: isMobile ? 40 : 54,
    minCardRem: isMobile ? 16 : 20,
    outerExtraRem: isMobile ? 25 : 31,
  }
}

const DEFAULT_LAYOUT: Layout = {
  isMobile: false,
  cols: 3,
  rowRem: 12.5,
  gapRem: 1,
  maxCardRem: 54,
  minCardRem: 20,
  outerExtraRem: 31,
}

export const ContainerScroll = ({
  titleComponent,
  subtitleComponent,
  children,
  projectsCount = 0,
}: {
  titleComponent: string | React.ReactNode
  subtitleComponent?: React.ReactNode
  children: React.ReactNode
  projectsCount?: number
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })
  const [layout, setLayout] = React.useState<Layout>(DEFAULT_LAYOUT)

  React.useEffect(() => {
    const update = () => setLayout(computeLayout(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
    }
  }, [])

  const { isMobile, cols, rowRem, gapRem, maxCardRem, minCardRem, outerExtraRem } = layout

  const safeCount = Math.max(projectsCount, 1)
  const rows = Math.ceil(safeCount / cols)
  const estimatedContentRem = rows * rowRem + Math.max(0, rows - 1) * gapRem + 1
  const cardRem = Math.min(Math.max(estimatedContentRem, minCardRem), maxCardRem)
  const containerRem = cardRem + outerExtraRem

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1]
  }

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <motion.div
      className="flex items-center justify-center relative p-2 md:p-20 transition-[height] duration-500 ease-out"
      ref={containerRef}
      style={{ height: `${containerRem}rem` }}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: '1000px',
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        {subtitleComponent && (
          <div className="max-w-5xl mx-auto text-center relative z-10 px-2 pb-6 md:pb-10">
            {subtitleComponent}
          </div>
        )}
        <Card rotate={rotate} scale={scale} heightRem={cardRem}>
          {children}
        </Card>
      </div>
    </motion.div>
  )
}

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: string | React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center relative z-10 px-2"
    >
      {titleComponent}
    </motion.div>
  )
}

export const Card = ({
  rotate,
  scale,
  heightRem,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  heightRem?: number
  children: React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        height: heightRem ? `${heightRem}rem` : undefined,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="max-w-6xl mt-2 md:mt-4 mx-auto w-full border-4 border-primary-500/30 p-1.5 md:p-3 bg-neutral-100 dark:bg-black/90 rounded-[30px] shadow-2xl relative z-0 transition-[height] duration-500 ease-out"
    >
      <motion.div className="h-full w-full min-h-0 flex flex-col overflow-hidden rounded-2xl bg-neutral-200/90 dark:bg-neutral-950/95 md:rounded-2xl p-1.5 md:p-2">
        {children}
      </motion.div>
    </motion.div>
  )
}
