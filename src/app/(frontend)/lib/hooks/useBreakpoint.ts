'use client'

import { useEffect, useState } from 'react'
import { BREAKPOINTS, Breakpoint } from '@/cssVariables'

export function useBreakpoint(bp: Breakpoint) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const query = `(min-width: ${BREAKPOINTS[bp]}px)`
    const media = window.matchMedia(query)

    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    media.addEventListener?.('change', listener)
    media.addListener?.(listener)

    return () => {
      media.removeEventListener?.('change', listener)
      media.removeListener?.(listener)
    }
  }, [bp])

  return matches
}
