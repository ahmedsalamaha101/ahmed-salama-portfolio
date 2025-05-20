"use client"

import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import AnimatedSection from "./animated-section"
import OptimizedImage from "./optimized-image"
import { useLanguage } from "@/lib/i18n/language-context"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  image: string
  category: string
}

export default function BlogSection() {
  const { t } = useLanguage()

  const blogPosts: BlogPost[] = [
    {
      id: "top-destinations-2023",
      title: t("blog_post_1_title"),
      excerpt: t("blog_post_1_excerpt"),
      date: t("blog_post_1_date"),
      readTime: t("blog_post_1_read_time"),
      image: "/blog/destination.jpg",
      category: t("blog_category_travel"),
    },
    {
      id: "travel-tips-families",
      title: t("blog_post_2_title"),
      excerpt: t("blog_post_2_excerpt"),
      date: t("blog_post_2_date"),
      readTime: t("blog_post_2_read_time"),
      image: "/blog/family.jpg",
      category: t("blog_category_tips"),
    },
    {
      id: "budget-travel-guide",
      title: t("blog_post_3_title"),
      excerpt: t("blog_post_3_excerpt"),
      date: t("blog_post_3_date"),
      readTime: t("blog_post_3_read_time"),
      image: "/blog/budget.jpg",
      category: t("blog_category_guide"),
    },
  ]

  return (
    <section id="blog" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex justify-center mb-12">
            <h2 className="section-title">{t("blog_title")}</h2>
          </div>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <AnimatedSection key={post.id}>
                <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md h-full flex flex-col hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="relative h-48">
                    <OptimizedImage
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-full"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">{post.category}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center mr-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-primary font-medium flex items-center hover:underline mt-auto"
                    >
                      {t("read_more")}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-12 text-center">
            <Link href="/blog" className="btn-primary inline-flex">
              {t("view_all_posts")}
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
