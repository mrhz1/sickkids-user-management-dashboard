import React from 'react';

type TextElement = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3';

interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, 'ref'> {
  as?: TextElement;
  variant?: 'body1' | 'body2' | 'caption' | 'label';
  children: React.ReactNode;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ as: Component = 'p', variant = 'body1', className = '', ...props }, ref) => {
    const variantClasses = {
      body1: 'text-base text-gray-900 leading-6',
      body2: 'text-sm text-gray-700 leading-5',
      caption: 'text-xs text-gray-600 leading-4',
      label: 'text-sm font-medium text-gray-900',
    };

    return (
      <Component
        ref={ref as React.Ref<HTMLDivElement>}
        className={`${variantClasses[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';
