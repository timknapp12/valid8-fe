import { useState } from 'react';
import {
  Button,
  Column,
  Header,
  SearchInput,
  StyleTag,
  Track,
} from '../../components';
import { useAppContext } from '../../contexts/AppContext';
import GridView from './GridView';
import { AiOutlineFullscreen } from 'react-icons/ai';

const Home: React.FC = () => {
  const { handleSearch, mockItems } = useAppContext();
  const [showGridView, setShowGridView] = useState(false);

  return (
    <div>
      <StyleTag />
      <Header />
      {showGridView ? (
        <GridView onClose={() => setShowGridView(false)} />
      ) : (
        <Column
          className='gap-[60px]'
          style={{ paddingRight: 0, paddingLeft: 0 }}
        >
          <>
            <Column>
              <h2 className='text-2xl font-bold text-center'>
                Find github projects that use valid8
              </h2>
              <SearchInput onSearch={handleSearch} />
            </Column>
            <Column
              style={{
                alignItems: 'flex-end',
                gap: 8,
                padding: 0,
              }}
            >
              <div className='p-2' onClick={() => setShowGridView(true)}>
                <AiOutlineFullscreen size={24} title='Fullscreen' />
              </div>
              <Track items={mockItems} />
            </Column>
            <Button onClick={() => {}}>Upload</Button>
          </>
        </Column>
      )}
    </div>
  );
};

export default Home;
