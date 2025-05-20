"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations } from "./translations"

export type Language = "en" | "ar" | "de" | "ru" | "pl"

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: "ltr" | "rtl"
}

// Provide default values to avoid the "used outside provider" error during SSR
const defaultValues: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  dir: "ltr",
}

const LanguageContext = createContext<LanguageContextType>(defaultValues)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  // Load saved language preference on mount or detect browser language
  useEffect(() => {
    // Try to detect browser language first
    const detectBrowserLanguage = (): Language => {
      // Get browser language (e.g., 'en-US', 'ar', 'de')
      const browserLang = navigator.language.split("-")[0].toLowerCase()

      // Check if it's one of our supported languages
      if (
        browserLang === "en" ||
        browserLang === "ar" ||
        browserLang === "de" ||
        browserLang === "ru" ||
        browserLang === "pl"
      ) {
        return browserLang as Language
      }

      // Default to English if not supported
      return "en"
    }

    // First check if there's a saved preference
    const savedLanguage = localStorage.getItem("language") as Language

    if (savedLanguage && ["en", "ar", "de", "ru", "pl"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    } else {
      // If no saved preference, use browser language
      const detectedLanguage = detectBrowserLanguage()
      setLanguageState(detectedLanguage)
      // Save the detected language
      localStorage.setItem("language", detectedLanguage)
    }

    setMounted(true)
  }, [])

  // Save language preference when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language)
      // Set the dir attribute on the html element for RTL support
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = language
    }
  }, [language, mounted])

  // Translation function
  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  // Direction based on language
  const dir = language === "ar" ? "rtl" : "ltr"

  const contextValue = {
    language,
    setLanguage: setLanguageState,
    t,
    dir,
  }

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}
