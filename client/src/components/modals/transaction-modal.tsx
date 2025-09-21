import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle, ExternalLink } from "lucide-react";
import { SUPPORTED_CHAINS } from "@/lib/constants";
import type { SupportedChain } from "@/stores/wallet-store";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: 'pending' | 'success' | 'failed';
  transactionHash: string | null;
  fromAmount: string;
  fromToken: string;
  toAmount: string;
  networkFee: string;
  chain: SupportedChain;
}

export const TransactionModal = ({
  isOpen,
  onClose,
  status,
  transactionHash,
  fromAmount,
  fromToken,
  toAmount,
  networkFee,
  chain,
}: TransactionModalProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Clock className="w-8 h-8 text-accent-teal animate-spin" />;
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-400" />;
      case 'failed':
        return <XCircle className="w-8 h-8 text-red-400" />;
      default:
        return <Clock className="w-8 h-8 text-accent-teal" />;
    }
  };

  const getStatusTitle = () => {
    switch (status) {
      case 'pending':
        return 'Transaction Pending';
      case 'success':
        return 'Transaction Successful';
      case 'failed':
        return 'Transaction Failed';
      default:
        return 'Processing Transaction';
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'pending':
        return 'Please confirm the transaction in your wallet and wait for it to be processed...';
      case 'success':
        return 'Your swap has been completed successfully! Your AVGX tokens will appear in your wallet shortly.';
      case 'failed':
        return 'The transaction failed. Please try again or check your wallet for more details.';
      default:
        return 'Processing your transaction...';
    }
  };

  const getExplorerUrl = () => {
    if (!transactionHash) return '#';
    const explorerUrl = SUPPORTED_CHAINS[chain].explorerUrl;
    return `${explorerUrl}/tx/${transactionHash}`;
  };

  const handleViewOnExplorer = () => {
    if (transactionHash) {
      window.open(getExplorerUrl(), '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/10 dark:border-white/10 light:border-gray-200 max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">{getStatusTitle()}</DialogTitle>
        </DialogHeader>
        
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-accent-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
            {getStatusIcon()}
          </div>
          
          <h3 className="text-xl font-bold text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900 mb-2">
            {getStatusTitle()}
          </h3>
          
          <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 mb-6 text-sm">
            {getStatusMessage()}
          </p>
          
          {/* Transaction Details */}
          <div className="space-y-3 mb-6 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">From</span>
              <span className="font-mono text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                {fromAmount} {fromToken}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">To</span>
              <span className="font-mono text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                {toAmount} AVGX
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Gas Fee</span>
              <span className="font-mono text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                {networkFee}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Network</span>
              <span className="text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                {SUPPORTED_CHAINS[chain].name}
              </span>
            </div>
            {transactionHash && (
              <div className="flex justify-between text-sm">
                <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Tx Hash</span>
                <span className="font-mono text-accent-teal text-xs">
                  {transactionHash.slice(0, 10)}...{transactionHash.slice(-6)}
                </span>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            {transactionHash && status !== 'pending' && (
              <Button
                onClick={handleViewOnExplorer}
                variant="outline"
                className="w-full border-accent-teal text-accent-teal hover:bg-accent-teal hover:text-white"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Explorer
              </Button>
            )}
            
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-accent-teal to-emerald-500 hover:shadow-lg transition-all"
            >
              {status === 'pending' ? 'Hide' : 'Close'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
