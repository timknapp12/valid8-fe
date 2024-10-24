import { useState } from 'react';
import {
  Column,
  Header,
  AddRepo,
  SearchInput,
  StyleTag,
  Track,
} from '../../components';
import { useAppContext } from '../../contexts/AppContext';
import GridView from './GridView';
import { AiOutlineFullscreen } from 'react-icons/ai';
import { Toaster } from 'react-hot-toast';
// TODO mess with dark theme on tiles and modals
const Home: React.FC = () => {
  const { handleSearch } = useAppContext();
  const [showGridView, setShowGridView] = useState(false);

  return (
    <div>
      <StyleTag />
      <Toaster />
      {showGridView ? (
        <GridView onClose={() => setShowGridView(false)} />
      ) : (
        <>
          <Header />
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
                <button className='p-2' onClick={() => setShowGridView(true)}>
                  <AiOutlineFullscreen size={24} title='Fullscreen' />
                </button>
                <Track />
              </Column>
              <AddRepo />
            </>
          </Column>
        </>
      )}
    </div>
  );
};

export default Home;
