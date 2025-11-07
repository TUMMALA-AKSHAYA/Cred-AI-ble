import React from 'react';
import { Button, Card, Container, Navigation, Badge } from '../components';

export const LandingPage = ({ onStartQuiz }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      <Navigation />

      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-violet-500/5 dark:bg-violet-500/5 rounded-full blur-3xl"></div>
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="mb-8">
              <Badge variant="primary" icon="✨">
                AI + Blockchain. Verified Career Paths.
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
              Discover Your Career.
              <span className="block bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Earn Verified Credentials.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mb-8 font-light">
              AI-powered psychometric assessment + blockchain NFT credentials. Discover your ideal career path in 5 minutes. Get hired with immutable proof of your skills.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" onClick={onStartQuiz}>
                Start Your Discovery
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
              <Button variant="secondary" size="lg">
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400"></div>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">2,847 students enrolled</span>
              </div>
              <span className="text-sm text-gray-400 dark:text-gray-600">•</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">⭐ 4.9/5 average rating</span>
              <span className="text-sm text-gray-400 dark:text-gray-600">•</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">🔗 1,200+ credentials minted</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900">
        <Container>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '1',
                title: 'AI Assessment',
                description: 'Answer 8 psychometric questions. AI analyzes your personality traits.',
              },
              {
                number: '2',
                title: 'Career Match',
                description: 'Get personalized career recommendations based on your profile.',
              },
              {
                number: '3',
                title: 'Verified Badge',
                description: 'Earn NFT credentials minted on Algorand blockchain.',
              },
            ].map((item, idx) => (
              <Card key={idx} variant="default">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">{item.number}</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <Container>
          <Card variant="gradient" className="text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Discover Your Path?</h2>
            <p className="text-lg mb-8 opacity-90">Join thousands of students building verifiable career credentials.</p>
            <Button variant="primary" size="lg" onClick={onStartQuiz}>
              Start Free Discovery
            </Button>
          </Card>
        </Container>
      </section>
    </div>
  );
};