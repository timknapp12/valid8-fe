import React from 'react';

interface RowProps {
  className?: string;
  children: React.ReactNode;
}

export const Row: React.FC<RowProps> = ({ className = '', children }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 relative ${className}`}
    >
      {children}
    </div>
  );
};
