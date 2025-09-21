import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, Search, DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

// Note: Environment variables should be accessed from backend, not frontend
// This is handled by the API endpoints

interface PricesData {
  avgx_usd: number;
  fiat_conversions: Array<{
    currency: string;
    name: string;
    rate: number;
    avgx_rate: number;
  }>;
  crypto_conversions: Array<{
    symbol: string;
    name: string;
    price_usd: number;
    avgx_rate: number;
  }>;
  timestamp: string;
}

const PricesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'fiat' | 'crypto'>('fiat');

  const { data: pricesData, isLoading, error, refetch } = useQuery<PricesData>({
    queryKey: ['/api/prices'],
    refetchInterval: 60000,
  });

  const filteredFiatData = pricesData?.fiat_conversions.filter((item) =>
    item.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const filteredCryptoData = pricesData?.crypto_conversions.filter((item) =>
    item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-6 text-center">
          <p className="text-red-500">Failed to load price data. Please try again.</p>
          <Button onClick={() => refetch()} className="mt-4">
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
            AVGX Price Conversions
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert AVGX to all major currencies
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Badge variant="outline">
            Current Rate: ${pricesData?.avgx_usd.toFixed(4)}
          </Badge>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Current AVGX Value */}
      <Card className="p-6">
        <div className="text-center">
          <h2 className="text-sm font-medium text-muted-foreground mb-2">
            1 AVGX equals
          </h2>
          {isLoading ? (
            <Skeleton className="h-12 w-32 mx-auto" />
          ) : (
            <div className="text-4xl font-bold text-primary">
              ${pricesData?.avgx_usd.toFixed(4)} USD
            </div>
          )}
        </div>
      </Card>

      {/* Search and Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex rounded-lg border bg-background">
          <Button
            variant={activeTab === 'fiat' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('fiat')}
            className="rounded-r-none"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Fiat Currencies
          </Button>
          <Button
            variant={activeTab === 'crypto' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('crypto')}
            className="rounded-l-none"
          >
            Cryptocurrencies
          </Button>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={`Search ${activeTab === 'fiat' ? 'currencies' : 'cryptocurrencies'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Price Table */}
      <Card className="p-6">
        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 py-3 px-4 bg-muted/50 rounded-lg font-semibold text-sm">
            <div>Currency</div>
            <div className="text-right">Market Rate</div>
            <div className="text-right">1 AVGX =</div>
            <div className="text-right">1 {activeTab === 'fiat' ? 'Unit' : 'Token'} =</div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-2">
              {Array(10).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          )}

          {/* Fiat Data */}
          {activeTab === 'fiat' && !isLoading && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredFiatData.map((item) => (
                <div
                  key={item.currency}
                  className="grid grid-cols-4 gap-4 py-3 px-4 hover:bg-muted/30 rounded-lg transition-colors"
                >
                  <div>
                    <div className="font-medium">{item.currency}</div>
                    <div className="text-sm text-muted-foreground">{item.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">1 USD = {item.rate.toFixed(4)}</div>
                    <div className="text-sm text-muted-foreground">{item.currency}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-primary">
                      {item.avgx_rate.toFixed(4)}
                    </div>
                    <div className="text-sm text-muted-foreground">{item.currency}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {(1 / item.avgx_rate).toFixed(6)}
                    </div>
                    <div className="text-sm text-muted-foreground">AVGX</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Crypto Data */}
          {activeTab === 'crypto' && !isLoading && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredCryptoData.map((item) => (
                <div
                  key={item.symbol}
                  className="grid grid-cols-4 gap-4 py-3 px-4 hover:bg-muted/30 rounded-lg transition-colors"
                >
                  <div>
                    <div className="font-medium">{item.symbol.toUpperCase()}</div>
                    <div className="text-sm text-muted-foreground">{item.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${item.price_usd.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">USD</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-primary">
                      {item.avgx_rate.toFixed(6)}
                    </div>
                    <div className="text-sm text-muted-foreground">{item.symbol.toUpperCase()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {(1 / item.avgx_rate).toFixed(6)}
                    </div>
                    <div className="text-sm text-muted-foreground">AVGX</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && activeTab === 'fiat' && filteredFiatData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No fiat currencies found matching "{searchTerm}"
            </div>
          )}
          
          {!isLoading && activeTab === 'crypto' && filteredCryptoData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No cryptocurrencies found matching "{searchTerm}"
            </div>
          )}
        </div>
      </Card>

      {/* Info */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>Note:</strong> Exchange rates are updated every 60 seconds. 
          All conversions are calculated using live market data and AVGX's current value.
        </p>
      </Card>
    </div>
  );
};

export default PricesPage;
