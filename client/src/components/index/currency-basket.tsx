import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { CURRENCY_NAMES, CRYPTO_SYMBOLS } from "@/lib/constants";
import type { FiatCurrency, CryptoCurrency } from "@/stores/avgx-store";

interface CurrencyBasketProps {
  title: string;
  titleColor: string;
  currencies: FiatCurrency[] | CryptoCurrency[];
  type: 'fiat' | 'crypto';
  isLoading: boolean;
}

export const CurrencyBasket = ({ title, titleColor, currencies, type, isLoading }: CurrencyBasketProps) => {
  const displayCurrencies = currencies.slice(0, 10); // Show top 10

  const formatCurrency = (currency: FiatCurrency | CryptoCurrency) => {
    if (type === 'fiat') {
      const fiat = currency as FiatCurrency;
      return {
        symbol: fiat.currency,
        name: CURRENCY_NAMES[fiat.currency as keyof typeof CURRENCY_NAMES] || fiat.name,
        value: fiat.rate.toFixed(4),
        weight: `${(fiat.weight * 100).toFixed(1)}%`,
      };
    } else {
      const crypto = currency as CryptoCurrency;
      const coinGeckoId = crypto.symbol.toLowerCase() as keyof typeof CRYPTO_SYMBOLS;
      return {
        symbol: CRYPTO_SYMBOLS[coinGeckoId] || crypto.symbol.toUpperCase(),
        name: crypto.name,
        value: `$${crypto.price.toFixed(2)}`,
        weight: `${(crypto.weight * 100).toFixed(1)}%`,
      };
    }
  };

  if (isLoading) {
    return (
      <GlassCard className="p-8">
        <h3 className={`text-2xl font-bold mb-6 ${titleColor}`}>{title}</h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-6 bg-secondary rounded"></div>
                  <div className="w-32 h-4 bg-secondary rounded"></div>
                </div>
                <div className="text-right">
                  <div className="w-16 h-4 bg-secondary rounded mb-1"></div>
                  <div className="w-12 h-3 bg-secondary rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-8">
      <h3 className={`text-2xl font-bold mb-6 ${titleColor}`}>{title}</h3>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {displayCurrencies.length > 0 ? (
          displayCurrencies.map((currency, index) => {
            const formatted = formatCurrency(currency);
            return (
              <div key={index} className="flex justify-between items-center py-2 border-b border-white/5 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-mono bg-secondary px-2 py-1 rounded text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                    {formatted.symbol}
                  </span>
                  <span className="text-sm text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900 truncate max-w-[120px]">
                    {formatted.name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">{formatted.value}</div>
                  <div className="text-xs text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">{formatted.weight} weight</div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">No currency data available</p>
          </div>
        )}
        
        {currencies.length > 10 && (
          <div className="text-center pt-4">
            <Button 
              variant="ghost" 
              size="sm"
              className={`${titleColor.replace('text-', 'text-')} hover:${titleColor.replace('text-', 'bg-')}/10 transition-colors text-sm`}
            >
              View all {currencies.length} currencies <ExternalLink className="ml-1 w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    </GlassCard>
  );
};
