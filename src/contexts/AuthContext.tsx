import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseConfig';
import { User } from '@supabase/supabase-js';
import { AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsInitializing(false);
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      // Reset authenticating state when auth state changes
      setIsAuthenticating(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      // If no redirect happened (error case), reset the loading state
      if (!data.url) {
        setIsAuthenticating(false);
      }
      // Note: If redirect successful, loading state will persist until redirect completes
    } catch (error) {
      setIsAuthenticating(false);
      if (error instanceof Error) {
        console.error('Error signing in:', error.message);
      } else {
        console.error('Error signing in:', String(error));
      }
    }
  };

  const handleSignOut = async () => {
    setIsAuthenticating(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error signing out:', error.message);
      } else {
        console.error('Error signing out:', String(error));
      }
    }
    // Note: Loading state will be reset by the onAuthStateChange listener
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isAuthenticating,
        handleSignIn,
        handleSignOut,
      }}
    >
      {isInitializing ? (
        <div className='flex items-center justify-center min-h-screen'>
          <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900' />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
