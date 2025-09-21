import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { SetupGuide } from "./setup-guide";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from 'react';

export const WalletConnectButton: React.FC = () => {
  const { address, isConnected, isConnecting, connect, disconnect, error } = useWallet();
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  const handleConnect = async () => {
    try {
      await connect();
    } catch (err: any) {
      console.error('Connection error:', err);
      
      // Show setup guide for various error conditions
      if (err.message?.includes('MetaMask is not installed') || 
          err.message?.includes('User rejected') ||
          err.message?.includes('Connection rejected') ||
          !window.ethereum) {
        setShowSetupGuide(true);
      }
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Check if MetaMask is not available
  const isMetaMaskUnavailable = typeof window !== 'undefined' && (
    !window.ethereum || !window.ethereum.isMetaMask
  );

  if (isMetaMaskUnavailable) {
    return (
      <>
        <Button
          onClick={() => setShowSetupGuide(true)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Wallet className="w-4 h-4" />
          Setup Wallet
        </Button>

        <Dialog open={showSetupGuide} onOpenChange={setShowSetupGuide}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">MetaMask Setup Required</DialogTitle>
            </DialogHeader>
            <SetupGuide />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2">
        {isConnected && address ? (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              {formatAddress(address)}
            </Badge>
            <Button
              onClick={handleDisconnect}
              variant="outline"
              size="sm"
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className="flex items-center gap-2"
          >
            {isConnecting ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Wallet className="w-4 h-4" />
            )}
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        )}
      </div>

      {/* Setup Guide Modal */}
      <Dialog open={showSetupGuide} onOpenChange={setShowSetupGuide}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">MetaMask Setup Required</DialogTitle>
          </DialogHeader>
          <SetupGuide />
        </DialogContent>
      </Dialog>
    </>
  );
};