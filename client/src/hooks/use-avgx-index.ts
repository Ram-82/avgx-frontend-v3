import { useQuery } from '@tanstack/react-query';
import { useAvgxStore } from '@/stores/avgx-store';
import { useEffect } from 'react';

export const useAvgxIndex = () => {
  const avgxStore = useAvgxStore();
  
  const indexQuery = useQuery({
    queryKey: ['/api/avgx/index'],
    refetchInterval: 60000, // Refresh every 60 seconds
  });
  
  const fiatQuery = useQuery({
    queryKey: ['/api/avgx/fiat-rates'],
    refetchInterval: 60000,
  });
  
  const cryptoQuery = useQuery({
    queryKey: ['/api/avgx/crypto-prices'],
    refetchInterval: 60000,
  });
  
  const chartQuery = useQuery({
    queryKey: ['/api/avgx/chart', avgxStore.timeframe],
    refetchInterval: 60000,
  });
  
  useEffect(() => {
    if (indexQuery.data) {
      avgxStore.setIndexData(indexQuery.data as any);
      avgxStore.setLastUpdate(new Date());
    }
  }, [indexQuery.data]);
  
  useEffect(() => {
    if (fiatQuery.data && Array.isArray(fiatQuery.data)) {
      avgxStore.setFiatCurrencies(fiatQuery.data as any);
    }
  }, [fiatQuery.data]);
  
  useEffect(() => {
    if (cryptoQuery.data && Array.isArray(cryptoQuery.data)) {
      avgxStore.setCryptoCurrencies(cryptoQuery.data as any);
    }
  }, [cryptoQuery.data]);
  
  useEffect(() => {
    if (chartQuery.data && Array.isArray(chartQuery.data)) {
      avgxStore.setChartData(chartQuery.data as any);
    }
  }, [chartQuery.data]);
  
  useEffect(() => {
    avgxStore.setLoading(
      indexQuery.isLoading || 
      fiatQuery.isLoading || 
      cryptoQuery.isLoading || 
      chartQuery.isLoading
    );
  }, [indexQuery.isLoading, fiatQuery.isLoading, cryptoQuery.isLoading, chartQuery.isLoading]);
  
  useEffect(() => {
    const error = indexQuery.error || fiatQuery.error || cryptoQuery.error || chartQuery.error;
    avgxStore.setError(error ? error.message : null);
  }, [indexQuery.error, fiatQuery.error, cryptoQuery.error, chartQuery.error]);
  
  return {
    ...avgxStore,
    refetch: () => {
      indexQuery.refetch();
      fiatQuery.refetch();
      cryptoQuery.refetch();
      chartQuery.refetch();
    },
  };
};
