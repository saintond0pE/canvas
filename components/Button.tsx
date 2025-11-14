import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'text-white bg-[#2D3748] hover:bg-[#1A202C] focus:ring-[#2D3748] dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-500',
    secondary: 'text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-gray-300 dark:text-white dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:ring-slate-500',
    tertiary: 'text-gray-700 bg-transparent hover:bg-gray-100 focus:ring-gray-300 dark:text-gray-300 dark:hover:bg-slate-800 dark:focus:ring-slate-600',
    icon: 'p-2 rounded-lg bg-white/40 backdrop-blur-sm border border-white/50 shadow-md hover:bg-white/60 focus:ring-purple-500 focus:ring-offset-transparent disabled:shadow-none disabled:bg-white/20 hover:scale-105 hover:shadow-purple-400/30 active:scale-100 dark:bg-slate-800/40 dark:border-white/20 dark:hover:bg-slate-700/60 dark:disabled:bg-slate-800/20',
  };

  const className = `${baseClasses} ${size === 'md' ? variant === 'icon' ? '' : sizeClasses[size] : sizeClasses[size]} ${variantClasses[variant]} ${props.className || ''}`;

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default Button;
