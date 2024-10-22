import React, { createContext, useContext, ReactNode, useState } from 'react';
import { AppContextType } from '../types';
import { mockItems } from './mockItems';

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
