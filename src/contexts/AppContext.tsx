import React, { createContext, useContext, ReactNode, useState } from 'react';
import { AppContextType } from '../types';

const AppContext = createContext<AppContextType>({} as AppContextType);
export const useAppContext = () => useContext(AppContext);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (query: string) => {
    console.log('handleSearch', query);
    setSearchTerm(query);
  };

  return (
    <AppContext.Provider value={{ searchTerm, handleSearch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
