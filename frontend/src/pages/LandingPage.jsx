import React from 'react';
import { Button, Card, Container, Navigation, Badge } from '../components';

export const LandingPage = ({ onStartQuiz }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      {/* Glass Morphism Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200/20 dark:border-white/10">
        <Navigation />
      </nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* 3D Spotlight Radial Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main spotlight behind heading */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-indigo-500/30 via-violet-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-violet-600/40 via-indigo-500/20 to-transparent rounded-full blur-2xl animate-pulse"></div>

          {/* Parallax Floating Gradient Orbs */}
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-gradient-to-br from-violet-500/15 to-indigo-500/15 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-400/10 to-violet-600/10 rounded-full blur-2xl animate-float-slow"></div>
        </div>

        <Container className="relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Premium Badge */}
            <div className="mb-8 inline-flex">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative px-6 py-2 bg-white dark:bg-black rounded-full border border-gray-200 dark:border-white/10">
                  <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    ✨ AI + Blockchain. Verified Career Paths.
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Headline with 3D Depth */}
            <h1 className="relative text-6xl md:text-8xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-8">
              <span className="block">Discover Your Career.</span>
              <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient-x">
                Earn Verified Credentials.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto mb-12 font-light">
              AI-powered psychometric assessment + blockchain NFT credentials. Discover your ideal career path in 5 minutes — own proof of your skills on-chain, forever.
            </p>

            {/* 3D CTA Buttons with Physics Hover */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={onStartQuiz}
                className="group relative px-8 py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-lg font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50 active:scale-95"
                style={{
                  transform: 'translateZ(0)',
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) translateZ(20px) rotateX(5deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) translateZ(0) rotateX(0deg)';
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Career Diagnosis
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="group px-8 py-5 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-white/20 dark:hover:bg-white/10 hover:shadow-xl active:scale-95">
                Watch Demo
              </button>
            </div>

            {/* Social Proof - Premium Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12 border-t border-gray-200/50 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 border-2 border-white dark:border-black"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-400 border-2 border-white dark:border-black"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white dark:border-black"></div>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">2,847 students already discovering careers</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">🔗 1,200+ verified credentials minted on-chain</span>
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