"use client"

import Image from "next/image"
import Link from "next/link"
import { FileText, Mail, Download, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n/language-context"

export default function HeroSection() {
  const { t, dir } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 md:py-24 dark:bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col ${dir === "rtl" ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between gap-12`}
        >
          <motion.div className="md:w-1/2" variants={containerVariants} initial="hidden" animate="visible">
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-2 dark:text-white">
              {t("hi")}
            </motion.h1>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
              {t("im")} <span className="text-primary">{t("name")}</span>
            </motion.h2>
            <motion.h3 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-8 dark:text-white">
              {t("tourism_consultant")}
            </motion.h3>

            {/* Achievements Ticker */}
            <motion.div
              variants={itemVariants}
              className="mb-8 bg-primary/10 dark:bg-primary/20 p-3 rounded-md overflow-hidden"
            >
              <div className="achievements-ticker">
                <p className="text-primary font-medium">{t("achievement_ticker")}</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link href="/resume.pdf" className="btn-primary" download>
                <Download size={20} />
                {t("download_resume")}
              </Link>
              <Link href="/resume.pdf" className="btn-secondary" target="_blank">
                <FileText size={20} />
                {t("view_resume")}
              </Link>
              <Link href="#contact" className="btn-accent">
                <Mail size={20} />
                {t("contact")}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <motion.div
                className="absolute inset-0 bg-primary rounded-full transform scale-110"
                style={{ borderRadius: "70% 60% 70% 60%" }}
                animate={{
                  borderRadius: ["70% 60% 70% 60%", "60% 70% 60% 70%", "70% 60% 70% 60%"],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              ></motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-700 rounded-full p-2 w-56 h-56 md:w-72 md:h-72 overflow-hidden">
                  <Image
                    src="/ahmed-salama.png"
                    alt="Ahmed Salama's profile picture"
                    width={300}
                    height={300}
                    className="rounded-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <Link
          href="#about"
          className="flex flex-col items-center animate-bounce"
          aria-label="Scroll down"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          <span className="text-sm mb-2">{t("scroll_down")}</span>
          <ChevronDown className="h-6 w-6" />
        </Link>
      </motion.div>
    </section>
  )
}
