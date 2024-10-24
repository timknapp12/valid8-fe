import React from 'react';
import { ColumnProps } from '../types';

export const Column: React.FC<ColumnProps> = ({
  className = '',
  children,
  style,
}) => {
  return (
    <div
      className={`flex flex-col w-full gap-4 items-center justify-start p-4 relative ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
