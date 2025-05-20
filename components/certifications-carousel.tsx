"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Award, ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function CertificationsCarousel() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const certifications = [
    {
      id: "cma",
      title: t("cma"),
      issuer: t("cma_issuer"),
      date: t("in_progress"),
      image: "/certifications/cma.jpg",
      category: "finance",
    },
    {
      id: "tourism",
      title: t("tourism_cert"),
      issuer: t("tourism_cert_issuer"),
      date: "2019",
      image: "/certifications/tourism.jpg",
      category: "tourism",
    },
    {
      id: "hotel",
      title: t("hotel_cert"),
      issuer: t("hotel_cert_issuer"),
      date: "2017",
      image: "/certifications/hotel.jpg",
      category: "tourism",
    },
    {
      id: "power-bi",
      title: t("power_bi"),
      issuer: t("power_bi_issuer"),
      date: t("power_bi_date"),
      image: "/certifications/power-bi.jpg",
      category: "technology",
    },
    {
      id: "chatgpt",
      title: t("chatgpt_ai"),
      issuer: t("chatgpt_ai_issuer"),
      date: t("chatgpt_ai_date"),
      image: "/certifications/chatgpt-ai.jpg",
      category: "technology",
    },
    {
      id: "dcf",
      title: t("dcf_valuation"),
      issuer: t("dcf_valuation_issuer"),
      date: t("dcf_valuation_date"),
      image: "/certifications/dcf-valuation.jpg",
      category: "finance",
    },
  ]

  const nextCertificate = () => {
    setActiveIndex((prev) => (prev + 1) % certifications.length)
  }

  const prevCertificate = () => {
    setActiveIndex((prev) => (prev - 1 + certifications.length) % certifications.length)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2 // Scroll speed multiplier
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.offsetWidth
      const scrollPosition = carouselRef.current.scrollLeft
      const newIndex = Math.round(scrollPosition / itemWidth)
      setActiveIndex(Math.max(0, Math.min(newIndex, certifications.length - 1)))
    }
  }

  // Scroll to active index when it changes
  useEffect(() => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: activeIndex * itemWidth,
        behavior: "smooth",
      })
    }
  }, [activeIndex])

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-12">
          <h2 className="section-title">{t("certifications_title")}</h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevCertificate}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors"
            aria-label="Previous certificate"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800 dark:text-white" />
          </button>
          <button
            onClick={nextCertificate}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors"
            aria-label="Next certificate"
          >
            <ChevronRight className="h-6 w-6 text-gray-800 dark:text-white" />
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="flex transition-transform duration-500 ease-out">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  className="min-w-full flex-shrink-0 px-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: index === activeIndex ? 1 : 0.5,
                    scale: index === activeIndex ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-64 md:h-auto">
                        <img
                          src={cert.image || "/placeholder.svg"}
                          alt={cert.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                          {t(`${cert.category}_category`)}
                        </div>
                      </div>
                      <div className="p-8 flex flex-col">
                        <div className="flex items-center mb-4">
                          <Award className="h-6 w-6 text-primary mr-2" />
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{cert.title}</h3>
                        </div>
                        <div className="mb-4">
                          <p className="text-gray-600 dark:text-gray-300 mb-1">{cert.issuer}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{cert.date}</p>
                        </div>
                        <div className="mt-auto">
                          <button className="flex items-center text-primary hover:underline">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            {t("view_certificate")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6">
            {certifications.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                  index === activeIndex ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to certificate ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="#certifications" className="btn-primary inline-flex">
            {t("view_all_certifications")}
          </a>
        </div>
      </div>
    </section>
  )
}
