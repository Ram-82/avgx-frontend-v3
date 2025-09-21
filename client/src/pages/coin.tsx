import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  DollarSign,
  TrendingUp,
  Coins,
  Shield,
  Globe,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Info,
  Banknote,
  RefreshCw
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from "@/lib/queryClient";
import { SetupGuide } from "@/components/wallet/setup-guide"; // Import the missing component
import { useWallet } from "@/hooks/use-wallet";

interface CoinStatus {
  avgxIndex: number;
  coinPrice: number;
  pegDeviation: number;
  totalSupply: string;
  backingValue: string;
  collateralRatio: string;
  pegHealth: string;
  timestamp: string;
}

interface TradingStats {
  totalSupply: string;
  totalVolume24h: number;
  mintCount24h: number;
  redeemCount24h: number;
  averageTransactionSize: number;
  uniqueWallets: number;
}

const CoinPage = () => {
  const [activeTab, setActiveTab] = useState("mint");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isConnected, selectedChain } = useWallet();

  // Mutation for simulating trades
  const tradeMutation = useMutation({
    mutationFn: async (tradeData: { type: 'mint' | 'redeem'; amount: number; chain: string }) => {
      // Fix: Call the apiRequest function directly with method 'POST'
      return apiRequest('POST', '/api/coin/trade', tradeData);
    },
    onSuccess: (data: any) => {
      toast({
        title: "Trade Simulated Successfully",
        description: `${data.type === 'mint' ? 'Minted' : 'Redeemed'} ${data.avgxAmount?.toFixed(4) || 'some'} AVGX`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/coin/stats'] });
      setAmount("");
    },
    onError: (error: any) => {
      toast({
        title: "Trade Failed",
        description: error.message || "Failed to process trade",
        variant: "destructive",
      });
    },
  });

  const handleTrade = () => {
    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    tradeMutation.mutate({
      type: activeTab as 'mint' | 'redeem',
      amount: amountNum,
      chain: selectedChain
    });
  };

  // Query hooks for real-time data
  const { data: coinStatus, isLoading: statusLoading } = useQuery<CoinStatus>({
    queryKey: ['/api/coin/status'],
    // Fix: Call the apiRequest function directly with method 'GET'
    queryFn: () => apiRequest('GET', '/api/coin/status'), 
    refetchInterval: 30000,
  });

  const { data: tradingStats, isLoading: statsLoading } = useQuery<TradingStats>({
    queryKey: ['/api/coin/stats'],
    // Fix: Call the apiRequest function directly with method 'GET'
    queryFn: () => apiRequest('GET', '/api/coin/stats'),
    refetchInterval: 60000,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AVGX Coin
        </h1>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          Neutral Global Digital Currency
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          AVGX Coin is a digital asset pegged to the AVGX Index, providing a stable, neutral currency
          backed by a diversified basket of global currencies and digital assets.
        </p>

        {/* Live Coin Status */}
        <Card className="max-w-2xl mx-auto p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Current Price</div>
              {statusLoading ? (
                <Skeleton className="h-8 w-24 mx-auto" />
              ) : (
                <div className="text-3xl font-bold text-primary">
                  ${coinStatus?.coinPrice.toFixed(4) || '0.0000'}
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Peg Health</div>
              {statusLoading ? (
                <Skeleton className="h-6 w-20 mx-auto" />
              ) : (
                <Badge variant={coinStatus?.pegHealth === 'healthy' ? 'default' : 'secondary'}>
                  {coinStatus?.pegHealth === 'healthy' ? 'Stable' : 'Rebalancing'}
                </Badge>
              )}
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Total Supply</div>
              {statusLoading ? (
                <Skeleton className="h-8 w-24 mx-auto" />
              ) : (
                <div className="text-3xl font-bold text-primary">
                  {parseFloat(coinStatus?.totalSupply || '0').toFixed(0)}
                </div>
              )}
            </div>
          </div>
        </Card>
      </section>

      {/* Main Content */}
      {/* Setup Guide */}
      {!isConnected && (
        <div className="mb-8">
          <SetupGuide />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Trading Interface */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-2xl font-bold mb-6">Mint & Redeem AVGX Coin</h3>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mint" className="flex items-center gap-2">
                  <ArrowUp className="w-4 h-4" />
                  Mint AVGX
                </TabsTrigger>
                <TabsTrigger value="redeem" className="flex items-center gap-2">
                  <ArrowDown className="w-4 h-4" />
                  Redeem AVGX
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mint" className="space-y-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Mint AVGX Coins</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Convert USD to AVGX coins at the current index price. Each AVGX coin is backed by the diversified basket.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Amount (USD)</label>
                    <Input
                      type="number"
                      placeholder="Enter USD amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-lg"
                    />
                  </div>

                  {amount && parseFloat(amount) > 0 && coinStatus && (
                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>USD Amount:</span>
                        <span className="font-mono">${parseFloat(amount).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>AVGX Price:</span>
                        <span className="font-mono">${coinStatus.coinPrice.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>You'll receive:</span>
                        <span className="font-mono font-bold">
                          {(parseFloat(amount) / coinStatus.coinPrice).toFixed(4)} AVGX
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Fee (0.3%):</span>
                        <span className="font-mono">${(parseFloat(amount) * 0.003).toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleTrade}
                    disabled={!amount || parseFloat(amount) <= 0 || tradeMutation.isPending}
                    className="w-full"
                    size="lg"
                  >
                    {tradeMutation.isPending ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Coins className="w-4 h-4 mr-2" />
                        Mint AVGX
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="redeem" className="space-y-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">Redeem AVGX Coins</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Convert AVGX coins back to USD at the current index price. Instant settlement.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Amount (AVGX)</label>
                    <Input
                      type="number"
                      placeholder="Enter AVGX amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-lg"
                    />
                  </div>

                  {amount && parseFloat(amount) > 0 && coinStatus && (
                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>AVGX Amount:</span>
                        <span className="font-mono">{parseFloat(amount).toFixed(4)} AVGX</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>AVGX Price:</span>
                        <span className="font-mono">${coinStatus.coinPrice.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>USD Value:</span>
                        <span className="font-mono">${(parseFloat(amount) * coinStatus.coinPrice).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Fee (0.3%):</span>
                        <span className="font-mono">${(parseFloat(amount) * coinStatus.coinPrice * 0.003).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold">
                        <span>You'll receive:</span>
                        <span className="font-mono">
                          ${((parseFloat(amount) * coinStatus.coinPrice) * 0.997).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleTrade}
                    disabled={!amount || parseFloat(amount) <= 0 || tradeMutation.isPending}
                    className="w-full"
                    size="lg"
                    variant="outline"
                  >
                    {tradeMutation.isPending ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Banknote className="w-4 h-4 mr-2" />
                        Redeem for USD
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Statistics and Info */}
        <div className="space-y-6">
          {/* Key Features */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Why AVGX Coin?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Neutral</div>
                  <div className="text-xs text-muted-foreground">No single country controls it</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Global</div>
                  <div className="text-xs text-muted-foreground">Represents worldwide economy</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-purple-500 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Stable</div>
                  <div className="text-xs text-muted-foreground">Diversified backing reduces risk</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Trading Statistics */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">24h Statistics</h3>
            {statsLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Volume</span>
                  <span className="font-mono text-sm">${tradingStats?.totalVolume24h.toFixed(0) || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Mint Count</span>
                  <span className="font-mono text-sm">{tradingStats?.mintCount24h || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Redeem Count</span>
                  <span className="font-mono text-sm">{tradingStats?.redeemCount24h || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Wallets</span>
                  <span className="font-mono text-sm">{tradingStats?.uniqueWallets || 0}</span>
                </div>
              </div>
            )}
          </Card>

          {/* Reserve Status */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Reserve Status</h3>
            {statusLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Backing Ratio</span>
                  <Badge variant="default">
                    {parseFloat(coinStatus?.collateralRatio || '1').toFixed(2)}x
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Peg Deviation</span>
                  <span className={`font-mono text-sm ${Math.abs(coinStatus?.pegDeviation || 0) < 0.5 ? 'text-green-500' : 'text-orange-500'}`}>
                    {coinStatus?.pegDeviation !== undefined ? `${coinStatus.pegDeviation >= 0 ? '+' : ''}${coinStatus.pegDeviation.toFixed(2)}%` : '0.00%'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Backing</span>
                  <span className="font-mono text-sm">${parseFloat(coinStatus?.backingValue || '0').toFixed(0)}</span>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Use Cases Section */}
      <section className="py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Use Cases</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowUpDown className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Cross-Border Payments</h4>
            <p className="text-muted-foreground">
              Instant, low-cost international transfers without volatility risk
              or dependency on any single currency.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Merchant Payments</h4>
            <p className="text-muted-foreground">
              Accept stable digital payments without exposure to crypto volatility
              while serving global customers.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coins className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Store of Value</h4>
            <p className="text-muted-foreground">
              A USD-free stablecoin alternative backed by a diversified
              global basket for long-term stability.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default CoinPage;
