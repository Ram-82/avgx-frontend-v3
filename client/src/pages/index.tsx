import { AvgxPriceChart } from "@/components/charts/avgx-price-chart";
import { CurrencyBasket } from "@/components/index/currency-basket";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useAvgxIndex } from "@/hooks/use-avgx-index";
import { RefreshCw } from "lucide-react";

const IndexPage = () => {
  const { indexData, fiatCurrencies, cryptoCurrencies, isLoading, refetch, lastUpdate } = useAvgxIndex();

  return (
    <div className="min-h-screen pt-20 py-20 bg-gradient-to-b from-avgx-primary to-avgx-secondary dark:from-avgx-primary dark:to-avgx-secondary light:from-white light:to-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
            AVGX Index Dashboard
          </h1>
          <p className="text-xl text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 max-w-3xl mx-auto">
            Real-time calculation based on 50 major fiat currencies and 10 leading cryptocurrencies
          </p>
        </div>

        {/* Index Formula Display */}
        <GlassCard className="p-8 mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
            AVGX = √(WF × WC)
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-lg font-semibold text-accent-teal mb-2">WF - Weighted Fiat</div>
              <div className="text-3xl font-mono font-bold mb-2 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                {isLoading ? (
                  <div className="animate-pulse">Loading...</div>
                ) : (
                  `$${indexData?.wfValue.toFixed(4) || '0.0000'}`
                )}
              </div>
              <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
                GDP-weighted average of 50 major fiat currencies
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-accent-purple mb-2">WC - Weighted Crypto</div>
              <div className="text-3xl font-mono font-bold mb-2 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                {isLoading ? (
                  <div className="animate-pulse">Loading...</div>
                ) : (
                  `$${indexData?.wcValue.toFixed(4) || '0.0000'}`
                )}
              </div>
              <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
                Market-cap weighted average of 10 major cryptocurrencies
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Price Chart */}
        <GlassCard className="p-8 mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h3 className="text-2xl font-bold text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900 mb-4 sm:mb-0">
              AVGX Price Chart
            </h3>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={refetch}
                disabled={isLoading}
                className="border-accent-teal text-accent-teal hover:bg-accent-teal hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              {lastUpdate && (
                <span className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
                  Last update: {lastUpdate.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
          
          <AvgxPriceChart />
          
          <div className="text-center mt-4">
            <p className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
              Auto-refreshes every 60 seconds
            </p>
          </div>
        </GlassCard>

        {/* Currency Baskets */}
        <div className="grid lg:grid-cols-2 gap-8">
          <CurrencyBasket
            title="Fiat Currency Basket (50)"
            titleColor="text-accent-teal"
            currencies={fiatCurrencies}
            type="fiat"
            isLoading={isLoading}
          />
          <CurrencyBasket
            title="Cryptocurrency Basket (10)"
            titleColor="text-accent-purple"
            currencies={cryptoCurrencies}
            type="crypto"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
