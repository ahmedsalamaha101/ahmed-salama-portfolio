"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { Mail, Phone, MapPin, Heart } from "lucide-react"
import AnimatedSection from "./animated-section"
import { useLanguage } from "@/lib/i18n/language-context"
import SocialLinks from "./social-links"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeStatus, setSubscribeStatus] = useState<null | "success" | "error">(null)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false)
      setSubscribeStatus("success")
      setEmail("")

      // Reset status after 3 seconds
      setTimeout(() => {
        setSubscribeStatus(null)
      }, 3000)
    }, 1500)
  }

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <AnimatedSection>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t("about_us")}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{t("footer_about_text")}</p>
              <SocialLinks
                className="text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80"
                iconSize={20}
              />
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t("quick_links")}</h3>
              <ul className="space-y-2">
                {[
                  { name: t("home"), path: "/" },
                  { name: t("about"), path: "/#about" },
                  { name: t("services"), path: "/#services" },
                  { name: t("work"), path: "/#work" },
                  { name: t("contact"), path: "/#contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t("contact_info")}</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">Hurghada, Egypt</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <a
                    href="tel:+201028956148"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    +201028956148
                  </a>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <a
                    href="mailto:ahmed.salama.hasany@gmail.com"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    ahmed.salama.hasany@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t("newsletter")}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{t("newsletter_text")}</p>
              <form onSubmit={handleSubscribe}>
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("your_email")}
                    required
                    className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors"
                  >
                    {isSubscribing ? t("subscribing") : t("subscribe")}
                  </button>
                </div>
                {subscribeStatus === "success" && (
                  <p className="mt-2 text-green-600 dark:text-green-400 text-sm">{t("subscribe_success")}</p>
                )}
                {subscribeStatus === "error" && (
                  <p className="mt-2 text-red-600 dark:text-red-400 text-sm">{t("subscribe_error")}</p>
                )}
              </form>
            </div>
          </AnimatedSection>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {currentYear} {t("tourism_hub")}. {t("rights_reserved")}
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2 flex items-center justify-center">
            {t("made_with")} <Heart className="h-4 w-4 text-red-500 mx-1" /> {t("by")} Ahmed Salama
          </p>
        </div>
      </div>
    </footer>
  )
}
