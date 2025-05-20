"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n/language-context"

interface AdvancedLoadingProps {
  isLoading?: boolean
  fullScreen?: boolean
  text?: string
  showProgress?: boolean
}

export default function AdvancedLoading({
  isLoading = true,
  fullScreen = true,
  text,
  showProgress = true,
}: AdvancedLoadingProps) {
  const { t } = useLanguage()
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState(text || t("loading"))
  const [loadingPhase, setLoadingPhase] = useState(0)

  useEffect(() => {
    if (!isLoading) return

    const loadingTexts = [
      t("loading_text_1") || "Finding the best travel options for you...",
      t("loading_text_2") || "Checking availability and prices...",
      t("loading_text_3") || "Personalizing your recommendations...",
      t("loading_text_4") || "Almost ready for your adventure...",
    ]

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Accelerate progress as it gets closer to 100%
        const increment = Math.max(1, Math.floor((100 - prev) / 10))
        const next = prev + increment
        return next > 100 ? 100 : next
      })
    }, 200)

    // Change loading text periodically
    const textInterval = setInterval(() => {
      setLoadingPhase((prev) => (prev + 1) % loadingTexts.length)
      setLoadingText(loadingTexts[loadingPhase])
    }, 3000)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [isLoading, t, loadingPhase])

  if (!isLoading) return null

  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
    : "w-full h-full flex items-center justify-center"

  return (
    <div className={containerClasses}>
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-6">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <motion.div
              className="absolute inset-0 border-4 border-primary/30 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 border-4 border-primary rounded-full"
              initial={{ strokeDasharray: 0 }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                clipPath: showProgress ? `inset(0 0 ${100 - progress}% 0)` : undefined,
              }}
            />
            {showProgress && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-primary font-bold"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {Math.round(progress)}%
              </motion.div>
            )}
          </div>
          <motion.h3
            className="text-xl font-bold text-gray-800 dark:text-white mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("loading_title") || "Preparing Your Experience"}
          </motion.h3>
          <motion.p
            className="text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {loadingText}
          </motion.p>
        </div>
        {showProgress && (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  )
}
