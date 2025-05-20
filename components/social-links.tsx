"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Send, MessageCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface SocialLinksProps {
  className?: string
  iconSize?: number
  showLabels?: boolean
}

export default function SocialLinks({ className = "", iconSize = 20, showLabels = false }: SocialLinksProps) {
  const { t } = useLanguage()

  const socialLinks = [
    {
      icon: MessageCircle,
      href: "https://wa.me/201028956148",
      label: "WhatsApp",
      username: "+201028956148",
    },
    {
      icon: Send,
      href: "https://t.me/Ahmedsalamaha",
      label: "Telegram",
      username: "@Ahmedsalamaha",
    },
    {
      icon: Twitter,
      href: "https://x.com/Ahmed_Salama_Ha",
      label: "X (Twitter)",
      username: "@Ahmed_Salama_Ha",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/ahmed_salama_hasany/",
      label: "Instagram",
      username: "@ahmed_salama_hasany",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ahmed-salama-hasany",
      label: "LinkedIn",
      username: "ahmed-salama-hasany",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/ahmed.salama.ha",
      label: "Facebook",
      username: "ahmed.salama.ha",
    },
  ]

  return (
    <div className="flex flex-wrap gap-4">
      {socialLinks.map((social, index) => {
        const Icon = social.icon
        return showLabels ? (
          <Link
            key={index}
            href={social.href}
            className={`flex items-center gap-2 hover:underline ${className}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon size={iconSize} />
            <span>{social.label}</span>
            {social.username && <span className="text-sm opacity-75">({social.username})</span>}
          </Link>
        ) : (
          <Link
            key={index}
            href={social.href}
            className={`bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors ${className}`}
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon size={iconSize} />
          </Link>
        )
      })}
    </div>
  )
}
