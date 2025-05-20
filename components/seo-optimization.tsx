"use client"

import { useEffect } from "react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function SeoOptimization() {
  const { t, language } = useLanguage()

  useEffect(() => {
    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ahmed Salama",
      jobTitle: t("tourism_consultant"),
      url: "https://ahmed-salama.vercel.app/",
      image: "https://ahmed-salama.vercel.app/ahmed-salama.png",
      sameAs: [
        "https://www.linkedin.com/in/ahmed-salama-hasany",
        "https://www.facebook.com/ahmed.salama.ha",
        "https://www.instagram.com/ahmed_salama_hasany/",
        "https://t.me/Ahmedsalamaha",
        "https://x.com/Ahmed_Salama_Ha",
      ],
      worksFor: {
        "@type": "Organization",
        name: "Maz Travel",
        description: "Travel and Tourism Agency",
        url: "https://ahmed-salama.vercel.app/",
      },
      description: t("about_p1"),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hurghada",
        addressRegion: "Red Sea",
        addressCountry: "Egypt",
      },
      telephone: "+201028956148",
      email: "ahmed.salama.hasany@gmail.com",
      knowsLanguage: ["Arabic", "English", "German", "Russian", "Polish"],
      hasOccupation: {
        "@type": "Occupation",
        name: "Tourism Consultant",
        occupationLocation: {
          "@type": "City",
          name: "Hurghada",
        },
        description: "Providing comprehensive travel solutions and premium hospitality arrangements",
        skills: "Travel Planning, Flight Booking, Hospitality Services, Customer Relations, Tourism Management",
      },
    }

    // Add service structured data
    const serviceData = {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Travel Consultation",
      provider: {
        "@type": "Person",
        name: "Ahmed Salama",
      },
      description: "Professional travel planning and tourism consultation services",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        highPrice: "5000",
        lowPrice: "100",
        offerCount: "6",
      },
      areaServed: {
        "@type": "Country",
        name: "Egypt",
      },
      serviceOutput: "Personalized travel itineraries and bookings",
    }

    // Add FAQ structured data
    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: t("faq_booking_process"),
          acceptedAnswer: {
            "@type": "Answer",
            text: t("faq_booking_process_answer"),
          },
        },
        {
          "@type": "Question",
          name: t("faq_payment_methods"),
          acceptedAnswer: {
            "@type": "Answer",
            text: t("faq_payment_methods_answer"),
          },
        },
        {
          "@type": "Question",
          name: t("faq_cancellation"),
          acceptedAnswer: {
            "@type": "Answer",
            text: t("faq_cancellation_answer"),
          },
        },
        {
          "@type": "Question",
          name: t("faq_group_discounts"),
          acceptedAnswer: {
            "@type": "Answer",
            text: t("faq_group_discounts_answer"),
          },
        },
        {
          "@type": "Question",
          name: t("faq_custom_packages"),
          acceptedAnswer: {
            "@type": "Answer",
            text: t("faq_custom_packages_answer"),
          },
        },
        {
          "@type": "Question",
          name: t("faq_visa_requirements"),
          acceptedAnswer: {
            "@type": "Answer",
            text: t("faq_visa_requirements_answer"),
          },
        },
      ],
    }

    // Add local business structured data
    const localBusinessData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Ahmed Salama Tourism Consultant",
      image: "https://ahmed-salama.vercel.app/ahmed-salama.png",
      "@id": "https://ahmed-salama.vercel.app/",
      url: "https://ahmed-salama.vercel.app/",
      telephone: "+201028956148",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Hurghada",
        addressLocality: "Hurghada",
        addressRegion: "Red Sea",
        postalCode: "84511",
        addressCountry: "EG",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 27.2579,
        longitude: 33.8116,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "17:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "10:00",
          closes: "14:00",
        },
      ],
    }

    // Add structured data to the page
    const addStructuredData = (data: object) => {
      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.text = JSON.stringify(data)
      document.head.appendChild(script)
      return script
    }

    const scripts = [
      addStructuredData(structuredData),
      addStructuredData(serviceData),
      addStructuredData(faqData),
      addStructuredData(localBusinessData),
    ]

    // Add meta tags for social sharing
    const metaTags = [
      {
        name: "description",
        content:
          t("meta_description") ||
          "Professional tourism consultant specializing in travel planning, flight booking, and hospitality services.",
      },
      {
        name: "keywords",
        content:
          t("meta_keywords") ||
          "tourism consultant, travel planning, flight booking, hospitality services, Maz Travel, Ahmed Salama",
      },
      { property: "og:title", content: t("meta_title") || "Ahmed Salama | Tourism Consultant & VP at Maz Travel" },
      {
        property: "og:description",
        content:
          t("meta_description") ||
          "Professional tourism consultant specializing in travel planning, flight booking, and hospitality services.",
      },
      { property: "og:image", content: "https://ahmed-salama.vercel.app/ahmed-salama.png" },
      { property: "og:url", content: "https://ahmed-salama.vercel.app/" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: t("tourism_hub") || "Ahmed Salama's Tourism Hub" },
      {
        property: "og:locale",
        content:
          language === "ar"
            ? "ar_EG"
            : language === "de"
              ? "de_DE"
              : language === "ru"
                ? "ru_RU"
                : language === "pl"
                  ? "pl_PL"
                  : "en_US",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: t("meta_title") || "Ahmed Salama | Tourism Consultant" },
      {
        name: "twitter:description",
        content:
          t("meta_description") ||
          "Professional tourism consultant specializing in travel planning, flight booking, and hospitality services.",
      },
      { name: "twitter:image", content: "https://ahmed-salama.vercel.app/ahmed-salama.png" },
      { name: "twitter:creator", content: "@Ahmed_Salama_Ha" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "bingbot", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "author", content: "Ahmed Salama" },
      { name: "theme-color", content: "#1e3a8a" },
      // Localization meta tags
      { name: "geo.region", content: "EG-Red Sea" },
      { name: "geo.placename", content: "Hurghada" },
      { name: "geo.position", content: "27.2579;33.8116" },
      { name: "ICBM", content: "27.2579, 33.8116" },
    ]

    // Add meta tags to the page
    const addedMetaTags = metaTags.map((tag) => {
      const meta = document.createElement("meta")
      Object.keys(tag).forEach((key) => {
        meta.setAttribute(key, tag[key])
      })
      document.head.appendChild(meta)
      return meta
    })

    // Add canonical link
    const canonicalLink = document.createElement("link")
    canonicalLink.rel = "canonical"
    canonicalLink.href = "https://ahmed-salama.vercel.app/"
    document.head.appendChild(canonicalLink)

    // Add alternate language links
    const alternateLanguages = [
      { hreflang: "en", href: "https://ahmed-salama.vercel.app/?lang=en" },
      { hreflang: "ar", href: "https://ahmed-salama.vercel.app/?lang=ar" },
      { hreflang: "de", href: "https://ahmed-salama.vercel.app/?lang=de" },
      { hreflang: "ru", href: "https://ahmed-salama.vercel.app/?lang=ru" },
      { hreflang: "pl", href: "https://ahmed-salama.vercel.app/?lang=pl" },
      { hreflang: "x-default", href: "https://ahmed-salama.vercel.app/" },
    ]

    const alternateLinks = alternateLanguages.map((lang) => {
      const link = document.createElement("link")
      link.rel = "alternate"
      link.hreflang = lang.hreflang
      link.href = lang.href
      document.head.appendChild(link)
      return link
    })

    return () => {
      // Clean up
      scripts.forEach((script) => document.head.removeChild(script))
      addedMetaTags.forEach((meta) => document.head.removeChild(meta))
      document.head.removeChild(canonicalLink)
      alternateLinks.forEach((link) => document.head.removeChild(link))
    }
  }, [t, language])

  return null
}
