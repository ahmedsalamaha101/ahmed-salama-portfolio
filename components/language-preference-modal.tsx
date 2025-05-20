"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import { motion, AnimatePresence } from "framer-motion"

export default function LanguagePreferenceModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  // We're removing the auto-show functionality
  // The modal will only show if explicitly opened from elsewhere

  const handleLanguageSelect = (lang: "en" | "ar" | "de" | "ru" | "pl") => {
    setLanguage(lang)
    setIsOpen(false)
  }

  // Language options with their native names and flags
  const languages = [
    { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
    { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇪🇬" },
    { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
    { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
    { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Choose Your Language</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              Please select your preferred language for the best experience
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code as "en" | "ar" | "de" | "ru" | "pl")}
                  className={`flex items-center justify-between p-3 rounded-md border transition-colors ${
                    language === lang.code
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  <span className="flex items-center">
                    <span className="text-2xl mr-2">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  <span className="text-sm opacity-75">{lang.nativeName}</span>
                </button>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm"
              >
                Continue with current language ({languages.find((l) => l.code === language)?.name})
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
