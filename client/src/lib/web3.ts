import { ethers } from 'ethers';
import { SUPPORTED_CHAINS, AVGX_TOKEN_ADDRESSES } from './constants';
import { useWalletStore, type SupportedChain } from '@/stores/wallet-store';

let provider: ethers.BrowserProvider | null = null;
let signer: ethers.JsonRpcSigner | null = null;

export const getProvider = () => {
  if (!provider && typeof window !== 'undefined' && window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
  }
  return provider;
};

export const getSigner = async () => {
  const provider = getProvider();
  if (!provider) throw new Error('No provider available');

  if (!signer) {
    signer = await provider.getSigner();
  }
  return signer;
};

export const connectWallet = async (): Promise<string> => {
  // Check if MetaMask is installed
  if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
  }

  // Check if it's actually MetaMask (not another wallet)
  if (!window.ethereum.isMetaMask) {
    throw new Error('Please use MetaMask wallet to connect.');
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    if (accounts.length === 0) {
      throw new Error('No accounts found. Please unlock your MetaMask wallet.');
    }

    // Store the connected account
    const connectedAccount = accounts[0];
    console.log('Wallet connected:', connectedAccount);

    return connectedAccount;
  } catch (error: any) {
    console.error('Failed to connect wallet:', error);

    // Handle specific MetaMask errors
    if (error.code === 4001) {
      throw new Error('Connection rejected. Please approve the connection request.');
    } else if (error.code === -32002) {
      throw new Error('Connection request pending. Please check your MetaMask.');
    }

    throw new Error(error.message || 'Failed to connect wallet');
  }
};

export const disconnectWallet = () => {
  provider = null;
  signer = null;
};

export const switchChain = async (chain: SupportedChain) => {
  try {
    const chainConfig = SUPPORTED_CHAINS[chain];

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainConfig.chainId.toString(16)}` }],
    });

    return { success: true, chain, chainId: chainConfig.chainId };
  } catch (error: any) {
    if (error.code === 4902) {
      // Chain not added, add it
      await addChain(chain);
      // Try switching again after adding
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${SUPPORTED_CHAINS[chain].chainId.toString(16)}` }],
      });
      return { success: true, chain, chainId: SUPPORTED_CHAINS[chain].chainId };
    } else {
      throw error;
    }
  }
};

export const addChain = async (chain: SupportedChain) => {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    const chainConfig = SUPPORTED_CHAINS[chain];

    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: `0x${chainConfig.chainId.toString(16)}`,
        chainName: chainConfig.name,
        nativeCurrency: {
          name: chainConfig.currency,
          symbol: chainConfig.currency,
          decimals: 18,
        },
        rpcUrls: [chainConfig.rpcUrl],
        blockExplorerUrls: [chainConfig.explorerUrl],
      }],
    });
  } catch (error: any) {
    console.error('Add chain error:', error);
    if (error.code === 4001) {
      throw new Error('User rejected the request to add the network');
    }
    throw new Error(`Failed to add ${SUPPORTED_CHAINS[chain].name} network`);
  }
};

export const updateBalances = async (address: string) => {
  const provider = getProvider();
  if (!provider) return { eth: '0', matic: '0', avgx: '0' };

  try {
    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);

    // Get native token balance
    const balance = await provider.getBalance(address);
    const formattedBalance = ethers.formatEther(balance);

    // Get AVGX token balance
    const avgxBalance = await getTokenBalance(address, chainId);

    const balances = {
      eth: chainId === SUPPORTED_CHAINS.sepolia.chainId ? formattedBalance : '0',
      matic: chainId === SUPPORTED_CHAINS.amoy.chainId ? formattedBalance : '0',
      avgx: avgxBalance
    };

    return balances;
  } catch (error) {
    console.error('Failed to update balances:', error);
    return { eth: '0', matic: '0', avgx: '0' };
  }
};

export const getTokenBalance = async (address: string, chainId: number): Promise<string> => {
  try {
    const provider = getProvider();
    if (!provider) return '0';

    let tokenAddress: string;
    if (chainId === SUPPORTED_CHAINS.sepolia.chainId) {
      tokenAddress = AVGX_TOKEN_ADDRESSES.sepolia;
    } else if (chainId === SUPPORTED_CHAINS.amoy.chainId) {
      tokenAddress = AVGX_TOKEN_ADDRESSES.amoy;
    } else {
      return '0';
    }

    // ERC20 ABI for balanceOf
    const erc20Abi = [
      'function balanceOf(address owner) view returns (uint256)',
      'function decimals() view returns (uint8)',
    ];

    const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);
    const balance = await contract.balanceOf(address);
    const decimals = await contract.decimals();

    return ethers.formatUnits(balance, decimals);
  } catch (error) {
    console.error('Failed to get token balance:', error);
    return '0';
  }
};

export const addTokenToWallet = async (chain: SupportedChain) => {
  try {
    const tokenAddress = AVGX_TOKEN_ADDRESSES[chain];

    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: 'AVGX',
          decimals: 18,
          image: 'https://avgx.finance/logo.png',
        },
      },
    });
  } catch (error) {
    console.error('Failed to add token to wallet:', error);
    throw error;
  }
};

export const swapToAVGX = async (
  amount: string,
  fromToken: 'ETH' | 'MATIC',
  avgxPrice: number,
  userAddress: string
): Promise<string> => {
  try {
    const signer = await getSigner();

    if (!userAddress) {
      throw new Error('Wallet not connected');
    }

    // Calculate AVGX amount
    const avgxAmount = (parseFloat(amount) / avgxPrice).toString();

    // This is a simplified swap - in a real implementation, you'd interact with a DEX or custom contract
    const tx = await signer.sendTransaction({
      to: userAddress, // Placeholder - would be swap contract
      value: ethers.parseEther(amount),
      data: '0x', // Placeholder - would be swap function call
    });

    await tx.wait();

    return tx.hash;
  } catch (error: any) {
    console.error('Swap failed:', error);
    throw new Error(error.message || 'Swap transaction failed');
  }
};

// Listen for account and chain changes
if (typeof window !== 'undefined' && window.ethereum) {
  // Remove existing listeners to prevent duplicates
  if (window.ethereum.removeAllListeners) {
    window.ethereum.removeAllListeners('accountsChanged');
    window.ethereum.removeAllListeners('chainChanged');
  }

  window.ethereum.on('accountsChanged', (accounts: string[]) => {
    // Handle account changes - let the hook handle store updates
    window.dispatchEvent(new CustomEvent('walletAccountsChanged', { detail: accounts }));
  });

  window.ethereum.on('chainChanged', (chainId: string) => {
    // Handle chain changes - let the hook handle store updates
    window.dispatchEvent(new CustomEvent('walletChainChanged', { detail: parseInt(chainId, 16) }));
  });
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}