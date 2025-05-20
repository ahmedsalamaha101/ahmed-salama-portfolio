"use client"

import AnimatedSection from "./animated-section"
import { useLanguage } from "@/lib/i18n/language-context"

export default function ExperienceSection() {
  const { t } = useLanguage()

  const experiences = [
    {
      title: t("vice_president"),
      company: "Maz Travel",
      period: `2020 - ${t("present")}`,
      description: t("vp_description"),
    },
    {
      title: t("tourism_consultant"),
      company: "Global Travel Company",
      period: "2017 - 2020",
      description: t("consultant_description"),
    },
    {
      title: t("booking_manager"),
      company: "Five-Star Hotel",
      period: "2015 - 2017",
      description: t("manager_description"),
    },
    {
      title: t("flight_booking_specialist"),
      company: "Maz Travel",
      period: "2013 - 2015",
      description: t("flight_booking_description"),
    },
  ]

  return (
    <section id="experience" className="py-16 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex justify-center mb-12">
            <h2 className="section-title">{t("experience_title")}</h2>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <AnimatedSection key={index}>
                <div className="relative pl-8 pb-8 border-l-2 border-primary">
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0"></div>
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold text-primary">{exp.title}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-700 dark:text-gray-300 font-medium">{exp.company}</p>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
