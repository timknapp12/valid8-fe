import { supabase } from './supabaseConfig';

export const fetchRepos = async () => {
  try {
    const { data, error } = await supabase.from('repositories').select('*');
    if (error) {
      console.error('Error fetching repositories:', error);
      return [null, error];
    }

    return [data, null];
  } catch (error) {
    console.error('Unexpected error in fetchRepos:', error);
    return [null, error];
  }
};
