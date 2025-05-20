"use client"

import AnimatedSection from "./animated-section"
import { useLanguage } from "@/lib/i18n/language-context"

export default function SkillsSection() {
  const { t } = useLanguage()

  const skills = [
    { name: t("travel_planning"), level: 95 },
    { name: t("flight_booking"), level: 90 },
    { name: t("hospitality_services"), level: 85 },
    { name: t("customer_relations"), level: 95 },
    { name: t("tourism_management"), level: 90 },
    { name: t("financial_management"), level: 80 },
  ]

  return (
    <section id="skills" className="py-16 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex justify-center mb-12">
            <h2 className="section-title">{t("skills_title")}</h2>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto grid gap-6">
          {skills.map((skill, index) => (
            <AnimatedSection key={skill.name}>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium dark:text-white">{skill.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
