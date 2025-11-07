import React from 'react';

export const Layout = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      {children}
    </div>
  );
};

export const Container = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};