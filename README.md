# AVGX Frontend

The frontend application for the AVGX Protocol - a neutral global digital currency.

## Features

- Real-time AVGX index tracking
- Interactive price charts and market data
- Wallet integration for blockchain interactions
- Trading interface for minting/redeeming AVGX tokens
- Modern UI with dark/light theme support

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Radix UI for components
- React Query for data fetching
- Zustand for state management
- Wouter for routing

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
frontend/
├── client/                 # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── stores/        # State management
│   │   └── lib/           # Utilities and configs
│   └── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```
