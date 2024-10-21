import React from 'react';

interface ButtonProps {
  children: any;
  className?: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white text-black font-bold hover:bg-gray-200 hover:text-gray-800 px-4 py-2 rounded transition duration-300 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};
