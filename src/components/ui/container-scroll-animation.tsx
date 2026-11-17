import React from 'react'

type Layout = {
  cols: number
  rowRem: number
  gapRem: number
  maxCardRem: number
  minCardRem: number
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
    cols,
    rowRem,
    gapRem,
    maxCardRem: isMobile ? 40 : 54,
    minCardRem: isMobile ? 16 : 20,
  }
}

const DEFAULT_LAYOUT: Layout = {
  cols: 3,
  rowRem: 12.5,
  gapRem: 1,
  maxCardRem: 54,
  minCardRem: 20,
}

/** Quadro dos projetos: título, subtítulo e um card com altura ajustada ao número de projetos. */
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
  const [layout, setLayout] = React.useState<Layout>(DEFAULT_LAYOUT)

  React.useEffect(() => {
    const update = () => setLayout(computeLayout(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
    }
  }, [])

  const { cols, rowRem, gapRem, maxCardRem, minCardRem } = layout

  const safeCount = Math.max(projectsCount, 1)
  const rows = Math.ceil(safeCount / cols)
  const estimatedContentRem = rows * rowRem + Math.max(0, rows - 1) * gapRem + 1
  const cardRem = Math.min(Math.max(estimatedContentRem, minCardRem), maxCardRem)

  return (
    <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center relative z-10 px-2">{titleComponent}</div>
      {subtitleComponent && (
        <div className="max-w-5xl mx-auto text-center relative z-10 px-2 pt-3 pb-6 md:pb-10">
          {subtitleComponent}
        </div>
      )}
      <Card heightRem={cardRem}>{children}</Card>
    </div>
  )
}

export const Card = ({
  heightRem,
  children,
}: {
  heightRem?: number
  children: React.ReactNode
}) => {
  return (
    <div
      style={{
        height: heightRem ? `${heightRem}rem` : undefined,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="max-w-6xl mt-2 md:mt-4 mx-auto w-full border-4 border-primary-500/30 p-1.5 md:p-3 bg-neutral-100 dark:bg-black/90 rounded-[30px] shadow-2xl relative z-0 transition-[height] duration-500 ease-out"
    >
      <div className="h-full w-full min-h-0 flex flex-col overflow-hidden rounded-2xl bg-neutral-200/90 dark:bg-neutral-950/95 md:rounded-2xl p-1.5 md:p-2">
        {children}
      </div>
    </div>
  )
}
