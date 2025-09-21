import { create } from 'zustand';

export interface AvgxIndexData {
  value: number;
  wfValue: number;
  wcValue: number;
  change24h: number;
  timestamp: Date;
}

export interface FiatCurrency {
  currency: string;
  name: string;
  rate: number;
  weight: number;
}

export interface CryptoCurrency {
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  weight: number;
}

interface AvgxStore {
  indexData: AvgxIndexData | null;
  fiatCurrencies: FiatCurrency[];
  cryptoCurrencies: CryptoCurrency[];
  chartData: { timestamp: Date; value: number }[];
  timeframe: '24h' | '7d' | '1m' | '1y';
  isLoading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  
  // Actions
  setIndexData: (data: AvgxIndexData) => void;
  setFiatCurrencies: (currencies: FiatCurrency[]) => void;
  setCryptoCurrencies: (currencies: CryptoCurrency[]) => void;
  setChartData: (data: { timestamp: Date; value: number }[]) => void;
  setTimeframe: (timeframe: '24h' | '7d' | '1m' | '1y') => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLastUpdate: (date: Date) => void;
}

export const useAvgxStore = create<AvgxStore>((set) => ({
  indexData: null,
  fiatCurrencies: [],
  cryptoCurrencies: [],
  chartData: [],
  timeframe: '24h',
  isLoading: false,
  error: null,
  lastUpdate: null,
  
  setIndexData: (data) => set({ indexData: data }),
  setFiatCurrencies: (currencies) => set({ fiatCurrencies: currencies }),
  setCryptoCurrencies: (currencies) => set({ cryptoCurrencies: currencies }),
  setChartData: (data) => set({ chartData: data }),
  setTimeframe: (timeframe) => set({ timeframe }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setLastUpdate: (date) => set({ lastUpdate: date }),
}));
