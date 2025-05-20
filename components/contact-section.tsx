"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, MessageCircle, Calendar } from "lucide-react"
import ContactForm from "./contact-form"
import AnimatedSection from "./animated-section"
import { useLanguage } from "@/lib/i18n/language-context"
import SocialLinks from "./social-links"
import MapComponent from "./map-component"

export default function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex justify-center mb-12">
            <h2 className="section-title">{t("contact_title")}</h2>
          </div>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2">
              <AnimatedSection className="p-8 bg-primary text-white">
                <h3 className="text-2xl font-bold mb-6">{t("get_in_touch")}</h3>
                <p className="mb-8">{t("contact_desc")}</p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white/70">{t("email")}</h4>
                      <Link href="mailto:ahmed.salama.hasany@gmail.com" className="text-white hover:underline">
                        ahmed.salama.hasany@gmail.com
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white/70">{t("phone")}</h4>
                      <p className="text-white">+2010289561748</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white/70">{t("whatsapp")}</h4>
                      <Link href="https://wa.me/201028956148" className="text-white hover:underline" target="_blank">
                        +201028956148
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white/70">{t("location")}</h4>
                      <p className="text-white">Hurghada, Egypt</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white/70">{t("schedule_meeting")}</h4>
                      <Link href="#booking" className="text-white hover:underline">
                        {t("book_appointment")}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="mt-8">
                  <h4 className="text-lg font-medium mb-4">{t("social_media")}</h4>
                  <SocialLinks className="text-white" />
                </div>

                <div className="mt-12">
                  <h4 className="text-lg font-medium mb-4">{t("business_hours")}</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>{t("monday_friday")}:</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>{t("saturday")}:</span>
                      <span>10:00 AM - 2:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>{t("sunday")}:</span>
                      <span>{t("closed")}</span>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t("send_message")}</h3>
                <ContactForm />

                {/* Map */}
                <div className="mt-8">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{t("find_us")}</h4>
                  <MapComponent address="Hurghada, Egypt" height="250px" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
