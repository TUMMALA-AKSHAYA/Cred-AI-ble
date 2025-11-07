import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Badge, ProgressBar } from '../components';
import { useQuiz } from '../hooks/useQuiz';
import { useWallet } from '../contexts/WalletContext';
import { algorandAPI } from '../services/algorandApi';

export const DashboardPage = ({ onStartNewQuiz, onViewRoadmap }) => {
  const { results, userPoints, userStreak, userBadges, domainResults } = useQuiz();
  const { walletAddress } = useWallet();
  const [minting, setMinting] = useState(false);
  const [mintedNFT, setMintedNFT] = useState(null);
  const [userNFTs, setUserNFTs] = useState([]);
  const [loadingNFTs, setLoadingNFTs] = useState(false);

  // Fetch user's NFT badges when wallet is connected
  useEffect(() => {
    if (walletAddress) {
      fetchUserNFTs();
    }
  }, [walletAddress]);

  const fetchUserNFTs = async () => {
    if (!walletAddress) return;
    setLoadingNFTs(true);
    try {
      const response = await algorandAPI.getUserBadges(walletAddress);
      if (response.success) {
        setUserNFTs(response.data);
      }
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    } finally {
      setLoadingNFTs(false);
    }
  };

  const handleMintNFT = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first!');
      return;
    }

    if (!results || !results[0]) {
      alert('No quiz results found!');
      return;
    }

    setMinting(true);
    try {
      const score = domainResults ? domainResults.score : 85;
      const percentile = domainResults ? domainResults.percentile : 82;

      const response = await algorandAPI.mintBadge(
        walletAddress,
        results[0].career,
        score,
        percentile
      );

      if (response.success) {
        setMintedNFT(response.data);
        alert(`🎉 NFT Badge Minted Successfully!\n\nAsset ID: ${response.data.assetId}\nTransaction: ${response.data.txId}\n\nView on Explorer: ${response.data.explorerUrl}`);
        // Refresh NFTs after minting
        await fetchUserNFTs();
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
      alert('Failed to mint NFT. Please try again.');
    } finally {
      setMinting(false);
    }
  };

  const badges = [
    { id: 1, name: 'Career Explorer', icon: '🔍', description: 'Complete your first quiz', earned: true },
    { id: 2, name: 'Quick Learner', icon: '⚡', description: 'Score 80% or higher', earned: true },
    { id: 3, name: 'Skill Master', icon: '🏆', description: 'Complete 3 quizzes', earned: true },
    { id: 4, name: 'Blockchain Pro', icon: '⛓️', description: 'Verify on-chain', earned: userNFTs.length > 0 },
  ];

  const leaderboard = [
    { rank: 1, name: 'You', points: userPoints, streak: userStreak, icon: '👑' },
    { rank: 2, name: 'Alex Chen', points: 2850, streak: 15 },
    { rank: 3, name: 'Jordan Smith', points: 2650, streak: 12 },
    { rank: 4, name: 'Morgan Lee', points: 2100, streak: 8 },
    { rank: 5, name: 'Casey Rivera', points: 1890, streak: 6 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black py-12 md:py-20">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Your Dashboard</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Track your career discovery journey</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card variant="default">
            <div className="text-4xl mb-2">⭐</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Points</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{userPoints}</p>
          </Card>
          <Card variant="default">
            <div className="text-4xl mb-2">🔥</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Streak</p>
            <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">{userStreak} days</p>
          </Card>
          <Card variant="default">
            <div className="text-4xl mb-2">🎖️</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Badges Earned</p>
            <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{userBadges.length}/4</p>
          </Card>
        </div>

        {/* Career Match */}
        {results && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Career Match</h2>
            <Card variant="glass">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-5xl mb-3">{results[0].icon}</div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{results[0].career}</h3>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">92%</div>
                  <Badge variant="success" icon="✓">Verified Match</Badge>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{results[0].description}</p>
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Skill Proficiency</p>
                <ProgressBar progress={67} />
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {results[0].skills.map((skill) => (
                  <Badge key={skill} variant="teal">{skill}</Badge>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Button size="lg" onClick={onViewRoadmap}>
                  View Full Roadmap →
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleMintNFT}
                  disabled={minting || !walletAddress}
                >
                  {minting ? '⏳ Minting...' : walletAddress ? '⛓️ Mint NFT Badge' : '🔗 Connect Wallet First'}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* NFT Badges Section */}
        {walletAddress && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Blockchain Credentials</h2>
            <Card variant="glass" className="border-2 border-indigo-500/20">
              {loadingNFTs ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">⏳</div>
                  <p className="text-gray-600 dark:text-gray-400">Loading your NFT badges...</p>
                </div>
              ) : userNFTs.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userNFTs.map((nft, idx) => (
                    <div key={idx} className="p-6 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                      <div className="text-5xl mb-4 text-center">🏆</div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">{nft.name}</h3>
                      <div className="text-center mb-4">
                        <Badge variant="success" icon="✓">Verified On-Chain</Badge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-center break-all">
                        Asset ID: {nft.assetId}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">⛓️</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No NFT Badges Yet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Mint your first blockchain-verified credential above!
                  </p>
                </div>
              )}
            </Card>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          {/* Badges */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Badges</h2>
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge) => (
                <Card
                  key={badge.id}
                  variant={badge.earned ? 'default' : 'minimal'}
                  className={badge.earned ? '' : 'opacity-50 grayscale'}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{badge.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{badge.description}</p>
                  {badge.earned && (
                    <Badge variant="success" icon="✓" className="mt-3">
                      Earned
                    </Badge>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Leaderboard</h2>
            <Card variant="default">
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div key={user.rank} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{user.icon || ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'][user.rank - 1]}</span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">🔥 {user.streak} day streak</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{user.points}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12">
          <Card variant="gradient">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-3">Ready for Your Next Challenge?</h2>
              <p className="text-lg mb-6 opacity-90">Earn more points and unlock new badges</p>
              <Button variant="primary" size="lg" onClick={onStartNewQuiz}>
                Start New Assessment
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}