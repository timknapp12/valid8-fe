import React, { useState } from 'react';
import { Row } from './Row';

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = 'Search...',
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Row className='w-[80%] p-0 bg-gradient-to-r from-white to-transparent rounded-md h-10 border border-gray-200'>
      <input
        type='text'
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className='w-full px-4 py-2 pr-10 text-sm bg-transparent focus:outline-none focus:ring-0 text-gradient h-full'
      />
      <div className='flex items-center px-3 h-full'>
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='white'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </div>
    </Row>
  );
};

const styles = `
  .text-gradient {
    background: linear-gradient(to right, black 65%, white 65%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
`;

export const StyleTag = () => <style>{styles}</style>;
