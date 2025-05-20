"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles, Calendar, Users, DollarSign, ThumbsUp } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface Recommendation {
  id: string
  title: string
  description: string
  image: string
  price: string
  rating: number
  duration: string
  category: string
  features: string[]
  match: number
}

export default function SmartRecommendations() {
  const { t } = useLanguage()
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")

  // Simulate fetching recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Sample recommendations data
      const data: Recommendation[] = [
        {
          id: "rec1",
          title: t("recommendation_1_title"),
          description: t("recommendation_1_description"),
          image: "/recommendations/egypt-tour.jpg",
          price: "$1,200",
          rating: 4.8,
          duration: "7 days",
          category: "family",
          features: [t("feature_guided_tours"), t("feature_all_inclusive"), t("feature_luxury_hotel")],
          match: 95,
        },
        {
          id: "rec2",
          title: t("recommendation_2_title"),
          description: t("recommendation_2_description"),
          image: "/recommendations/dubai-luxury.jpg",
          price: "$2,500",
          rating: 4.9,
          duration: "5 days",
          category: "luxury",
          features: [t("feature_vip_service"), t("feature_private_transfer"), t("feature_exclusive_access")],
          match: 88,
        },
        {
          id: "rec3",
          title: t("recommendation_3_title"),
          description: t("recommendation_3_description"),
          image: "/recommendations/turkey-adventure.jpg",
          price: "$950",
          rating: 4.7,
          duration: "10 days",
          category: "adventure",
          features: [t("feature_outdoor_activities"), t("feature_local_guides"), t("feature_authentic_experience")],
          match: 92,
        },
        {
          id: "rec4",
          title: t("recommendation_4_title"),
          description: t("recommendation_4_description"),
          image: "/recommendations/maldives-honeymoon.jpg",
          price: "$3,200",
          rating: 4.9,
          duration: "7 days",
          category: "honeymoon",
          features: [t("feature_private_villa"), t("feature_romantic_dinners"), t("feature_couples_spa")],
          match: 97,
        },
      ]

      setRecommendations(data)
      setIsLoading(false)
    }

    fetchRecommendations()
  }, [t])

  // Filter recommendations by category
  const filteredRecommendations =
    activeCategory === "all" ? recommendations : recommendations.filter((rec) => rec.category === activeCategory)

  // Categories
  const categories = [
    { id: "all", label: t("all_categories") },
    { id: "family", label: t("category_family") },
    { id: "luxury", label: t("category_luxury") },
    { id: "adventure", label: t("category_adventure") },
    { id: "honeymoon", label: t("category_honeymoon") },
  ]

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    ))
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-1 rounded-full text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            {t("ai_powered")}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            {t("smart_recommendations_title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl text-center">
            {t("smart_recommendations_subtitle")}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={recommendation.image || "/placeholder.svg"}
                    alt={recommendation.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    {recommendation.match}% {t("match")}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 text-primary text-sm font-bold px-3 py-1 rounded-full">
                    {recommendation.price}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{recommendation.title}</h3>
                    <span className="bg-primary/10 dark:bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                      {t(`category_${recommendation.category}`)}
                    </span>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">{renderStars(recommendation.rating)}</div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{recommendation.rating.toFixed(1)}</span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{recommendation.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {recommendation.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      2-4
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {recommendation.price}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {recommendation.features.map((feature, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
                    {t("view_details")}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && filteredRecommendations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">{t("no_recommendations_found")}</p>
          </div>
        )}
      </div>
    </section>
  )
}
