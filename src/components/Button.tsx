import { FaSpinner } from 'react-icons/fa';
import { ButtonProps } from '../types';

export const Button = ({
  onClick,
  loading,
  disabled,
  children,
  className = '',
  secondary = false,
}: ButtonProps) => {
  const baseStyles =
    'relative px-4 py-2 font-bold rounded-md disabled:opacity-70 disabled:cursor-not-allowed min-w-36 flex flex-row items-center justify-center min-h-[40px]';

  const variantStyles = secondary
    ? 'text-darkGray border border-darkGray hover:border-hotPink hover:text-hotPink'
    : 'bg-hotPink text-black hover:bg-darkHotPink';

  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {loading ? <FaSpinner className='inline-block animate-spin' /> : children}
    </button>
  );
};
