import * as React from 'react'
import { cn } from '@/lib/utils'

type HoverButtonVariant = 'default' | 'primary' | 'outline' | 'compact' | 'nav' | 'navbar'

type HoverButtonProps = {
  children: React.ReactNode
  href?: string
  variant?: HoverButtonVariant
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> &
  Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel' | 'download'>

const baseClasses =
  "relative isolate rounded-3xl font-medium leading-6 backdrop-blur-lg bg-[rgba(43,55,80,0.1)] cursor-pointer overflow-hidden inline-flex items-center justify-center before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none before:z-[1] before:mix-blend-multiply before:transition-transform before:duration-300 active:before:scale-[0.975] before:shadow-[inset_0_0_0_1px_rgba(170,202,255,0.2),inset_0_0_16px_0_rgba(170,202,255,0.1),inset_0_-3px_12px_0_rgba(170,202,255,0.15),0_1px_3px_0_rgba(0,0,0,0.50),0_4px_12px_0_rgba(0,0,0,0.45)]"

const variantClasses: Record<HoverButtonVariant, string> = {
  default: 'px-8 py-3 text-base text-neutral-900 dark:text-neutral-100',
  primary:
    'px-8 py-3 text-base font-semibold text-neutral-900 dark:text-white bg-[rgba(184,160,120,0.15)] dark:bg-[rgba(184,160,120,0.12)] before:shadow-[inset_0_0_0_1px_rgba(138,115,85,0.35),inset_0_0_16px_0_rgba(184,160,120,0.1),0_1px_3px_0_rgba(0,0,0,0.15),0_4px_12px_0_rgba(0,0,0,0.2)] dark:before:shadow-[inset_0_0_0_1px_rgba(212,175,120,0.35),inset_0_0_16px_0_rgba(212,175,120,0.12),inset_0_-3px_12px_0_rgba(212,175,120,0.18),0_1px_3px_0_rgba(0,0,0,0.50),0_4px_12px_0_rgba(0,0,0,0.45)]',
  outline:
    'px-8 py-3 text-base font-semibold text-neutral-900 dark:text-neutral-100 bg-transparent before:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12),0_1px_3px_0_rgba(0,0,0,0.1)] dark:before:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2),inset_0_0_12px_0_rgba(255,255,255,0.06),0_1px_3px_0_rgba(0,0,0,0.4)]',
  compact:
    'h-9 min-h-9 px-3.5 py-0 text-sm leading-none rounded-xl text-neutral-900 dark:text-neutral-100',
  nav: 'h-9 min-h-9 px-3.5 py-0 text-sm leading-none rounded-xl font-normal text-neutral-700 dark:text-neutral-200 bg-transparent before:shadow-none',
  navbar:
    'h-9 min-h-9 px-3.5 py-0 text-sm leading-none rounded-xl font-semibold text-neutral-900 dark:text-white bg-[rgba(184,160,120,0.15)] dark:bg-[rgba(184,160,120,0.12)] before:shadow-[inset_0_0_0_1px_rgba(138,115,85,0.35),inset_0_0_16px_0_rgba(184,160,120,0.1),0_1px_3px_0_rgba(0,0,0,0.15),0_4px_12px_0_rgba(0,0,0,0.2)] dark:before:shadow-[inset_0_0_0_1px_rgba(212,175,120,0.35),inset_0_0_16px_0_rgba(212,175,120,0.12),inset_0_-3px_12px_0_rgba(212,175,120,0.18),0_1px_3px_0_rgba(0,0,0,0.50),0_4px_12px_0_rgba(0,0,0,0.45)]',
}

const HoverButton = React.forwardRef<HTMLButtonElement, HoverButtonProps>(
  ({ className, children, href, variant = 'default', type = 'button', ...props }, ref) => {
    const elementRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | null>(null)
    const [isListening, setIsListening] = React.useState(false)
    const [circles, setCircles] = React.useState<
      Array<{
        id: number
        x: number
        y: number
        color: string
        fadeState: 'in' | 'out' | null
      }>
    >([])
    const lastAddedRef = React.useRef(0)

    React.useImperativeHandle(ref, () => elementRef.current as HTMLButtonElement)

    const setRefs = React.useCallback((node: HTMLButtonElement | HTMLAnchorElement | null) => {
      elementRef.current = node
    }, [])

    const createCircle = React.useCallback((x: number, y: number) => {
      const buttonWidth = elementRef.current?.offsetWidth || 0
      const xPos = buttonWidth ? x / buttonWidth : 0
      const color = `linear-gradient(to right, var(--circle-start) ${xPos * 100}%, var(--circle-end) ${
        xPos * 100
      }%)`

      setCircles((prev) => [...prev, { id: Date.now(), x, y, color, fadeState: null }])
    }, [])

    const handlePointerMove = React.useCallback(
      (event: React.PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (!isListening) return

        const currentTime = Date.now()
        if (currentTime - lastAddedRef.current > 100) {
          lastAddedRef.current = currentTime
          const rect = event.currentTarget.getBoundingClientRect()
          createCircle(event.clientX - rect.left, event.clientY - rect.top)
        }
      },
      [isListening, createCircle]
    )

    React.useEffect(() => {
      circles.forEach((circle) => {
        if (!circle.fadeState) {
          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) => (c.id === circle.id ? { ...c, fadeState: 'in' } : c))
            )
          }, 0)

          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) => (c.id === circle.id ? { ...c, fadeState: 'out' } : c))
            )
          }, 1000)

          setTimeout(() => {
            setCircles((prev) => prev.filter((c) => c.id !== circle.id))
          }, 2200)
        }
      })
    }, [circles])

    const sharedClassName = cn(baseClasses, variantClasses[variant], className)

    const sharedStyle = {
      '--circle-start': '#d4c4a8',
      '--circle-end': '#8a7355',
    } as React.CSSProperties

    const pointerHandlers = {
      onPointerMove: handlePointerMove,
      onPointerEnter: () => setIsListening(true),
      onPointerLeave: () => setIsListening(false),
    }

    const content = (
      <>
        {circles.map(({ id, x, y, color, fadeState }) => (
          <div
            key={id}
            className={cn(
              'absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full',
              'blur-lg pointer-events-none z-[-1] transition-opacity duration-300',
              fadeState === 'in' && 'opacity-75',
              fadeState === 'out' && 'opacity-0 duration-[1.2s]',
              !fadeState && 'opacity-0'
            )}
            style={{ left: x, top: y, background: color }}
          ></div>
        ))}
        <span className="relative z-[2]">{children}</span>
      </>
    )

    if (href) {
      const { onClick, ...anchorProps } = props
      return (
        <a
          ref={setRefs as React.Ref<HTMLAnchorElement>}
          href={href}
          className={sharedClassName}
          style={sharedStyle}
          {...pointerHandlers}
          {...(anchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        ref={setRefs}
        type={type}
        className={sharedClassName}
        style={sharedStyle}
        {...pointerHandlers}
        {...props}
      >
        {content}
      </button>
    )
  }
)

HoverButton.displayName = 'HoverButton'

export { HoverButton }
