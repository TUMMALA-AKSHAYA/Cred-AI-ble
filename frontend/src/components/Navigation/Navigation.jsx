import React from 'react';
import { Button } from '../Button/Button';
import { Container } from '../Layout/Layout';

export const Navigation = ({ onSignIn = () => {} }) => {
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
          <Button variant="secondary" size="sm" onClick={onSignIn}>
            Sign In
          </Button>
        </div>
      </Container>
    </nav>
  );
};