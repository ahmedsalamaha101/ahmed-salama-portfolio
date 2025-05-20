"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface IntersectionObserverProps {
  children: ReactNode
  onIntersect?: () => void
  rootMargin?: string
  threshold?: number
  triggerOnce?: boolean
  className?: string
}

export default function IntersectionObserver({
  children,
  onIntersect,
  rootMargin = "0px",
  threshold = 0.1,
  triggerOnce = true,
  className = "",
}: IntersectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isIntersected, setIsIntersected] = useState(false)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !isIntersected)) {
          setIsIntersected(true)
          if (onIntersect) {
            onIntersect()
          }
        }
      },
      {
        rootMargin,
        threshold,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [onIntersect, rootMargin, threshold, triggerOnce, isIntersected])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
