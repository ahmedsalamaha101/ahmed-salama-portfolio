"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import AnimatedSection from "./animated-section"
import { useLanguage } from "@/lib/i18n/language-context"

interface FaqItem {
  question: string
  answer: string
}

export default function FaqSection() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs: FaqItem[] = [
    {
      question: t("faq_booking_process"),
      answer: t("faq_booking_process_answer"),
    },
    {
      question: t("faq_payment_methods"),
      answer: t("faq_payment_methods_answer"),
    },
    {
      question: t("faq_cancellation"),
      answer: t("faq_cancellation_answer"),
    },
    {
      question: t("faq_group_discounts"),
      answer: t("faq_group_discounts_answer"),
    },
    {
      question: t("faq_custom_packages"),
      answer: t("faq_custom_packages_answer"),
    },
    {
      question: t("faq_visa_requirements"),
      answer: t("faq_visa_requirements_answer"),
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex justify-center mb-12">
            <h2 className="section-title">{t("faq_title")}</h2>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AnimatedSection key={index}>
              <div className="mb-4">
                <button
                  className="w-full flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white text-left">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-primary" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-b-lg shadow-sm mt-1">
                    <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
