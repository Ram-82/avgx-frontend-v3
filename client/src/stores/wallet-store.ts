import { create } from 'zustand';

export type SupportedChain = 'sepolia' | 'amoy';

interface WalletStore {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  selectedChain: SupportedChain;
  balance: {
    eth: string;
    matic: string;
    avgx: string;
  };
  isConnecting: boolean;
  error: string | null;

  // Actions
  setConnected: (connected: boolean) => void;
  setAddress: (address: string | null) => void;
  setChainId: (chainId: number | null) => void;
  setSelectedChain: (chain: SupportedChain) => void;
  setBalance: (balance: Partial<WalletStore['balance']>) => void;
  setConnecting: (connecting: boolean) => void;
  setError: (error: string | null) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  isConnected: false,
  address: null,
  chainId: null,
  selectedChain: 'amoy' as SupportedChain,
  balance: {
    eth: '0',
    matic: '0',
    avgx: '0',
  },
  isConnecting: false,
  error: null,

  setConnected: (connected) => set({ isConnected: connected }),
  setAddress: (address) => set({ address }),
  setChainId: (chainId) => set({ chainId }),
  setSelectedChain: (chain) => set({ selectedChain: chain }),
  setBalance: (balance) => set((state) => ({ 
    balance: { ...state.balance, ...balance } 
  })),
  setConnecting: (connecting) => set({ isConnecting: connecting }),
  setError: (error) => set({ error }),
  disconnect: () => set({
    isConnected: false,
    address: null,
    chainId: null,
    balance: { eth: '0', matic: '0', avgx: '0' },
    error: null,
  }),
}));