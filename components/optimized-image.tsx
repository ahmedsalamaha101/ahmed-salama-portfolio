"use client"

import { useState, useEffect } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
}

export default function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = "",
  priority = false,
  objectFit = "cover",
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [loading, setLoading] = useState(true)

  // Reset loading state when src changes
  useEffect(() => {
    setImgSrc(src)
    setLoading(true)
  }, [src])

  // Handle image load error
  const handleError = () => {
    setImgSrc(`/placeholder.svg?height=${height}&width=${width}`)
  }

  // Handle image load success
  const handleLoad = () => {
    setLoading(false)
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse">
          <svg
            className="w-10 h-10 text-gray-400 dark:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      <img
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        onError={handleError}
        onLoad={handleLoad}
        className={`${className} ${loading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}`}
        style={{ objectFit }}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  )
}
