/// <reference types="vite/client" />

// Backend API configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5010';

// Get RPC URLs from environment variables or fallback to working defaults
const getSepoliaRPC = () => {
  return import.meta.env.VITE_SEPOLIA_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/Mc7rl0E3u-NPYomkWMBPE';
};

const getMumbaiRPC = () => {
  return import.meta.env.VITE_MUMBAI_RPC_URL || 'https://rpc-mumbai.maticvigil.com';
};

export const SUPPORTED_CHAINS = {
  sepolia: {
    chainId: 11155111,
    name: 'Ethereum Sepolia',
    currency: 'ETH',
    rpcUrl: getSepoliaRPC(),
    explorerUrl: 'https://sepolia.etherscan.io',
    faucetUrl: 'https://sepoliafaucet.com/',
  },
  amoy: {
    chainId: 80002,
    name: 'Polygon Amoy',
    currency: 'MATIC',
    rpcUrl: 'https://rpc-amoy.polygon.technology',
    explorerUrl: 'https://amoy.polygonscan.com',
    faucetUrl: 'https://faucet.polygon.technology/',
  },
} as const;

export const AVGX_TOKEN_ADDRESSES = {
  sepolia: '0x742d35Cc67C0532f5E9b28c3D3cc0e9D29b8Aa74', // Placeholder testnet address
  amoy: '0x742d35Cc67C0532f5E9b28c3D3cc0e9D29b8Aa74', // Placeholder testnet address
} as const;

export type SupportedChain = 'sepolia' | 'amoy';

export const FIAT_CURRENCIES = [
  'USD', 'EUR', 'CNY', 'JPY', 'GBP', 'INR', 'CAD', 'AUD', 'CHF', 'SEK',
  'NOK', 'DKK', 'NZD', 'SGD', 'HKD', 'KRW', 'BRL', 'RUB', 'ZAR', 'AED',
  'SAR', 'TRY', 'MXN', 'THB', 'IDR', 'MYR', 'PHP', 'PLN', 'HUF', 'CZK',
  'CLP', 'COP', 'ILS', 'EGP', 'PKR', 'NGN', 'KES', 'BDT', 'VND', 'ARS',
  'PEN', 'QAR', 'KWD', 'BHD', 'OMR', 'MAD', 'TND', 'UAH', 'LKR', 'RON',
  'BGN', 'HRK'
] as const;

export const CRYPTO_CURRENCIES = [
  'bitcoin', 'ethereum', 'binancecoin', 'solana', 'cardano',
  'ripple', 'dogecoin', 'the-open-network', 'avalanche-2', 'polkadot'
] as const;

export const CURRENCY_NAMES = {
  // Fiat
  USD: 'US Dollar',
  EUR: 'Euro',
  CNY: 'Chinese Yuan',
  JPY: 'Japanese Yen',
  GBP: 'British Pound',
  INR: 'Indian Rupee',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
  CHF: 'Swiss Franc',
  SEK: 'Swedish Krona',
  NOK: 'Norwegian Krone',
  DKK: 'Danish Krone',
  NZD: 'New Zealand Dollar',
  SGD: 'Singapore Dollar',
  HKD: 'Hong Kong Dollar',
  KRW: 'South Korean Won',
  BRL: 'Brazilian Real',
  RUB: 'Russian Ruble',
  ZAR: 'South African Rand',
  AED: 'UAE Dirham',
  // Crypto
  bitcoin: 'Bitcoin',
  ethereum: 'Ethereum',
  binancecoin: 'Binance Coin',
  solana: 'Solana',
  cardano: 'Cardano',
  ripple: 'XRP',
  dogecoin: 'Dogecoin',
  'the-open-network': 'Toncoin',
  'avalanche-2': 'Avalanche',
  polkadot: 'Polkadot',
} as const;

export const CRYPTO_SYMBOLS = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  binancecoin: 'BNB',
  solana: 'SOL',
  cardano: 'ADA',
  ripple: 'XRP',
  dogecoin: 'DOGE',
  'the-open-network': 'TON',
  'avalanche-2': 'AVAX',
  polkadot: 'DOT',
} as const;
