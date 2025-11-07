import React from 'react';
import { Button, Card, Container, Badge, ProgressBar } from '../components';
import { useQuiz } from '../hooks/useQuiz';

export const DashboardPage = ({ onStartNewQuiz, onViewRoadmap }) => {
  const { results, userPoints, userStreak, userBadges } = useQuiz();

  const badges = [
    { id: 1, name: 'Career Explorer', icon: '🔍', description: 'Complete your first quiz', earned: true },
    { id: 2, name: 'Quick Learner', icon: '⚡', description: 'Score 80% or higher', earned: true },
    { id: 3, name: 'Skill Master', icon: '🏆', description: 'Complete 3 quizzes', earned: true },
    { id: 4, name: 'Blockchain Pro', icon: '⛓️', description: 'Verify on-chain', earned: false },
  ];

  const leaderboard = [
    { rank: 1, name: 'You', points: userPoints, streak: userStreak, icon: '👑' },
    { rank: 2, name: 'Alex Chen', points: 2850, streak: 15 },
    { rank: 3, name: 'Jordan Smith', points: 2650, streak: 12 },
    { rank: 4, name: 'Morgan Lee', points: 2100, streak: 8 },
    { rank: 5, name: 'Casey Rivera', points: 1890, streak: 6 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-12 md:py-20">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Your Dashboard</h1>
          <p className="text-lg text-gray-600">Track your career discovery journey</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card variant="default">
            <div className="text-4xl mb-2">⭐</div>
            <p className="text-sm text-gray-600 mb-2">Total Points</p>
            <p className="text-4xl font-bold text-indigo-600">{userPoints}</p>
          </Card>
          <Card variant="default">
            <div className="text-4xl mb-2">🔥</div>
            <p className="text-sm text-gray-600 mb-2">Current Streak</p>
            <p className="text-4xl font-bold text-orange-600">{userStreak} days</p>
          </Card>
          <Card variant="default">
            <div className="text-4xl mb-2">🎖️</div>
            <p className="text-sm text-gray-600 mb-2">Badges Earned</p>
            <p className="text-4xl font-bold text-emerald-600">{userBadges.length}/4</p>
          </Card>
        </div>

        {/* Career Match */}
        {results && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Career Match</h2>
            <Card variant="glass">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-5xl mb-3">{results[0].icon}</div>
                  <h3 className="text-3xl font-bold text-gray-900">{results[0].career}</h3>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold text-indigo-600">92%</div>
                  <Badge variant="success" icon="✓">Verified Match</Badge>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{results[0].description}</p>
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-600 mb-3">Skill Proficiency</p>
                <ProgressBar progress={67} />
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {results[0].skills.map((skill) => (
                  <Badge key={skill} variant="teal">{skill}</Badge>
                ))}
              </div>
              <Button size="lg" className="w-full" onClick={onViewRoadmap}>
                View Full Roadmap →
              </Button>
            </Card>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          {/* Badges */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Badges</h2>
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge) => (
                <Card
                  key={badge.id}
                  variant={badge.earned ? 'default' : 'minimal'}
                  className={badge.earned ? '' : 'opacity-50 grayscale'}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <p className="text-sm font-semibold text-gray-900">{badge.name}</p>
                  <p className="text-xs text-gray-600">{badge.description}</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Leaderboard</h2>
            <Card variant="default">
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div key={user.rank} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{user.icon || ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'][user.rank - 1]}</span>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-600">🔥 {user.streak} day streak</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-indigo-600">{user.points}</p>
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