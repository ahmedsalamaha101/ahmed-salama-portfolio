"use client"
import AnimatedSection from "./animated-section"
import ImageWithLoader from "./image-with-loader"
import { useLanguage } from "@/lib/i18n/language-context"

export default function WorkSection() {
  const { t } = useLanguage()

  const projects = [
    {
      title: t("vip_travel"),
      description: t("vip_travel_desc"),
      image: "/vip-travel.jpg",
      tags: [t("vip"), t("luxury_travel"), t("special_services")],
    },
    {
      title: t("group_travel"),
      description: t("group_travel_desc"),
      image: "/group-travel.jpg",
      tags: [t("groups"), t("companies"), t("special_offers")],
    },
    {
      title: t("hotel_booking"),
      description: t("hotel_booking_desc"),
      image: "/hotel-booking.jpg",
      tags: [t("hotels"), t("accommodation"), t("bookings")],
    },
  ]

  return (
    <section id="work" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex justify-center mb-12">
            <h2 className="section-title">{t("work_title")}</h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={index} className="h-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 h-full flex flex-col">
                <div className="relative h-48">
                  <ImageWithLoader
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-primary">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
