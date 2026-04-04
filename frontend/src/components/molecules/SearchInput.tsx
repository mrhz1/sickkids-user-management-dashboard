import React from 'react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = 'Search...', className = '', ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400 pointer-events-none text-sm">🔍</div>
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:bg-white transition-colors ${className}`}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
