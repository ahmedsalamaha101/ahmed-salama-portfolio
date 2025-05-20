"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import AnimatedSection from "./animated-section"
import { useLanguage } from "@/lib/i18n/language-context"

interface Review {
  id: string
  name: string
  avatar: string
  location: string
  date: string
  rating: number
  title: string
  text: string
  trip: string
  verified: boolean
}

export default function FeaturedReviews() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const reviews: Review[] = [
    {
      id: "review1",
      name: t("review_1_name"),
      avatar: "/reviews/avatar1.jpg",
      location: t("review_1_location"),
      date: t("review_1_date"),
      rating: 5,
      title: t("review_1_title"),
      text: t("review_1_text"),
      trip: t("review_1_trip"),
      verified: true,
    },
    {
      id: "review2",
      name: t("review_2_name"),
      avatar: "/reviews/avatar2.jpg",
      location: t("review_2_location"),
      date: t("review_2_date"),
      rating: 4.5,
      title: t("review_2_title"),
      text: t("review_2_text"),
      trip: t("review_2_trip"),
      verified: true,
    },
    {
      id: "review3",
      name: t("review_3_name"),
      avatar: "/reviews/avatar3.jpg",
      location: t("review_3_location"),
      date: t("review_3_date"),
      rating: 5,
      title: t("review_3_title"),
      text: t("review_3_text"),
      trip: t("review_3_trip"),
      verified: true,
    },
    {
      id: "review4",
      name: t("review_4_name"),
      avatar: "/reviews/avatar4.jpg",
      location: t("review_4_location"),
      date: t("review_4_date"),
      rating: 4,
      title: t("review_4_title"),
      text: t("review_4_text"),
      trip: t("review_4_trip"),
      verified: true,
    },
  ]

  // Handle autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % reviews.length)
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, reviews.length])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  // Navigation functions
  const goToPrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const goToIndex = (index: number) => {
    setActiveIndex(index)
  }

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-current" />)
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          className="h-5 w-5 text-yellow-400"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
            fill="currentColor"
            clipPath="inset(0 50% 0 0)"
          />
          <path
            d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
            stroke="currentColor"
            fill="none"
          />
        </svg>,
      )
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300 dark:text-gray-600" />)
    }

    return stars
  }

  return (
    <section id="featured-reviews" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex justify-center mb-12">
            <h2 className="section-title">{t("featured_reviews_title")}</h2>
          </div>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div
              className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={containerRef}
            >
              {/* Review Carousel */}
              <div className="relative min-h-[400px]">
                {reviews.map((review, index) => (
                  <div
                    key={review.id}
                    className={`absolute inset-0 p-8 transition-opacity duration-500 ${
                      index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{review.name}</h3>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>{review.location}</span>
                            <span className="mx-2">•</span>
                            <span>{review.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 flex items-center">
                        <div className="flex mr-2">{renderStars(review.rating)}</div>
                        <span className="text-gray-700 dark:text-gray-300">{review.rating.toFixed(1)}</span>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{review.title}</h4>
                        <div className="relative">
                          <Quote className="absolute top-0 left-0 h-6 w-6 text-primary/20 -translate-x-2 -translate-y-1" />
                          <p className="text-gray-600 dark:text-gray-300 pl-4">{review.text}</p>
                        </div>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium text-primary">{t("trip_type")}:</span> {review.trip}
                        </div>
                        {review.verified && (
                          <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                            <svg
                              className="h-4 w-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {t("verified_review")}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
                <button
                  onClick={goToPrev}
                  className="p-2 rounded-full bg-white/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 shadow-md"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              </div>
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
                <button
                  onClick={goToNext}
                  className="p-2 rounded-full bg-white/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 shadow-md"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
                <div className="flex space-x-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        index === activeIndex
                          ? "bg-primary"
                          : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                      }`}
                      aria-label={`Go to review ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-8 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <div className="flex">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <span className="ml-2 text-lg font-bold text-gray-800 dark:text-white">4.8/5</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{t("based_on_reviews", { count: "1,234" })}</p>
              <button className="mt-4 text-primary hover:underline font-medium">{t("read_all_reviews")}</button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
