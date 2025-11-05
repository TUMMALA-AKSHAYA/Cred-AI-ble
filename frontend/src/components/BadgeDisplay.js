import React, { useState, useEffect } from 'react';
import { Award, ExternalLink, Loader, Trophy } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { algorandAPI } from '../services/algorandApi';

const BadgeDisplay = () => {
  const { walletAddress } = useWallet();
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (walletAddress) {
      fetchBadges();
    }
  }, [walletAddress]);

  const fetchBadges = async () => {
    setLoading(true);
    try {
      const response = await algorandAPI.getUserBadges(walletAddress);
      if (response.success) {
        setBadges(response.data);
      }
    } catch (error) {
      console.error('Error fetching badges:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!walletAddress) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-12 text-center">
        <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-3">Your NFT Badges</h3>
        <p className="text-slate-400 mb-6">Connect your wallet to view your earned badges</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-12 text-center">
        <Loader className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-spin" />
        <p className="text-slate-400">Loading your badges...</p>
      </div>
    );
  }

  if (badges.length === 0) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-12 text-center">
        <Award className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-3">No Badges Yet</h3>
        <p className="text-slate-400">Complete career assessments to earn NFT badges!</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="w-8 h-8 text-yellow-400" />
        <h3 className="text-3xl font-bold text-white">Your NFT Badges</h3>
        <span className="ml-auto px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full font-semibold">
          {badges.length} Badge{badges.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <div
            key={badge.assetId}
            className="group bg-slate-700/30 border border-slate-600/30 rounded-2xl p-6 hover:border-purple-500/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white text-lg truncate">{badge.name}</h4>
                <p className="text-xs text-slate-400">NFT ID: {badge.assetId}</p>
              </div>
            </div>

            {badge.url && (
              <a
                href={badge.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                <span>View Details</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <a
              href={`https://testnet.algoexplorer.io/asset/${badge.assetId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>View on AlgoExplorer</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};


export default BadgeDisplay;
