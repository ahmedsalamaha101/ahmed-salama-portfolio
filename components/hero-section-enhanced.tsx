"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { FileText, Mail, Download, ChevronDown } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import AnimatedSection from "./animated-section"

export default function HeroSectionEnhanced() {
  const { t, dir } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const backgroundSlides = [
    {
      image: "/hero-bg-1.jpg",
      title: t("hero_slide_1_title"),
    },
    {
      image: "/hero-bg-2.jpg",
      title: t("hero_slide_2_title"),
    },
    {
      image: "/hero-bg-3.jpg",
      title: t("hero_slide_3_title"),
    },
  ]

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, backgroundSlides.length])

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsPlaying((prev) => !prev)
  }

  return (
    <section className="py-16 md:py-24 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col ${dir === "rtl" ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between gap-12`}
        >
          <AnimatedSection className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 dark:text-white">{t("hi")}</h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("im")} <span className="text-primary">{t("name")}</span>
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 dark:text-white">{t("tourism_consultant")}</h3>

            {/* Achievements Ticker */}
            <div className="mb-8 bg-primary/10 dark:bg-primary/20 p-3 rounded-md overflow-hidden">
              <div className="achievements-ticker">
                <p className="text-primary font-medium">{t("achievement_ticker")}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/resume.pdf" className="btn-primary" download>
                <Download size={20} />
                {t("download_resume")}
              </Link>
              <Link href="/resume.pdf" className="btn-secondary" target="_blank">
                <FileText size={20} />
                {t("view_resume")}
              </Link>
              <Link href="#contact" className="btn-accent">
                <Mail size={20} />
                {t("contact")}
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div
                className="absolute inset-0 bg-primary rounded-full transform scale-110"
                style={{ borderRadius: "70% 60% 70% 60%" }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-700 rounded-full p-2 w-56 h-56 md:w-72 md:h-72 overflow-hidden">
                  <Image
                    src="/ahmed-salama.png"
                    alt="Ahmed Salama's profile picture"
                    width={300}
                    height={300}
                    className="rounded-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-primary">
        <Link
          href="#about"
          className="flex flex-col items-center animate-bounce"
          aria-label="Scroll down"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          <span className="text-sm mb-2">{t("scroll_down")}</span>
          <ChevronDown className="h-6 w-6" />
        </Link>
      </div>
    </section>
  )
}
