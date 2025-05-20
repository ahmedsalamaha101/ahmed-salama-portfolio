"use client"

import Link from "next/link"

import type React from "react"

import { Plane, Hotel, Users, CreditCard, Map, Shield } from "lucide-react"
import AnimatedSection from "./animated-section"
import { useLanguage } from "@/lib/i18n/language-context"

interface Service {
  icon: React.ElementType
  title: string
  description: string
  price?: string
}

export default function ServicesSection() {
  const { t } = useLanguage()

  const services: Service[] = [
    {
      icon: Plane,
      title: t("service_flight_booking"),
      description: t("service_flight_booking_desc"),
      price: t("service_flight_booking_price"),
    },
    {
      icon: Hotel,
      title: t("service_hotel_reservation"),
      description: t("service_hotel_reservation_desc"),
      price: t("service_hotel_reservation_price"),
    },
    {
      icon: Users,
      title: t("service_group_travel"),
      description: t("service_group_travel_desc"),
      price: t("service_group_travel_price"),
    },
    {
      icon: CreditCard,
      title: t("service_vip_travel"),
      description: t("service_vip_travel_desc"),
      price: t("service_vip_travel_price"),
    },
    {
      icon: Map,
      title: t("service_custom_itinerary"),
      description: t("service_custom_itinerary_desc"),
      price: t("service_custom_itinerary_price"),
    },
    {
      icon: Shield,
      title: t("service_travel_insurance"),
      description: t("service_travel_insurance_desc"),
      price: t("service_travel_insurance_price"),
    },
  ]

  return (
    <section id="services" className="py-16 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex justify-center mb-12">
            <h2 className="section-title">{t("services_title")}</h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <AnimatedSection key={index}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full flex flex-col hover:shadow-lg transition-shadow">
                  <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{service.description}</p>
                  {service.price && (
                    <div className="mt-auto">
                      <span className="bg-primary/10 dark:bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {service.price}
                      </span>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            )
          })}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <Link href="#contact" className="btn-primary inline-flex">
            {t("inquire_about_services")}
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
