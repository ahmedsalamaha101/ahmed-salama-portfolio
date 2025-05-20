"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin } from "lucide-react"
import AnimatedSection from "./animated-section"
import { useLanguage } from "@/lib/i18n/language-context"

interface Destination {
  id: string
  name: string
  coordinates: [number, number] // [x, y] as percentage of container
  description: string
  image: string
  category: "popular" | "upcoming" | "recommended"
  rating: number
}

export default function InteractiveDestinationsMap() {
  const { t } = useLanguage()
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null)
  const [filter, setFilter] = useState<"all" | "popular" | "upcoming" | "recommended">("all")
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 })

  // Sample destinations data
  const destinations: Destination[] = [
    {
      id: "egypt",
      name: t("destination_egypt"),
      coordinates: [53, 42], // x, y as percentage
      description: t("destination_egypt_desc"),
      image: "/destinations/egypt.jpg",
      category: "popular",
      rating: 4.8,
    },
    {
      id: "dubai",
      name: t("destination_dubai"),
      coordinates: [62, 40],
      description: t("destination_dubai_desc"),
      image: "/destinations/dubai.jpg",
      category: "popular",
      rating: 4.9,
    },
    {
      id: "turkey",
      name: t("destination_turkey"),
      coordinates: [57, 35],
      description: t("destination_turkey_desc"),
      image: "/destinations/turkey.jpg",
      category: "popular",
      rating: 4.7,
    },
    {
      id: "maldives",
      name: t("destination_maldives"),
      coordinates: [70, 50],
      description: t("destination_maldives_desc"),
      image: "/destinations/maldives.jpg",
      category: "recommended",
      rating: 4.9,
    },
    {
      id: "morocco",
      name: t("destination_morocco"),
      coordinates: [45, 40],
      description: t("destination_morocco_desc"),
      image: "/destinations/morocco.jpg",
      category: "upcoming",
      rating: 4.6,
    },
    {
      id: "saudi",
      name: t("destination_saudi"),
      coordinates: [60, 42],
      description: t("destination_saudi_desc"),
      image: "/destinations/saudi.jpg",
      category: "upcoming",
      rating: 4.5,
    },
    {
      id: "jordan",
      name: t("destination_jordan"),
      coordinates: [58, 39],
      description: t("destination_jordan_desc"),
      image: "/destinations/jordan.jpg",
      category: "recommended",
      rating: 4.7,
    },
  ]

  // Update map dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (mapRef.current) {
        setMapDimensions({
          width: mapRef.current.offsetWidth,
          height: mapRef.current.offsetHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Filter destinations based on selected category
  const filteredDestinations = filter === "all" ? destinations : destinations.filter((dest) => dest.category === filter)

  return (
    <section id="destinations-map" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex justify-center mb-12">
            <h2 className="section-title">{t("destinations_map_title")}</h2>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t("all_destinations")}
            </button>
            <button
              onClick={() => setFilter("popular")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "popular"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t("popular_destinations")}
            </button>
            <button
              onClick={() => setFilter("upcoming")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "upcoming"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t("upcoming_destinations")}
            </button>
            <button
              onClick={() => setFilter("recommended")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "recommended"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t("recommended_destinations")}
            </button>
          </div>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="relative" ref={mapRef} style={{ height: "500px" }}>
                {/* World Map Background */}
                <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20">
                  <img
                    src="/world-map.svg"
                    alt="World Map"
                    className="w-full h-full object-cover opacity-30 dark:opacity-20"
                  />
                </div>

                {/* Destination Pins */}
                {filteredDestinations.map((destination) => (
                  <button
                    key={destination.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{
                      left: `${destination.coordinates[0]}%`,
                      top: `${destination.coordinates[1]}%`,
                    }}
                    onClick={() => setActiveDestination(destination)}
                    aria-label={`View ${destination.name}`}
                  >
                    <div className="relative">
                      <MapPin
                        className={`h-8 w-8 ${
                          destination.category === "popular"
                            ? "text-red-500"
                            : destination.category === "upcoming"
                              ? "text-amber-500"
                              : "text-green-500"
                        } drop-shadow-md transition-transform group-hover:scale-125`}
                      />
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-ping" />
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {destination.name}
                    </div>
                  </button>
                ))}

                {/* Active Destination Info */}
                {activeDestination && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex gap-4 animate-fadeIn">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      onClick={() => setActiveDestination(null)}
                      aria-label="Close"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div className="w-24 h-24 shrink-0 rounded-md overflow-hidden">
                      <img
                        src={activeDestination.image || "/placeholder.svg"}
                        alt={activeDestination.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{activeDestination.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(activeDestination.rating)
                                  ? "text-yellow-500"
                                  : i < activeDestination.rating
                                    ? "text-yellow-500"
                                    : "text-gray-300 dark:text-gray-600"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          {activeDestination.rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{activeDestination.description}</p>
                      <button className="mt-2 text-primary text-sm font-medium flex items-center hover:underline">
                        {t("learn_more")}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-center gap-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{t("popular_destinations")}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{t("upcoming_destinations")}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{t("recommended_destinations")}</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t("destinations_map_description")}</p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
