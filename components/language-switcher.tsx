"use client"

import { useState, useEffect, useRef } from "react"
import { Globe, Check } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { motion, AnimatePresence } from "framer-motion"

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleLanguage = (lang: "en" | "ar" | "de" | "ru" | "pl") => {
    setLanguage(lang)
    setIsOpen(false)

    // Update URL with language parameter without page reload
    const url = new URL(window.location.href)
    url.searchParams.set("lang", lang)
    window.history.pushState({ path: url.toString() }, "", url.toString())
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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex items-center gap-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe size={20} />
        <span className="text-xs font-medium uppercase">{language}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg p-2 z-50 min-w-[180px]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => toggleLanguage(lang.code as "en" | "ar" | "de" | "ru" | "pl")}
                className={`block w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                  language === lang.code
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
                aria-current={language === lang.code ? "true" : "false"}
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  <span className="text-xs opacity-75">{lang.nativeName}</span>
                  {language === lang.code && <Check className="h-4 w-4 ml-2" />}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
