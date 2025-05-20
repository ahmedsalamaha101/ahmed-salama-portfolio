import { Suspense } from "react"
import ClientPage from "./client-page"
import PageTransition from "@/components/page-transition"

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-gray-900"></div>}>
      <PageTransition>
        <ClientPage />
      </PageTransition>
    </Suspense>
  )
}
