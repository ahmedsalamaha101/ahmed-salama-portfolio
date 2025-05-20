// Interface for API response
export interface ExchangeRateResponse {
  success?: boolean
  rates?: Record<string, number>
  result?: number
  error?: {
    code?: string
    message?: string
  }
}

// Cache for exchange rates
interface RateCache {
  [key: string]: {
    rate: number
    timestamp: number
  }
}

// Cache duration in milliseconds (30 minutes)
const CACHE_DURATION = 30 * 60 * 1000

// In-memory cache
const rateCache: RateCache = {}

// Fallback exchange rates in case API fails
const fallbackRates: Record<string, Record<string, number>> = {
  USD: { EGP: 48.65, EUR: 0.92, GBP: 0.79, SAR: 3.75, AED: 3.67 },
  EGP: { USD: 0.0206, EUR: 0.019, GBP: 0.016, SAR: 0.077, AED: 0.076 },
  EUR: { USD: 1.09, EGP: 53.1, GBP: 0.86, SAR: 4.08, AED: 4.0 },
  GBP: { USD: 1.27, EGP: 61.7, EUR: 1.16, SAR: 4.76, AED: 4.66 },
  SAR: { USD: 0.27, EGP: 12.97, EUR: 0.245, GBP: 0.21, AED: 0.98 },
  AED: { USD: 0.272, EGP: 13.25, EUR: 0.25, GBP: 0.215, SAR: 1.02 },
}

/**
 * Fetches the exchange rate between two currencies
 * Uses a cache to reduce API calls
 */
export async function getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number | null> {
  // If same currency, return 1
  if (fromCurrency === toCurrency) {
    return 1
  }

  // Create cache key
  const cacheKey = `${fromCurrency}_${toCurrency}`

  // Check if we have a cached rate that's still valid
  const cachedRate = rateCache[cacheKey]
  const now = Date.now()

  if (cachedRate && now - cachedRate.timestamp < CACHE_DURATION) {
    console.log(`Using cached exchange rate for ${cacheKey}`)
    return cachedRate.rate
  }

  try {
    // Try multiple APIs to get exchange rate
    let rate = await fetchFromExchangeRateAPI(fromCurrency, toCurrency)

    if (rate === null) {
      // Try alternative API
      rate = await fetchFromFreeCurrencyAPI(fromCurrency, toCurrency)
    }

    if (rate === null) {
      // Use fallback rates as last resort
      rate = getFallbackRate(fromCurrency, toCurrency)
      console.log(`Using fallback rate for ${cacheKey}: ${rate}`)
      // Set a flag to indicate we're using fallback rates
      // @ts-ignore
      window.__usingFallbackRates = true
    }

    if (rate !== null) {
      // Store in cache
      rateCache[cacheKey] = {
        rate,
        timestamp: now,
      }
      return rate
    }

    return null
  } catch (error) {
    console.error("Error fetching exchange rate:", error)

    // Use fallback rate if API fails
    const fallbackRate = getFallbackRate(fromCurrency, toCurrency)
    if (fallbackRate !== null) {
      console.log(`Using fallback rate after error for ${cacheKey}: ${fallbackRate}`)
      // Set a flag to indicate we're using fallback rates
      // @ts-ignore
      window.__usingFallbackRates = true

      rateCache[cacheKey] = {
        rate: fallbackRate,
        timestamp: now,
      }
      return fallbackRate
    }

    throw error
  }
}

/**
 * Try to fetch from ExchangeRate-API
 */
async function fetchFromExchangeRateAPI(fromCurrency: string, toCurrency: string): Promise<number | null> {
  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)

    if (!response.ok) {
      console.warn(`ExchangeRate-API request failed with status ${response.status}`)
      return null
    }

    const data = await response.json()

    if (data && data.rates && data.rates[toCurrency]) {
      return data.rates[toCurrency]
    }

    return null
  } catch (error) {
    console.warn("Error with ExchangeRate-API:", error)
    return null
  }
}

/**
 * Try to fetch from FreeCurrency API
 */
async function fetchFromFreeCurrencyAPI(fromCurrency: string, toCurrency: string): Promise<number | null> {
  try {
    const response = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency.toLowerCase()}/${toCurrency.toLowerCase()}.json`,
    )

    if (!response.ok) {
      console.warn(`FreeCurrency API request failed with status ${response.status}`)
      return null
    }

    const data = await response.json()

    if (data && data[toCurrency.toLowerCase()]) {
      return data[toCurrency.toLowerCase()]
    }

    return null
  } catch (error) {
    console.warn("Error with FreeCurrency API:", error)
    return null
  }
}

/**
 * Get fallback rate from hardcoded values
 */
function getFallbackRate(fromCurrency: string, toCurrency: string): number | null {
  if (fallbackRates[fromCurrency] && fallbackRates[fromCurrency][toCurrency] !== undefined) {
    return fallbackRates[fromCurrency][toCurrency]
  }
  return null
}

/**
 * Converts an amount from one currency to another
 */
export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
): Promise<number | null> {
  try {
    const rate = await getExchangeRate(fromCurrency, toCurrency)
    if (rate === null) {
      return null
    }
    return amount * rate
  } catch (error) {
    console.error("Error converting currency:", error)
    throw error
  }
}
