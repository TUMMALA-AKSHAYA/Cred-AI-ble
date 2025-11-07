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
    default: 'bg-gray-100 text-gray-900 border border-gray-200',
    primary: 'bg-indigo-50 text-indigo-900 border border-indigo-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-300',
    teal: 'bg-teal-50 text-teal-700 border border-teal-300',
    warning: 'bg-amber-50 text-amber-700 border border-amber-300',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}