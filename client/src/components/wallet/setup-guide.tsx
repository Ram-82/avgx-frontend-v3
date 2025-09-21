import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Wallet,
  Coins,
  Settings,
  Monitor,
  Key,
} from "lucide-react";
import { FAUCET_URLS, API_KEY_INSTRUCTIONS } from "@/lib/rpc-config";

export const SetupGuide = () => {
  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6 text-white">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-2">Wallet & Testnet Setup Guide</h3>
        <p className="text-gray-400">
          Follow these steps to get started with AVGX
        </p>
      </div>

      <div className="space-y-6">
        {/* Step 1: Install MetaMask */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
              <Wallet className="h-4 w-4 text-blue-400" />
            </div>
            <h4 className="font-semibold text-lg">1. Install MetaMask</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Download and install MetaMask browser extension
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openLink("https://metamask.io/download/")}
            className="gap-2 bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            Download MetaMask
          </Button>
        </div>

        {/* Step 2: Add Test Networks */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
              <Monitor className="h-4 w-4 text-green-400" />
            </div>
            <h4 className="font-semibold text-lg">2. Add Test Networks</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Add Ethereum Sepolia and Polygon Mumbai to MetaMask
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => openLink("https://sepolia.etherscan.io/")}
              className="gap-2 bg-transparent border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              Add Sepolia
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                openLink("https://www.coincarp.com/chainlist/mumbai/")
              }
              className="gap-2 bg-transparent border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              Add Mumbai
            </Button>
          </div>
        </div>

        {/* Step 3: Get Test Tokens */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
              <Coins className="h-4 w-4 text-yellow-400" />
            </div>
            <h4 className="font-semibold text-lg">3. Get Test Tokens</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Claim free testnet ETH and MATIC from faucets
          </p>

          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-sm mb-2 text-blue-300">
                Sepolia ETH Faucets:
              </h5>
              <div className="grid grid-cols-3 gap-2">
                {FAUCET_URLS.sepolia?.map((faucet, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => openLink(faucet.url)}
                    className="text-xs bg-transparent border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Faucet {index + 1}
                  </Button>
                )) || []}
              </div>
            </div>

            <div>
              <h5 className="font-medium text-sm mb-2 text-purple-300">
                Mumbai MATIC Faucets:
              </h5>
              <div className="grid grid-cols-3 gap-2">
                {FAUCET_URLS.mumbai?.map((faucet, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => openLink(faucet.url)}
                    className="text-xs bg-transparent border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Faucet {index + 1}
                  </Button>
                )) || []}
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: RPC API Keys */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
              <Key className="h-4 w-4 text-purple-400" />
            </div>
            <h4 className="font-semibold text-lg">
              4. RPC API Keys (Optional)
            </h4>
          </div>
          <p className="text-gray-400 mb-4">
            For better performance, get free API keys from Alchemy or Infura
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => openLink("https://www.alchemy.com/")}
              className="gap-2 bg-transparent border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              Get Alchemy Key
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openLink("https://infura.io/")}
              className="gap-2 bg-transparent border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              Get Infura Key
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center pt-4 border-t border-slate-700">
        <p className="text-sm text-gray-400">
          Once you've completed these steps, try connecting your wallet again.
        </p>
      </div>
    </div>
  );
};
