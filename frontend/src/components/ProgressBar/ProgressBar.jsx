import React from 'react';

export const ProgressBar = ({ 
  progress = 0,
  showLabel = false,
  variant = 'primary',
  className = '',
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-violet-600',
    teal: 'bg-gradient-to-r from-teal-600 to-emerald-600',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Progress</span>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{progress}%</span>
        </div>
      )}
      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-sm">
        <div
          className={`h-full ${variants[variant]} rounded-full transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}