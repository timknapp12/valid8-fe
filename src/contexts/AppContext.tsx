import React, { createContext, useContext, ReactNode, useState } from 'react';
import { AppContextType } from '../types';

const mockItems = [
  {
    id: 1,
    name: 'example-repo-name',
    owner: 'deanmlittle',
    link: 'https://google.com',
  },
  {
    id: 2,
    name: 'a-little-bit-longer-repo-name',
    owner: 'reallyReallyReallyLongOwnerName',
    link: 'https://really/long/link/google.com/long/name/kljlkdjfkl/realllllylongname',
  },
  {
    id: 3,
    name: 'vault-2024',
    owner: 'ASCorreia',
    link: 'https://github.com/ASCorreia/vault-2024',
  },
  { id: 4, name: 'example4', owner: 'sallysmith', link: 'https://google.com' },
  {
    id: 5,
    name: 'really-really-extra-long-super-duper-long-repo-name',
    owner: 'jimmyanderson',
    link: 'https://google.com',
  },
  {
    id: 6,
    name: 'example6',
    owner: 'jillanderson',
    link: 'https://google.com/kljlkdjfkl/realllllylongname',
  },
];

const AppContext = createContext<AppContextType>({} as AppContextType);
export const useAppContext = () => useContext(AppContext);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(mockItems);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    const filtered = mockItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.name
          .toLowerCase()
          .replace(/-/g, ' ')
          .includes(query.toLowerCase()) ||
        item.owner.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <AppContext.Provider
      value={{ searchTerm, handleSearch, mockItems: filteredItems }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
