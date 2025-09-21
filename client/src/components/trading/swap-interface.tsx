import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ArrowDown, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GlassCard } from "@/components/ui/glass-card";
import { useWallet } from "@/hooks/use-wallet";
import { useAvgxIndex } from "@/hooks/use-avgx-index";
import { useToast } from "@/hooks/use-toast";
import { SUPPORTED_CHAINS } from "@/lib/constants";
import { TransactionModal } from "@/components/modals/transaction-modal";

interface SwapForm {
  fromAmount: string;
  fromToken: 'ETH' | 'MATIC';
}

export const SwapInterface = () => {
  const { 
    isConnected, 
    balance, 
    selectedChain, 
    swapToAVGX, 
    switchChain 
  } = useWallet();
  const { indexData, isLoading: indexLoading } = useAvgxIndex();
  const { toast } = useToast();
  
  const [isSwapping, setIsSwapping] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  const form = useForm<SwapForm>({
    defaultValues: {
      fromAmount: '',
      fromToken: selectedChain === 'sepolia' ? 'ETH' : 'MATIC',
    },
  });

  const { watch, setValue } = form;
  const fromAmount = watch('fromAmount');
  const fromToken = watch('fromToken');

  // Update token based on selected chain
  useEffect(() => {
    if (selectedChain === 'sepolia') {
      setValue('fromToken', 'ETH');
    } else {
      setValue('fromToken', 'MATIC');
    }
  }, [selectedChain, setValue]);

  // Calculate AVGX amount
  const avgxPrice = indexData?.value || 0;
  const toAmount = fromAmount && avgxPrice 
    ? (parseFloat(fromAmount) / avgxPrice).toFixed(6)
    : '';

  // Calculate exchange rate
  const exchangeRate = avgxPrice > 0 ? (1 / avgxPrice).toFixed(4) : '0';

  // Get user balance for current token
  const userBalance = fromToken === 'ETH' ? balance.eth : balance.matic;
  
  // Estimate network fee (simplified)
  const networkFee = fromToken === 'ETH' ? '~$2.50' : '~$0.05';

  // Price impact (minimal for index-based pricing)
  const priceImpact = '< 0.01%';

  const handleSwap = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to perform swaps",
        variant: "destructive",
      });
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid swap amount",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(fromAmount) > parseFloat(userBalance)) {
      toast({
        title: "Insufficient Balance",
        description: `You don't have enough ${fromToken}`,
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSwapping(true);
      setTransactionStatus('pending');
      setShowTransactionModal(true);

      const txHash = await swapToAVGX(fromAmount, fromToken, avgxPrice);
      setTransactionHash(txHash);
      setTransactionStatus('success');
      
      // Reset form
      setValue('fromAmount', '');

    } catch (error: any) {
      setTransactionStatus('failed');
      console.error('Swap failed:', error);
    } finally {
      setIsSwapping(false);
    }
  };

  const handleRefreshPrices = () => {
    // Trigger refresh through the hook
    window.location.reload();
  };

  const handleMaxClick = () => {
    // Leave some ETH/MATIC for gas fees
    const maxAmount = Math.max(0, parseFloat(userBalance) - (fromToken === 'ETH' ? 0.01 : 1));
    setValue('fromAmount', maxAmount.toString());
  };

  const getSwapButtonText = () => {
    if (!isConnected) return 'Connect Wallet to Swap';
    if (isSwapping) return 'Swapping...';
    if (!fromAmount) return 'Enter Amount';
    if (parseFloat(fromAmount) > parseFloat(userBalance)) return 'Insufficient Balance';
    return `Swap ${fromToken} to AVGX`;
  };

  const isSwapDisabled = !isConnected || isSwapping || !fromAmount || 
    parseFloat(fromAmount) <= 0 || parseFloat(fromAmount) > parseFloat(userBalance);

  return (
    <>
      <GlassCard className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
            Swap to AVGX
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefreshPrices}
            disabled={indexLoading}
            className="bg-secondary hover:bg-accent-teal/20 transition-all"
          >
            <RefreshCw className={`w-5 h-5 text-accent-teal ${indexLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        <div className="space-y-6">
          {/* From Token */}
          <div className="bg-secondary/50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-3">
              <label className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 text-sm">
                From
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 text-sm">
                  Balance: {parseFloat(userBalance).toFixed(4)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMaxClick}
                  className="text-accent-teal hover:bg-accent-teal/10 h-6 px-2 text-xs"
                >
                  MAX
                </Button>
              </div>
            </div>
            <div className="flex space-x-4">
              <Input
                type="number"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => setValue('fromAmount', e.target.value)}
                className="flex-1 bg-transparent text-2xl font-mono border-none outline-none text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900 p-0"
                step="0.000001"
                min="0"
              />
              <div className="flex items-center">
                <div className="bg-secondary px-4 py-2 rounded-lg border border-white/10 dark:border-white/10 light:border-gray-200">
                  <span className="font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                    {fromToken}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Swap Arrow */}
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-secondary hover:bg-accent-teal/20 transition-all">
              <ArrowDown className="w-5 h-5 text-accent-teal" />
            </div>
          </div>

          {/* To Token */}
          <div className="bg-secondary/50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-3">
              <label className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 text-sm">
                To
              </label>
              <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 text-sm">
                Balance: {parseFloat(balance.avgx).toFixed(4)}
              </span>
            </div>
            <div className="flex space-x-4">
              <Input
                type="text"
                placeholder="0.0"
                value={toAmount}
                readOnly
                className="flex-1 bg-transparent text-2xl font-mono border-none outline-none text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900 p-0"
              />
              <div className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-lg">
                <div className="w-6 h-6 bg-gradient-to-br from-accent-teal to-accent-purple rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AX</span>
                </div>
                <span className="font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">AVGX</span>
              </div>
            </div>
          </div>

          {/* Swap Details */}
          <div className="bg-secondary/30 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Exchange Rate</span>
              <span className="text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                1 {fromToken} = {exchangeRate} AVGX
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Price Impact</span>
              <span className="text-green-400">{priceImpact}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Network Fee</span>
              <span className="text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">{networkFee}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">AVGX Price</span>
              <span className="text-accent-teal font-mono">
                ${avgxPrice.toFixed(4)}
              </span>
            </div>
          </div>

          {/* Chain Info */}
          <div className="bg-secondary/30 rounded-xl p-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Network</span>
              <span className="text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                {SUPPORTED_CHAINS[selectedChain].name}
              </span>
            </div>
          </div>

          {/* Swap Button */}
          <Button
            onClick={handleSwap}
            disabled={isSwapDisabled}
            className="w-full bg-gradient-to-r from-accent-teal to-emerald-500 hover:shadow-xl hover:shadow-accent-teal/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg font-semibold"
          >
            {isSwapping ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : null}
            {getSwapButtonText()}
          </Button>
        </div>
      </GlassCard>

      <TransactionModal
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        status={transactionStatus}
        transactionHash={transactionHash}
        fromAmount={fromAmount}
        fromToken={fromToken}
        toAmount={toAmount}
        networkFee={networkFee}
        chain={selectedChain}
      />
    </>
  );
};
