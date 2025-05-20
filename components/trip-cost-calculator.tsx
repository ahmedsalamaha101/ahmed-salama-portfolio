"use client"

import { useState, useEffect } from "react"
import { Calculator, Calendar, Users, Plane, Hotel, Car, CreditCard } from "lucide-react"
import AnimatedSection from "./animated-section"
import { useLanguage } from "@/lib/i18n/language-context"

interface DestinationOption {
  id: string
  name: string
  flightCost: number
  hotelCostPerNight: number
  transferCost: number
  visaCost: number | null
  currency: string
}

export default function TripCostCalculator() {
  const { t } = useLanguage()
  const [destination, setDestination] = useState("")
  const [travelers, setTravelers] = useState(2)
  const [nights, setNights] = useState(5)
  const [includeVisa, setIncludeVisa] = useState(true)
  const [includeTransfer, setIncludeTransfer] = useState(true)
  const [hotelClass, setHotelClass] = useState<"economy" | "standard" | "luxury">("standard")
  const [flightClass, setFlightClass] = useState<"economy" | "business" | "first">("economy")
  const [totalCost, setTotalCost] = useState(0)
  const [breakdown, setBreakdown] = useState<Record<string, number>>({})

  // Destination options
  const destinations: DestinationOption[] = [
    {
      id: "egypt",
      name: t("destination_egypt"),
      flightCost: 300,
      hotelCostPerNight: 80,
      transferCost: 50,
      visaCost: 25,
      currency: "USD",
    },
    {
      id: "dubai",
      name: t("destination_dubai"),
      flightCost: 400,
      hotelCostPerNight: 150,
      transferCost: 70,
      visaCost: 90,
      currency: "USD",
    },
    {
      id: "turkey",
      name: t("destination_turkey"),
      flightCost: 350,
      hotelCostPerNight: 100,
      transferCost: 60,
      visaCost: 60,
      currency: "USD",
    },
    {
      id: "maldives",
      name: t("destination_maldives"),
      flightCost: 800,
      hotelCostPerNight: 300,
      transferCost: 100,
      visaCost: 30,
      currency: "USD",
    },
    {
      id: "morocco",
      name: t("destination_morocco"),
      flightCost: 400,
      hotelCostPerNight: 90,
      transferCost: 55,
      visaCost: 30,
      currency: "USD",
    },
  ]

  // Calculate total cost when inputs change
  useEffect(() => {
    if (!destination) return

    const selectedDestination = destinations.find((d) => d.id === destination)
    if (!selectedDestination) return

    // Apply multipliers based on hotel class
    const hotelMultiplier = hotelClass === "economy" ? 0.7 : hotelClass === "luxury" ? 2 : 1

    // Apply multipliers based on flight class
    const flightMultiplier = flightClass === "economy" ? 1 : flightClass === "business" ? 2.5 : 4

    // Calculate costs
    const flightCost = selectedDestination.flightCost * travelers * flightMultiplier
    const hotelCost = selectedDestination.hotelCostPerNight * nights * Math.ceil(travelers / 2) * hotelMultiplier
    const transferCost = includeTransfer ? selectedDestination.transferCost * travelers : 0
    const visaCost = includeVisa && selectedDestination.visaCost ? selectedDestination.visaCost * travelers : 0

    // Set breakdown
    const newBreakdown = {
      flight: flightCost,
      hotel: hotelCost,
      transfer: transferCost,
      visa: visaCost,
    }
    setBreakdown(newBreakdown)

    // Calculate total
    const total = Object.values(newBreakdown).reduce((sum, cost) => sum + cost, 0)
    setTotalCost(total)
  }, [destination, travelers, nights, includeVisa, includeTransfer, hotelClass, flightClass])

  return (
    <section id="trip-calculator" className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex justify-center mb-12">
            <h2 className="section-title">{t("trip_calculator_title")}</h2>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                      <Calculator className="mr-2 h-5 w-5 text-primary" />
                      {t("trip_details")}
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t("select_destination")}
                        </label>
                        <select
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                        >
                          <option value="">{t("select_destination_placeholder")}</option>
                          {destinations.map((dest) => (
                            <option key={dest.id} value={dest.id}>
                              {dest.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            <Users className="inline-block mr-1 h-4 w-4" />
                            {t("travelers")}
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="20"
                            value={travelers}
                            onChange={(e) => setTravelers(Math.max(1, Number.parseInt(e.target.value) || 1))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            <Calendar className="inline-block mr-1 h-4 w-4" />
                            {t("nights")}
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="30"
                            value={nights}
                            onChange={(e) => setNights(Math.max(1, Number.parseInt(e.target.value) || 1))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <Hotel className="inline-block mr-1 h-4 w-4" />
                          {t("hotel_class")}
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setHotelClass("economy")}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                              hotelClass === "economy"
                                ? "bg-primary text-white"
                                : "bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-500"
                            }`}
                          >
                            {t("economy")}
                          </button>
                          <button
                            type="button"
                            onClick={() => setHotelClass("standard")}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                              hotelClass === "standard"
                                ? "bg-primary text-white"
                                : "bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-500"
                            }`}
                          >
                            {t("standard")}
                          </button>
                          <button
                            type="button"
                            onClick={() => setHotelClass("luxury")}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                              hotelClass === "luxury"
                                ? "bg-primary text-white"
                                : "bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-500"
                            }`}
                          >
                            {t("luxury")}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <Plane className="inline-block mr-1 h-4 w-4" />
                          {t("flight_class")}
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setFlightClass("economy")}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                              flightClass === "economy"
                                ? "bg-primary text-white"
                                : "bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-500"
                            }`}
                          >
                            {t("economy")}
                          </button>
                          <button
                            type="button"
                            onClick={() => setFlightClass("business")}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                              flightClass === "business"
                                ? "bg-primary text-white"
                                : "bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-500"
                            }`}
                          >
                            {t("business")}
                          </button>
                          <button
                            type="button"
                            onClick={() => setFlightClass("first")}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                              flightClass === "first"
                                ? "bg-primary text-white"
                                : "bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-500"
                            }`}
                          >
                            {t("first_class")}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="flex items-center">
                          <input
                            id="include-visa"
                            type="checkbox"
                            checked={includeVisa}
                            onChange={(e) => setIncludeVisa(e.target.checked)}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label htmlFor="include-visa" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            {t("include_visa")}
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="include-transfer"
                            type="checkbox"
                            checked={includeTransfer}
                            onChange={(e) => setIncludeTransfer(e.target.checked)}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label
                            htmlFor="include-transfer"
                            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                          >
                            {t("include_transfer")}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-primary" />
                      {t("cost_breakdown")}
                    </h3>

                    {destination ? (
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center">
                              <Plane className="h-4 w-4 mr-2 text-primary" />
                              <span className="text-gray-700 dark:text-gray-300">{t("flight")}</span>
                            </div>
                            <span className="font-medium">
                              ${breakdown.flight?.toLocaleString()}{" "}
                              {destinations.find((d) => d.id === destination)?.currency}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center">
                              <Hotel className="h-4 w-4 mr-2 text-primary" />
                              <span className="text-gray-700 dark:text-gray-300">{t("accommodation")}</span>
                            </div>
                            <span className="font-medium">
                              ${breakdown.hotel?.toLocaleString()}{" "}
                              {destinations.find((d) => d.id === destination)?.currency}
                            </span>
                          </div>
                          {breakdown.transfer > 0 && (
                            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                              <div className="flex items-center">
                                <Car className="h-4 w-4 mr-2 text-primary" />
                                <span className="text-gray-700 dark:text-gray-300">{t("transfer")}</span>
                              </div>
                              <span className="font-medium">
                                ${breakdown.transfer?.toLocaleString()}{" "}
                                {destinations.find((d) => d.id === destination)?.currency}
                              </span>
                            </div>
                          )}
                          {breakdown.visa > 0 && (
                            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                              <div className="flex items-center">
                                <svg
                                  className="h-4 w-4 mr-2 text-primary"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                  />
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300">{t("visa")}</span>
                              </div>
                              <span className="font-medium">
                                ${breakdown.visa?.toLocaleString()}{" "}
                                {destinations.find((d) => d.id === destination)?.currency}
                              </span>
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-2 text-lg font-bold">
                            <span className="text-gray-800 dark:text-white">{t("total_cost")}</span>
                            <span className="text-primary">
                              ${totalCost.toLocaleString()} {destinations.find((d) => d.id === destination)?.currency}
                            </span>
                          </div>
                        </div>

                        <div className="mt-6">
                          <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
                            {t("request_quote")}
                          </button>
                        </div>

                        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                          {t("price_estimate_disclaimer")}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm flex flex-col items-center justify-center h-full">
                        <svg
                          className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                          {t("select_destination_to_calculate")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t("trip_calculator_description")}</p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
