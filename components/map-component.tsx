"use client"

import { useEffect, useRef } from "react"

interface MapComponentProps {
  address: string
  zoom?: number
  height?: string
}

export default function MapComponent({ address, zoom = 15, height = "300px" }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is a placeholder for a real map implementation
    // In a real implementation, you would use a library like Google Maps, Mapbox, or Leaflet
    if (mapRef.current) {
      const mapElement = mapRef.current

      // Add a placeholder map image
      mapElement.innerHTML = `
        <div class="relative w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="text-gray-500 dark:text-gray-400">Interactive Map - ${address}</p>
          </div>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114432.65960258107!2d33.76002563786173!3d27.25718715642991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14528424c1098e45%3A0x4dd5e86b4442a90e!2sHurghada%2C%20Red%20Sea%20Governorate%2C%20Egypt!5e0!3m2!1sen!2sus!4v1712798400000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      `
    }
  }, [address])

  return <div ref={mapRef} className="w-full" style={{ height }} />
}
