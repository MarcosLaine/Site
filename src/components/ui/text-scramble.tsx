import { type ElementType, useCallback, useEffect, useRef, useState } from 'react'
import { motion, type MotionProps } from 'framer-motion'

type TextScrambleProps = {
  children: string
  duration?: number
  speed?: number
  characterSet?: string
  as?: ElementType
  className?: string
  trigger?: boolean
  onScrambleComplete?: () => void
} & MotionProps

const defaultChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const motionByTag = {
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
  div: motion.div,
} as const

type MotionTag = keyof typeof motionByTag

function resolveMotionComponent(as: ElementType) {
  if (typeof as === 'string' && as in motionByTag) {
    return motionByTag[as as MotionTag]
  }
  return motion(as)
}

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Component = 'p',
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = resolveMotionComponent(Component)
  const [displayText, setDisplayText] = useState(children)
  const isAnimatingRef = useRef(false)

  const scramble = useCallback(async () => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true

    const text = children
    const steps = duration / speed
    let step = 0

    const interval = setInterval(() => {
      let scrambled = ''
      const progress = step / steps

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          scrambled += ' '
          continue
        }

        if (progress * text.length > i) {
          scrambled += text[i]
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)]
        }
      }

      setDisplayText(scrambled)
      step++

      if (step > steps) {
        clearInterval(interval)
        setDisplayText(text)
        isAnimatingRef.current = false
        onScrambleComplete?.()
      }
    }, speed * 1000)
  }, [children, characterSet, duration, onScrambleComplete, speed])

  useEffect(() => {
    if (!trigger) return
    setDisplayText(children)
    scramble()
  }, [trigger, children, scramble])

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  )
}
