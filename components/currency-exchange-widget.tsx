"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { RefreshCw, ArrowRight, ArrowLeft, AlertCircle, Info, TrendingUp, TrendingDown } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import AnimatedSection from "./animated-section"
import { getExchangeRate } from "@/lib/currency-api"
import { motion } from "framer-motion"

export default function CurrencyExchangeWidget() {
  const { t, language, dir } = useLanguage()
  const [amount, setAmount] = useState("100")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EGP")
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [previousRate, setPreviousRate] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isUsingFallback, setIsUsingFallback] = useState(false)
  const [showTrend, setShowTrend] = useState(false)
  const amountInputRef = useRef<HTMLInputElement>(null)

  // Convert currency
  const convertCurrency = useCallback(async () => {
    if (!amount || isNaN(Number(amount))) {
      setError(t("invalid_amount") || "Please enter a valid amount")
      return
    }

    setIsLoading(true)
    setError(null)
    setIsUsingFallback(false)

    try {
      if (fromCurrency === toCurrency) {
        setExchangeRate(1)
        setConvertedAmount(Number.parseFloat(amount))
      } else {
        // Reset the fallback flag
        // @ts-ignore
        window.__usingFallbackRates = false

        // Save previous rate for trend indicator
        if (exchangeRate) {
          setPreviousRate(exchangeRate)
        }

        const rate = await getExchangeRate(fromCurrency, toCurrency)

        // Check if we're using fallback rates
        // @ts-ignore
        setIsUsingFallback(window.__usingFallbackRates === true)

        if (rate !== null) {
          setExchangeRate(rate)
          setConvertedAmount(Number.parseFloat(amount) * rate)

          // Show trend indicator if we have a previous rate
          if (previousRate !== null) {
            setShowTrend(true)
            // Hide trend after 5 seconds
            setTimeout(() => setShowTrend(false), 5000)
          }
        } else {
          throw new Error("Could not get exchange rate")
        }
      }

      setLastUpdated(new Date())
    } catch (err) {
      console.error("Error converting currency:", err)
      setError(err instanceof Error ? err.message : t("api_error") || "Failed to convert currency")
    } finally {
      setIsLoading(false)
    }
  }, [amount, fromCurrency, toCurrency, t, exchangeRate, previousRate])

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  // Convert on mount and when inputs change
  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      // Add a small delay to avoid too many API calls when typing
      const timer = setTimeout(() => {
        convertCurrency()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [amount, fromCurrency, toCurrency, convertCurrency])

  // Focus input on mount
  useEffect(() => {
    if (amountInputRef.current) {
      amountInputRef.current.focus()
    }
  }, [])

  // List of available currencies
  const currencies = [
    { code: "USD", name: t("currency_usd") || "US Dollar" },
    { code: "EGP", name: t("currency_egp") || "Egyptian Pound" },
    { code: "EUR", name: t("currency_eur") || "Euro" },
    { code: "GBP", name: t("currency_gbp") || "British Pound" },
    { code: "SAR", name: t("currency_sar") || "Saudi Riyal" },
    { code: "AED", name: t("currency_aed") || "UAE Dirham" },
  ]

  // Get trend direction
  const getTrendDirection = () => {
    if (!previousRate || !exchangeRate) return null
    if (exchangeRate > previousRate) return "up"
    if (exchangeRate < previousRate) return "down"
    return null
  }

  const trendDirection = getTrendDirection()

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="max-w-md mx-auto bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              {t("currency_converter") || "Currency Converter"}
            </h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="amount" className="form-label">
                  {t("amount") || "Amount"}
                </label>
                <input
                  type="number"
                  id="amount"
                  ref={amountInputRef}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="form-input"
                  min="0"
                  step="any"
                  aria-describedby={error ? "amount-error" : undefined}
                />
              </div>

              <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
                <div>
                  <label htmlFor="fromCurrency" className="form-label">
                    {t("from") || "From"}
                  </label>
                  <select
                    id="fromCurrency"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="form-select"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code} className="currency-name">
                        {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={swapCurrencies}
                  className="mt-6 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors hover-scale"
                  aria-label={t("swap_currencies") || "Swap currencies"}
                >
                  {dir === "rtl" ? (
                    <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <ArrowRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  )}
                </button>

                <div>
                  <label htmlFor="toCurrency" className="form-label">
                    {t("to") || "To"}
                  </label>
                  <select
                    id="toCurrency"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="form-select"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code} className="currency-name">
                        {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <motion.button
                  onClick={convertCurrency}
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t("converting") || "Converting..."}
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-5 w-5" />
                      {t("convert") || "Convert"}
                    </>
                  )}
                </motion.button>
              </div>

              {error && (
                <div
                  className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg flex items-start gap-2"
                  id="amount-error"
                  role="alert"
                >
                  <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {convertedAmount !== null && !error && (
                <motion.div
                  className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t("result") || "Result"}</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Number.parseFloat(amount).toLocaleString()} {fromCurrency} ={" "}
                    {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency}
                  </div>
                  {exchangeRate && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                      <span>{t("exchange_rate") || "Exchange Rate"}:</span>
                      <span className="mx-1">
                        1 {fromCurrency} = {exchangeRate.toLocaleString(undefined, { maximumFractionDigits: 4 })}{" "}
                        {toCurrency}
                      </span>

                      {showTrend && trendDirection && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`ml-2 ${trendDirection === "up" ? "text-green-500" : "text-red-500"}`}
                        >
                          {trendDirection === "up" ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                        </motion.span>
                      )}
                    </div>
                  )}
                  {lastUpdated && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {t("last_updated") || "Last updated"}: {lastUpdated.toLocaleString()}
                    </div>
                  )}

                  {isUsingFallback && (
                    <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 rounded-md text-xs flex items-center gap-1">
                      <Info className="h-4 w-4 flex-shrink-0" />
                      <span>{t("using_fallback_rates") || "Using approximate rates. Live rates unavailable."}</span>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
