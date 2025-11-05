import React from 'react';
import { Wallet, LogOut, Loader } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

const WalletConnect = () => {
  const { walletAddress, balance, loading, connectWallet, disconnectWallet } = useWallet();

  if (walletAddress) {
    return (
      <div className="flex items-center gap-4">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl px-6 py-3 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <div>
              <div className="text-xs text-slate-400">Balance</div>
              <div className="text-sm font-bold text-white">{balance.toFixed(2)} ALGO</div>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-700"></div>
          <div>
            <div className="text-xs text-slate-400">Address</div>
            <div className="text-sm font-mono text-white">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>
          </div>
        </div>
        <button
          onClick={disconnectWallet}
          className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl hover:bg-red-500/20 transition-all duration-300 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Disconnect</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={loading}
      className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader className="w-5 h-5 animate-spin" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <Wallet className="w-5 h-5" />
          <span>Connect Wallet</span>
        </>
      )}
    </button>
  );
};


export default WalletConnect;
