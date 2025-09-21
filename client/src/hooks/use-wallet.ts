
import { useCallback, useEffect } from 'react';
import { useWalletStore, type SupportedChain } from '@/stores/wallet-store';
import { 
  connectWallet as web3ConnectWallet,
  disconnectWallet as web3DisconnectWallet,
  switchChain as web3SwitchChain,
  addTokenToWallet as web3AddTokenToWallet,
  swapToAVGX as web3SwapToAVGX,
  updateBalances,
} from '@/lib/web3';
import { useToast } from '@/hooks/use-toast';

export const useWallet = () => {
  const walletStore = useWalletStore();
  const { toast } = useToast();

  // Listen for wallet events
  useEffect(() => {
    const handleAccountsChanged = async (event: CustomEvent) => {
      const accounts = event.detail;
      if (accounts.length === 0) {
        walletStore.disconnect();
      } else {
        walletStore.setAddress(accounts[0]);
        const balances = await updateBalances(accounts[0]);
        walletStore.setBalance(balances);
      }
    };

    const handleChainChanged = async (event: CustomEvent) => {
      const chainId = event.detail;
      walletStore.setChainId(chainId);
      
      if (walletStore.address) {
        const balances = await updateBalances(walletStore.address);
        walletStore.setBalance(balances);
      }
    };

    window.addEventListener('walletAccountsChanged', handleAccountsChanged as EventListener);
    window.addEventListener('walletChainChanged', handleChainChanged as EventListener);

    return () => {
      window.removeEventListener('walletAccountsChanged', handleAccountsChanged as EventListener);
      window.removeEventListener('walletChainChanged', handleChainChanged as EventListener);
    };
  }, [walletStore]);
  
  const connect = useCallback(async () => {
    walletStore.setConnecting(true);
    walletStore.setError(null);
    
    try {
      const address = await web3ConnectWallet();
      walletStore.setConnected(true);
      walletStore.setAddress(address);
      
      // Get current network info
      if (typeof window !== 'undefined' && window.ethereum) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        walletStore.setChainId(parseInt(chainId, 16));
        
        // Update balances
        const balances = await updateBalances(address);
        walletStore.setBalance(balances);
      }
      
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to your wallet",
      });
    } catch (error: any) {
      walletStore.setError(error.message);
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      walletStore.setConnecting(false);
    }
  }, [toast, walletStore]);
  
  const disconnect = useCallback(() => {
    web3DisconnectWallet();
    walletStore.disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  }, [toast, walletStore]);
  
  const switchChain = useCallback(async (chain: SupportedChain) => {
    try {
      walletStore.setError(null);
      const result = await web3SwitchChain(chain);
      walletStore.setSelectedChain(chain);
      walletStore.setChainId(result.chainId);
      
      // Update balances for new chain
      if (walletStore.address) {
        try {
          const balances = await updateBalances(walletStore.address);
          walletStore.setBalance(balances);
        } catch (balanceError) {
          console.warn('Failed to update balances after chain switch:', balanceError);
        }
      }
      
      toast({
        title: "Chain Switched",
        description: `Successfully switched to ${chain === 'sepolia' ? 'Ethereum Sepolia' : 'Polygon Amoy'}`,
      });
    } catch (error: any) {
      console.error('Chain switch failed:', error);
      walletStore.setError(error.message);
      toast({
        title: "Chain Switch Failed",
        description: error.message || 'Failed to switch network',
        variant: "destructive",
      });
      throw error;
    }
  }, [toast, walletStore]);
  
  const addTokenToWallet = useCallback(async (chain: SupportedChain) => {
    try {
      await web3AddTokenToWallet(chain);
      toast({
        title: "Token Added",
        description: "AVGX token has been added to your wallet",
      });
    } catch (error: any) {
      toast({
        title: "Failed to Add Token",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [toast]);
  
  const swapToAVGX = useCallback(async (
    amount: string,
    fromToken: 'ETH' | 'MATIC',
    avgxPrice: number
  ) => {
    if (!walletStore.address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      throw new Error('Wallet not connected');
    }

    try {
      const txHash = await web3SwapToAVGX(amount, fromToken, avgxPrice, walletStore.address);
      
      // Update balances after swap
      const balances = await updateBalances(walletStore.address);
      walletStore.setBalance(balances);
      
      toast({
        title: "Swap Successful",
        description: `Transaction hash: ${txHash.slice(0, 10)}...`,
      });
      return txHash;
    } catch (error: any) {
      toast({
        title: "Swap Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  }, [toast, walletStore]);
  
  return {
    ...walletStore,
    connect,
    disconnect,
    switchChain,
    addTokenToWallet,
    swapToAVGX,
  };
};
