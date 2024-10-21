import { Column, Header, SearchInput, StyleTag, Button } from '../components';
import { useAppContext } from '../contexts/AppContext';

const Home: React.FC = () => {
  const { handleSearch } = useAppContext();

  return (
    <div>
      <StyleTag />
      <Header />
      <Column>
        <h2 className='text-2xl font-bold mt-6'>
          Find github projects that use valid8
        </h2>
        <SearchInput onSearch={handleSearch} />
        <Button onClick={() => {}}>Upload</Button>
      </Column>
    </div>
  );
};

export default Home;
