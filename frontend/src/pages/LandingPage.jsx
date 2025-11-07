import React from 'react';
import { Button, Card, Container, Navigation, Badge } from '../components';

export const LandingPage = ({ onStartQuiz }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>
      {/* Premium Glass Morphism Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0E0F13]/80 dark:bg-[#0E0F13]/90 backdrop-blur-xl border-b border-white/10">
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
            <h1 className="relative text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight md:tracking-[-0.01em] mb-8">
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
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-lg font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 backdrop-blur-sm"
                style={{
                  transform: 'translateZ(0)',
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) translateZ(10px) rotateX(2deg)';
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

              <button className="group px-8 py-4 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-100 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:bg-white/20 dark:hover:bg-white/10 hover:shadow-lg active:scale-95">
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

      {/* Value Proposition Grid */}
      <section className="relative py-32 bg-white dark:bg-black overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent"></div>

        <Container className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Why Choose Cred-AI-ble?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
              The future of career discovery powered by AI and secured on the blockchain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: 'AI-Powered Insights',
                description: 'Advanced psychometric algorithms analyze your personality traits and match you with ideal career paths.',
              },
              {
                icon: '⛓️',
                title: 'Blockchain Verified',
                description: 'Earn immutable NFT credentials on Algorand blockchain that prove your skills forever.',
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Complete your career assessment in just 5 minutes and get instant personalized results.',
              },
              {
                icon: '🎯',
                title: 'Precision Matching',
                description: 'Get matched with careers based on 20+ personality dimensions and industry requirements.',
              },
              {
                icon: '🔒',
                title: 'Privacy First',
                description: 'Your data is encrypted and secured. Only you control what gets stored on-chain.',
              },
              {
                icon: '🌐',
                title: 'Globally Recognized',
                description: 'Share your verified credentials with employers worldwide. Trusted by leading companies.',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative p-8 bg-white dark:bg-black rounded-3xl border border-gray-200 dark:border-white/10 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/0 via-violet-500/0 to-indigo-500/0 group-hover:from-indigo-500/10 group-hover:via-violet-500/5 group-hover:to-indigo-500/10 transition-all duration-500"></div>

                {/* Gradient border glow */}
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-indigo-500/0 via-violet-500/0 to-indigo-500/0 group-hover:from-indigo-500/50 group-hover:via-violet-500/30 group-hover:to-indigo-500/50 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
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

      {/* Premium Footer */}
      <footer className="relative py-16 bg-white dark:bg-black border-t border-gray-200/50 dark:border-white/10">
        <Container>
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-4">
                Cred-AI-ble
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                AI-powered career discovery with blockchain-verified credentials for the future workforce.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">How It Works</a></li>
                <li><a href="#credentials" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Credentials</a></li>
                <li><a href="#careers" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a></li>
                <li><a href="#blog" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog</a></li>
                <li><a href="#careers" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Careers</a></li>
                <li><a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#privacy" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</a></li>
                <li><a href="#terms" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms</a></li>
                <li><a href="#security" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200/50 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 Cred-AI-ble. Built for AlgoBharat 2025. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#twitter" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <span className="text-xl">𝕏</span>
              </a>
              <a href="#linkedin" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <span className="text-xl">in</span>
              </a>
              <a href="#github" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <span className="text-xl">⚡</span>
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};