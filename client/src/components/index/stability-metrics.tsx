import { useQuery } from "@tanstack/react-query";
import { GlassCard } from "@/components/ui/glass-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface StabilityData {
  wf_raw: number;
  wf_smoothed: number;
  wc_raw: number;
  wc_smoothed: number;
  volatility_index: number;
  wc_adjusted: number;
  avgx_final: number;
  config: {
    alpha_f: number;
    alpha_c: number;
    v_target: number;
    clamp_percent: number;
  };
  timestamp: string;
}

async function fetchStabilityMetrics(): Promise<StabilityData> {
  const response = await fetch('/api/v2/avgx/debug');
  if (!response.ok) {
    throw new Error(`Failed to fetch stability metrics: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data.data;
}

export function StabilityMetrics() {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ['stability-metrics'],
    queryFn: fetchStabilityMetrics,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <GlassCard className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-avgx-text-secondary rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-avgx-text-secondary rounded w-full"></div>
            <div className="h-3 bg-avgx-text-secondary rounded w-5/6"></div>
            <div className="h-3 bg-avgx-text-secondary rounded w-4/6"></div>
          </div>
        </div>
      </GlassCard>
    );
  }

  if (error || !metrics) {
    return (
      <GlassCard className="p-6">
        <div className="text-red-400 text-sm mb-2">Failed to load stability metrics</div>
        <div className="text-xs text-avgx-text-secondary">
          Error: {error?.message || 'Unknown error'}
        </div>
        <div className="text-xs text-avgx-text-secondary mt-1">
          Check if backend is running on port 5010
        </div>
      </GlassCard>
    );
  }

  const volatilityPercent = (metrics.volatility_index * 100).toFixed(2);
  const stabilityScore = ((1 - metrics.volatility_index) * 100).toFixed(1);

  return (
    <TooltipProvider>
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
            Stability Metrics
          </h3>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-avgx-text-secondary" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm max-w-xs">
                Stability ensured by volatility index σ. Lower volatility index means higher stability.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-avgx-text-secondary">Volatility Index (σₜ)</span>
            <span className="font-mono text-sm text-avgx-text-primary">{volatilityPercent}%</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-avgx-text-secondary">Stability Score</span>
            <span className="font-mono text-sm text-accent-teal">{stabilityScore}%</span>
          </div>

          <div className="pt-2 border-t border-avgx-text-secondary/20">
            <div className="text-xs text-avgx-text-secondary space-y-1">
              <div className="flex justify-between">
                <span>WF Smoothed:</span>
                <span className="font-mono">{metrics.wf_smoothed.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span>WC Adjusted:</span>
                <span className="font-mono">${metrics.wc_adjusted.toFixed(0)}</span>
              </div>
            </div>
          </div>
          
          <div className="w-full bg-avgx-secondary rounded-full h-2 mt-3">
            <div 
              className="bg-gradient-to-r from-accent-teal to-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stabilityScore}%` }}
            ></div>
          </div>
        </div>
      </GlassCard>
    </TooltipProvider>
  );
}
