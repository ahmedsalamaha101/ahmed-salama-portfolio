"use client"

import { useState, useEffect, useRef } from "react"
import { Tag, Calendar } from "lucide-react"
import AnimatedSection from "./animated-section"
import { useLanguage } from "@/lib/i18n/language-context"

interface CountdownProps {
  targetDate: Date
  title: string
  description: string
  discount: string
  image: string
  buttonText: string
  buttonLink: string
}

export default function SpecialOfferCountdown({
  title = "Summer Special Offer",
  description = "Enjoy special discounts on selected destinations. Limited time offer!",
  discount = "30% OFF",
  image = "/special-offer.jpg",
  buttonText = "Book Now",
  buttonLink = "#contact",
}: Partial<CountdownProps>) {
  const { t } = useLanguage()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  // Create a stable reference to the target date
  // Set it to 7 days from now by default
  const targetDateRef = useRef(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDateRef.current.getTime() - new Date().getTime()

      if (difference <= 0) {
        setIsExpired(true)
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, []) // Empty dependency array - only run on mount

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section id="special-offer" className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 flex flex-col justify-center">
                <div className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                  {t("limited_time_offer")}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>

                <div className="flex items-center mb-6">
                  <Tag className="h-5 w-5 text-primary mr-2" />
                  <span className="text-2xl font-bold text-primary">{discount}</span>
                </div>

                <div className="mb-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {t("valid_until")}: {formatDate(targetDateRef.current)}
                    </span>
                  </div>

                  {!isExpired ? (
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-2 text-center shadow-sm">
                        <div className="text-2xl font-bold text-primary">{timeLeft.days}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{t("days")}</div>
                      </div>
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-2 text-center shadow-sm">
                        <div className="text-2xl font-bold text-primary">{timeLeft.hours}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{t("hours")}</div>
                      </div>
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-2 text-center shadow-sm">
                        <div className="text-2xl font-bold text-primary">{timeLeft.minutes}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{t("minutes")}</div>
                      </div>
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-2 text-center shadow-sm">
                        <div className="text-2xl font-bold text-primary">{timeLeft.seconds}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{t("seconds")}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-md mt-4">
                      {t("offer_expired")}
                    </div>
                  )}
                </div>

                <a
                  href={buttonLink}
                  className={`btn-primary inline-flex justify-center ${
                    isExpired ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={(e) => isExpired && e.preventDefault()}
                >
                  {buttonText}
                </a>
              </div>

              <div className="relative h-64 md:h-auto">
                <img
                  src={image || "/placeholder.svg"}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <div className="text-white text-lg font-bold">{t("book_now_save")}</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
