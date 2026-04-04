import React from 'react';

interface BadgeProps {
  count?: number;
  variant?: 'primary' | 'danger';
}

export const Badge: React.FC<BadgeProps> = ({ count, variant = 'primary' }) => {
  const variantClasses = {
    primary: 'bg-blue-600 text-white',
    danger: 'bg-red-600 text-white',
  };

  if (!count) return null;

  return (
    <span
      className={`inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-xs font-bold ${variantClasses[variant]}`}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
};
