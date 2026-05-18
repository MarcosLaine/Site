import { cn } from '@/lib/utils'
import { type ComponentProps, useEffect, useRef } from 'react'
import * as THREE from 'three'

type DottedSurfaceProps = Omit<ComponentProps<'div'>, 'ref'> & {
  theme?: 'dark' | 'light'
}

const SCROLL_IDLE_MS = 160
const WAVE_SPEED = 0.028
const WAVE_AMP = 50

export function DottedSurface({
  className,
  theme = 'dark',
  ...props
}: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const SEPARATION = 150
    const AMOUNTX = 40
    const AMOUNTY = 60
    const isDark = theme === 'dark'

    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(isDark ? 0x050505 : 0xfafaf9, 800, 14000)

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000)
    camera.position.set(0, 355, 1220)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)

    const canvas = renderer.domElement
    canvas.style.display = 'block'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    container.appendChild(canvas)

    const positions: number[] = []
    const colors: number[] = []
    const dotColor = isDark ? [180, 160, 130] : [0, 0, 0]

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2
        positions.push(x, 0, z)
        colors.push(dotColor[0], dotColor[1], dotColor[2])
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: isDark ? 7 : 9,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.65 : 0.9,
      sizeAttenuation: true,
    })

    scene.add(new THREE.Points(geometry, material))

    let count = 0
    let animationId = 0
    let isScrolling = false
    let scrollIdleTimer: ReturnType<typeof setTimeout> | undefined

    const applyWaves = (positionArray: Float32Array) => {
      let i = 0
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3
          positionArray[index + 1] =
            Math.sin((ix + count) * 0.3) * WAVE_AMP +
            Math.sin((iy + count) * 0.5) * WAVE_AMP
          i++
        }
      }
      count += WAVE_SPEED
    }

    const handleScroll = () => {
      isScrolling = true
      if (scrollIdleTimer) clearTimeout(scrollIdleTimer)
      scrollIdleTimer = setTimeout(() => {
        isScrolling = false
      }, SCROLL_IDLE_MS)
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const positionAttribute = geometry.attributes.position
      const positionArray = positionAttribute.array as Float32Array

      if (isScrolling) {
        applyWaves(positionArray)
        positionAttribute.needsUpdate = true
      }

      renderer.render(scene, camera)
    }

    const handleResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)
    window.addEventListener('resize', handleResize)

    animate()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      resizeObserver.disconnect()
      if (scrollIdleTimer) clearTimeout(scrollIdleTimer)
      cancelAnimationFrame(animationId)

      geometry.dispose()
      material.dispose()
      renderer.dispose()

      if (container.contains(canvas)) {
        container.removeChild(canvas)
      }
    }
  }, [theme])

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none fixed inset-0 z-[1] h-dvh w-full', className)}
      aria-hidden
      {...props}
    />
  )
}
