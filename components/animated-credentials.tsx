"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Award, Check, Star } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function AnimatedCredentials() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const credentials = [
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: t("credential_1_title"),
      value: "10+",
      description: t("credential_1_description"),
    },
    {
      icon: <Check className="h-8 w-8 text-green-500" />,
      title: t("credential_2_title"),
      value: "1000+",
      description: t("credential_2_description"),
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: t("credential_3_title"),
      value: "4.9",
      description: t("credential_3_description"),
    },
    {
      icon: (
        <svg
          className="h-8 w-8 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: t("credential_4_title"),
      value: "50+",
      description: t("credential_4_description"),
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            ref={containerRef}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {credentials.map((credential, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">{credential.icon}</div>
                <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{credential.value}</h3>
                <h4 className="text-lg font-semibold text-primary mb-2">{credential.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{credential.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
