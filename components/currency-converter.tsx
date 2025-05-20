"use client"

import { useState, useEffect } from "react"
import { RefreshCw, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function CurrencyConverter() {
  const { t } = useLanguage()
  const [amount, setAmount] = useState("100")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EGP")
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Sample exchange rates (in a real app, these would come from an API)
  const exchangeRates = {
    USD: { EGP: 30.9, EUR: 0.92, GBP: 0.79, SAR: 3.75, AED: 3.67 },
    EGP: { USD: 0.032, EUR: 0.03, GBP: 0.026, SAR: 0.12, AED: 0.12 },
    EUR: { USD: 1.09, EGP: 33.6, GBP: 0.86, SAR: 4.08, AED: 4.0 },
    GBP: { USD: 1.27, EGP: 39.15, EUR: 1.17, SAR: 4.76, AED: 4.66 },
    SAR: { USD: 0.27, EGP: 8.24, EUR: 0.25, GBP: 0.21, AED: 0.98 },
    AED: { USD: 0.27, EGP: 8.42, EUR: 0.25, GBP: 0.21, SAR: 1.02 },
  }

  const currencies = [
    { code: "USD", name: t("currency_usd") },
    { code: "EGP", name: t("currency_egp") },
    { code: "EUR", name: t("currency_eur") },
    { code: "GBP", name: t("currency_gbp") },
    { code: "SAR", name: t("currency_sar") },
    { code: "AED", name: t("currency_aed") },
  ]

  // Convert currency
  const convertCurrency = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (fromCurrency === toCurrency) {
        setConvertedAmount(Number.parseFloat(amount))
      } else {
        const rate =
          exchangeRates[fromCurrency as keyof typeof exchangeRates][
            toCurrency as keyof (typeof exchangeRates)[typeof fromCurrency]
          ]
        setConvertedAmount(Number.parseFloat(amount) * rate)
      }
      setLastUpdated(new Date())
      setIsLoading(false)
    }, 500)
  }

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  // Convert on mount and when inputs change
  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      convertCurrency()
    }
  }, [amount, fromCurrency, toCurrency])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t("currency_converter")}</h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("amount")}
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
            min="0"
            step="any"
          />
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
          <div>
            <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("from")}
            </label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={swapCurrencies}
            className="mt-6 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label={t("swap_currencies")}
          >
            <RefreshCw className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>

          <div>
            <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("to")}
            </label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={convertCurrency}
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t("converting")}
              </>
            ) : (
              <>
                <ArrowRight className="h-5 w-5" />
                {t("convert")}
              </>
            )}
          </button>
        </div>

        {convertedAmount !== null && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t("result")}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {Number.parseFloat(amount).toLocaleString()} {fromCurrency} ={" "}
              {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency}
            </div>
            {lastUpdated && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {t("last_updated")}: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
