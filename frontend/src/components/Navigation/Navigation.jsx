import React from 'react';
import { Button } from '../Button/Button';
import { Container } from '../Layout/Layout';
import { useWallet } from '../../contexts/WalletContext';

export const Navigation = ({ onSignIn = () => {} }) => {
  const { walletAddress, balance, connectWallet, disconnectWallet, loading } = useWallet();

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <Container className="py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          CredAIble
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium text-sm transition-colors">
            Features
          </button>
          <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium text-sm transition-colors">
            Pricing
          </button>
          {walletAddress ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/30 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{formatAddress(walletAddress)}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">|</span>
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{balance.toFixed(2)} ALGO</span>
              </div>
              <Button variant="ghost" size="sm" onClick={disconnectWallet}>
                Disconnect
              </Button>
            </div>
          ) : (
            <Button variant="primary" size="sm" onClick={connectWallet} disabled={loading}>
              {loading ? '🔄 Connecting...' : '🔗 Connect Wallet'}
            </Button>
          )}
        </div>
      </Container>
    </nav>
  );
};