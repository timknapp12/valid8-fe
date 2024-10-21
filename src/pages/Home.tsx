import {
  Button,
  Column,
  Header,
  SearchInput,
  StyleTag,
  Track,
} from '../components';
import { useAppContext } from '../contexts/AppContext';

const Home: React.FC = () => {
  const { handleSearch, mockItems } = useAppContext();

  return (
    <div>
      <StyleTag />
      <Header />
      <Column
        className='gap-[60px]'
        style={{ paddingRight: 0, paddingLeft: 0 }}
      >
        <div />
        <Column>
          <h2 className='text-2xl font-bold text-center'>
            Find github projects that use valid8
          </h2>
          <SearchInput onSearch={handleSearch} />
        </Column>
        <Track items={mockItems} />
        <Button onClick={() => {}}>Upload</Button>
      </Column>
    </div>
  );
};

export default Home;
