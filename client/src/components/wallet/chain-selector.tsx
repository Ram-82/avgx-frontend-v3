import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWallet } from "@/hooks/use-wallet";
import { SUPPORTED_CHAINS } from "@/lib/constants";

export const ChainSelector = () => {
  const { selectedChain, switchChain } = useWallet();

  const handleChainChange = (value: string) => {
    if (value === 'sepolia' || value === 'amoy') {
      switchChain(value);
    }
  };

  return (
    <Select value={selectedChain} onValueChange={handleChainChange}>
      <SelectTrigger className="bg-secondary text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900 border-white/10 dark:border-white/10 light:border-gray-200 focus:border-accent-teal">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="sepolia">
          {SUPPORTED_CHAINS.sepolia.name}
        </SelectItem>
        <SelectItem value="amoy">
          {SUPPORTED_CHAINS.amoy.name}
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
