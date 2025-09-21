import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { useAvgxStore } from "@/stores/avgx-store";
import { useAvgxIndex } from "@/hooks/use-avgx-index";

export const AvgxPriceChart = () => {
  const { chartData, timeframe, setTimeframe } = useAvgxStore();
  const { isLoading } = useAvgxIndex();

  const timeframes = [
    { label: '24H', value: '24h' as const },
    { label: '7D', value: '7d' as const },
    { label: '1M', value: '1m' as const },
    { label: '1Y', value: '1y' as const },
  ];

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    if (timeframe === '24h') {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (timeframe === '7d') {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-avgx-secondary dark:bg-avgx-secondary light:bg-white border border-white/10 dark:border-white/10 light:border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 text-sm">
            {new Date(label).toLocaleString()}
          </p>
          <p className="text-accent-teal font-mono font-bold">
            ${payload[0].value.toFixed(4)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-teal mx-auto mb-4"></div>
          <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Loading chart data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex space-x-2 mb-6">
        {timeframes.map((tf) => (
          <Button
            key={tf.value}
            variant={timeframe === tf.value ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe(tf.value)}
            className={
              timeframe === tf.value
                ? "bg-accent-teal text-white"
                : "bg-secondary text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 hover:bg-accent-teal hover:text-white"
            }
          >
            {tf.label}
          </Button>
        ))}
      </div>

      <div className="chart-container rounded-xl p-4 h-80">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="timestamp"
                tickFormatter={formatXAxis}
                stroke="#94A3B8"
                fontSize={12}
              />
              <YAxis 
                domain={['dataMin - 0.01', 'dataMax + 0.01']}
                tickFormatter={(value) => `$${value.toFixed(3)}`}
                stroke="#94A3B8"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#14B8A6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#14B8A6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl text-accent-teal mb-4">📈</div>
              <p className="text-xl text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">No chart data available</p>
              <p className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 mt-2">
                Chart will update automatically when data is available
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
