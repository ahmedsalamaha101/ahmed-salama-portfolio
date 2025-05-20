import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/i18n/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ahmed Salama | Tourism Consultant & VP at Maz Travel",
  description:
    "Ahmed Salama is a Tourism Consultant and Vice President at Maz Travel, specializing in travel planning, flight booking, and hospitality services.",
  keywords: [
    "tourism consultant",
    "travel planning",
    "flight booking",
    "hospitality services",
    "Maz Travel",
    "Ahmed Salama",
  ],
  authors: [{ name: "Ahmed Salama" }],
  creator: "Ahmed Salama",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahmed-salama.vercel.app/",
    title: "Ahmed Salama | Tourism Consultant & VP at Maz Travel",
    description: "Professional portfolio of Ahmed Salama, Tourism Consultant and Vice President at Maz Travel",
    siteName: "Ahmed Salama's Tourism Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Salama | Tourism Consultant",
    description: "Professional portfolio of Ahmed Salama, Tourism Consultant and VP at Maz Travel",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
