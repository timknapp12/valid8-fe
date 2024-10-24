import { supabase } from './supabaseConfig';
import { VerifiedRepo } from '../types';

export const addToSupabase = async (
  verifiedRepos: VerifiedRepo[],
  refetchRepos: () => void
) => {
  try {
    const formattedRepos = verifiedRepos.map((repo) => ({
      full_name: repo.repofull_name,
      repo_name: repo.repo_name,
      username: repo.username,
      repo_url: repo.repo_url,
      valid8_content: repo.valid8_content,
      num_of_clicks: 0,
    }));

    const { error } = await supabase
      .from('repositories')
      .upsert(formattedRepos, {
        onConflict: 'full_name',
      });

    if (error) {
      throw error;
    }

    await refetchRepos();
  } catch (error) {
    console.error('Error adding repositories to Supabase:', error);
    throw error;
  }
};
