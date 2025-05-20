"use client"

import dynamic from "next/dynamic"
import { Suspense, lazy, useState, useEffect } from "react"
import ClientOnly from "@/components/client-only"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import AnimatedCredentials from "@/components/animated-credentials"
import ExperienceSection from "@/components/experience-section"
import SkillsSection from "@/components/skills-section"
import ServicesSection from "@/components/services-section"
import Navbar from "@/components/navbar"
import SeoOptimization from "@/components/seo-optimization"
import PerformanceOptimization from "@/components/performance-optimization"
import ImageLoader from "@/components/image-loader"
import AnimatedBackground from "@/components/animated-background"
import NotificationSystem from "@/components/notification-system"
import ScrollToTop from "@/components/scroll-to-top"
import AdvancedLoading from "@/components/advanced-loading"

// High priority components (load immediately)
const WorkSection = dynamic(() => import("@/components/work-section"))
const CertificationsSection = dynamic(() => import("@/components/certifications-section"))
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section"))
const BlogSection = dynamic(() => import("@/components/blog-section"))
const FaqSection = dynamic(() => import("@/components/faq-section"))
const ContactSection = dynamic(() => import("@/components/contact-section"))
const Footer = dynamic(() => import("@/components/footer"))
const CurrencyExchangeWidget = dynamic(() => import("@/components/currency-exchange-widget"), { ssr: false })

// Medium priority components (load after initial render)
const SpecialOfferCountdown = dynamic(() => import("@/components/special-offer-countdown"), {
  ssr: false,
  loading: () => <div className="py-16 bg-white dark:bg-gray-800 animate-pulse h-64"></div>,
})
const CertificationsCarousel = dynamic(() => import("@/components/certifications-carousel"), {
  ssr: false,
  loading: () => <div className="py-16 bg-white dark:bg-gray-800 animate-pulse h-64"></div>,
})
const TestimonialsSlider = dynamic(() => import("@/components/testimonials-slider"), {
  ssr: false,
  loading: () => <div className="py-16 bg-gray-50 dark:bg-gray-900 animate-pulse h-64"></div>,
})

// Low priority components (load when user scrolls near them)
const InteractiveDestinationsMap = lazy(() => import("@/components/interactive-destinations-map"))
const TripCostCalculator = lazy(() => import("@/components/trip-cost-calculator"))
const FeaturedReviews = lazy(() => import("@/components/featured-reviews"))
const SmartRecommendations = lazy(() => import("@/components/smart-recommendations"))
const QuickBookingForm = lazy(() => import("@/components/quick-booking-form"))
const LiveChatWidget = lazy(() => import("@/components/live-chat-widget"))

export default function ClientPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Preload critical components
  useEffect(() => {
    const preloadComponents = async () => {
      // Preload high priority components
      const importPromises = [
        import("@/components/work-section"),
        import("@/components/certifications-section"),
        import("@/components/testimonials-section"),
      ]

      await Promise.all(importPromises)
    }

    preloadComponents()
  }, [])

  if (isLoading) {
    return <AdvancedLoading fullScreen={true} text="جاري تحميل تجربة سفر مميزة..." />
  }

  return (
    <main className="dark:bg-gray-800">
      <ClientOnly>
        <SeoOptimization />
        <PerformanceOptimization />
        <ImageLoader />
        <AnimatedBackground />
        <NotificationSystem position="top-right" />
        <Navbar />

        {/* Hero Section - Original version with profile image */}
        <HeroSection />

        {/* Animated Credentials */}
        <AnimatedCredentials />

        {/* About Section */}
        <AboutSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Special Offer Countdown */}
        <Suspense fallback={<div className="py-16 bg-white dark:bg-gray-800 animate-pulse h-64"></div>}>
          <SpecialOfferCountdown />
        </Suspense>

        {/* Interactive Destinations Map */}
        <Suspense fallback={<div className="py-16 bg-gray-50 dark:bg-gray-900 animate-pulse h-64"></div>}>
          <InteractiveDestinationsMap />
        </Suspense>

        {/* Work Section */}
        <WorkSection />

        {/* Trip Cost Calculator */}
        <Suspense fallback={<div className="py-16 bg-white dark:bg-gray-800 animate-pulse h-64"></div>}>
          <TripCostCalculator />
        </Suspense>

        {/* Currency Exchange Widget */}
        <CurrencyExchangeWidget />

        {/* Certifications Carousel - New design */}
        <Suspense fallback={<div className="py-16 bg-white dark:bg-gray-800 animate-pulse h-64"></div>}>
          <CertificationsCarousel />
        </Suspense>

        {/* Certifications Section - Original detailed view */}
        <CertificationsSection />

        {/* Smart Recommendations */}
        <Suspense fallback={<div className="py-16 bg-gray-50 dark:bg-gray-900 animate-pulse h-64"></div>}>
          <SmartRecommendations />
        </Suspense>

        {/* Quick Booking Form */}
        <Suspense fallback={<div className="py-16 bg-white dark:bg-gray-800 animate-pulse h-64"></div>}>
          <QuickBookingForm />
        </Suspense>

        {/* Testimonials Slider - New design */}
        <Suspense fallback={<div className="py-16 bg-gray-50 dark:bg-gray-900 animate-pulse h-64"></div>}>
          <TestimonialsSlider />
        </Suspense>

        {/* Featured Reviews */}
        <Suspense fallback={<div className="py-16 bg-gray-50 dark:bg-gray-900 animate-pulse h-64"></div>}>
          <FeaturedReviews />
        </Suspense>

        {/* Testimonials Section - Original */}
        <TestimonialsSection />

        {/* Blog Section */}
        <BlogSection />

        {/* FAQ Section */}
        <FaqSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />

        {/* Floating Elements */}
        <ScrollToTop />
        <Suspense fallback={null}>
          <LiveChatWidget />
        </Suspense>
      </ClientOnly>
    </main>
  )
}
