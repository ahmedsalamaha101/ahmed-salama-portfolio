"use client"

import { useEffect, useRef } from "react"

export default function PerformanceOptimization() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Lazy load images that are not in the viewport
    const lazyLoadImages = () => {
      if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement
                if (img.dataset.src) {
                  img.src = img.dataset.src
                  img.removeAttribute("data-src")
                  imageObserver.unobserve(img)
                }
              }
            })
          },
          {
            rootMargin: "200px 0px", // Start loading images 200px before they enter viewport
          },
        )

        document.querySelectorAll("img[data-src]").forEach((img) => {
          imageObserver.observe(img)
        })
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll("img[data-src]").forEach((img) => {
          const imgElement = img as HTMLImageElement
          imgElement.src = imgElement.dataset.src || imgElement.src
        })
      }
    }

    // Preload critical resources
    const preloadResources = () => {
      const preloads = [
        { href: "/ahmed-salama.png", as: "image" },
        { href: "/fonts/inter.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      ]

      preloads.forEach((resource) => {
        const link = document.createElement("link")
        link.rel = "preload"
        link.href = resource.href
        link.as = resource.as
        if (resource.type) link.type = resource.type
        if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin
        document.head.appendChild(link)
      })
    }

    // Defer non-critical JavaScript
    const deferNonCriticalJS = () => {
      // Add any non-critical scripts here
      const nonCriticalScripts = [
        // Example: { src: '/js/analytics.js', async: true, defer: true }
      ]

      nonCriticalScripts.forEach((script) => {
        const scriptEl = document.createElement("script")
        scriptEl.src = script.src
        if (script.async) scriptEl.async = true
        if (script.defer) scriptEl.defer = true

        // Add script after page load
        window.addEventListener("load", () => {
          document.body.appendChild(scriptEl)
        })
      })
    }

    // Initialize optimizations
    lazyLoadImages()
    preloadResources()
    deferNonCriticalJS()

    // Add event listeners for lazy loading on scroll
    window.addEventListener("scroll", lazyLoadImages, { passive: true })
    window.addEventListener("resize", lazyLoadImages, { passive: true })
    window.addEventListener("orientationchange", lazyLoadImages)

    // Implement requestIdleCallback for non-critical tasks
    if ("requestIdleCallback" in window) {
      // @ts-ignore
      window.requestIdleCallback(() => {
        // Run non-critical tasks when browser is idle
        document.querySelectorAll("img").forEach((img) => {
          if (!img.loading) img.loading = "lazy"
        })
      })
    }

    // Clean up
    return () => {
      window.removeEventListener("scroll", lazyLoadImages)
      window.removeEventListener("resize", lazyLoadImages)
      window.removeEventListener("orientationchange", lazyLoadImages)
    }
  }, [])

  return null
}
