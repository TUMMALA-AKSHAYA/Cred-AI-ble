import React from 'react';

export const Card = ({ 
  variant = 'default',
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = 'rounded-xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 p-6',
    glass: 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-white/30 dark:border-gray-700/50 shadow-xl p-6',
    gradient: 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-2xl p-8',
    minimal: 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};