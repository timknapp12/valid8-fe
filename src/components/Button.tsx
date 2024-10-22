import React from 'react';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-hotPink text-black font-bold hover:bg-gray-200 hover:text-gray-800 px-4 py-2 rounded transition duration-300 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};
