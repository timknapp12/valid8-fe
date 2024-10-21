import {
  Button,
  Column,
  Header,
  SearchInput,
  StyleTag,
  Track,
} from '../components';
import { useAppContext } from '../contexts/AppContext';

const items = [
  {
    id: 1,
    name: 'example.guthub/long/name/for/days',
    owner: 'deanlittle',
    link: 'https://google.com',
  },
  {
    id: 2,
    name: 'example2',
    owner: 'reallylongname johndoe',
    link: 'https://google.com',
  },
  {
    id: 3,
    name: 'example3',
    owner: 'janedoe',
    link: 'https://google.com/long/name/kljlkdjfkl/realllllylongname',
  },
  { id: 4, name: 'example4', owner: 'sallysmith', link: 'https://google.com' },
  {
    id: 5,
    name: 'example5',
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

const Home: React.FC = () => {
  const { handleSearch } = useAppContext();

  return (
    <div>
      <StyleTag />
      <Header />
      <Column className='gap-12 p-0' style={{ padding: 0 }}>
        <div />
        <Column className='pl-0 pr-0'>
          <h2 className='text-2xl font-bold'>
            Find github projects that use valid8
          </h2>
          <SearchInput onSearch={handleSearch} />
        </Column>
        <Track items={items} />
        <Button onClick={() => {}}>Upload</Button>
      </Column>
    </div>
  );
};

export default Home;
