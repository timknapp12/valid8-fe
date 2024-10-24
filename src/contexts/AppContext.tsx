import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { AppContextType } from '../types';
import { fetchRepos } from '../utils/fetchRepos';
import { TileProps } from '../types';

const AppContext = createContext<AppContextType>({} as AppContextType);
export const useAppContext = () => useContext(AppContext);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [repos, setRepos] = useState<TileProps[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const refetchRepos = useCallback(async () => {
    setIsLoadingRepos(true);
    try {
      const [data, error] = await fetchRepos();
      if (error || !data) {
        console.error('Error in AppProvider:', error);
        setRepos([]);
      } else {
        const reposArray = Array.isArray(data) ? data : [];
        setRepos(reposArray);
      }
    } catch (error) {
      console.error('Unexpected error in AppProvider:', error);
      setRepos([]);
    } finally {
      setIsLoadingRepos(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    refetchRepos();
  }, [refetchRepos]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const filteredRepos =
    searchTerm === ''
      ? repos
      : repos.filter((repo) => {
          const searchLower = searchTerm.toLowerCase();
          const repo_nameLower = repo.repo_name.toLowerCase();
          const repo_nameSpaces = repo.repo_name
            .toLowerCase()
            .replace(/-/g, ' ');
          const usernameLower = repo.username.toLowerCase();

          return (
            repo_nameLower.includes(searchLower) ||
            repo_nameSpaces.includes(searchLower) ||
            usernameLower.includes(searchLower)
          );
        });

  // Sort the filtered repos by num_of_clicks in descending order
  const sortedRepos = [...filteredRepos].sort((a, b) => {
    const clicksA = a.num_of_clicks || 0;
    const clicksB = b.num_of_clicks || 0;
    return clicksB - clicksA;
  });

  return (
    <AppContext.Provider
      value={{
        searchTerm,
        handleSearch,
        filteredRepos: sortedRepos,
        isLoadingRepos,
        refetchRepos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
