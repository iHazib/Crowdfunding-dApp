import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PrivyProvider } from '@privy-io/react-auth';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrivyProvider
      appId="cmkebbqo80041ju0cx99x28d7" // <--- PASTE YOUR APP ID HERE
      config={{
        // This is the "better auth" part:
        loginMethods: ['wallet'], 
        appearance: {
          theme: 'dark',
          accentColor: '#6366f1',
          showWalletLoginFirst: false,
        },
        // This creates a wallet automatically for users who login via Google/Email
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);