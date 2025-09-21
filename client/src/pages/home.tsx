
// import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { useAvgxIndex } from "@/hooks/use-avgx-index";
import { 
  TrendingUp, 
  Globe, 
  Shield, 
  Users,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Coins,
  Target,
  BarChart3,
  UserCheck,
  Zap,
  Building,
  Link as LinkIcon,
  Mail,
  ExternalLink
} from "lucide-react";
import { Link } from "wouter";

const Home = () => {
  const { indexData, isLoading } = useAvgxIndex();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with animated elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-avgx-primary via-avgx-secondary to-avgx-primary dark:from-avgx-primary dark:via-avgx-secondary dark:to-avgx-primary light:from-gray-50 light:via-white light:to-gray-50">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-teal/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-accent-teal via-avgx-text-primary to-accent-purple bg-clip-text text-transparent animate-float">
              AVGX
            </h1>
            <p className="text-3xl md:text-4xl font-bold mb-8 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
              A neutral global digital currency balancing fiat and crypto for fairness, stability, and peace.
            </p>
            <p className="text-xl md:text-2xl text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 mb-12 leading-relaxed">
              The world's first truly unbiased currency that represents global economic power through transparent mathematics.
            </p>

            {/* Current AVGX Value */}
            <div className="mb-12">
              <GlassCard className="inline-block p-8">
                <div className="text-center">
                  <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 mb-2">
                    Current AVGX Index
                  </div>
                  {isLoading ? (
                    <div className="text-4xl font-bold text-accent-teal">Loading...</div>
                  ) : (
                    <div className="text-4xl font-bold text-accent-teal">
                      ${indexData?.value.toFixed(4) || "0.0000"}
                    </div>
                  )}
                  <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 mt-2">
                    Live calculation from 51+ fiat & 10+ crypto currencies
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-accent-teal to-emerald-500 hover:shadow-lg transition-all">
                <Link href="/coin" className="flex items-center">
                  Join Testnet <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white">
                <Link href="/about" className="flex items-center">
                  Read Whitepaper <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 bg-avgx-secondary dark:bg-avgx-secondary light:bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
              The Global Currency Problem
            </h2>
            <p className="text-xl text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 max-w-3xl mx-auto">
              Today's financial system is broken. It's time for a neutral alternative.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Problem */}
            <GlassCard className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">The Problem</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Currency Bias</div>
                    <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">USD dominance creates unfair advantages and geopolitical tensions</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Inflation & Debasement</div>
                    <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Central banks print money, eroding purchasing power</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Centralized Control</div>
                    <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Single points of failure and political manipulation</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Cross-border Friction</div>
                    <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">High fees, slow transfers, and regulatory barriers</div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Solution */}
            <GlassCard className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-accent-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-accent-teal" />
                </div>
                <h3 className="text-2xl font-bold text-accent-teal">The AVGX Solution</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent-teal rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Globally Balanced</div>
                    <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Equal representation of all major economies and cryptocurrencies</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent-teal rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Mathematically Transparent</div>
                    <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Open-source formula with real-time calculations</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent-teal rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">DAO Governed</div>
                    <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Community-controlled parameters and upgrades</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent-teal rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Stability Enhanced</div>
                    <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Volatility adjustment and smoothing algorithms</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-avgx-primary dark:bg-avgx-primary light:bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
              How AVGX Works
            </h2>
            <p className="text-xl text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 max-w-3xl mx-auto">
              Three simple steps to create the world's most neutral digital currency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <GlassCard className="p-8 text-center relative">
              <div className="absolute -top-4 left-4">
                <Badge className="bg-accent-teal text-white px-3 py-1">Step 1</Badge>
              </div>
              <div className="w-16 h-16 bg-accent-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-accent-teal" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                Global Data Collection
              </h3>
              <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 mb-4">
                Real-time feeds from 51+ major fiat currencies and 10+ leading cryptocurrencies
              </p>
              <div className="text-sm text-accent-teal font-medium">
                USD, EUR, JPY, CNY, GBP, BTC, ETH, SOL...
              </div>
            </GlassCard>

            {/* Step 2 */}
            <GlassCard className="p-8 text-center relative">
              <div className="absolute -top-4 left-4">
                <Badge className="bg-accent-purple text-white px-3 py-1">Step 2</Badge>
              </div>
              <div className="w-16 h-16 bg-accent-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-accent-purple" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                Weighted Calculation
              </h3>
              <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 mb-4">
                GDP-weighted fiat basket meets market-cap weighted crypto basket
              </p>
              <div className="bg-secondary/30 rounded-lg p-3">
                <div className="font-mono text-sm text-accent-purple">
                  AVGX = √(WF × WC)
                </div>
              </div>
            </GlassCard>

            {/* Step 3 */}
            <GlassCard className="p-8 text-center relative">
              <div className="absolute -top-4 left-4">
                <Badge className="bg-emerald-500 text-white px-3 py-1">Step 3</Badge>
              </div>
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coins className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                Neutral Token
              </h3>
              <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 mb-4">
                Infinite-supply, DAO-governed token pegged to the calculated index value
              </p>
              <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                Transparent • Decentralized • Fair
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section className="py-20 bg-avgx-secondary dark:bg-avgx-secondary light:bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
              Massive Market Opportunity
            </h2>
            <p className="text-xl text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 max-w-3xl mx-auto">
              AVGX targets the convergence of three rapidly growing markets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400">$8T+</h3>
              <h4 className="text-xl font-semibold mb-3 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Digital Payments</h4>
              <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
                Global digital payment transactions growing 15% annually
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-orange-600 dark:text-orange-400">$2.5T+</h3>
              <h4 className="text-xl font-semibold mb-3 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Crypto Market</h4>
              <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
                Total cryptocurrency market capitalization and growing
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center">
              <div className="w-16 h-16 bg-accent-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-accent-teal" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-accent-teal">$130B+</h3>
              <h4 className="text-xl font-semibold mb-3 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Stablecoin Market</h4>
              <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
                Current stablecoin market cap, dominated by USD-pegged assets
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Competitors Section */}
      <section className="py-20 bg-avgx-primary dark:bg-avgx-primary light:bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
              How AVGX Compares
            </h2>
            <p className="text-xl text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 max-w-3xl mx-auto">
              The first truly neutral alternative to USD-dominated stablecoins
            </p>
          </div>

          <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Feature</th>
                    <th className="text-center p-4 font-semibold text-accent-teal">AVGX</th>
                    <th className="text-center p-4 font-semibold text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">USDT</th>
                    <th className="text-center p-4 font-semibold text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">USDC</th>
                    <th className="text-center p-4 font-semibold text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">JPYC</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-secondary/30">
                    <td className="p-4 font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Currency Bias</td>
                    <td className="p-4 text-center">
                      <Badge className="bg-accent-teal text-white">Neutral</Badge>
                    </td>
                    <td className="p-4 text-center text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">USD Only</td>
                    <td className="p-4 text-center text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">USD Only</td>
                    <td className="p-4 text-center text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">JPY Only</td>
                  </tr>
                  <tr className="border-t border-secondary/30">
                    <td className="p-4 font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Governance</td>
                    <td className="p-4 text-center">
                      <Badge className="bg-accent-teal text-white">DAO</Badge>
                    </td>
                    <td className="p-4 text-center text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Centralized</td>
                    <td className="p-4 text-center text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Centralized</td>
                    <td className="p-4 text-center text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Centralized</td>
                  </tr>
                  <tr className="border-t border-secondary/30">
                    <td className="p-4 font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Transparency</td>
                    <td className="p-4 text-center">
                      <Badge className="bg-accent-teal text-white">Full</Badge>
                    </td>
                    <td className="p-4 text-center text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Limited</td>
                    <td className="p-4 text-center text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Audited</td>
                    <td className="p-4 text-center text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Limited</td>
                  </tr>
                  <tr className="border-t border-secondary/30">
                    <td className="p-4 font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Backing</td>
                    <td className="p-4 text-center">
                      <Badge className="bg-accent-teal text-white">Multi-Asset</Badge>
                    </td>
                    <td className="p-4 text-center text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">USD/Bonds</td>
                    <td className="p-4 text-center text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">USD Only</td>
                    <td className="p-4 text-center text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">JPY Only</td>
                  </tr>
                  <tr className="border-t border-secondary/30">
                    <td className="p-4 font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Global Fairness</td>
                    <td className="p-4 text-center">
                      <Badge className="bg-accent-teal text-white">Yes</Badge>
                    </td>
                    <td className="p-4 text-center text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">No</td>
                    <td className="p-4 text-center text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">No</td>
                    <td className="p-4 text-center text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-avgx-secondary dark:bg-avgx-secondary light:bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
              AVGX Roadmap
            </h2>
            <p className="text-xl text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 max-w-3xl mx-auto">
              Our journey to creating the world's neutral digital currency
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Phase 1 */}
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent-teal rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <GlassCard className="flex-1 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Phase 1: Testnet Launch</h3>
                    <Badge className="bg-accent-teal text-white">Completed</Badge>
                  </div>
                  <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 mb-3">
                    Live AVGX index calculation with smart contracts deployed on Ethereum Sepolia and Polygon Amoy testnets.
                  </p>
                  <div className="text-sm text-accent-teal">✓ Smart contracts deployed ✓ Index API live ✓ Web dashboard</div>
                </GlassCard>
              </div>

              {/* Phase 2 */}
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                </div>
                <GlassCard className="flex-1 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Phase 2: Trading & Swaps</h3>
                    <Badge className="bg-accent-purple text-white">In Progress</Badge>
                  </div>
                  <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 mb-3">
                    DEX integration, AMM pools, and cross-chain bridge for seamless AVGX trading.
                  </p>
                  <div className="text-sm text-accent-purple">AMM development • Bridge contracts • Liquidity incentives</div>
                </GlassCard>
              </div>

              {/* Phase 3 */}
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-avgx-text-secondary dark:bg-avgx-text-secondary light:bg-gray-400 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <GlassCard className="flex-1 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Phase 3: DAO Governance</h3>
                    <Badge variant="outline">Q2 2024</Badge>
                  </div>
                  <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 mb-3">
                    Community governance with voting on basket composition, parameters, and protocol upgrades.
                  </p>
                  <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Governance token • Proposal system • Community treasury</div>
                </GlassCard>
              </div>

              {/* Phase 4 */}
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-avgx-text-secondary dark:bg-avgx-text-secondary light:bg-gray-400 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                </div>
                <GlassCard className="flex-1 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Phase 4: Mainnet Adoption</h3>
                    <Badge variant="outline">Q3 2024</Badge>
                  </div>
                  <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 mb-3">
                    Mainnet deployment, institutional partnerships, and real-world payment integrations.
                  </p>
                  <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Mainnet launch • Payment rails • Enterprise adoption</div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Team Section */}
      <section className="py-20 bg-avgx-primary dark:bg-avgx-primary light:bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
              Our Vision & Values
            </h2>
            <p className="text-xl text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 max-w-3xl mx-auto">
              Building a more equitable financial future for everyone
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <GlassCard className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                Global Fairness
              </h3>
              <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
                No single country or currency should dominate global finance. AVGX represents all major economies equally.
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center">
              <div className="w-16 h-16 bg-accent-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserCheck className="w-8 h-8 text-accent-teal" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-accent-teal">
                Inclusivity & Access
              </h3>
              <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
                Financial services should be accessible to everyone, regardless of geography, status, or existing banking relationships.
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center">
              <div className="w-16 h-16 bg-accent-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-accent-purple" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-accent-purple">
                Decentralization
              </h3>
              <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
                True decentralization means no single point of control. Community governance ensures AVGX serves global interests.
              </p>
            </GlassCard>
          </div>

          <div className="mt-16 text-center">
            <GlassCard className="p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                "Money should unite, not divide."
              </h3>
              <p className="text-lg text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 mb-6">
                We believe that by creating a truly neutral global currency, we can reduce economic conflicts, 
                promote international cooperation, and build a more peaceful world through shared financial infrastructure.
              </p>
              <div className="text-sm text-accent-teal font-medium">
                - The AVGX Team
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-accent-teal to-accent-purple">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Join the Financial Revolution
            </h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Be part of creating the world's first truly neutral global currency. 
              Together, we can build a more equitable financial future.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-white/10 backdrop-blur border-white/20">
                <Zap className="w-8 h-8 text-white mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3 text-white">Join Testnet</h3>
                <p className="text-white/80 text-sm mb-4">
                  Test AVGX tokens on Ethereum Sepolia and Polygon Amoy testnets
                </p>
                <Button className="w-full bg-white text-accent-teal hover:bg-white/90">
                  <Link href="/coin">Start Trading</Link>
                </Button>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur border-white/20">
                <Building className="w-8 h-8 text-white mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3 text-white">Partnerships</h3>
                <p className="text-white/80 text-sm mb-4">
                  Integrate AVGX into your platform or explore institutional solutions
                </p>
                <Button className="w-full bg-white text-accent-purple hover:bg-white/90">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur border-white/20">
                <TrendingUp className="w-8 h-8 text-white mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3 text-white">Investors</h3>
                <p className="text-white/80 text-sm mb-4">
                  Download our pitch deck and learn about investment opportunities
                </p>
                <Button className="w-full bg-white text-emerald-600 hover:bg-white/90">
                  <Mail className="mr-2 h-4 w-4" />
                  Get Pitch Deck
                </Button>
              </Card>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-accent-teal hover:bg-white/90">
                <Link href="/about" className="flex items-center">
                  Read Whitepaper <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent-teal">
                <LinkIcon className="mr-2 h-4 w-4" />
                API Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
