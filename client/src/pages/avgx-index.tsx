import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, RefreshCw, Info, DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { GlassCard } from "@/components/ui/glass-card";
import { useAvgxIndex } from "@/hooks/use-avgx-index";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StabilityMetrics } from "@/components/index/stability-metrics";
import { AvgxPriceChart } from "@/components/charts/avgx-price-chart";
import { CurrencyBasket } from "@/components/index/currency-basket";

interface AvgxData {
  avgx_usd: number;
  wf_value: number;
  wc_value: number;
  change24h: number;
  timestamp: string;
  breakdown: {
    fiat_basket: Array<{
      code: string;
      name: string;
      rate: number;
      weight: number;
    }>;
    crypto_basket: Array<{
      id: string;
      symbol: string;
      name: string;
      price: number;
      weight: number;
    }>;
  };
}

const AvgxIndexPage = () => {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const { data: avgxData, isLoading, error, refetch } = useQuery<AvgxData>({
    queryKey: ['/api/avgx'],
    refetchInterval: 60000, // Refresh every 60 seconds
  });

  useEffect(() => {
    if (avgxData) {
      setLastUpdate(new Date());
    }
  }, [avgxData]);

  const handleRefresh = () => {
    refetch();
    setLastUpdate(new Date());
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-6 text-center">
          <p className="text-red-500">Failed to load AVGX data. Please try again.</p>
          <Button onClick={handleRefresh} className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            AVGX Index
          </h1>
          <p className="text-lg text-muted-foreground">
            Live neutral global currency index
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Badge variant="outline">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </Badge>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Main AVGX Value Card */}
      <Card className="p-8">
        <div className="text-center">
          <h2 className="text-sm font-medium text-muted-foreground mb-2">
            Current AVGX Value
          </h2>
          {isLoading ? (
            <Skeleton className="h-16 w-48 mx-auto" />
          ) : (
            <div className="text-6xl font-bold text-primary mb-4">
              ${avgxData?.avgx_usd.toFixed(4)}
            </div>
          )}

          {avgxData && (
            <div className="flex items-center justify-center gap-2">
              {avgxData.change24h >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
              <span className={`text-lg font-semibold ${avgxData.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {avgxData.change24h >= 0 ? '+' : ''}{avgxData.change24h.toFixed(2)}%
              </span>
              <span className="text-muted-foreground">24h</span>
            </div>
          )}
        </div>
      </Card>

      {/* About AVGX */}
      <Card className="p-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h3 className="font-semibold text-lg mb-2">About AVGX</h3>
            <p className="text-muted-foreground leading-relaxed">
              AVGX is a neutral global currency that combines the stability of traditional
              fiat currencies with the innovation of digital assets. It provides a balanced
              measure of value that represents the global economy through weighted baskets
              of major currencies and cryptocurrencies.
            </p>
            <Button
              variant="link"
              className="text-blue-500 p-0 h-auto font-normal"
              onClick={() => window.open('/avgx-whitepaper.pdf', '_blank')}
            >
              Download Whitepaper
            </Button>
          </div>
        </div>
      </Card>

      {/* Index Components */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Global Currencies</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Basket includes</div>
              <div className="text-xl font-semibold">
                {avgxData?.breakdown.fiat_basket.length || 50} currencies
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Digital Assets</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Basket includes</div>
              <div className="text-xl font-semibold">
                {avgxData?.breakdown.crypto_basket.length || 10} cryptocurrencies
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Currency Baskets */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Fiat Basket */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Fiat Currency Basket</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))
            ) : (
              avgxData?.breakdown.fiat_basket
                .sort((a, b) => b.weight - a.weight)
                .map((fiat) => (
                  <div
                    key={fiat.code}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{fiat.code}</div>
                      <div className="text-sm text-muted-foreground">{fiat.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{fiat.rate.toFixed(4)}</div>
                      <div className="text-sm text-muted-foreground">
                        {(fiat.weight * 100).toFixed(1)}% weight
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </Card>

        {/* Crypto Basket */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Cryptocurrency Basket</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))
            ) : (
              avgxData?.breakdown.crypto_basket
                .sort((a, b) => b.weight - a.weight)
                .map((crypto) => (
                  <div
                    key={crypto.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{crypto.symbol.toUpperCase()}</div>
                      <div className="text-sm text-muted-foreground">{crypto.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${crypto.price.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">
                        {(crypto.weight * 100).toFixed(1)}% weight
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </Card>

        {/* Stability Metrics */}
        <StabilityMetrics />
      </div>
    </div>
  );
};

export default AvgxIndexPage;