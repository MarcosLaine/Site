import { useEffect, useState } from 'react'

const MAX_WAIT_MS = 2500

export function usePageReady() {
  const [ready, setReady] = useState(
    () => typeof document !== 'undefined' && document.readyState === 'complete'
  )

  useEffect(() => {
    if (ready) return

    const finish = () => setReady(true)

    if (document.readyState === 'complete') {
      finish()
      return
    }

    window.addEventListener('load', finish)
    const timeout = window.setTimeout(finish, MAX_WAIT_MS)

    return () => {
      window.removeEventListener('load', finish)
      window.clearTimeout(timeout)
    }
  }, [ready])

  return ready
}
