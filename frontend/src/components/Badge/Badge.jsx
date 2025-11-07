import React from 'react';

export const Badge = ({ 
  variant = 'default',
  icon,
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200';
  
  const variants = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700',
    primary: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800',
    success: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800',
    teal: 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border border-teal-300 dark:border-teal-800',
    warning: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}