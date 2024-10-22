import { FaSpinner } from 'react-icons/fa';
import { ButtonProps } from '../types';

export const Button = ({
  onClick,
  loading,
  children,
  className = '',
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`relative px-4 py-2 bg-hotPink text-black font-bold rounded-md 
        disabled:opacity-70 disabled:cursor-not-allowed hover:bg-darkHotPink min-w-36 ${className}`}
    >
      {loading ? (
        <>
          <FaSpinner className='inline-block animate-spin' />
        </>
      ) : (
        children
      )}
    </button>
  );
};
