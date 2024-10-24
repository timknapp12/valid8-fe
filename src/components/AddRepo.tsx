import { useState } from 'react';
import { Repository, VerificationError, VerifiedRepo } from '../types';
import { Button } from './Button';
import { RepoModal } from './RepoModal';
import { supabase } from '../utils/supabaseConfig';
import { addToSupabase } from '../utils/addToSupabase';
import { FaPlus } from 'react-icons/fa';
import { useAppContext } from '../contexts/AppContext';
import toast from 'react-hot-toast';

export const AddRepo = () => {
  const { refetchRepos } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationErrors, setVerificationErrors] = useState<
    VerificationError[]
  >([]);

  const verifyRepositories = async (selectedRepos: Repository[]) => {
    setVerifying(true);
    setVerificationErrors([]);
    const verified: VerifiedRepo[] = [];
    const errors: VerificationError[] = [];

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const accessToken = session?.provider_token;

      if (!accessToken) {
        throw new Error('No GitHub access token found');
      }

      for (const repo of selectedRepos) {
        try {
          const response = await fetch(
            `https://api.github.com/repos/${repo.full_name}/contents/valid8.json`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/vnd.github.v3+json',
              },
            }
          );

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            errors.push({
              repo,
              error: `GitHub API error: ${response.status} - ${
                response.status === 404
                  ? 'No valid8.json file found'
                  : errorData.message
              }`,
            });
            continue;
          }

          const fileData = await response.json();
          const content = atob(fileData.content);

          let valid8_content;
          try {
            valid8_content = JSON.parse(content);
          } catch (e: unknown) {
            if (e instanceof Error) {
              throw new Error(`Invalid JSON in valid8.json: ${e.message}`);
            }
            throw new Error('Invalid JSON in valid8.json: Unknown error');
          }

          const username = repo.full_name.split('/')[0];

          verified.push({
            repo_name: repo.name,
            username,
            repo_url: repo.html_url,
            valid8_content,
            repofull_name: repo.full_name,
          });
        } catch (error) {
          errors.push({
            repo,
            error:
              error instanceof Error
                ? `Verification failed: ${error.message}`
                : 'Verification failed: Unknown error',
          });
        }
      }

      if (errors.length === 0 && verified.length > 0) {
        try {
          await addToSupabase(verified, refetchRepos);
          await refetchRepos();
          setShowModal(false);

          verified.forEach((repo) => {
            toast.success(`Successfully added ${repo.repo_name}`, {
              duration: 3000,
              position: 'bottom-right',
              style: {
                background: '#0D9488',
                color: '#fff',
              },
            });
          });
        } catch (error) {
          const errorRepo: Repository = {
            id: 0,
            name: 'Database Error',
            full_name: 'Database Error',
            html_url: '',
            default_branch: '',
            private: false,
          };

          errors.push({
            repo: errorRepo,
            error: `Failed to add repositories to database: ${
              error instanceof Error ? error.message : 'Unknown error'
            }`,
          });
        }
      }

      if (errors.length > 0) {
        setVerificationErrors(errors);
      }
    } catch (error) {
      setVerificationErrors(
        selectedRepos.map((repo) => ({
          repo,
          error: error instanceof Error ? error.message : 'Verification failed',
        }))
      );
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>
        <FaPlus className='mr-2' />
        Add Repositories
      </Button>

      {showModal && (
        <RepoModal
          onClose={() => {
            setShowModal(false);
            setVerificationErrors([]);
          }}
          onSubmit={verifyRepositories}
          verifying={verifying}
          verificationErrors={verificationErrors}
        />
      )}
    </div>
  );
};
