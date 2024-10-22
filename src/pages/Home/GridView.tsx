import { Grid, Row, Tile } from '../../components';
import { SearchInput, Column } from '../../components';
import { useAppContext } from '../../contexts/AppContext';
import { AiOutlineFullscreenExit } from 'react-icons/ai';

const GridView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { handleSearch, mockItems } = useAppContext();

  return (
    <Column className='gap-2 mt-6'>
      <SearchInput onSearch={handleSearch} />
      <Column style={{ alignItems: 'flex-end', gap: 8, width: '100%' }}>
        <button onClick={onClose} title='Exit fullscreen'>
          <AiOutlineFullscreenExit size={24} />
        </button>
        <div className='w-full bg-white bg-opacity-20 p-8'>
          <div className='flex-grow flex items-center w-full'>
            {mockItems.length === 0 ? (
              <Row
                style={{ justifyContent: 'center', width: '100%', height: 260 }}
              >
                <p className='text-white'>No results found</p>
              </Row>
            ) : (
              <Grid min='250px'>
                {mockItems.map(({ id, name, owner, link }) => (
                  <Tile
                    key={id}
                    id={id}
                    name={name}
                    owner={owner}
                    link={link}
                  />
                ))}
                <div className='absolute right-0 top-0 bottom-0 w-8 pointer-events-none'></div>
              </Grid>
            )}
          </div>
        </div>
      </Column>
    </Column>
  );
};

export default GridView;
