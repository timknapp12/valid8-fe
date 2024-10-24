import { Row } from './Row';
import { Button } from './Button';
import { useAuthContext } from '../contexts/AuthContext';
import logoImage from '../assets/valid8_icon.png';

export const Header = () => {
  const { handleSignIn, handleSignOut, user, loading } = useAuthContext();

  const onClick = () => (user ? handleSignOut() : handleSignIn());
  const buttonText = user ? 'Sign out' : 'Sign in';

  return (
    <header className='w-full bg-gradient-to-r from-white via-white/75 to-transparent'>
      <Row>
        <img src={logoImage} alt='Valid8 Logo' className='h-16' />
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
