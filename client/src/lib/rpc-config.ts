// RPC Configuration
// Using working RPC endpoints

export const RPC_CONFIG = {
  // Working RPCs
  active: {
    sepolia: 'https://eth-sepolia.g.alchemy.com/v2/Mc7rl0E3u-NPYomkWMBPE',
    amoy: 'https://rpc-amoy.polygon.technology',
  },

  // Backup public RPCs
  public: {
    sepolia: 'https://ethereum-sepolia-rpc.publicnode.com',
    amoy: 'https://polygon-amoy-bor-rpc.publicnode.com',
  },
};

// Export the RPC URLs you want to use
export const ACTIVE_RPC_URLS = RPC_CONFIG.active;

// Testnet Faucets
export const FAUCET_URLS = {
  sepolia: [
    { name: 'Sepolia Faucet 1', url: 'https://sepolia-faucet.pk910.de/' },
    { name: 'Sepolia Faucet 2', url: 'https://www.infura.io/faucet/sepolia' },
    { name: 'Sepolia Faucet 3', url: 'https://cloud.google.com/application/web3/faucet/ethereum/sepolia' }
  ],
  mumbai: [
    { name: 'Mumbai Faucet 1', url: 'https://faucet.polygon.technology/' },
    { name: 'Mumbai Faucet 2', url: 'https://www.alchemy.com/faucets/polygon-mumbai' },
    { name: 'Mumbai Faucet 3', url: 'https://mumbai-faucet.matic.today/' }
  ],
  amoy: [
    { name: 'Polygon Faucet 1', url: 'https://faucet.polygon.technology/' },
    { name: 'Polygon Faucet 2', url: 'https://www.alchemy.com/faucets/polygon-amoy' },
    { name: 'Polygon Faucet 3', url: 'https://cloud.google.com/application/web3/faucet/polygon' }
  ]
};

// Instructions for getting API keys
export const API_KEY_INSTRUCTIONS = {
  alchemy: {
    url: 'https://www.alchemy.com/',
    steps: [
      '1. Sign up at alchemy.com',
      '2. Create a new app',
      '3. Select Ethereum Sepolia and Polygon Mumbai networks',
      '4. Copy your API key',
      '5. Replace YOUR_ALCHEMY_API_KEY in this file',
    ],
  },
  infura: {
    url: 'https://infura.io/',
    steps: [
      '1. Sign up at infura.io',
      '2. Create a new project',
      '3. Enable Ethereum and Polygon networks',
      '4. Copy your Project ID',
      '5. Replace YOUR_INFURA_PROJECT_ID in this file',
    ],
  },
};