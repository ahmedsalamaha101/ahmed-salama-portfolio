"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Monitor } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n/language-context"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  // Update the theme only after component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    // On mount, read the theme from localStorage or use system preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null

    if (savedTheme) {
      setTheme(savedTheme)
      if (savedTheme === "system") {
        applySystemTheme()
      } else {
        document.documentElement.classList.toggle("dark", savedTheme === "dark")
      }
    } else {
      setTheme("system")
      applySystemTheme()
    }
  }, [])

  // Apply system theme preference
  const applySystemTheme = () => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    document.documentElement.classList.toggle("dark", systemTheme === "dark")
  }

  // Toggle between light, dark, and system themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
    setTheme(newTheme)

    if (newTheme === "system") {
      applySystemTheme()
    } else {
      document.documentElement.classList.toggle("dark", newTheme === "dark")
    }

    localStorage.setItem("theme", newTheme)
  }

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (!mounted) return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      if (theme === "system") {
        applySystemTheme()
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme, mounted])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={
        theme === "light"
          ? t("switch_to_dark_mode") || "Switch to dark mode"
          : theme === "dark"
            ? t("switch_to_system_theme") || "Use system theme"
            : t("switch_to_light_mode") || "Switch to light mode"
      }
      whileTap={{ scale: 0.9 }}
      title={
        theme === "light"
          ? t("switch_to_dark_mode") || "Switch to dark mode"
          : theme === "dark"
            ? t("switch_to_system_theme") || "Use system theme"
            : t("switch_to_light_mode") || "Switch to light mode"
      }
    >
      {theme === "light" ? <Moon size={20} /> : theme === "dark" ? <Monitor size={20} /> : <Sun size={20} />}
    </motion.button>
  )
}
