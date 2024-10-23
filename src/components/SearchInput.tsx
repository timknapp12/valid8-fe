import React, { useState } from 'react';
import { Row } from './Row';
import { FaSearch } from 'react-icons/fa';
import { SearchInputProps } from '../types';

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
    <Row className='w-[80%] p-0 bg-gradient-to-r from-white via-white/75 to-transparent rounded-md h-10 border border-lightGray focus-within:border-hotPink'>
      <input
        type='text'
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className='w-full px-4 py-2 pr-10 text-sm bg-transparent focus:outline-none focus:ring-0 text-gradient h-full'
      />
      <FaSearch size={20} />
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
    caret-color: black;
  }
`;

export const StyleTag = () => <style>{styles}</style>;
