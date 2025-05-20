"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import LanguageSwitcher from "./language-switcher"
import { useLanguage } from "@/lib/i18n/language-context"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const { t, language } = useLanguage()
  const [activeSection, setActiveSection] = useState("home")
  const navbarRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { name: t("home"), path: "/", section: "home" },
    { name: t("about"), path: "/#about", section: "about" },
    { name: t("experience"), path: "/#experience", section: "experience" },
    { name: t("skills"), path: "/#skills", section: "skills" },
    { name: t("services"), path: "/#services", section: "services" },
    { name: t("work"), path: "/#work", section: "work" },
    { name: t("certifications"), path: "/#certifications", section: "certifications" },
    { name: t("testimonials"), path: "/#testimonials", section: "testimonials" },
    { name: t("blog"), path: "/#blog", section: "blog" },
    { name: t("faq"), path: "/#faq", section: "faq" },
    { name: t("contact"), path: "/#contact", section: "contact" },
  ]

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const navbarHeight = navbarRef.current?.offsetHeight || 0

      // Set scrolled state for styling
      setScrolled(currentScrollPos > 10)

      // Handle navbar visibility (hide on scroll down, show on scroll up)
      const isScrolledDown = prevScrollPos < currentScrollPos
      setVisible(currentScrollPos < 10 || !isScrolledDown || isMobileMenuOpen)

      setPrevScrollPos(currentScrollPos)

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.section).filter(Boolean)

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if the section is in view (with some buffer)
          if (rect.top <= navbarHeight + 100 && rect.bottom >= navbarHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos, isMobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, section: string) => {
    // Only handle hash links
    if (path.startsWith("/#")) {
      e.preventDefault()
      const targetId = section
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Close mobile menu if open
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false)
        }

        // Get navbar height for offset
        const navbarHeight = navbarRef.current?.offsetHeight || 0

        // Scroll to the element with smooth behavior and offset
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Update active section
        setActiveSection(section)

        // Update URL without reloading the page
        window.history.pushState(null, "", path)
      }
    }
  }

  return (
    <motion.header
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md" : "bg-white dark:bg-gray-900"
      }`}
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-primary">
            {t("tourism_hub")}
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`nav-link ${activeSection === link.section ? "active" : ""}`}
                onClick={(e) => handleNavClick(e, link.path, link.section)}
                aria-current={activeSection === link.section ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            id="mobile-menu-backdrop"
          >
            <motion.div
              className="fixed top-0 right-0 w-[75%] max-w-sm h-screen bg-white dark:bg-gray-800 shadow-xl p-6 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              id="mobile-menu"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-primary">{t("menu")}</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`block py-2 px-4 rounded-md transition-colors ${
                      activeSection === link.section
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={(e) => handleNavClick(e, link.path, link.section)}
                    aria-current={activeSection === link.section ? "page" : undefined}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("theme")}</span>
                    <ThemeToggle />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("language")}</span>
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <Link
                  href="mailto:ahmed.salama.hasany@gmail.com"
                  className="btn-primary w-full justify-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("contact")}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
