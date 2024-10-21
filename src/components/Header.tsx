import { Row } from './Row';
import { Button } from './Button';

export const Header = () => {
  return (
    <header className='w-full bg-gradient-to-r from-white to-transparent'>
      <Row>
        <p className='text-2xl font-bold text-black'>Valid8</p>
        <Button onClick={() => {}}>Sign in</Button>
      </Row>
    </header>
  );
};
