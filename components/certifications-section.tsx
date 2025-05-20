"use client"

import { Award, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { useState } from "react"
import AnimatedSection from "./animated-section"
import ImageWithLoader from "./image-with-loader"
import { useLanguage } from "@/lib/i18n/language-context"

type CertificateCategory = "all" | "tourism" | "finance" | "management" | "technology"

interface Certificate {
  title: string
  issuer: string
  date: string
  description: string
  image: string
  id: string
  category: CertificateCategory
}

export default function CertificationsSection() {
  const { t, dir, language } = useLanguage()
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<CertificateCategory>("all")
  const certificationsPerPage = 6

  const certifications: Certificate[] = [
    {
      title: t("power_bi"),
      issuer: t("power_bi_issuer"),
      date: t("power_bi_date"),
      description: t("power_bi_desc"),
      image: "/certifications/power-bi.jpg",
      id: "CC-5C71BF95A3",
      category: "technology",
    },
    {
      title: t("chatgpt_ai"),
      issuer: t("chatgpt_ai_issuer"),
      date: t("chatgpt_ai_date"),
      description: t("chatgpt_ai_desc"),
      image: "/certifications/chatgpt-ai.jpg",
      id: "CC-87E1B6B682",
      category: "technology",
    },
    {
      title: t("dcf_valuation"),
      issuer: t("dcf_valuation_issuer"),
      date: t("dcf_valuation_date"),
      description: t("dcf_valuation_desc"),
      image: "/certifications/dcf-valuation.jpg",
      id: "CC-703AD7C887",
      category: "finance",
    },
    {
      title: t("blockchain"),
      issuer: t("blockchain_issuer"),
      date: t("blockchain_date"),
      description: t("blockchain_desc"),
      image: "/certifications/blockchain.jpg",
      id: "CC-9F08DD9FE3",
      category: "technology",
    },
    {
      title: t("finance_roles"),
      issuer: t("finance_roles_issuer"),
      date: t("finance_roles_date"),
      description: t("finance_roles_desc"),
      image: "/certifications/finance-roles.jpg",
      id: "CC-8F3F29485A",
      category: "finance",
    },
    {
      title: t("tableau"),
      issuer: t("tableau_issuer"),
      date: t("tableau_date"),
      description: t("tableau_desc"),
      image: "/certifications/tableau.jpg",
      id: "CC-5F3484F08F",
      category: "technology",
    },
    {
      title: t("excel"),
      issuer: t("excel_issuer"),
      date: t("excel_date"),
      description: t("excel_desc"),
      image: "/certifications/excel.jpg",
      id: "CC-736DA155C0",
      category: "technology",
    },
    {
      title: t("communication"),
      issuer: t("communication_issuer"),
      date: t("communication_date"),
      description: t("communication_desc"),
      image: "/certifications/communication.jpg",
      id: "CC-226C76A011",
      category: "management",
    },
    {
      title: t("math_finance"),
      issuer: t("math_finance_issuer"),
      date: t("math_finance_date"),
      description: t("math_finance_desc"),
      image: "/certifications/math-finance.jpg",
      id: "CC-73E580A2BE",
      category: "finance",
    },
    // New certificates
    {
      title: t("accounting_analysis"),
      issuer: t("accounting_analysis_issuer"),
      date: t("accounting_analysis_date"),
      description: t("accounting_analysis_desc"),
      image: "/certifications/accounting-analysis.jpg",
      id: "CC-402475532C",
      category: "finance",
    },
    {
      title: t("revenue_analytics"),
      issuer: t("revenue_analytics_issuer"),
      date: t("revenue_analytics_date"),
      description: t("revenue_analytics_desc"),
      image: "/certifications/revenue-analytics.jpg",
      id: "CC-BF080B103B",
      category: "finance",
    },
    {
      title: t("powerpoint"),
      issuer: t("powerpoint_issuer"),
      date: t("powerpoint_date"),
      description: t("powerpoint_desc"),
      image: "/certifications/powerpoint.jpg",
      id: "CC-D4DC929435",
      category: "technology",
    },
    {
      title: t("project_management"),
      issuer: t("project_management_issuer"),
      date: t("project_management_date"),
      description: t("project_management_desc"),
      image: "/certifications/project-management.jpg",
      id: "CC-F1B1C40481",
      category: "management",
    },
    {
      title: t("business_analytics"),
      issuer: t("business_analytics_issuer"),
      date: t("business_analytics_date"),
      description: t("business_analytics_desc"),
      image: "/certifications/business-analytics.jpg",
      id: "CC-C32E7DE0D5",
      category: "management",
    },
    {
      title: t("excel_pivot"),
      issuer: t("excel_pivot_issuer"),
      date: t("excel_pivot_date"),
      description: t("excel_pivot_desc"),
      image: "/certifications/excel-pivot.jpg",
      id: "CC-4707EA4128",
      category: "technology",
    },
    {
      title: t("fpa_budget"),
      issuer: t("fpa_budget_issuer"),
      date: t("fpa_budget_date"),
      description: t("fpa_budget_desc"),
      image: "/certifications/fpa-budget.jpg",
      id: "CC-E81A514D66",
      category: "finance",
    },
    {
      title: t("financial_reporting"),
      issuer: t("financial_reporting_issuer"),
      date: t("financial_reporting_date"),
      description: t("financial_reporting_desc"),
      image: "/certifications/financial-reporting.jpg",
      id: "CC-2246F23BE2",
      category: "finance",
    },
    {
      title: t("portfolio_management"),
      issuer: t("portfolio_management_issuer"),
      date: t("portfolio_management_date"),
      description: t("portfolio_management_desc"),
      image: "/certifications/portfolio-management.jpg",
      id: "CC-DAFC7AA549",
      category: "finance",
    },
    {
      title: t("equity_securities"),
      issuer: t("equity_securities_issuer"),
      date: t("equity_securities_date"),
      description: t("equity_securities_desc"),
      image: "/certifications/equity-securities.jpg",
      id: "CC-81011AFEFD",
      category: "finance",
    },
    {
      title: t("financial_ratio"),
      issuer: t("financial_ratio_issuer"),
      date: t("financial_ratio_date"),
      description: t("financial_ratio_desc"),
      image: "/certifications/financial-ratio.jpg",
      id: "CC-F04A3C0D20",
      category: "finance",
    },
    {
      title: t("resume_optimization"),
      issuer: t("resume_optimization_issuer"),
      date: t("resume_optimization_date"),
      description: t("resume_optimization_desc"),
      image: "/certifications/resume-optimization.jpg",
      id: "129030445",
      category: "management",
    },
    {
      title: t("cma"),
      issuer: t("cma_issuer"),
      date: t("in_progress"),
      description: t("cma_desc"),
      image: "/certifications/cma.jpg",
      id: "CMA-2024",
      category: "finance",
    },
    {
      title: t("tourism_cert"),
      issuer: t("tourism_cert_issuer"),
      date: "2019",
      description: t("tourism_cert_desc"),
      image: "/certifications/tourism.jpg",
      id: "TCF-2019",
      category: "tourism",
    },
    {
      title: t("hotel_cert"),
      issuer: t("hotel_cert_issuer"),
      date: "2017",
      description: t("hotel_cert_desc"),
      image: "/certifications/hotel.jpg",
      id: "HM-2017",
      category: "tourism",
    },
  ]

  // Filter certifications by category
  const filteredCertifications =
    selectedCategory === "all" ? certifications : certifications.filter((cert) => cert.category === selectedCategory)

  const totalPages = Math.ceil(filteredCertifications.length / certificationsPerPage)
  const displayedCertifications = filteredCertifications.slice(
    currentPage * certificationsPerPage,
    (currentPage + 1) * certificationsPerPage,
  )

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  // Reset to first page when changing category
  const handleCategoryChange = (category: CertificateCategory) => {
    setSelectedCategory(category)
    setCurrentPage(0)
  }

  // Get count of certificates by category
  const getCategoryCount = (category: CertificateCategory) => {
    if (category === "all") return certifications.length
    return certifications.filter((cert) => cert.category === category).length
  }

  return (
    <section id="certifications" className="py-16 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex justify-center mb-12">
            <h2 className="section-title">{t("certifications_title")}</h2>
          </div>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t("all_categories")} ({getCategoryCount("all")})
            </button>
            <button
              onClick={() => handleCategoryChange("tourism")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "tourism"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t("tourism_category")} ({getCategoryCount("tourism")})
            </button>
            <button
              onClick={() => handleCategoryChange("finance")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "finance"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t("finance_category")} ({getCategoryCount("finance")})
            </button>
            <button
              onClick={() => handleCategoryChange("management")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "management"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t("management_category")} ({getCategoryCount("management")})
            </button>
            <button
              onClick={() => handleCategoryChange("technology")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "technology"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t("technology_category")} ({getCategoryCount("technology")})
            </button>
          </div>
        </AnimatedSection>

        {/* Certification Grid with Pagination */}
        <div className="max-w-6xl mx-auto mb-8">
          {displayedCertifications.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCertifications.map((cert, index) => (
                <AnimatedSection key={cert.id}>
                  <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                    <div className="certification-image p-2">
                      <ImageWithLoader
                        src={cert.image || "/placeholder.svg"}
                        alt={cert.title}
                        width={400}
                        height={300}
                        className="rounded-md w-full h-auto object-cover"
                      />
                    </div>
                    <div className="p-5 flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="certification-point bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-primary">{cert.title}</h3>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-700 dark:text-gray-300">{cert.issuer}</p>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{cert.date}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{cert.description}</p>
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
                        <span>ID: {cert.id}</span>
                        <span className="bg-primary/10 dark:bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                          {t(`${cert.category}_category`)}
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">{t("no_certificates_found")}</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {filteredCertifications.length > certificationsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevPage}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="text-gray-700 dark:text-gray-300">
              {currentPage + 1} / {totalPages}
            </div>
            <button
              onClick={nextPage}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Sort by Date Option */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              // Sort by date (newest first)
              certifications.sort((a, b) => {
                if (a.date === t("in_progress")) return -1
                if (b.date === t("in_progress")) return 1
                return new Date(b.date).getTime() - new Date(a.date).getTime()
              })
              setCurrentPage(0)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>{t("sort_by_date")}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
