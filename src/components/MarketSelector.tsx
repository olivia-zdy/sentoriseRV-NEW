import { useState, useRef, useEffect } from 'react';
import { MARKETS, useMarket, type MarketCode } from '@/context/MarketContext';
import { ChevronDown } from 'lucide-react';

export const MarketSelector = () => {
  const { market, setMarket } = useMarket();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-1.5 text-sm rounded-lg hover:bg-muted transition-colors"
      >
        <span className="text-base leading-none">{market.flag}</span>
        <span className="hidden sm:inline text-xs font-medium text-muted-foreground">{market.currency}</span>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-fade-in">
          {MARKETS.map((m) => (
            <button
              key={m.code}
              onClick={() => {
                setMarket(m.code as MarketCode);
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors ${
                market.code === m.code
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <span className="text-lg">{m.flag}</span>
              <div className="flex-1 text-left">
                <div className="font-medium">{m.label}</div>
                <div className="text-xs text-muted-foreground">{m.currencySymbol} {m.currency}</div>
              </div>
              {market.code === m.code && (
                <span className="text-primary text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketSelector;
