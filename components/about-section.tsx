"use client"

import AnimatedSection from "./animated-section"
import { useLanguage } from "@/lib/i18n/language-context"

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex justify-center mb-12">
            <h2 className="section-title">{t("about_title")}</h2>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <h3 className="text-2xl font-bold mb-6 text-primary">{t("about_name")}</h3>

            <p className="text-gray-700 dark:text-gray-300 mb-4">{t("about_p1")}</p>

            <p className="text-gray-700 dark:text-gray-300 mb-4">{t("about_p2")}</p>

            <p className="text-gray-700 dark:text-gray-300">{t("about_p3")}</p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
