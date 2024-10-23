import { Row } from './Row';
import { Button } from './Button';
import { useAuthContext } from '../contexts/AuthContext';

export const Header = () => {
  const { handleSignIn, handleSignOut, user, loading } = useAuthContext();

  const onClick = () => (user ? handleSignOut() : handleSignIn());
  const buttonText = user ? 'Sign out' : 'Sign in';

  return (
    <header className='w-full bg-gradient-to-r from-white via-white/75 to-transparent'>
      <Row>
        <p className='text-2xl font-bold text-black'>Valid8</p>
        {user && (
          <p className='hidden sm:block text-sm text-black'>{`Welcome ${
            user?.user_metadata?.name ?? ''
          }!`}</p>
        )}
        <Button onClick={onClick} loading={loading}>
          {buttonText}
        </Button>
      </Row>
    </header>
  );
};
