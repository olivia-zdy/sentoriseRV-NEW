import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type MarketCode = 'DE' | 'FR' | 'UK' | 'US';
export type CurrencyCode = 'EUR' | 'GBP' | 'USD';
export type LanguageCode = 'de' | 'fr' | 'en';

interface MarketConfig {
  code: MarketCode;
  label: string;
  flag: string;
  language: LanguageCode;
  currency: CurrencyCode;
  currencySymbol: string;
}

export const MARKETS: MarketConfig[] = [
  { code: 'DE', label: 'Deutschland', flag: '🇩🇪', language: 'de', currency: 'EUR', currencySymbol: '€' },
  { code: 'FR', label: 'France', flag: '🇫🇷', language: 'fr', currency: 'EUR', currencySymbol: '€' },
  { code: 'UK', label: 'United Kingdom', flag: '🇬🇧', language: 'en', currency: 'GBP', currencySymbol: '£' },
  { code: 'US', label: 'United States', flag: '🇺🇸', language: 'en', currency: 'USD', currencySymbol: '$' },
];

interface ExchangeRates {
  GBP: number;
  USD: number;
  EUR: number;
}

interface MarketContextType {
  market: MarketConfig;
  setMarket: (code: MarketCode) => void;
  formatPrice: (eurPrice: number) => string;
  convertPrice: (eurPrice: number) => number;
  rates: ExchangeRates;
  isLoadingRates: boolean;
}

const MarketContext = createContext<MarketContextType | null>(null);

const DEFAULT_RATES: ExchangeRates = { EUR: 1, GBP: 0.86, USD: 1.08 };
const RATES_CACHE_KEY = 'sentorise-exchange-rates';
const RATES_CACHE_TTL = 3600000; // 1 hour

export const MarketProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [marketCode, setMarketCode] = useState<MarketCode>(() => {
    const saved = localStorage.getItem('sentorise-market');
    return (saved as MarketCode) || 'DE';
  });
  const [rates, setRates] = useState<ExchangeRates>(DEFAULT_RATES);
  const [isLoadingRates, setIsLoadingRates] = useState(false);

  const market = MARKETS.find(m => m.code === marketCode) || MARKETS[0];

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      // Check cache
      const cached = localStorage.getItem(RATES_CACHE_KEY);
      if (cached) {
        try {
          const { rates: cachedRates, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < RATES_CACHE_TTL) {
            setRates(cachedRates);
            return;
          }
        } catch {}
      }

      setIsLoadingRates(true);
      try {
        const res = await fetch('https://api.frankfurter.app/latest?from=EUR&to=GBP,USD');
        if (res.ok) {
          const data = await res.json();
          const newRates: ExchangeRates = {
            EUR: 1,
            GBP: data.rates.GBP,
            USD: data.rates.USD,
          };
          setRates(newRates);
          localStorage.setItem(RATES_CACHE_KEY, JSON.stringify({ rates: newRates, timestamp: Date.now() }));
        }
      } catch {
        // Use default rates on failure
      } finally {
        setIsLoadingRates(false);
      }
    };
    fetchRates();
  }, []);

  // Sync language when market changes
  useEffect(() => {
    i18n.changeLanguage(market.language);
    localStorage.setItem('sentorise-market', marketCode);
    localStorage.setItem('sentorise-language', market.language);
  }, [marketCode, market.language, i18n]);

  const convertPrice = useCallback((eurPrice: number): number => {
    const rate = rates[market.currency] || 1;
    return Math.round(eurPrice * rate * 100) / 100;
  }, [market.currency, rates]);

  const formatPrice = useCallback((eurPrice: number): string => {
    const converted = convertPrice(eurPrice);
    return new Intl.NumberFormat(
      market.code === 'DE' ? 'de-DE' : market.code === 'FR' ? 'fr-FR' : market.code === 'UK' ? 'en-GB' : 'en-US',
      { style: 'currency', currency: market.currency }
    ).format(converted);
  }, [convertPrice, market]);

  const handleSetMarket = useCallback((code: MarketCode) => {
    setMarketCode(code);
  }, []);

  return (
    <MarketContext.Provider value={{ market, setMarket: handleSetMarket, formatPrice, convertPrice, rates, isLoadingRates }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const ctx = useContext(MarketContext);
  if (!ctx) throw new Error('useMarket must be used within MarketProvider');
  return ctx;
};
