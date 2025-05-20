"use client"

import AnimatedSection from "./animated-section"
import ImageWithLoader from "./image-with-loader"
import { Quote } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function TestimonialsSection() {
  const { t } = useLanguage()

  const testimonials = [
    {
      name: t("testimonial1_name"),
      position: t("testimonial1_position"),
      text: t("testimonial1_text"),
      image: "/testimonial-1.jpg",
    },
    {
      name: t("testimonial2_name"),
      position: t("testimonial2_position"),
      text: t("testimonial2_text"),
      image: "/testimonial-2.jpg",
    },
    {
      name: t("testimonial3_name"),
      position: t("testimonial3_position"),
      text: t("testimonial3_text"),
      image: "/testimonial-3.jpg",
    },
  ]

  return (
    <section id="testimonials" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex justify-center mb-12">
            <h2 className="section-title">{t("testimonials_title")}</h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md relative h-full">
                <div className="absolute -top-4 -left-4 bg-primary rounded-full p-2">
                  <Quote className="h-5 w-5 text-white" />
                </div>
                <div className="pt-4">
                  <p className="text-gray-600 dark:text-gray-300 italic mb-6">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <ImageWithLoader
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
                    </div>
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
