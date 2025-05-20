"use client"

import { useEffect } from "react"

export default function ImageLoader() {
  useEffect(() => {
    // Function to preload images
    const preloadImages = () => {
      const imagePaths = [
        // Blog images
        "/blog/destination.jpg",
        "/blog/family.jpg",
        "/blog/budget.jpg",
      ]

      // Preload images
      imagePaths.forEach((path) => {
        const img = new Image()
        img.src = path
      })
    }

    // Call the preload function
    preloadImages()
  }, [])

  return null
}
