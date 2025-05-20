"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Users, MapPin, Plane, CreditCard } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n/language-context"

export default function QuickBookingForm() {
  const { t } = useLanguage()
  const [formStep, setFormStep] = useState(0)
  const [formData, setFormData] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
    travelers: "2",
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    setFormStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setFormStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        setFormStep(0)
        setFormData({
          destination: "",
          departureDate: "",
          returnDate: "",
          travelers: "2",
          name: "",
          email: "",
          phone: "",
        })
      }, 3000)
    }, 1500)
  }

  const destinations = [
    { value: "egypt", label: t("destination_egypt") },
    { value: "dubai", label: t("destination_dubai") },
    { value: "turkey", label: t("destination_turkey") },
    { value: "maldives", label: t("destination_maldives") },
    { value: "morocco", label: t("destination_morocco") },
    { value: "saudi", label: t("destination_saudi") },
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("quick_booking_title")}</h2>
            <p className="text-gray-600 dark:text-gray-300">{t("quick_booking_subtitle")}</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            {isSuccess ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t("booking_success_title")}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{t("booking_success_message")}</p>
              </div>
            ) : (
              <div className="p-6">
                {/* Progress Steps */}
                <div className="flex justify-between mb-8">
                  {[0, 1].map((step) => (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          formStep >= step
                            ? "bg-primary text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {step === 0 ? <Plane className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
                      </div>
                      <span
                        className={`text-sm mt-2 ${
                          formStep >= step ? "text-primary font-medium" : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {step === 0 ? t("trip_details") : t("personal_info")}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Trip Details */}
                  {formStep === 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="destination"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            <MapPin className="inline-block mr-1 h-4 w-4" />
                            {t("destination")}
                          </label>
                          <select
                            id="destination"
                            name="destination"
                            value={formData.destination}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                          >
                            <option value="">{t("select_destination")}</option>
                            {destinations.map((dest) => (
                              <option key={dest.value} value={dest.value}>
                                {dest.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="departureDate"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                              <Calendar className="inline-block mr-1 h-4 w-4" />
                              {t("departure_date")}
                            </label>
                            <input
                              type="date"
                              id="departureDate"
                              name="departureDate"
                              value={formData.departureDate}
                              onChange={handleInputChange}
                              required
                              min={new Date().toISOString().split("T")[0]}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="returnDate"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                              <Calendar className="inline-block mr-1 h-4 w-4" />
                              {t("return_date")}
                            </label>
                            <input
                              type="date"
                              id="returnDate"
                              name="returnDate"
                              value={formData.returnDate}
                              onChange={handleInputChange}
                              required
                              min={formData.departureDate || new Date().toISOString().split("T")[0]}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="travelers"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            <Users className="inline-block mr-1 h-4 w-4" />
                            {t("travelers")}
                          </label>
                          <select
                            id="travelers"
                            name="travelers"
                            value={formData.travelers}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num.toString()}>
                                {num} {num === 1 ? t("traveler") : t("travelers")}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="pt-4">
                          <button
                            type="button"
                            onClick={nextStep}
                            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                          >
                            {t("continue")}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Personal Information */}
                  {formStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            {t("full_name")}
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            {t("email")}
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            {t("phone")}
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                          />
                        </div>

                        <div className="pt-4 flex gap-4">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="w-1/2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                          >
                            {t("back")}
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-1/2 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70"
                          >
                            {isSubmitting ? t("submitting") : t("book_now")}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
