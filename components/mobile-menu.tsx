"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: { name: string; path: string }[]
  onLinkClick?: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void
}

export default function MobileMenu({ isOpen, onClose, links, onLinkClick }: MobileMenuProps) {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={onClose}>
      <div
        className="fixed top-0 right-0 w-[75%] max-w-sm h-screen bg-white dark:bg-gray-800 shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-primary">Menu</h2>
          <button onClick={onClose} className="p-2">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="space-y-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              onClick={(e) => {
                if (onLinkClick) {
                  onLinkClick(e, link.path)
                } else {
                  onClose()
                }
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-8">
          <Link
            href="mailto:ahmed.salama.hasany@gmail.com"
            className="btn-primary w-full justify-center"
            onClick={onClose}
          >
            {t("contact")}
          </Link>
        </div>
      </div>
    </div>
  )
}
